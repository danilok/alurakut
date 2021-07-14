import React from 'react';
import MainGrid from '../src/components/MainGrid'
import Box from '../src/components/Box'
import { AlurakutMenu, AlurakutProfileSidebarMenuDefault, OrkutNostalgicIconSet } from '../src/lib/AlurakutCommons'
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelations'
import { useState, useEffect } from 'react'

function ProfileSidebar(propriedades) {
  return (
    <Box as="aside">
      <img src={`https://www.github.com/${propriedades.githubUser}.png`}></img>
      <hr />

      <p>
        <a className="boxLink" href={`https://www.github.com/${propriedades.githubUser}`}>
          @{propriedades.githubUser}
        </a>
      </p>
      <hr />

      <AlurakutProfileSidebarMenuDefault />
    </Box>
  )
}

export default function Home() {
  const githubUser = 'danilok'
  // const githubUser = 'omariosouto'
  const pessoasFavoritas = [
    'juunegreiros',
    'omariosouto',
    'peas',
    'rafaballerini',
    'marcobrunodev',
    'felipefialho'
  ]
  const [comunidades, setComunidades] = React.useState([
    {
      id: '1498019839018903801',
      title: 'Eu odeio acordar cedo',
      image: 'https://alurakut.vercel.app/capa-comunidade-01.jpg',
      url: 'https://www.orkut.br.com/MainCommunity?cmm=10000'
    },
    {
      id: '149801983901832',
      title: 'Tokunet BR',
      image: 'https://img10.orkut.br.com/community/3ccf2a017d731f4afcfde42460533f3f.jpg',
      url: 'https://www.orkut.br.com/MainCommunity?cmm=70447'
    },
    {
      id: '14980198390183201',
      title: 'Kamen Rider Black & RX',
      image: 'https://img10.orkut.br.com/community/2084b96ccf946bd6d52cac630eb7fbda.jpg',
      url: 'https://www.orkut.br.com/MainCommunity?cmm=29669'
    },
    {
      id: '1498019839423801',
      title: 'Comando Estelar Flashman Oficial',
      image: 'https://img10.orkut.br.com/community/23a0970bef91705505727df889fb897f.jpg',
      url: 'https://www.orkut.br.com/MainCommunity?cmm=25212'
    },
    {
      id: '149801523523801',
      title: 'Eu Odeio Segunda-Feira',
      image: 'https://img10.orkut.br.com/community/b2ee499a725f11c77dd956896a93d75a.jpg',
      url: 'https://www.orkut.br.com/MainCommunity?cmm=27831'
    },
    {
      id: '1498019835235801',
      title: 'Jiraiya O Incrível Ninja',
      image: 'https://img10.orkut.br.com/community/8f20eb9135ec6d78d39ece8cdd2b4548.jpg',
      url: 'https://www.orkut.br.com/MainCommunity?cmm=38341'
    },
  ]);
  const [followers, setFollowers] = useState([]);
  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    fetch(`https://api.github.com/users/${githubUser}/followers`)
      .then(async (response) => {
        if (response.ok) {
          const resposta = await response.json();

          return resposta;
        }

        throw new Error('Não foi possível pegar os dados :(');
      })
      .then((response) => {
        const followersResponse = response.map(follower => follower.login)
        setFollowers(followersResponse.concat(pessoasFavoritas));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    fetch(`https://api.github.com/users/${githubUser}`)
      .then(async (response) => {
        if (response.ok) {
          const resposta = await response.json();

          return resposta;
        }

        throw new Error('Não foi possível pegar os dados :(');
      })
      .then((response) => {
        setUserInfo(response);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <AlurakutMenu githubUser={githubUser} />
      <MainGrid>
        <div className="profileArea" style={{ gridArea: 'profileArea' }}>
          <ProfileSidebar githubUser={githubUser} />
        </div>
        <div className="welcomeArea" style={{ gridArea: 'welcomeArea' }}>
          <Box>
            <h1 className="title">
              Bem-vindo(a) {userInfo.name}
            </h1>

            <OrkutNostalgicIconSet confiavel="3" legal="2" sexy="1" />

          </Box>

          <Box>
            <h2 className="subTitle">O que você deseja fazer?</h2>

            <form onSubmit={function handleCriaComunidade(e) {
              e.preventDefault();

              const dadosDoForm = new FormData(e.target);

              const comunidade = {
                id: new Date().toISOString(),
                title: dadosDoForm.get('title'),
                image: dadosDoForm.get('image')
              }

              const comunidadesAtualizadas = [...comunidades, comunidade];
              setComunidades(comunidadesAtualizadas);

              e.target.reset();
            }}>
              <div>
                <input
                  required
                  placeholder="Qual vai ser o nome da sua comunidade?"
                  name="title"
                  aria-label="Qual vai ser o nome da sua comunidade?" />
              </div>
              <div>
                <input
                  required
                  placeholder="Coloque uma URL para usarmos de capa"
                  name="image"
                  defaultValue={"https://picsum.photos/300/300?random=1"}
                  onChange={() => { }}
                  aria-label="Coloque uma URL para usarmos de capa" />
              </div>
              <div>
                <input
                  required
                  placeholder="Coloque a URL da comunidade"
                  name="url"
                  aria-label="Coloque a URL da comunidade" />
              </div>

              <button type="submit">
                Criar comunidade
              </button>
            </form>
          </Box>
        </div>
        <div className="profileRelationsArea" style={{ gridArea: 'profileRelationsArea' }}>
          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
              Pessoas da comunidade ({followers.length})
            </h2>
            <ul>
              {followers.slice(0, 6).map((itemAtual) => {
                return (
                  <li key={itemAtual}>
                    <a href={`https://github.com/${itemAtual}`}>
                      <img src={`https://github.com/${itemAtual}.png`} />
                      <span>{itemAtual}</span>
                    </a>
                  </li>
                )
              })}
            </ul>
          </ProfileRelationsBoxWrapper>
          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
              Comunidades ({comunidades.length})
            </h2>
            <ul>
              {comunidades.slice(0, 6).map((itemAtual) => {
                return (
                  <li key={itemAtual.id}>
                    <a href={itemAtual.url}>
                      <img src={itemAtual.image} />
                      <span>{itemAtual.title}</span>
                    </a>
                  </li>
                )
              })}
            </ul>
          </ProfileRelationsBoxWrapper>
        </div>
      </MainGrid>
    </>
  )
}
