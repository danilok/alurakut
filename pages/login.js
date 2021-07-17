import React from 'react';
// Hook do NextJS
import { useRouter } from 'next/router';
import nookies from 'nookies';

export default function LoginScreen(props) {
  const router = useRouter();
  const [githubUser, setGithubUser] = React.useState('');
  const [erroLogin, setErroLogin] = React.useState(false);

  return (
    <main style={{ display: 'flex', flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <div className="loginScreen">
        <section className="logoArea">
          <img src="https://alurakut.vercel.app/logo.svg" />

          <p><strong>Conecte-se</strong> aos seus amigos e familiares usando recados e mensagens instantâneas</p>
          <p><strong>Conheça</strong> novas pessoas através de amigos de seus amigos e comunidades</p>
          <p><strong>Compartilhe</strong> seus vídeos, fotos e paixões em um só lugar</p>
        </section>

        <section className="formArea">
          <form className="box" onSubmit={async (e) => {
            e.preventDefault();

            try {
              const validUserRes = await fetch(`https://api.github.com/users/${githubUser}`)
              if (!validUserRes.ok) {
                throw new Error('Não foi possível pegar os dados :(');
              }

              const tokenRes = await fetch('https://alurakut.vercel.app/api/login', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({ githubUser: githubUser })
              });
              const res = await tokenRes.json();
              nookies.set(null, 'USER_TOKEN', res.token, {
                path: '/',
                maxAge: 86400 * 7
              })
              router.push('/')
            } catch (error) {
              setErroLogin(true);
            }
          }}>
            <p>
              Acesse agora mesmo com seu usuário do <strong>GitHub</strong>!
            </p>
            <input
              placeholder="Usuário"
              value={githubUser}
              onChange={(e) => {
                setGithubUser(e.target.value)
                if (e.target.value.length === 0) {
                  setErroLogin(false)
                }
              }}
            />
            {githubUser.length === 0
              ? 'Preencha o campo'
              : ''
            }
            {erroLogin && githubUser.length > 0
              ? <p style={{ color: 'red' }}>Erro ao logar, usuário inválido</p>
              : ''}
            <button type="submit" disabled={!githubUser}>
              Login
            </button>
          </form>

          <footer className="box">
            <p>
              Ainda não é membro? <br />
              <a href="/login">
                <strong>
                  ENTRAR JÁ
                </strong>
              </a>
            </p>
          </footer>
        </section>

        <footer className="footerArea">
          <p>
            © 2021 alura.com.br - <a href="/">Sobre o Orkut.br</a> - <a href="/">Centro de segurança</a> - <a href="/">Privacidade</a> - <a href="/">Termos</a> - <a href="/">Contato</a>
          </p>
        </footer>
      </div>
    </main>
  )
}

export async function getServerSideProps(context) {
  const cookies = nookies.get(context);
  const token = cookies.USER_TOKEN;

  if (!token) {
    return {
      props: {

      }
    }
  }

  let isAuthenticated = false;
  try {
    const authRes = await fetch('https://alurakut.vercel.app/api/auth', {
      headers: {
        Authorization: token
      }
    })
    if (!authRes.ok) {
      console.error(authRes)
      throw new Error('Não foi possível pegar os dados :(');
    }
    isAuthenticated = await authRes.json();
  } catch (error) {
    console.error(error)
  }

  // Caso esteja autenticado, direciona para o Home
  if (isAuthenticated) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      }
    }
  }

  return {
    props: { isAuthenticated },
  }
}