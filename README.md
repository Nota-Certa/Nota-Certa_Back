# Nota Certa

### Sistema de Gerenciamento de Notas Fiscais B2B

![Licença](https://img.shields.io/badge/license-MIT-blue)

O projeto **Nota Certa** é um sistema completo para geração e gerenciamento de notas fiscais B2B, desenvolvido para empresas e pequenos empreendedores que buscam uma solução eficiente, centralizada e automatizada para o seu fluxo de trabalho fiscal.

---

## Índice

* [Sobre o Projeto](#sobre-o-projeto)
* [Funcionalidades Principais](#funcionalidades-principais)
* [Modelo de Negócio](#modelo-de-negócio)
* [Tecnologias Utilizadas](#tecnologias-utilizadas)
* [Arquitetura de Microserviços](#arquitetura-de-microserviços)
* [Como Executar o Projeto](#como-executar-o-projeto)
* [Equipe](#equipe)
* [Licença](#licença)

---

## Sobre o Projeto

O Nota Certa nasceu da necessidade de otimizar o processo de emissão e controle de notas fiscais eletrônicas no ambiente corporativo B2B. Muitas empresas enfrentam dificuldades com processos manuais, múltiplos sistemas e planilhas, resultando em falta de controle, insegurança e ineficiência.

Nossa solução preenche essa lacuna, oferecendo uma plataforma segura, confiável e automatizada para gerenciar o ciclo completo de documentos fiscais. Com o Nota Certa, empresas podem gerar, consultar e acompanhar notas fiscais emitidas para seus clientes, utilizando dashboards informativos, alertas e um histórico centralizado.

🔗 **[Acesse os Wireframes no Figma](https://www.figma.com/design/mEtesM44dH4aDlXLsirp0t/SaS-WEB?node-id=0-1&p=f&t=pPcIjZNHGk1KZkbB-0)**

---

## Funcionalidades Principais

A versão atual do projeto entrega as seguintes funcionalidades no plano **Freemium**:

* ✔️ **Emissão de Notas:** Emissão de até 10 notas fiscais por mês (atualmente simuladas via JSON).
* 👤 **Cadastro de Clientes:** Gerenciamento de clientes finais (pessoas físicas e jurídicas).
* 📄 **Geração de Faturas:** Criação de faturas detalhadas com itens, valores, datas e condições de pagamento.
* 🔍 **Busca e Filtros:** Consulta avançada de notas por período, número ou documento do cliente.
* 📊 **Acompanhamento de Status:** Monitore o status das notas (pendente, paga, cancelada).
* 📈 **Dashboard de Indicadores:** Visualize métricas e indicadores chave sobre seu faturamento e emissões.
* 📤 **Exportação:** Exporte os dados das notas em formato JSON.

Plano **Básico**:
* ✔️ **Funcionalidades do Freemium:** Todas as funcionalidades do plano Freemium.
* 📄 **Limite de notas aumentado:** Emissão de até 100 notas fiscais por mês.
* 📤 **Exportação:** Exporte os dados das notas em formato XML, além do padrão em JSON.

Plano **Premium**:
* ✔️ **Funcionalidades do Básico:** Todas as funcionalidades do plano Básico.
* 📄 **Limite de notas aumentado:** Emissão de até 500 notas fiscais por mês.
* 📤 **Exportação:** Exporte os dados das notas em formato CSV e PDF, além das padrões XML e JSON.

#### Funcionalidades Futuras (Planos Pagos)
* **Notificações:** Alertas por e-mail e webhooks (funcionalidade aspiracional).
* **Integração Real:** Emissão de notas fiscais reais via integração com prefeituras ou serviços de API fiscal (funcionalidade aspiracional).

---

## Modelo de Negócio

O sistema opera num modelo de assinatura mensal com três níveis de plano:

| Plano     | Notas/mês | Limite de Funcionários | Preço     |
| :-------- | :-------- | :--------------------- | :-------- |
| Freemium  | 10        | 3                      | Gratuito  |
| Básico    | 100       | 10                     | R$ 29,90  |
| Premium   | 500       | 50                     | R$ 59,90  |

*Para os planos **Básico** e **Premium**, notas excedentes podem ser emitidas ao custo de R$ 0,50 por nota.*

---

## Tecnologias Utilizadas

* **Backend:** **NestJS** - Estrutura modular, fortemente tipada e escalável, ideal para microserviços.
* **Banco de Dados:** **PostgreSQL** - Sistema de gerenciamento de banco de dados relacional robusto e confiável.
* **Cache e Mensageria:** **Redis** - Utilizado para caching de dados e como broker de mensagens para a comunicação entre microserviços (Pub/Sub).
* **Orquestração e Ambiente:** **Docker** & **Docker Compose** - Criação de um ambiente de desenvolvimento e produção consistente e isolado.
* **CI/CD:** **GitHub Actions** - Automação de processos de build, teste e deploy..

---

## Arquitetura de Microserviços

O backend é construído sobre uma arquitetura de microserviços para garantir escalabilidade, resiliência e manutenibilidade.

* **Gateway:** Ponto de entrada único para todas as requisições da API, responsável por rotear o tráfego para os serviços apropriados.
* **Serviço de Autenticação:** Gerencia o login, registro e autenticação de usuários.
* **Serviço de Usuário:** Responsável pelo gerenciamento de usuários e empresas.
* **Serviço de Notas Fiscais:** Orquestra a criação, consulta e gerenciamento das notas fiscais e seus itens.
* **Serviço de Pagamento:** Gerencia os planos, assinaturas e pagamentos.
* **Serviço de Notificações:** Prepara e enfileira notificações a serem enviadas (funcionalidade em desenvolvimento).
* **Serviço de Dashboard:** Processa e agrega dados para exibição nos dashboards.

---

## Como Executar o Projeto

Para executar o ambiente de desenvolvimento localmente, siga os passos abaixo.

#### Pré-requisitos
* [Docker](https://www.docker.com/get-started)
* [Docker Compose](https://docs.docker.com/compose/install/)
* Git

#### Instalação e Execução

1.  **Clone o repositório:**
    ```bash
    git clone https://github.com/Nota-Certa/Nota-Certa_Back.git
    cd Nota-Certa_Back
    ```

2.  **Configure as variáveis de ambiente:**
    Copie o arquivo de exemplo `.env.example` para um novo arquivo `.env.development.local`.
    ```bash
    cp .env.example .env.development.local
    ```
    Em seguida, abra o ficheiro `.env.development.local` e preencha as variáveis necessárias.

3.  **Suba os contêineres:**
    Utilize o Docker Compose para construir as imagens e iniciar todos os serviços.
    ```bash
    docker-compose up --build
    ```
    *Use a flag `-d` para executar em modo detached (segundo plano).*

4.  **Acesse a aplicação:**
    * A API do Gateway estará disponível em: `http://localhost:8080`
    * A documentação da API (Swagger) estará em: `http://localhost:8080/api`

---
## Payloads de teste

#### Criar uma Empresa, com a criação do usuário ADMIN atrelado:
**POST** `http://localhost:8080/usuarios/empresa`
```
{
    "nome_razao_social": "UFRPE",
    "cnpj":"12345678900010",
    "usuario":{
        "nome":"João da Silva",
        "email": "joaodasilva@ufrpe.br",
        "senha": "12345",
        "ativo": true
    }
}
```

#### Emitir uma nota fiscal para empresa:
**POST** `http://localhost:8080/notas-fiscais`
```
{
    "empresa_id": "def21782-5ed1-4b37-ba91-088d8e8647ed",
    "documento": "12345678000195",
    "tipo_pessoa": "F",
    "nome_razao_social": "Stanley",
    "status": "pendente",
    "data_emissao": "2025-07-01T10:00:00Z",
    "data_vencimento": "2025-08-01T10:00:00Z",
    "itens": [
        {
            "descricao": "Copo Stanley 1,5L",
            "quantidade": 10,
            "valor_unitario": 150.00,
            "impostos": {
                "iss": 5.00,
                "pis": 1.65,
                "cofins": 3.00
            }
        },
        {
            "descricao": "Toalha Stanley",
            "quantidade": 1,
            "valor_unitario": 800.00,
            "impostos": {
                "iss": 8.00,
                "pis": 0.88,
                "cofins": 1.32
            }
        }
    ]
}
```

#### Listar todas as notas emitidas em um período:
**GET** `http://localhost:8080/notas-fiscais/notas-por-periodo?mes=6&ano=2025`

#### Listar ranking de clientes com mais notas em um período:
**GET** `http://localhost:8080/notas-fiscais/ranking-clientes?ano=2025&top=5`

---

## Licença

Este projeto está licenciado sob a Licença MIT.