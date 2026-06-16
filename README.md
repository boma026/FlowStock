📦 FlowStock - Frontend (Interface Web)
Next.js React TailwindCSS GitHub Actions

O FlowStock é um sistema moderno de gestão de estoque. Este repositório contém a interface web da aplicação, construída com foco na usabilidade, performance e experiência do usuário.

✨ Funcionalidades
Painel de Gestão: Interfaces dedicadas para controle de Categorias, Produtos e Movimentações.
Consumo de API: Integração completa com o backend para operações de CRUD.
Dark Mode: Suporte nativo a tema claro e escuro.
Design Responsivo: Interface limpa e acessível utilizando a biblioteca shadcn/ui.
⚙️ Automação e CI/CD (GitHub Actions)
Este projeto utiliza GitHub Actions para garantir a qualidade contínua do código. Os workflows configurados realizam verificações automáticas a cada Push ou Pull Request, garantindo que a aplicação sempre esteja pronta para o desenvolvimento.

🚀 Como executar o projeto localmente
Pré-requisitos
Node.js (versão 22 recomendada)
Git
API do Backend do FlowStock rodando localmente.
Passo a passo
Clone o repositório na sua máquina:
git clone (https://github.com/SEU_USUARIO/flowstock-frontend.git)
cd flowstock-frontend
Configure as variáveis de ambiente: Copie o arquivo de exemplo e crie o seu próprio arquivo .env (ou .env.local).
cp .env.example .env
Nota: O arquivo .env.example já possui os valores padrão para desenvolvimento (http://localhost:5000).
Instale as dependências do projeto:
npm install
Inicie o servidor de desenvolvimento:

npm run dev
Tudo pronto! Abra o seu navegador e acesse: http://localhost:3000