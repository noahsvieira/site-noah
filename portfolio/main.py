from pathlib import Path

from fastapi import FastAPI, Request
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles

app = FastAPI(title="Portfolio API")
STATIC = Path(__file__).parent / "static"

# CSP: o navegador só executa script e estilo que vierem DESTE site (e as fontes do Google).
CSP = (
    "default-src 'self'; script-src 'self'; style-src 'self' https://fonts.googleapis.com; "
    "font-src https://fonts.gstatic.com; img-src 'self' data:; connect-src 'self'; "
    "object-src 'none'; base-uri 'none'; form-action 'self'; frame-ancestors 'none'"
)
CABECALHOS = {
    "X-Content-Type-Options": "nosniff",         # não "adivinhar" o tipo do arquivo
    "X-Frame-Options": "DENY",                   # ninguém pode embutir o site (clickjacking)
    "Referrer-Policy": "no-referrer",            # não vaza de onde o visitante veio
    "Permissions-Policy": "camera=(), microphone=(), geolocation=()",
}
DOCS = ("/docs", "/redoc", "/openapi.json")      # a página /docs usa scripts externos: fica sem CSP (só em desenvolvimento)


@app.middleware("http")
async def cabecalhos_de_seguranca(request: Request, call_next):
    """Acrescenta proteção a TODA resposta do servidor."""
    resposta = await call_next(request)
    resposta.headers.update(CABECALHOS)
    if not request.url.path.startswith(DOCS):
        resposta.headers["Content-Security-Policy"] = CSP
    return resposta


app.mount("/static", StaticFiles(directory=STATIC), name="static")


@app.get("/api/saude")
def saude() -> dict:
    """Rota de teste: confirma que o servidor está vivo."""
    return {"status": "ok"}


@app.get("/")
def home() -> FileResponse:
    """Entrega a página do portfólio."""
    return FileResponse(STATIC / "index.html")