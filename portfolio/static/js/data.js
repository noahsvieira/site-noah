/** MEUS dados. Para adicionar projeto, certificado ou experiência, mexer só neste arquivo. */
export const DATA = {
  name: "Noah S. Vieira",
  github: "",
  linkedin: "",
  mail: "",
  stack: [
    "REST API",
    "APPSEC",
    "DEV BACK-END",
    "CIBERSEGURANÇA",
    "AUTOMATION",
    "PYTHON",
    "JAVA",
    "FASTAPI",
    "SQL",
    "LINUX",
  ],
  arsenal: [
    ["Backend", "Python · Java · FastAPI · APIs RESTful"],
    ["Dados + IA", "SQL · Ciência de Dados · Machine Learning"],
    ["Segurança", "Pentest · SOC · Active Directory · OWASP"],
    ["Sistemas", "Linux · Git · Automação · Redes"],
  ],
  projects: [
    {
      t: "Backend / Integrações",
      n: { pt: "API de Recarga e Pagamentos", en: "Top-up & Payments API" },
      d: {
        pt: "API REST em Python e FastAPI a partir de uma demanda real, reproduzindo um cenário de integração para recarga de celular e pagamento de contas.",
        en: "REST API in Python and FastAPI built from a real request, reproducing an integration scenario for mobile top-up and bill payments.",
      },
      tags: ["Python", "FastAPI", "REST", "Integrações"],
      url: "", // colar aqui o link do meu GitHub; vazio = o botão "ver código" não aparece
    },
    {
      t: "Backend / Cybersecurity",
      n: { pt: "Secure Mail Gateway", en: "Secure Mail Gateway" },
      d: {
        pt: "Gateway de e-mail seguro em Python e FastAPI para mitigar vulnerabilidades em comunicações corporativas.",
        en: "Secure e-mail gateway in Python and FastAPI to mitigate vulnerabilities in corporate communications.",
      },
      tags: ["Python", "FastAPI", "AppSec", "E-mail"],
      url: "",
    },
    /* MOLDE para o próximo projeto: colocar uma vírgula depois do } acima, apagar os símbolos de comentário e trocar os textos.
        ,{
          t: "Categoria",
          n: "Nome real do projeto",
          d: {pt: "O problema, a solução e o resultado, em 1 ou 2 frases.", en: "The problem, the solution and the result, in 1–2 sentences."},
          tags: ["Python", "SQL"],
          url: "https://github.com/meu-usuario/meu-projeto"
        }
        */
  ],
  career: [
    [
      "2024 — Atual",
      "Desenvolvedor Backend",
      {
        pt: "Soluções server-side, APIs RESTful e automação de processos com Python e Java.",
        en: "Server-side solutions, RESTful APIs and process automation with Python and Java.",
      },
    ],
    [
      "2023 — Atual",
      "Segurança ofensiva e defensiva",
      {
        pt: "Laboratórios práticos em Hack The Box, TryHackMe, PortSwigger e Blue Team Labs.",
        en: "Hands-on labs on Hack The Box, TryHackMe, PortSwigger and Blue Team Labs.",
      },
    ],
    [
      "2022 — 2024",
      "Desenvolvedor Front-end",
      {
        pt: "Interfaces responsivas com foco em usabilidade e integração com serviços back-end.",
        en: "Responsive interfaces focused on usability and back-end integration.",
      },
    ],
  ],
  edu: [
    [
      "2025 — 2026",
      "Segurança Cibernética e Defesa Contra Ameaças",
      "UNOPAR · Pós-graduação",
    ],
    [
      "2025",
      "Ciência de Dados e Inteligência Artificial",
      "Anhanguera Educacional · Pós-graduação",
    ],
  ],
  certs: ["Web Fundamentals — TryHackMe"],
};
