#!/usr/bin/env python3
"""
gerar-mapa-mg.py — gera o mapa de Minas Gerais (SVG inline) usado no site.

Saída (partials injetados por includes.js) — ver VARIANTES mais abaixo:
  assets/partials/mapa-mg-lateral.html   História, ao lado do texto: divisas das 66
                                         microrregiões, nomes das 12 mesorregiões, pino
  assets/partials/mapa-mg-compacto.html  Contato: só mesorregiões + pino
  assets/partials/mapa-mg.html           (opcional) largura total, com os nomes das
                                         microrregiões: gerar-mapa-mg.py completo

Dados: malhas do IBGE redistribuídas em domínio público (CC0) por
  github.com/fititnt/gis-dataset-brasil  (micro e mesorregiões)
  github.com/tbrugz/geodata-br           (municípios — posição de São João Evangelista)
O IBGE (servicodados.ibge.gov.br) é a fonte original; os repositórios acima só
foram usados porque o domínio do IBGE não estava acessível ao gerar.

Uso:
    pip install shapely
    python3 ferramentas/gerar-mapa-mg.py            # baixa os dados
    python3 ferramentas/gerar-mapa-mg.py completo   # só a variante completa
    python3 ferramentas/gerar-mapa-mg.py <pasta>    # usa microrregiao.json,
                                                    # mesorregiao.json e
                                                    # geojs-31-mun.json já baixados
"""
import json
import math
import sys
import urllib.request
from pathlib import Path

from shapely.geometry import shape, Point, box
from shapely.ops import unary_union, polylabel

RAIZ = Path(__file__).resolve().parent.parent
FONTES = {
    "microrregiao.json": ("https://raw.githubusercontent.com/fititnt/gis-dataset-brasil/master/microrregiao/geojson/microrregiao.json", "latin-1"),
    "mesorregiao.json": ("https://raw.githubusercontent.com/fititnt/gis-dataset-brasil/master/mesorregiao/geojson/mesorregiao.json", "latin-1"),
    "geojs-31-mun.json": ("https://raw.githubusercontent.com/tbrugz/geodata-br/master/geojson/geojs-31-mun.json", "utf-8"),
}

# Nomes oficiais com acento (os arquivos de origem vêm em CAIXA ALTA sem acento).
MICRO_NOMES = {
    "UNAI": "Unaí", "PARACATU": "Paracatu", "JANUARIA": "Januária", "JANAUBA": "Janaúba",
    "SALINAS": "Salinas", "PIRAPORA": "Pirapora", "MONTES CLAROS": "Montes Claros",
    "GRAO MOGOL": "Grão Mogol", "BOCAIUVA": "Bocaiuva", "DIAMANTINA": "Diamantina",
    "CAPELINHA": "Capelinha", "ARACUAI": "Araçuaí", "PEDRA AZUL": "Pedra Azul",
    "ALMENARA": "Almenara", "TEOFILO OTONI": "Teófilo Otoni", "NANUQUE": "Nanuque",
    "ITUIUTABA": "Ituiutaba", "UBERLANDIA": "Uberlândia", "PATROCINIO": "Patrocínio",
    "PATOS DE MINAS": "Patos de Minas", "FRUTAL": "Frutal", "UBERABA": "Uberaba",
    "ARAXA": "Araxá", "TRES MARIAS": "Três Marias", "CURVELO": "Curvelo",
    "BOM DESPACHO": "Bom Despacho", "SETE LAGOAS": "Sete Lagoas",
    "CONCEICAO DO MATO DENTRO": "Conceição do Mato Dentro", "PARA DE MINAS": "Pará de Minas",
    "BELO HORIZONTE": "Belo Horizonte", "ITABIRA": "Itabira", "ITAGUARA": "Itaguara",
    "OURO PRETO": "Ouro Preto", "CONSELHEIRO LAFAIETE": "Conselheiro Lafaiete",
    "GUANHAES": "Guanhães", "PECANHA": "Peçanha", "GOVERNADOR VALADARES": "Governador Valadares",
    "MANTENA": "Mantena", "IPATINGA": "Ipatinga", "CARATINGA": "Caratinga", "AIMORES": "Aimorés",
    "PIUI": "Piumhi", "DIVINOPOLIS": "Divinópolis", "FORMIGA": "Formiga",
    "CAMPO BELO": "Campo Belo", "OLIVEIRA": "Oliveira", "PASSOS": "Passos",
    "SAO SEBASTIAO DO PARAISO": "São Sebastião do Paraíso", "ALFENAS": "Alfenas",
    "VARGINHA": "Varginha", "POCOS DE CALDAS": "Poços de Caldas", "POUSO ALEGRE": "Pouso Alegre",
    "SANTA RITA DO SAPUCAI": "Santa Rita do Sapucaí", "SAO LOURENCO": "São Lourenço",
    "ANDRELANDIA": "Andrelândia", "ITAJUBA": "Itajubá", "LAVRAS": "Lavras",
    "SAO JOAO DEL REI": "São João del-Rei", "BARBACENA": "Barbacena", "PONTE NOVA": "Ponte Nova",
    "MANHUACU": "Manhuaçu", "VICOSA": "Viçosa", "MURIAE": "Muriaé", "UBA": "Ubá",
    "JUIZ DE FORA": "Juiz de Fora", "CATAGUASES": "Cataguases",
}
# No lugar do rótulo "Peçanha" entra São João Evangelista
# (o município fica na microrregião de Guanhães, ~30 km a oeste de Peçanha —
# o pino usa a posição real do município, não a do rótulo removido).
MICRO_SEM_ROTULO = {"PECANHA"}

