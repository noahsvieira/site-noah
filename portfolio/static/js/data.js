/** MEUS dados. Para adicionar projeto, certificado, serviço ou depoimento, mexer só neste arquivo. */

/** L(...) escreve um texto nos 7 idiomas, NESTA ordem: pt, en, es, fr, no, de, it. Texto simples (sem L) aparece igual em todos. */
const L = (pt, en, es, fr, no, de, it) => ({ pt, en, es, fr, no, de, it });
/** Período "2024 — Atual" nos 7 idiomas. */
const ate = a => L(a + " — Atual", a + " — Present", a + " — Actual", a + " — Aujourd’hui", a + " — Nå", a + " — Heute", a + " — Oggi");
/** "Instituição · Pós-graduação" nos 7 idiomas. */
const pos = n => L(n + " · Pós-graduação", n + " · Postgraduate", n + " · Posgrado", n + " · Post-graduation", n + " · Videreutdanning", n + " · Postgraduiertenstudium", n + " · Post-laurea");

export const DATA = {
     name: "Noah S. Vieira",
     available: true,        // true = mostra o aviso "Disponível para projetos"
     mail: "",               // só o endereço (ex.: nome@dominio.com). Vazio = o formulário de contato não aparece
     github: "https://github.com/noahsvieira", linkedin: "",   // links completos (https://...). Vazio = o link não aparece
     whatsapp: "",           // só números, com país e DDD (ex.: 5535999999999). Vazio = não aparece
     cv: { pt: "", en: "" },   // ex.: "/static/cv/cv-pt.pdf" (ponha os PDFs na pasta static/cv). Vazio = o botão não aparece
     certsNoPerfil: 18,      // quantos certificados você tem no perfil (aparece como "18 no perfil"); apague a linha se não quiser
     stack: ["REST API", "APPSEC", "DEV BACK-END", "CIBERSEGURANÇA", "AUTOMATION", "PYTHON", "JAVA", "FASTAPI", "SQL", "LINUX"],
     arsenal: [
          ["Backend", "Python · Java · FastAPI · APIs RESTful"],
          [L("Dados + IA", "Data + AI", "Datos + IA", "Données + IA", "Data + KI", "Daten + KI", "Dati + IA"),
          L("SQL · Ciência de Dados · Machine Learning", "SQL · Data Science · Machine Learning", "SQL · Ciencia de Datos · Machine Learning", "SQL · Science des données · Machine Learning", "SQL · Datavitenskap · Maskinlæring", "SQL · Data Science · Machine Learning", "SQL · Data Science · Machine Learning")],
          [L("Segurança", "Security", "Seguridad", "Sécurité", "Sikkerhet", "Sicherheit", "Sicurezza"), "Pentest · SOC · Active Directory · OWASP"],
          [L("Sistemas", "Systems", "Sistemas", "Systèmes", "Systemer", "Systeme", "Sistemi"),
          L("Linux · Git · Automação · Redes", "Linux · Git · Automation · Networking", "Linux · Git · Automatización · Redes", "Linux · Git · Automatisation · Réseaux", "Linux · Git · Automatisering · Nettverk", "Linux · Git · Automatisierung · Netzwerke", "Linux · Git · Automazione · Reti")]
     ],

     /* PROJETOS. Campos opcionais p (problema), s (solução) e r (resultado) aparecem como 3 linhas no cartão. */
     projects: [
          {
               t: L("Backend / Integrações", "Backend / Integrations", "Backend / Integraciones", "Backend / Intégrations", "Backend / Integrasjoner", "Backend / Integrationen", "Backend / Integrazioni"),
               n: L("API de Recarga e Pagamentos", "Top-up & Payments API", "API de Recargas y Pagos", "API de recharge et de paiements", "API for påfyll og betalinger", "API für Aufladungen und Zahlungen", "API per ricariche e pagamenti"),
               d: L("API REST em Python e FastAPI a partir de uma demanda real, reproduzindo um cenário de integração para recarga de celular e pagamento de contas.",
                    "REST API in Python and FastAPI built from a real request, reproducing an integration scenario for mobile top-up and bill payments.",
                    "API REST en Python y FastAPI creada a partir de una demanda real, que reproduce un escenario de integración para recargas móviles y pago de cuentas.",
                    "API REST en Python et FastAPI conçue à partir d’une demande réelle, reproduisant un scénario d’intégration pour la recharge mobile et le paiement de factures.",
                    "REST-API i Python og FastAPI bygget ut fra et reelt behov, som gjenskaper et integrasjonsscenario for mobilpåfyll og regningsbetaling.",
                    "REST-API in Python und FastAPI, entstanden aus einer realen Anfrage, die ein Integrationsszenario für Handy-Aufladung und Rechnungszahlung nachbildet.",
                    "API REST in Python e FastAPI nata da una richiesta reale, che riproduce uno scenario di integrazione per ricariche telefoniche e pagamento di bollette."),
               tags: ["Python", "FastAPI", "REST", L("Integrações", "Integrations", "Integraciones", "Intégrations", "Integrasjoner", "Integrationen", "Integrazioni")],
               url: ""   // link do repositório no GitHub; vazio = o botão "ver código" não aparece
          },
          {
               t: "Backend / Cybersecurity",
               n: "Secure Mail Gateway",
               d: L("Gateway de e-mail seguro em Python e FastAPI para mitigar vulnerabilidades em comunicações corporativas.",
                    "Secure e-mail gateway in Python and FastAPI to mitigate vulnerabilities in corporate communications.",
                    "Gateway de correo seguro en Python y FastAPI para mitigar vulnerabilidades en comunicaciones corporativas.",
                    "Passerelle e-mail sécurisée en Python et FastAPI pour atténuer les vulnérabilités des communications d’entreprise.",
                    "Sikker e-postgateway i Python og FastAPI for å redusere sårbarheter i bedriftskommunikasjon.",
                    "Sicheres E-Mail-Gateway in Python und FastAPI zur Minderung von Schwachstellen in der Unternehmenskommunikation.",
                    "Gateway e-mail sicuro in Python e FastAPI per ridurre le vulnerabilità nelle comunicazioni aziendali."),
               tags: ["Python", "FastAPI", "AppSec", "E-mail"],
               url: ""
          },
          {
               t: L("Frontend / Usabilidade", "Frontend / Usability", "Frontend / Usabilidad", "Frontend / Utilisabilité", "Frontend / Brukervennlighet", "Frontend / Benutzerfreundlichkeit", "Frontend / Usabilità"),
               n: L("Menu Responsivo", "Responsive Menu", "Menú Responsivo", "Menu responsive", "Responsiv meny", "Responsives Menü", "Menu responsivo"),
               d: L("Interface responsiva de menu construída com estrutura simples, foco em usabilidade e integração visual.",
                    "Responsive menu interface built with a simple structure, focused on usability and visual integration.",
                    "Interfaz de menú responsiva construida con estructura simple, centrada en la usabilidad y la integración visual.",
                    "Interface de menu responsive construite avec une structure simple, axée sur l’utilisabilité et l’intégration visuelle.",
                    "Responsivt menygrensesnitt bygget med enkel struktur, med fokus på brukervennlighet og visuell integrasjon.",
                    "Responsive Menüoberfläche mit einfacher Struktur, Fokus auf Benutzerfreundlichkeit und visuelle Integration.",
                    "Interfaccia di menu responsive con struttura semplice, focalizzata su usabilità e integrazione visiva."),
               tags: ["JavaScript", "HTML", "UX Focus", L("Responsivo", "Responsive", "Responsivo", "Responsive", "Responsiv", "Responsiv", "Responsive")],
               url: ""
          },
          /* Os 3 projetos abaixo são de clientes. As descrições são PROVISÓRIAS (só o que o nome permite afirmar):
             trocar quando os repositórios tiverem README. Se o repositório ainda for privado, o link dá erro 404 para o visitante:
             nesse caso deixar url: "" até publicar.*/
          {
               t: L("Frontend / Sites", "Frontend / Websites", "Frontend / Sitios web", "Frontend / Sites web", "Frontend / Nettsteder", "Frontend / Websites", "Frontend / Siti web"),
               n: "Site Marketing",
               d: L("Site de marketing desenvolvido para um cliente.", "Marketing website developed for a client.", "Sitio web de marketing desarrollado para un cliente.",
                    "Site web de marketing développé pour un client.", "Markedsføringsnettsted utviklet for en kunde.", "Marketing-Website, für einen Kunden entwickelt.", "Sito di marketing sviluppato per un cliente."),
               tags: ["Web", L("Cliente", "Client", "Cliente", "Client", "Kunde", "Kunde", "Cliente")],
               url: "https://github.com/noahsvieira/Site-Marketing-Ingrid-Didier"
          },
          {
               t: L("Frontend / Sites", "Frontend / Websites", "Frontend / Sitios web", "Frontend / Sites web", "Frontend / Nettsteder", "Frontend / Websites", "Frontend / Siti web"),
               n: "Site Hotel Fazenda",
               d: L("Site desenvolvido para um hotel fazenda.", "Website developed for a farm hotel.", "Sitio web desarrollado para un hotel rural.",
                    "Site web développé pour un hôtel de campagne.", "Nettsted utviklet for et gårdshotell.", "Website, für ein Landhotel entwickelt.", "Sito web sviluppato per un hotel in fattoria."),
               tags: ["Web", L("Cliente", "Client", "Cliente", "Client", "Kunde", "Kunde", "Cliente")],
               url: "https://github.com/noahsvieira/Hotel-Fazenda"
          },
          {
               t: L("Frontend / Sites", "Frontend / Websites", "Frontend / Sitios web", "Frontend / Sites web", "Frontend / Nettsteder", "Frontend / Websites", "Frontend / Siti web"),
               n: L("Site de Fisioterapia", "Physiotherapy Website", "Sitio web de Fisioterapia", "Site web de kinésithérapie", "Nettsted for fysioterapi", "Physiotherapie-Website", "Sito di fisioterapia"),
               d: L("Site desenvolvido para serviços de fisioterapia.", "Website developed for physiotherapy services.", "Sitio web desarrollado para servicios de fisioterapia.",
                    "Site web développé pour des services de kinésithérapie.", "Nettsted utviklet for fysioterapitjenester.", "Website, für Physiotherapie-Leistungen entwickelt.", "Sito web sviluppato per servizi di fisioterapia."),
               tags: ["Web", L("Cliente", "Client", "Cliente", "Client", "Kunde", "Kunde", "Cliente")],
               url: "https://github.com/noahsvieira/Fisioterapia-site"
          }
          /* MOLDE de projeto completo (ponha uma vírgula depois do } acima e apagar os símbolos de comentário):
          ,{
            t: "Categoria",
            n: "Nome real do projeto",
            d: {pt: "Resumo em uma frase.", en: "One-sentence summary."},
            p: {pt: "Qual era o problema.", en: "What the problem was."},
            s: {pt: "O que você construiu e como.", en: "What you built and how."},
            r: {pt: "O resultado, de preferência com um número.", en: "The result, ideally with a number."},
            tags: ["Python", "SQL"],
            url: "https://github.com/seu-usuario/seu-projeto"
          }
          */
     ],

     /* SERVIÇOS (para clientes freelancer). Ajuste ao que realmente oferece. */
     services: [
          {
               n: L("APIs e backend", "APIs and backend", "APIs y backend", "API et backend", "API-er og backend", "APIs und Backend", "API e backend"),
               d: L("APIs REST em Python (FastAPI) com validação de dados, autenticação e testes automatizados.",
                    "REST APIs in Python (FastAPI) with data validation, authentication and automated tests.",
                    "APIs REST en Python (FastAPI) con validación de datos, autenticación y pruebas automatizadas.",
                    "API REST en Python (FastAPI) avec validation des données, authentification et tests automatisés.",
                    "REST-API-er i Python (FastAPI) med datavalidering, autentisering og automatiserte tester.",
                    "REST-APIs in Python (FastAPI) mit Datenvalidierung, Authentifizierung und automatisierten Tests.",
                    "API REST in Python (FastAPI) con validazione dei dati, autenticazione e test automatici.")
          },
          {
               n: L("Integração entre sistemas", "System integration", "Integración de sistemas", "Intégration de systèmes", "Systemintegrasjon", "Systemintegration", "Integrazione di sistemi"),
               d: L("Conexão com serviços e APIs de terceiros, com tratamento de erros, logs e novas tentativas.",
                    "Integration with third-party services and APIs, with error handling, logging and retries.",
                    "Integración con servicios y APIs de terceros, con manejo de errores, logs y reintentos.",
                    "Connexion à des services et API tiers, avec gestion des erreurs, journaux et nouvelles tentatives.",
                    "Integrasjon med tredjepartstjenester og API-er, med feilhåndtering, logging og nye forsøk.",
                    "Anbindung an Drittdienste und APIs, mit Fehlerbehandlung, Logging und Wiederholungen.",
                    "Integrazione con servizi e API di terze parti, con gestione degli errori, log e nuovi tentativi.")
          },
          {
               n: L("Revisão de segurança", "Security review", "Revisión de seguridad", "Revue de sécurité", "Sikkerhetsgjennomgang", "Sicherheitsprüfung", "Revisione della sicurezza"),
               d: L("Análise de APIs e aplicações web com base no OWASP, com achados claros e correções priorizadas.",
                    "Review of APIs and web apps based on OWASP, with clear findings and prioritized fixes.",
                    "Revisión de APIs y aplicaciones web según OWASP, con hallazgos claros y correcciones priorizadas.",
                    "Analyse d’API et d’applications web selon l’OWASP, avec des constats clairs et des correctifs priorisés.",
                    "Gjennomgang av API-er og webapper basert på OWASP, med tydelige funn og prioriterte tiltak.",
                    "Prüfung von APIs und Web-Apps nach OWASP, mit klaren Befunden und priorisierten Korrekturen.",
                    "Analisi di API e applicazioni web basata su OWASP, con risultati chiari e correzioni prioritarie.")
          }
     ],

     /* "COMO ESTE SITE É PROTEGIDO". Só aparecem os itens com ativo: true.*/
       
     security: [
          {
               ativo: true,
               n: L("Política de segurança de conteúdo (CSP)", "Content Security Policy (CSP)", "Política de seguridad de contenido (CSP)", "Politique de sécurité du contenu (CSP)", "Innholdssikkerhetspolicy (CSP)", "Content Security Policy (CSP)", "Content Security Policy (CSP)"),
               d: L("O navegador só executa scripts e estilos do próprio site, o que limita a injeção de código.",
                    "The browser only runs scripts and styles from this site, which limits code injection.",
                    "El navegador solo ejecuta scripts y estilos de este sitio, lo que limita la inyección de código.",
                    "Le navigateur n’exécute que les scripts et styles de ce site, ce qui limite l’injection de code.",
                    "Nettleseren kjører bare skript og stiler fra dette nettstedet, noe som begrenser kodeinjeksjon.",
                    "Der Browser führt nur Skripte und Stile dieser Website aus, was Code-Einschleusung einschränkt.",
                    "Il browser esegue solo script e stili di questo sito, il che limita l’iniezione di codice.")
          },
          {
               ativo: true,
               n: L("Cabeçalhos HTTP de proteção", "Protective HTTP headers", "Cabeceras HTTP de protección", "En-têtes HTTP de protection", "Beskyttende HTTP-hoder", "Schützende HTTP-Header", "Intestazioni HTTP di protezione"),
               d: L("Reduzem o risco de clickjacking, de adivinhação do tipo de arquivo e de vazamento da página de origem.",
                    "Reduce the risk of clickjacking, content-type sniffing and referrer leaks.",
                    "Reducen el riesgo de clickjacking, de adivinación del tipo de archivo y de fuga de la página de origen.",
                    "Réduisent le risque de clickjacking, de devinette du type de contenu et de fuite du référent.",
                    "Reduserer risikoen for clickjacking, gjetting av innholdstype og lekkasje av referanse.",
                    "Verringern das Risiko von Clickjacking, Content-Type-Sniffing und Referrer-Leaks.",
                    "Riducono il rischio di clickjacking, di indovinamento del tipo di file e di fuga del referrer.")
          },
          {
               ativo: true,
               n: L("Texto sempre tratado como texto", "Text is always treated as text", "El texto siempre se trata como texto", "Le texte reste toujours du texte", "Tekst behandles alltid som tekst", "Text bleibt immer Text", "Il testo resta sempre testo"),
               d: L("Nenhum conteúdo é inserido como HTML, o que reduz o risco de ataques XSS.",
                    "No content is inserted as HTML, which reduces the risk of XSS attacks.",
                    "Ningún contenido se inserta como HTML, lo que reduce el riesgo de ataques XSS.",
                    "Aucun contenu n’est inséré comme HTML, ce qui réduit le risque d’attaques XSS.",
                    "Ingen innhold settes inn som HTML, noe som reduserer risikoen for XSS-angrep.",
                    "Kein Inhalt wird als HTML eingefügt, was das Risiko von XSS-Angriffen verringert.",
                    "Nessun contenuto viene inserito come HTML, riducendo il rischio di attacchi XSS.")
          },
          {
               ativo: true,
               n: L("Terminal com lista fechada de comandos", "Terminal with a closed command list", "Terminal con lista cerrada de comandos", "Terminal à liste fermée de commandes", "Terminal med lukket kommandoliste", "Terminal mit geschlossener Befehlsliste", "Terminale con elenco chiuso di comandi"),
               d: L("Só os comandos previstos executam; nada digitado é interpretado como código.",
                    "Only the planned commands run; nothing typed is interpreted as code.",
                    "Solo se ejecutan los comandos previstos; nada de lo escrito se interpreta como código.",
                    "Seules les commandes prévues s’exécutent ; rien de ce qui est saisi n’est interprété comme du code.",
                    "Bare planlagte kommandoer kjøres; ingenting som skrives tolkes som kode.",
                    "Nur vorgesehene Befehle laufen; nichts Eingegebenes wird als Code interpretiert.",
                    "Vengono eseguiti solo i comandi previsti; nulla di ciò che si digita è interpretato come codice.")
          },
          {
               ativo: true,
               n: L("Testes automatizados", "Automated tests", "Pruebas automatizadas", "Tests automatisés", "Automatiserte tester", "Automatisierte Tests", "Test automatici"),
               d: L("Testes com pytest conferem os cabeçalhos de segurança e a ausência de código embutido na página.",
                    "pytest tests check the security headers and that the page has no inline code.",
                    "Pruebas con pytest verifican las cabeceras de seguridad y la ausencia de código incrustado.",
                    "Des tests pytest vérifient les en-têtes de sécurité et l’absence de code intégré dans la page.",
                    "pytest-tester kontrollerer sikkerhetshodene og at siden ikke har innebygd kode.",
                    "pytest-Tests prüfen die Sicherheits-Header und dass die Seite keinen eingebetteten Code enthält.",
                    "I test pytest verificano le intestazioni di sicurezza e l’assenza di codice incorporato nella pagina.")
          }
     ],

     /* DEPOIMENTOS. Lista vazia = a seção não aparece. 
     testimonials: [
       {q: {pt: "O que a pessoa disse.", en: "What the person said."}, n: "Nome da pessoa", r: "Cargo, Empresa"}
     ], */
     testimonials: [],

     career: [
          [ate("2024"), L("Desenvolvedor Backend", "Backend Developer", "Desarrollador Backend", "Développeur Backend", "Backend-utvikler", "Backend-Entwickler", "Sviluppatore Backend"),
          L("Soluções server-side, APIs RESTful e automação de processos com Python e Java.", "Server-side solutions, RESTful APIs and process automation with Python and Java.", "Soluciones del lado del servidor, APIs RESTful y automatización de procesos con Python y Java.", "Solutions côté serveur, API RESTful et automatisation de processus avec Python et Java.", "Serversideløsninger, RESTful API-er og prosessautomatisering med Python og Java.", "Serverseitige Lösungen, RESTful-APIs und Prozessautomatisierung mit Python und Java.", "Soluzioni lato server, API RESTful e automazione dei processi con Python e Java.")],
          [ate("2023"), L("Segurança ofensiva e defensiva", "Offensive and defensive security", "Seguridad ofensiva y defensiva", "Sécurité offensive et défensive", "Offensiv og defensiv sikkerhet", "Offensive und defensive Sicherheit", "Sicurezza offensiva e difensiva"),
          L("Laboratórios práticos em Hack The Box, TryHackMe, PortSwigger e Blue Team Labs.", "Hands-on labs on Hack The Box, TryHackMe, PortSwigger and Blue Team Labs.", "Laboratorios prácticos en Hack The Box, TryHackMe, PortSwigger y Blue Team Labs.", "Laboratoires pratiques sur Hack The Box, TryHackMe, PortSwigger et Blue Team Labs.", "Praktiske labber på Hack The Box, TryHackMe, PortSwigger og Blue Team Labs.", "Praktische Labs auf Hack The Box, TryHackMe, PortSwigger und Blue Team Labs.", "Laboratori pratici su Hack The Box, TryHackMe, PortSwigger e Blue Team Labs.")],
          ["2022 — 2024", L("Desenvolvedor Front-end", "Front-end Developer", "Desarrollador Front-end", "Développeur Front-end", "Frontend-utvikler", "Frontend-Entwickler", "Sviluppatore Front-end"),
               L("Interfaces responsivas com foco em usabilidade e integração com serviços back-end.", "Responsive interfaces focused on usability and back-end integration.", "Interfaces responsivas centradas en la usabilidad y la integración con servicios back-end.", "Interfaces responsives axées sur l’utilisabilité et l’intégration avec des services back-end.", "Responsive grensesnitt med fokus på brukervennlighet og integrasjon med backend-tjenester.", "Responsive Oberflächen mit Fokus auf Benutzerfreundlichkeit und Anbindung an Backend-Dienste.", "Interfacce responsive incentrate sull’usabilità e sull’integrazione con servizi back-end.")]
     ],
     edu: [
          ["2025 — 2026", L("Segurança Cibernética e Defesa Contra Ameaças", "Cybersecurity and Threat Defense", "Seguridad Cibernética y Defensa contra Amenazas", "Cybersécurité et défense contre les menaces", "Cybersikkerhet og forsvar mot trusler", "Cybersicherheit und Bedrohungsabwehr", "Cybersicurezza e difesa dalle minacce"), pos("UNOPAR")],
          ["2025", L("Ciência de Dados e Inteligência Artificial", "Data Science and Artificial Intelligence", "Ciencia de Datos e Inteligencia Artificial", "Science des données et intelligence artificielle", "Datavitenskap og kunstig intelligens", "Datenwissenschaft und Künstliche Intelligenz", "Scienza dei dati e intelligenza artificiale"), pos("Anhanguera Educacional")]
     ],

     /* CERTIFICADOS: n = nome, url = link de verificação (vazio = sem o link "verificar") */
     certs: [
          { n: "Web Fundamentals · TryHackMe", url: "" },
          { n: "Jr Penetration Tester · TryHackMe", url: "" }
     ]
};