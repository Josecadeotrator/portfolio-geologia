# Plano do Website — Araí Consultoria Geológica

**Profissional:** Yan Magalhães — Geólogo Consultor  
**CREA:** [00000-D/GO] ← preencher  
**Stack:** Next.js · Tailwind CSS · Three.js/R3F · MapLibre GL · Resend  
**Deploy:** Vercel  
**Status:** Planejamento — dummy data

---

## Identidade Visual

### Estilo
Híbrido: hero escuro e imersivo → seções de conteúdo em fundo claro.

| Zona | Tratamento |
|---|---|
| Hero | Foto fullscreen, overlay escuro, texto branco |
| Seções de conteúdo | Fundo off-white `#f5f4f0`, texto `#1a1a1a` |
| Seções de destaque | Fundo escuro alternado para ritmo visual |
| Cards | Brancos, sombra suave, cantos arredondados |

### Paleta — Toggle de tema no header (3 opções para decidir)

| Token | Verde Cerrado | Terracota / Óxido | Dourado / Arenito |
|---|---|---|---|
| `--color-primary` | `#3d5c2e` | `#8b4513` | `#c9963b` |
| `--color-primary-light` | `#6b8f4e` | `#c4622d` | `#e8c06e` |
| `--color-primary-dark` | `#1e2e16` | `#3d1f0a` | `#7a5820` |
| `--color-bg` | `#f5f4f0` | `#f5f2ef` | `#f7f4ee` |
| `--color-surface` | `#ffffff` | `#ffffff` | `#ffffff` |
| `--color-text` | `#1a1a1a` | `#1a1a1a` | `#1a1a1a` |

O toggle ficará no canto do header (visível apenas em dev/preview — remover antes de subir para produção).

### Tipografia (proposta)
- **Headings:** `Playfair Display` ou `Cormorant Garamond` — peso, elegância geológica
- **Body:** `Inter` ou `DM Sans` — legibilidade para público não técnico
- **Labels/caps:** `Barlow Condensed` — mapas, fichas técnicas

---

## Estrutura de Página (one page, scroll)

```
┌─────────────────────────────────────────────────────────┐
│  HEADER  (fixo, transparente → sólido ao scroll)        │
│  Logo/nome · Links âncora · Toggle paleta (dev) · CTA   │
├─────────────────────────────────────────────────────────┤
│  1. HERO                                                 │
│     Foto aérea fullscreen (Chapada dos Veadeiros)        │
│     Headline grande + subtítulo + botão "Fale comigo"   │
│     Tags flutuantes: Drone · Geo · Cerrado               │
├─────────────────────────────────────────────────────────┤
│  2. O QUE EU FAÇO                                        │
│     3 blocos orientados pelo problema do cliente:        │
│     ├── Regularize sua terra                             │
│     │   (georreferenciamento, topografia, INCRA/SEAPA)  │
│     ├── Conheça seu território do ar                    │
│     │   (aerolevantamento, ortomosaico, modelo 3D)      │
│     └── Cumpra a legislação ambiental                    │
│         (licenciamento ambiental, outorga hídrica)       │
├─────────────────────────────────────────────────────────┤
│  3. VISUALIZE OS DADOS  ← diferencial                   │
│     Modelo 3D interativo (Three.js placeholder)          │
│     Controles: rotacionar · zoom · camadas               │
│     Texto: "Este é um modelo real de [projeto X]"        │
├─────────────────────────────────────────────────────────┤
│  4. PROJETOS                                             │
│     Grid de cards: foto/ortomosaico + tag + descrição    │
│     Ordem: Cavalcante · Prefeitura · Seu Pedro ·         │
│             Ana · Seu Fernando                           │
├─────────────────────────────────────────────────────────┤
│  5. QUEM SOU EU                                          │
│     Foto + bio curta + contexto do nome Araí             │
│     CREA visível                                         │
├─────────────────────────────────────────────────────────┤
│  6. CONTATO                                              │
│     Formulário: nome · tipo de necessidade · mensagem   │
│     Envio via Resend → jholandabonomo@gmail.com (dev)    │
├─────────────────────────────────────────────────────────┤
│  FOOTER                                                  │
│     Nome · CREA · e-mail · redes (discretas)            │
└─────────────────────────────────────────────────────────┘
```

---

## Seções — Dummy Data

### 1. Hero
- **Headline:** "Conheça sua terra antes de qualquer decisão."
- **Subtítulo:** "Geólogo consultor no Cerrado e Chapada dos Veadeiros — aerolevantamento, georreferenciamento e análise ambiental."
- **CTA:** "Fale comigo" → ancora em #contato
- **Imagem:** placeholder Unsplash de paisagem aérea do cerrado
- **Tags:** `Drone` · `Georreferenciamento` · `Cerrado`

### 2. O que eu faço