# Mesorregiões: nome exibido (linhas) + cor de preenchimento (tons claros, como
# mapas administrativos; o verde da marca fica para contorno, rótulos e pino).
MESO = {
    "NOROESTE DE MINAS": (["NOROESTE", "DE MINAS"], "#e4e3ee"),
    "NORTE DE MINAS": (["NORTE DE MINAS"], "#fbe4d8"),
    "JEQUITINHONHA": (["JEQUITINHONHA"], "#ecefe6"),
    "VALE DO MUCURI": (["VALE DO", "MUCURI"], "#ece0f0"),
    "TRIANGULO MINEIRO/ALTO PARANAIBA": (["TRIÂNGULO MINEIRO", "E ALTO PARANAÍBA"], "#f8e2ea"),
    "CENTRAL MINEIRA": (["CENTRAL", "MINEIRA"], "#ebe4d8"),
    "METROPOLITANA DE BELO HORIZONTE": (["METROPOLITANA", "DE BELO HORIZONTE"], "#f6efc4"),
    "VALE DO RIO DOCE": (["VALE DO RIO DOCE"], "#d9eaf5"),
    "OESTE DE MINAS": (["OESTE", "DE MINAS"], "#dceedd"),
    "SUL/SUDOESTE DE MINAS": (["SUL E SUDOESTE", "DE MINAS"], "#f0ebe2"),
    "CAMPO DAS VERTENTES": (["CAMPO DAS", "VERTENTES"], "#fbf1b5"),
    "ZONA DA MATA": (["ZONA DA MATA"], "#f8dfca"),
}

LARGURA = 1000          # largura do viewBox; a altura sai da proporção real
MARGEM = 12
TOL = 0.9               # simplificação, em unidades do viewBox
VERDE = "#0b500d"       # --cor-primaria
ACENTO = "#00af02"      # --cor-acento
TEXTO = "#3d4a40"


def carregar(pasta):
    dados = {}
    for nome, (url, enc) in FONTES.items():
        p = Path(pasta) / nome if pasta else None
        bruto = p.read_bytes() if p and p.exists() else urllib.request.urlopen(url, timeout=120).read()
        dados[nome] = json.loads(bruto.decode(enc))["features"]
    return dados


def projetor(geoms):
    """Equiretangular com correção de cos(latitude média) — suficiente para um estado."""
    minx, miny, maxx, maxy = unary_union(geoms).bounds
    k_lon = math.cos(math.radians((miny + maxy) / 2))
    esc = (LARGURA - 2 * MARGEM) / ((maxx - minx) * k_lon)
    altura = (maxy - miny) * esc + 2 * MARGEM

    def proj(lon, lat):
        return (MARGEM + (lon - minx) * k_lon * esc, MARGEM + (maxy - lat) * esc)
    return proj, math.ceil(altura)


