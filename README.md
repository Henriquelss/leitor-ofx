# 📂 Leitor de Arquivos OFX (Processamento Soberano)

Um projeto React + TypeScript premium para decodificar, analisar e compilar de forma escalonável seus arquivos bancários `.ofx`. Construído com design responsivo, alto desempenho e cache local.

## 📸 Preview

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
            src="https://github.com/user-attachments/assets/eb4183b0-330b-478e-9a29-a5e66d76d9bb" 
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
            src="https://github.com/user-attachments/assets/10ab0a42-a0a5-496a-a2ef-0a40b341e6b4"
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
