# Araí — Site institucional

Site cartão de visita para consultor geólogo autônomo. O nome **Araí** é referência à Formação Araí, unidade geológica da região de atuação.

---

## O negócio

**Profissional:** Geólogo consultor, trabalha solo com contratações pontuais conforme demanda.

**Região de atuação:** Cerrado, APA do Pouso Alto, Nordeste Goiano — área de alto interesse ecológico e econômico.

**Como chegam os clientes:** Boca a boca, eventos e relações locais. Cidade pequena. O site não é canal de aquisição em escala — funciona como cartão de visita digital robusto que evidencia qualidade técnica.

---

## Serviços

| Serviço | Prioridade |
|---|---|
| Aerolevantamento via drone | Alta |
| Georreferenciamento ("geo") | Alta |
| Topografia | — |
| Mapeamento geológico de superfície | — |
| Geoprocessamento | — |
| Licenciamento ambiental | — |
| Outorga de uso de recursos hídricos | — |

Os dois serviços prioritários (aerolevantamento e georreferenciamento) devem ter destaque visual e narrativo sobre os demais.

---

## Público-alvo

- Proprietários de terras rurais
- Organizações ambientais
- Corretores do ramo imobiliário rural

O público é majoritariamente não técnico. A linguagem do site deve ser simples, direta e orientada pelo problema do cliente — não pela nomenclatura técnica.

---

## Ferramentas e tecnologia do profissional

- **Agisoft Metashape** — processamento de dados de drone (nuvem de pontos, ortomosaico, modelos 3D)
- **Global Mapper + QGIS** — geoprocessamento e análise espacial
- **Estação RTK de alta precisão** — levantamentos para regularização fundiária (INCRA, SEAPA)
- Domínio de legislação ambiental e normativos de outorga hídrica
- Formatos de saída de trabalho: `.obj`, `.GeoTIFF`, `.shp`, entre outros

---

## Objetivo do site

Captar leads qualificados via e-mail. Evidenciar a qualidade técnica com exemplos visuais reais e interativos.

**Contato:** e-mail (único canal intencional — sem WhatsApp).

**Redes sociais:** existem, mas não são foco desta versão do site.

---

## Tom e identidade

- Visual moderno
- Linguagem simples e acessível
- O nome Araí carrega peso geológico e territorial — pode ser explorado na identidade visual e nos textos
- Uma página só, com scroll — direto ao ponto, sem navegação complexa

---

## Estrutura de conteúdo planejada

```
Hero
  └── Tagline + visual imersivo (ortomosaico ou modelo 3D ao fundo)
  └── CTA único: "Fale comigo" → ancora no formulário

O que eu faço
  └── Três blocos orientados pelo problema do cliente:
      ├── Regularize sua terra        (georreferenciamento, topografia)
      ├── Conheça seu território do ar (aerolevantamento, mapeamento, geoprocessamento)
      └── Cumpra a legislação ambiental (licenciamento, outorga hídrica)

Visualize os dados  ← diferencial do site
  └── Modelo 3D interativo (.obj real de um projeto)
  └── Mapa interativo com camadas (curvas de nível, hidrografia, limites)

Projetos
  └── Cards: foto/ortomosaico + localização + descrição em uma linha

Quem sou eu
  └── Foto + texto curto + contexto do nome Araí e da região

Contato
  └── Formulário: nome, tipo de necessidade, mensagem, e-mail
```

---

## Stack técnica proposta

| Camada | Tecnologia |
|---|---|
| Framework | Next.js |
| Estilo | Tailwind CSS |
| Modelos 3D | Three.js / React Three Fiber |
| Mapas e dados geoespaciais | MapLibre GL ou Deck.gl |
| Formulário / e-mail | Resend ou Formspree |
| Deploy | Vercel |

### Por que essa stack

- **Next.js** gera páginas estáticas — rápido, sem servidor, fácil de manter
- **Three.js** renderiza arquivos `.obj` diretamente no browser via WebGL, com interação por toque no celular
- **MapLibre GL** exibe GeoTIFF, shapefiles e GeoJSON com camadas interativas — o usuário liga/desliga curvas de nível, hidrografia, limites de área
- **Vercel** tem plano gratuito suficiente para o volume esperado e integra nativamente com Next.js

### Sobre os arquivos geoespaciais na web

Arquivos `.obj` de alta resolução podem ter centenas de MB — inviável para web. A solução é exportar versões simplificadas do Metashape para visualização. Shapefiles são convertidos para GeoJSON para uso no browser. GeoTIFFs grandes podem usar o formato COG (Cloud Optimized GeoTIFF). Tudo isso será calibrado com arquivos reais em fase de prototipagem.

---

## Próximos passos

- [ ] Listar projetos do portfólio a exibir (conteúdo das seções 3 e 4)
- [ ] Definir referências visuais
- [ ] Testar visualização com arquivos reais (`.obj`, `.shp`, GeoTIFF)
- [ ] Iniciar estrutura do projeto Next.js