def transformar(geom, proj):
    import numpy as np
    import shapely

    def f(coords):
        return np.array([proj(x, y) for x, y in coords])
    return shapely.transform(geom, f)


def caminho(geom):
    polys = [geom] if geom.geom_type == "Polygon" else list(geom.geoms)
    partes = []
    for p in polys:
        for anel in [p.exterior, *p.interiors]:
            pts = list(anel.coords)[:-1]
            if len(pts) < 3:
                continue
            partes.append("M" + "L".join(f"{x:.1f},{y:.1f}" for x, y in pts) + "Z")
    return "".join(partes)


def maior(geom):
    return geom if geom.geom_type == "Polygon" else max(geom.geoms, key=lambda g: g.area)


def quebrar(nome, limite=13):
    """Quebra nomes longos em 2 linhas no espaço mais próximo do meio."""
    if len(nome) <= limite or " " not in nome:
        return [nome]
    meio = len(nome) / 2
    i = min((i for i, c in enumerate(nome) if c == " "), key=lambda i: abs(i - meio))
    return [nome[:i], nome[i + 1:]]


# largura média por caractere, em "em": Poppins 500 ≈ 0.6; Baloo 2 700 em caixa
# alta com letter-spacing ≈ 0.72. Folga de 3 unidades em volta de cada rótulo.
LARG_MICRO, LARG_MESO, FOLGA = 0.6, 0.72, 2


def caixa(x, y, linhas, fs, larg, lh=1.15):
    w = max(len(l) for l in linhas) * fs * larg + 2 * FOLGA
    h = len(linhas) * fs * lh + 2 * FOLGA
    return box(x - w / 2, y - h / 2, x + w / 2, y + h / 2)


def candidatos(regiao, x0, y0, passo=10, raio=120):
    """Pontos dentro da região, do centro visual (polylabel) para fora."""
    pts = [(x0, y0)]
    n = int(raio / passo)
    grade = [(x0 + i * passo, y0 + j * passo) for i in range(-n, n + 1) for j in range(-n, n + 1) if i or j]
    grade.sort(key=lambda p: (p[0] - x0) ** 2 + (p[1] - y0) ** 2)
    return pts + [p for p in grade if regiao.contains(Point(p))]


def texto(x, y, linhas, cls, fs, lh=1.15):
    y0 = y - (len(linhas) - 1) * fs * lh / 2 + fs * 0.35
    spans = "".join(
        f'<tspan x="{x:.1f}" y="{y0 + i * fs * lh:.1f}">{l}</tspan>' for i, l in enumerate(linhas))
    return f'<text class="{cls}">{spans}</text>'


# Variantes do mapa. Os tamanhos de fonte são em unidades do viewBox (1000 de
# largura): na tela, multiplique pela escala (largura exibida / 1000).
VARIANTES = {
    # largura total (~1040px): nomes das 66 microrregiões. Não usada hoje — a
    # variante não usada hoje (o site usa o mapa ao lado do texto); fica disponível.
    "completo": dict(arquivo="mapa-mg.html", gerar=False, micro=True, rot_micro=True, rot_meso=True,
                     fs_meso=15, fs_sje=17, lado="dir", r=(7, 16), sufixo="", classe=""),
    # ao lado do texto da História (~540px): só os nomes das mesorregiões, maiores
    "lateral": dict(arquivo="mapa-mg-lateral.html", gerar=True, micro=True, rot_micro=False, rot_meso=True,
                    fs_meso=24, fs_sje=30, lado="esq", r=(11, 24), sufixo="-l", classe=" mapa-mg--lateral"),
    # coluna estreita do Contato (~480px): só cores das mesorregiões + pino
    "compacto": dict(arquivo="mapa-mg-compacto.html", gerar=True, micro=False, rot_micro=False, rot_meso=False,
                     fs_meso=0, fs_sje=26, lado="esq", r=(11, 22), sufixo="-c", classe=" mapa-mg--compacto"),
}


