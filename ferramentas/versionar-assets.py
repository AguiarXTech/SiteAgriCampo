#!/usr/bin/env python3
"""
versionar-assets.py — cache-busting dos CSS/JS do site.

O GitHub Pages manda o navegador guardar CSS/JS por ~10 min, e os @import do
main.css (e os import entre módulos JS) às vezes nem o Ctrl+F5 renova. Este
script carimba ?v=<versão> em TODA referência local a .css/.js:
  - HTML: <link href="assets/...css"> e <script src="assets/...js">
  - CSS:  @import "./x.css"
  - JS:   import ... from "./x.js" / "../data/x.js"
Toda referência ao mesmo arquivo recebe a mesma versão, então nenhum módulo
JS é carregado duas vezes.

Uso (na raiz do repositório, antes do commit que vai para a main):
    python3 ferramentas/versionar-assets.py
Idempotente: rodar de novo só troca a versão.
"""
import re
import sys
from datetime import datetime, timezone
from pathlib import Path

RAIZ = Path(__file__).resolve().parent.parent
VERSAO = sys.argv[1] if len(sys.argv) > 1 else datetime.now(timezone.utc).strftime("%Y%m%d%H%M")

PADROES = {
    ".html": re.compile(r'((?:href|src)="assets/[^"?#]+\.(?:css|js))(?:\?v=[^"]*)?"'),
    ".css": re.compile(r'(@import\s+"\./[^"?#]+\.css)(?:\?v=[^"]*)?"'),
    ".js": re.compile(r'((?:from|import)\s+"\.{1,2}/[^"?#]+\.js)(?:\?v=[^"]*)?"'),
}

alterados = 0
for arquivo in RAIZ.rglob("*"):
    if arquivo.suffix not in PADROES or ".git" in arquivo.parts:
        continue
    texto = arquivo.read_text(encoding="utf-8")
    novo = PADROES[arquivo.suffix].sub(rf'\1?v={VERSAO}"', texto)
    if novo != texto:
        arquivo.write_text(novo, encoding="utf-8")
        alterados += 1
print(f"versão {VERSAO} aplicada em {alterados} arquivo(s)")
