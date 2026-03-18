# 📂 Leitor de Arquivos OFX (Processamento Soberano)

Um projeto React + TypeScript premium para decodificar, analisar e compilar de forma escalonável seus arquivos bancários `.ofx`. Construído com design responsivo, alto desempenho e cache local.

![image](<img width="1413" height="882" alt="Captura de tela 2026-03-18 122656" src="https://github.com/user-attachments/assets/eb4183b0-330b-478e-9a29-a5e66d76d9bb" />)

[![GitHub Pages Deploy](https://img.shields.io/github/deployments/henriquelss/consulta-veicular-fipe/github-pages?label=deploy)](https://henriquelss.github.io/leitor-ofx/)


## ✨ Novas Funcionalidades (v2.0)

- **Upload via Drag and Drop** de arquivos `.ofx`.
- **Análise Inteligente de Metadados:** Conversão do conteúdo bruto usando um Parseador Regex Nativo imune a falhas de `xml2js`.
- **Categorização Automática:** Atribuição dinâmica de tags coloridas (Alimentação, Transporte, Receitas, etc.) baseada em palavras-chave do extrato.
- **Engine Matemático Inteligente:** Resumo global das transações num Dashboard calculado usando Hooks (`useMemo`) com altíssima performance.
- **Histórico Offline:** Abas de navegação injetando a tecnologia de gravação no `LocalStorage`, permitindo revisitar todos os os pacotes parseados no passado diretamente na interface (feita com arquitetura Feature-based).


## 🛠️ Arquitetura e Tecnologias

A aplicação segue fielmente o modelo estruturado de **Feature-Based Architecture**, projetada para crescer infinitamente de forma independente:

| Componente              | Tecnologias & Escolhas Arquiteturais                                      |
|-------------------------|---------------------------------------------------------------------------|
| **Core & UI Library**   | React.js 18 (Hooks, Context) + Vite.js                                    |
| **Tipagem Criteriosa**  | TypeScript Strict Mode                                                    |
| **Design System**       | Tailwind CSS v4 para estilização com JetBrains Mono para tipografia técnica |
| **Parsing Seguro**      | Extrator assíncrono RegExp puro 100% Client-Side.                        |


## 🚀 Como Executar Localmente

### 1. Clone o repositório

```bash
git clone https://github.com/Henriquelss/leitor-ofx.git
cd leitor-ofx
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Inicie o Servidor Vite

```bash
npm run dev
```

Acesse em seu navegador navegando até: `http://localhost:5173`.


## 📂 Estrutura de Pastas

```text
src/
├── components/          # Fragmentos de Layout reutilizáveis (Header, Footer)
├── features/            # Feature-Based Modules (tudo sobre Transações está isolado)
│   └── transactions/
│       ├── components/  # Telas e UI da funcionalidade de extração
│       ├── types/       # Modelagem TS das Entidades 
│       └── utils/       # Engine do Parser Lexical do Bancário
├── hooks/               # State Controllers como useHistory (Cache)
├── pages/               # Agregação de views (Dashboard, History)
└── utils/               # Formatadores globais (Preços, Datas em pt-BR)
```