def gerar(dados, v):
    mic = [f for f in dados["microrregiao.json"] if f["properties"]["UF"] == "MG"]
    mes = [f for f in dados["mesorregiao.json"] if f["properties"]["UF"] == "MG"]
    assert len(mic) == 66 and len(mes) == 12, (len(mic), len(mes))
    sje = next(f for f in dados["geojs-31-mun.json"] if f["properties"]["name"] == "São João Evangelista")

    proj, altura = projetor([shape(f["geometry"]) for f in mes])
    meso_geo = {f["properties"]["GEOCODIGO"]: (f["properties"]["MESO"], transformar(shape(f["geometry"]), proj)) for f in mes}
    micro_geo = [(f["properties"]["MICRO"], f["properties"]["GEOCODIGO"][:4],
                  transformar(shape(f["geometry"]), proj)) for f in mic]
    estado = unary_union([g for _, g in meso_geo.values()]).buffer(0)

    sje_pt = transformar(shape(sje["geometry"]), proj)
    sx, sy = polylabel(maior(sje_pt), tolerance=0.5).coords[0]

    out = []
    # 1) contorno do estado: traço grosso por baixo; os preenchimentos cobrem a metade interna
    out.append(f'<path d="{caminho(estado.simplify(TOL))}" fill="none" stroke="{VERDE}" stroke-width="5" stroke-linejoin="round"/>')
    # 2) preenchimento por mesorregião (desenhado por microrregião quando há divisas de micro)
    fonte = micro_geo if v["micro"] else [(None, cod, g) for cod, (_, g) in meso_geo.items()]
    out.append('<g stroke="#ffffff" stroke-width="1" stroke-linejoin="round">')
    for _, cod_meso, g in fonte:
        cor = MESO[meso_geo[cod_meso][0]][1]
        out.append(f'<path d="{caminho(g.simplify(TOL))}" fill="{cor}"/>')
    out.append("</g>")
    # 3) divisas entre mesorregiões
    out.append(f'<g fill="none" stroke="{VERDE}" stroke-opacity=".45" stroke-width="1.6" stroke-linejoin="round">')
    for _, g in meso_geo.values():
        out.append(f'<path d="{caminho(g.simplify(TOL))}"/>')
    out.append("</g>")

    # 4) rótulo de São João Evangelista. À DIREITA do pino (variante completa) ele
    #    fica sobre a microrregião de Peçanha, cujo rótulo foi retirado;
    #    nas variantes menores a fonte é maior e só cabe à esquerda.
    fs_sje = v["fs_sje"]
    larg_sje = len("São João Evangelista") * fs_sje * 0.6
    if v["lado"] == "dir":
        caixa_sje = box(sx + 10, sy - fs_sje * 0.8, sx + 16 + larg_sje, sy + fs_sje * 0.8)
    else:
        caixa_sje = box(sx - 16 - larg_sje, sy - fs_sje * 0.8, sx - 10, sy + fs_sje * 0.8)
    ocupado = [box(sx - 18, sy - 18, sx + 18, sy + 18), caixa_sje]
    rotulos, sem_lugar = [], []

    # 5) rótulos: mesorregiões primeiro (são os nomes mais importantes); depois as
    #    microrregiões procuram espaço livre perto do próprio centro. Se uma micro
    #    não couber sem sobrepor, o nome dela é omitido (o script avisa quais).
    if v["rot_meso"]:
        fs_meso = v["fs_meso"]
        for cod, (nome, g) in meso_geo.items():
            linhas = MESO[nome][0]
            x0, y0 = polylabel(maior(g), tolerance=1).coords[0]
            achou = next(((x, y) for x, y in candidatos(g.buffer(-8), x0, y0, passo=5, raio=220)
                          if estado.contains(c := caixa(x, y, linhas, fs_meso, LARG_MESO))
                          and not any(c.intersects(o) for o in ocupado)), None)
            if not achou:
                sem_lugar.append(nome)
                achou = (x0, y0)
            ocupado.append(caixa(*achou, linhas, fs_meso, LARG_MESO))
            rotulos.append(texto(*achou, linhas, "mapa-mg__meso", fs_meso))
    if v["rot_micro"]:
        fs_micro = 11.5
        for micro, _, g in micro_geo:
            if micro in MICRO_SEM_ROTULO:
                continue
            linhas = quebrar(MICRO_NOMES[micro])
            cx, cy = polylabel(maior(g), tolerance=1).coords[0]
            for fs in (fs_micro, 10, 9):
                achou = next(((x, y) for x, y in candidatos(g.buffer(10), cx, cy, passo=3, raio=60)
                              if estado.contains(c := caixa(x, y, linhas, fs, LARG_MICRO))
                              and not any(c.intersects(o) for o in ocupado)), None)
                if achou:
                    break
            if not achou:
                sem_lugar.append(MICRO_NOMES[micro])
                continue
            ocupado.append(caixa(*achou, linhas, fs, LARG_MICRO))
            rotulos.append(texto(*achou, linhas, "mapa-mg__micro", fs).replace(
                '<text class="mapa-mg__micro">', f'<text class="mapa-mg__micro" font-size="{fs}">'))
    out.append("".join(rotulos))
    if sem_lugar:
        print("  sem espaço livre (omitidos/sobrepostos):", ", ".join(sem_lugar))

    yb = sy + fs_sje * 0.35
    esq = f'<text class="mapa-mg__sje mapa-mg__sje--esq" x="{sx - 14:.1f}" y="{yb:.1f}" text-anchor="end" font-size="{fs_sje}">São João Evangelista</text>'
    dir_ = f'<text class="mapa-mg__sje mapa-mg__sje--dir" x="{sx + 14:.1f}" y="{yb:.1f}" font-size="{fs_sje}">São João Evangelista</text>'
    r_pino, r_halo = v["r"]
    out.append(
        f'<g class="mapa-mg__destaque">'
        f'<circle class="mapa-mg__halo" cx="{sx:.1f}" cy="{sy:.1f}" r="{r_halo}" fill="{ACENTO}" opacity=".25"/>'
        f'<circle class="mapa-mg__pino" cx="{sx:.1f}" cy="{sy:.1f}" r="{r_pino}" fill="{ACENTO}" stroke="#ffffff" stroke-width="3"/>'
        + (dir_ + esq if v["lado"] == "dir" else esq) +
        f'</g>')

    titulo = "Mapa de Minas Gerais com as mesorregiões" + (" e microrregiões" if v["micro"] else "") + \
             " e a localização de São João Evangelista, no Vale do Rio Doce"
    estilo = (
        f'<style>'
        f'.mapa-mg__meso{{font:700 {v["fs_meso"] or 15}px/1 var(--fonte-titulo,sans-serif);fill:{VERDE};letter-spacing:.04em;text-anchor:middle}}'
        f'.mapa-mg__micro{{font:500 11.5px/1 var(--fonte-corpo,sans-serif);fill:{TEXTO};text-anchor:middle}}'
        f'.mapa-mg__sje{{font-family:var(--fonte-titulo,sans-serif);font-weight:800;fill:{VERDE};'
        f'paint-order:stroke;stroke:#ffffff;stroke-width:{5 if fs_sje < 20 else 7}px;stroke-linejoin:round}}'
        + ('.mapa-mg__sje--esq{display:none}' if v["lado"] == "dir" else '') +
        f'</style>')
    tid = f"mapa-mg-titulo{v['sufixo']}"
    svg = (f'<svg class="mapa-mg__svg" viewBox="0 0 {LARGURA} {altura}" role="img" aria-labelledby="{tid}" xmlns="http://www.w3.org/2000/svg">'
           f'<title id="{tid}">{titulo}</title>{estilo}{"".join(out)}</svg>')
    cabecalho = ("<!-- GERADO por ferramentas/gerar-mapa-mg.py — não editar à mão.\n"
                 "     Dados: IBGE, via github.com/fititnt/gis-dataset-brasil e\n"
                 "     github.com/tbrugz/geodata-br (domínio público). -->\n")
    return cabecalho + f'<div class="mapa-mg{v["classe"]}">{svg}</div>\n'


def main():
    """Uso: gerar-mapa-mg.py [pasta-dos-dados] [variante ...]  (padrão: as marcadas gerar=True)"""
    args = sys.argv[1:]
    pasta = args.pop(0) if args and Path(args[0]).is_dir() else None
    nomes = args or [n for n, v in VARIANTES.items() if v["gerar"]]
    dados = carregar(pasta)
    for nome in nomes:
        v = VARIANTES[nome]
        destino = RAIZ / "assets" / "partials" / v["arquivo"]
        destino.write_text(gerar(dados, v), encoding="utf-8")
        print(f"{nome}: {destino.relative_to(RAIZ)} ({destino.stat().st_size // 1024} KB)")


if __name__ == "__main__":
    main()
