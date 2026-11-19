"""Testes do site: servidor vivo, cabeçalhos de segurança e código compatível com a CSP."""
from pathlib import Path

from fastapi.testclient import TestClient

from main import app

client = TestClient(app)
STATIC = Path(__file__).resolve().parent.parent / "static"


def test_saude():
    assert client.get("/api/saude").json() == {"status": "ok"}


def test_cabecalhos_de_seguranca():
    r = client.get("/")
    csp = r.headers["Content-Security-Policy"]
    assert "script-src 'self'" in csp and "frame-ancestors 'none'" in csp
    assert r.headers["X-Content-Type-Options"] == "nosniff"
    assert r.headers["X-Frame-Options"] == "DENY"


def test_html_sem_script_nem_estilo_embutido():
    """A CSP bloquearia estes casos; o teste garante que nunca voltem."""
    html = (STATIC / "index.html").read_text(encoding="utf-8")
    assert "<script>" not in html and "style=" not in html


def test_js_sem_estilo_embutido():
    """setAttribute("style") também é bloqueado pela CSP: use classes no CSS."""
    for arquivo in (STATIC / "js").glob("*.js"):
        assert 'style:' not in arquivo.read_text(encoding="utf-8"), arquivo.name


def test_arquivos_estaticos_servidos():
    assert client.get("/static/css/style.css").status_code == 200
    assert client.get("/static/js/app.js").status_code == 200