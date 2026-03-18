# 📂 Leitor de Arquivos OFX (Processamento Soberano)

Um projeto React + TypeScript premium para decodificar, analisar e compilar de forma escalonável seus arquivos bancários `.ofx`. Construído com design responsivo, alto desempenho e cache local.

## 📸 Preview
<img width="1915" height="941" alt="Captura de tela 2026-03-18 124145" src="https://github.com/user-attachments/assets/79a4d8d9-5fba-467c-8bb0-701c1fe3fd42" />


<p align="center">
  <table>
    <tr>
      <td align="center">
        <div style="
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 10px 25px rgba(0,0,0,0.15);
          border: 1px solid #e5e7eb;
        ">
          <img 
            src="https://github.com/user-attachments/assets/57cbe232-f09f-47cd-923d-37cd4c44c010" 
            alt="Dashboard"
            width="420"
            height="260"
            style="object-fit: cover; display: block;"
          />
        </div>
        <sub><b>Dashboard de Transações</b></sub>
      </td>
      <td width="24"></td>
      <td align="center">
        <div style="
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 10px 25px rgba(0,0,0,0.15);
          border: 1px solid #e5e7eb;
        ">
          <img 
            src="https://github.com/user-attachments/assets/79a4d8d9-5fba-467c-8bb0-701c1fe3fd42"
            alt="Histórico"
            width="420"
            height="260"
            style="object-fit: cover; display: block;"
          />
        </div>
        <sub><b>Histórico Offline</b></sub>
      </td>
    </tr>
  </table>
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
