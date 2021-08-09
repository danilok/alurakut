# Alurakut

Projeto criado durante a 3ª Imersão React ministrado pela Alura.  
A ideia do projeto é uma interface inspirada na antiga rede social Orkut.

# Funcionalides

- Login pelo usuário do github
- Enviar um scrap
- Criar comunidade
- Criar um depoimento
- Exibir scraps de um usuário
- Exibir depoimentos de um usuário
- Exibir comunidades de um usuário
- Exibir perfil de um usuário

# Novas funcionalidades a implementar ou bugs conhecidos

- Listar todos amigos
- Autenticação pela API do github
- Navegação de perfis
- Organização das rotas

# Recursos utilizados

- React
- Next.js
- Dato
- Styled components
- FetchAPI
- Vercel
- Git
- Nookies (Cookies)
- JWT

# Conhecimentos básicos necessários

- Javascript
- HTML
- CSS
- Framework React
- DOM
- API REST
- Node
  - yarn ou npm
- Git
- Github
- Cookies
- Autenticação

# Configuração

Criar um arquivo `.env.local`

```
NEXT_PUBLIC_API_KEY=<api_dato>
NEXT_PUBLIC_COMMUNITY_MODEL_ID=<model_id_comunidade>
NEXT_PUBLIC_SCRAP_MODEL_ID=<model_id_scrap>
NEXT_PUBLIC_TESTIMONIAL_MODEL_ID=<model_id_testimonial>
NEXT_PUBLIC_GITHUB_USER_MODEL_ID=<model_id_github_user>
```

- NEXT_PUBLIC_API_KEY: API Token gerado no Dato
- NEXT_PUBLIC_COMMUNITY_MODEL_ID: ID do modelo Community criado no Dato
- NEXT_PUBLIC_SCRAP_MODEL_ID: ID do modelo Scrap criado no Dato
- NEXT_PUBLIC_TESTIMONIAL_MODEL_ID: ID do modelo Testimonial criado no Dato
- NEXT_PUBLIC_GITHUB_USER_MODEL_ID: ID do modelo de Usuários do Github no Dato

# Para rodar localmente

Clonar o repositório e executar

```bash
yarn dev
```

# Para testar online

O projeto está hospedado na Vercel, para acessar [clique aqui](https://alurakut-danilok.vercel.app).
