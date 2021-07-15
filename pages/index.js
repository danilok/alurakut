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

function ProfileRelationsTitle(props) {
  return (
    <h2 className="smallTitle">
      {props.title} ({props.items.length})
    </h2>
  )
}

function ProfileRelationsFollowersBox(propriedades) {
  return (
    <ProfileRelationsBoxWrapper>
      <ProfileRelationsTitle title={propriedades.title} items={propriedades.items} />
      <ul>
        {propriedades.items.slice(0, 6).map((itemAtual) => {
          return (
            <li key={itemAtual.login}>
              <a href={`https://github.com/${itemAtual.login}`}>
                <img src={`https://github.com/${itemAtual.login}.png`} />
                <span>{itemAtual.login}</span>
              </a>
            </li>
          )
        })}
      </ul>
    </ProfileRelationsBoxWrapper>
  )
}

function ProfileRelationsPeopleBox(propriedades) {
  return (
    <ProfileRelationsBoxWrapper>
      <ProfileRelationsTitle title={propriedades.title} items={propriedades.items} />
      <ul>
        {propriedades.items.slice(0, 6).map((itemAtual) => {
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
  )
}

function ProfileRelationsCommunitiesBox(propriedades) {
  return (
    <ProfileRelationsBoxWrapper>
      <ProfileRelationsTitle title={propriedades.title} items={propriedades.items} />
      <ul>
        {propriedades.items.slice(0, 6).map((itemAtual) => {
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
  const [comunidades, setComunidades] = React.useState([]);
  const [followers, setFollowers] = useState([]);
  const [userInfo, setUserInfo] = useState({});

  useEffect(async () => {
    try {
      const followersRes = await fetch(`https://api.github.com/users/${githubUser}/followers`);
      if (!followersRes.ok) {
        throw new Error('Não foi possível pegar os dados :(');
      }
      const resposta = await followersRes.json();
      setFollowers(resposta);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(async () => {
    try {
      const userRes = await fetch(`https://api.github.com/users/${githubUser}`);
      if (!userRes.ok) {
        throw new Error('Não foi possível pegar os dados :(');
      }
      const resposta = await userRes.json();
      setUserInfo(resposta);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const token = process.env.NEXT_PUBLIC_API_KEY;

  React.useEffect(async () => {
    try {
      const datoRes = await fetch(
        'https://graphql.datocms.com/',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({
            query: `{ allCommunities {
                id
                title
                image
                url
              } }`
          }),
        }
      );
      const convRes = await datoRes.json();
      setComunidades(convRes.data.allCommunities)
    } catch (error) {
      console.log(error);
    }
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
          <ProfileRelationsFollowersBox title="Seguidores" items={followers} />
          <ProfileRelationsPeopleBox title="Pessoas da comunidade" items={pessoasFavoritas} />
          <ProfileRelationsCommunitiesBox title="Comunidades" items={comunidades} />
        </div>
      </MainGrid>
    </>
  )
}
