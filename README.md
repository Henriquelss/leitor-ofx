# 📂 Leitor de Arquivos OFX (Processamento Soberano)

Um projeto React + TypeScript premium para decodificar, analisar e compilar de forma escalonável seus arquivos bancários `.ofx`. Construído com design responsivo, alto desempenho e cache local.

## 📸 Preview

<p align="center">
  <img 
    src="https://github.com/user-attachments/assets/eb4183b0-330b-478e-9a29-a5e66d76d9bb" 
    alt="Preview do projeto" 
    width="900"
  />
</p>

[![GitHub Pages Deploy](https://img.shields.io/github/deployments/henriquelss/consulta-veicular-fipe/github-pages?label=deploy)](https://henriquelss.github.io/leitor-ofx/)

---

## ✨ Novas Funcionalidades (v2.0)

- **Upload via Drag and Drop** de arquivos `.ofx`
- **Análise Inteligente de Metadados:** Conversão do conteúdo bruto usando um Parseador Regex Nativo imune a falhas de `xml2js`
- **Categorização Automática:** Atribuição dinâmica de tags coloridas (Alimentação, Transporte, Receitas, etc.) baseada em palavras-chave do extrato
- **Engine Matemático Inteligente:** Resumo global das transações num Dashboard calculado usando Hooks (`useMemo`) com altíssima performance
- **Histórico Offline:** Abas de navegação com persistência em `LocalStorage`, permitindo revisitar dados já processados

---

## 🛠️ Arquitetura e Tecnologias

A aplicação segue o modelo estruturado de **Feature-Based Architecture**, projetada para escalar de forma modular:

| Componente              | Tecnologias & Escolhas Arquiteturais                                      |
|------------------------|---------------------------------------------------------------------------|
| **Core & UI Library**  | React.js 18 (Hooks, Context) + Vite.js                                    |
| **Tipagem**            | TypeScript (Strict Mode)                                                  |
| **Design System**      | Tailwind CSS v4 + JetBrains Mono                                          |
| **Parsing**            | Regex puro (client-side, sem libs externas)                               |

---

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