| Bloco | Ícone | Título | Descrição curta |
|---|---|---|---|
| 1 | 📍 | Regularize sua terra | Georreferenciamento com precisão RTK para regularização fundiária no INCRA e SEAPA. |
| 2 | 🛸 | Conheça do ar | Aerolevantamento por drone: ortomosaico, modelo 3D e MDE da sua propriedade em dias. |
| 3 | 🌿 | Cumpra a legislação | Licenciamento ambiental e outorga hídrica — documentação técnica sem complicação. |

*(Ícones serão substituídos por SVG próprios ou Phosphor Icons)*

### 3. Visualize os dados
- Placeholder Three.js: terreno sintético com wireframe e textura de altitude
- Label sobreposto: "Modelo 3D de terreno — Chapada dos Veadeiros (dummy)"
- Controles: arrastar para rotacionar, scroll para zoom
- CTA abaixo: "Solicite a visualização do seu terreno"

### 4. Projetos — Cards

| # | Nome exibido | Tag | Narrativa curta |
|---|---|---|---|
| 1 | Cavalcante | Aerolevantamento · APP | Delimitação completa de APPs de serra e hidrografia em área de 800 ha na Chapada dos Veadeiros. |
| 2 | Prefeitura | Topografia · Antes/Depois | Levantamento topográfico base para terraplanagem e abertura de novo bairro. |
| 3 | Propriedade Rural — Pedro | Georreferenciamento · Hídrico | Fracionamento de glebas e cálculo de captação d'água por gravidade — sem bomba. |
| 4 | Propriedade Ana | Conservação · RPPN | Planejamento espacial integrado: áreas de conservação e uso produtivo na mesma propriedade. |
| 5 | Fernando | Outorga Hídrica | Documentação técnica para perfuração de poço — outorga aprovada. |

### 5. Quem sou eu
> "Sou Yan Magalhães, geólogo consultor com atuação no Cerrado e na Chapada dos Veadeiros. Trabalho com dados precisos para que proprietários rurais, organizações ambientais e construtores tomem decisões com segurança sobre a terra.
>
> O nome **Araí** vem da Formação Araí — unidade geológica que define a paisagem e a história do Nordeste Goiano. É o nome da pedra sob nossos pés.
>
> **CREA:** [00000-D/GO]"

### 6. Contato
- Campos: Nome · Tipo de necessidade (select: Georreferenciamento / Aerolevantamento / Licenciamento ambiental / Outorga hídrica / Outro) · Mensagem
- Botão: "Enviar mensagem"
- Destino: e-mail do profissional via Resend

---

## Referências Visuais

| Referência | O que aproveitar |
|---|---|
| Dolanan (viagem) | Layout de cards de projetos, espaçamento generoso, grid de destinos |
| Iceland Travel | Hero imersivo com overlay, seções com número grande, foto rotacionada nos cards |
| Flash Travel | Indicador de slide numerado (01/03), layout assimétrico |
| Mountain Travel | Alternância texto/foto nas seções, tipografia grande e séria |

---

## Componentes a Construir

| Componente | Prioridade | Notas |
|---|---|---|
| `ThemeToggle` | Alta | Alterna entre 3 paletas via CSS vars — só em dev |
| `Hero` | Alta | Fullscreen, parallax leve, CTA |
| `ServiceBlocks` | Alta | 3 blocos, ícone + título + texto |
| `Viewer3D` | Alta | Three.js placeholder de terreno |
| `ProjectCard` | Alta | Foto + tag + descrição + link |
| `ProjectGrid` | Alta | Grid responsivo dos 5 projetos |
| `AboutSection` | Média | Foto + bio + CREA |
| `ContactForm` | Média | Formulário + Resend |
| `Header` | Alta | Fixo, transparente → sólido |
| `Footer` | Baixa | Nome, CREA, e-mail |

---

## Próximos Passos

- [ ] Criar estrutura Next.js (`npx create-next-app@latest`)
- [ ] Configurar Tailwind com CSS vars para as 3 paletas
- [ ] Implementar `ThemeToggle` (dev only)
- [ ] Construir `Hero` com imagem placeholder
- [ ] Construir `ServiceBlocks`
- [ ] Construir `Viewer3D` com Three.js (placeholder de terreno)
- [ ] Construir `ProjectGrid` com dummy data
- [ ] Construir `AboutSection`
- [ ] Construir `ContactForm` + Resend
- [ ] Revisar paleta final → remover toggle
- [ ] Substituir imagens placeholder por assets reais
- [ ] Deploy no Vercel

---

## Assets Pendentes (do profissional)

| Item | Status |
|---|---|
| Modelos 3D simplificados (.obj, < 5 MB) | Pendente |
| Ortomosaicos das propriedades (GeoTIFF ou JPEG) | Pendente |
| Shapefiles → GeoJSON (hidrografia, APPs, glebas) | Pendente |
| Foto do profissional | Pendente |
| Registro pós-terraplanagem (Prefeitura) | A filmar |
| CREA completo | Pendente |
| E-mail de contato final | Pendente |
