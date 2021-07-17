import React from 'react';
import MainGrid from '../src/components/MainGrid'
import Box from '../src/components/Box'
import nookies from 'nookies'
import { decode } from 'jsonwebtoken'
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

function CommunityWidget(props) {
  return (
    <>
      <form onSubmit={async function handleCriaComunidade(e) {
        e.preventDefault();

        const dadosDoForm = new FormData(e.target);

        const comunidade = {
          title: dadosDoForm.get('title'),
          image: dadosDoForm.get('image'),
          url: dadosDoForm.get('url'),
          creatorSlug: props.githubUser
        }

        const communityRes = await fetch('/api/comunidades', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(comunidade)
        });
        if (communityRes.ok) {
          const record = await communityRes.json();

          const comunidadesAtualizadas = [record, ...props.comunidades];
          props.onSubmit(comunidadesAtualizadas);
          e.target.reset();
        }
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
    </>
  )
}

function ScrapsWidget(props) {
  const [scrap, setScrap] = React.useState('');

  return (
    <>
      <form onSubmit={async function handleRecados(e) {
        e.preventDefault();

        const dadosDoForm = new FormData(e.target);

        const recado = {
          scrap: dadosDoForm.get('scrap'),
          creatorSlug: props.githubUser
        }

        const scrapRes = await fetch('/api/recados', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(recado)
        });
        if (scrapRes.ok) {
          const record = await scrapRes.json();

          const recadosAtualizados = [record, ...props.recados];
          props.onSubmit(recadosAtualizados);
          e.target.reset();
        }
      }}>
        <div>
          <textarea
            rows="3"
            required
            className="scrapTextArea"
            placeholder="Escreva um recado"
            name="scrap"
            value={scrap}
            onChange={(e) => {
              setScrap(e.target.value)
            }}
            aria-label="Escreva um recado">
          </textarea>
        </div>

        <button type="submit" disabled={scrap.length === 0}>
          Enviar recado
        </button>
      </form>

      <h2 className="scrapTitle">Recados ({props.recados.length})</h2>
      <ul className="scrapList">
        {props.recados.map((recado) => {
          return (
            <li key={recado.id}>
              <a className="scrapItem">
                <img src={`https://github.com/${recado.creatorSlug}.png`} className="scrapImg" />
                <span className="scrapMessage">{recado.scrap}</span>
              </a>
            </li>
          )
        })}
      </ul>
    </>
  )
}

function TestimonialsWidget(props) {
  return (
    <h2 className="scrapTitle">Em construção</h2>
  )
}

export default function Home(props) {
  const githubUser = props.githubUser;
  // const githubUser = 'omariosouto'
  const pessoasFavoritas = [
    'juunegreiros',
    'omariosouto',
    'peas',
    'rafaballerini',
    'marcobrunodev',
    'felipefialho'
  ]
  const screenStates = {
    COMMUNITY: 'COMMUNITY',
    SCRAPS: 'SCRAPS',
    TESTIMONIALS: 'TESTIMONIALS',
  };
  const [comunidades, setComunidades] = React.useState([]);
  const [followers, setFollowers] = useState([]);
  const [userInfo, setUserInfo] = useState({});
  const [recados, setRecados] = React.useState([]);

  useEffect(async () => {
    try {
      const followersRes = await fetch(`https://api.github.com/users/${githubUser}/followers`);
      if (!followersRes.ok) {
        console.error(followersRes)
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

  React.useEffect(async () => {
    try {
      const communitiesRes = await fetch(`/api/comunidades`);
      if (!communitiesRes.ok) {
        throw new Error('Não foi possível pegar os dados :(');
      }
      const resposta = await communitiesRes.json();
      setComunidades(resposta)
    } catch (error) {
      console.log(error);
    }
  }, []);

  React.useEffect(async () => {
    try {
      const scrapsRes = await fetch(`/api/recados`);
      if (!scrapsRes.ok) {
        throw new Error('Não foi possível pegar os dados :(');
      }
      const resposta = await scrapsRes.json();
      setRecados(resposta)
    } catch (error) {
      console.log(error);
    }
  }, []);

  const [screenState, setScreenState] = React.useState(screenStates.COMMUNITY);
  React.useEffect(() => {
    setTimeout(() => {
      setScreenState(screenStates.COMMUNITY);
    }, 1 * 1000);
    // nasce == didMount
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

            <OrkutNostalgicIconSet recados={recados.length} confiavel="3" legal="2" sexy="1" />

          </Box>

          <Box>
            <h2 className="subTitle">O que você deseja fazer?</h2>

            <div className="actionButtons" style={{ marginBottom: '20px' }}>
              <button onClick={(e) => {
                setScreenState(screenStates.COMMUNITY)
              }}
                type="button">
                Comunidades
              </button>
              <button onClick={(e) => {
                setScreenState(screenStates.SCRAPS)
              }}
                type="button">
                Recados
              </button>
              <button onClick={(e) => {
                setScreenState(screenStates.TESTIMONIALS)
              }}
                type="button">
                Depoimentos
              </button>
            </div>

            {screenState === screenStates.COMMUNITY && (
              <CommunityWidget
                githubUser={githubUser}
                comunidades={comunidades}
                onSubmit={setComunidades}
              />)}
            {screenState === screenStates.SCRAPS && (
              <ScrapsWidget
                githubUser={githubUser}
                recados={recados}
                onSubmit={setRecados}
              />)}
            {screenState === screenStates.TESTIMONIALS && <TestimonialsWidget />}

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

export async function getServerSideProps(context) {
  const cookies = nookies.get(context);
  const token = cookies.USER_TOKEN;

  let isAuthenticated = false;
  try {
    const authRes = await fetch('https://alurakut.vercel.app/api/auth', {
      headers: {
        Authorization: token
      }
    })
    if (!authRes.ok) {
      throw new Error('Não foi possível pegar os dados :(');
    }
    isAuthenticated = await authRes.json();
  } catch (error) {
    console.error(error)
  }

  if (!isAuthenticated) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
      props: {
        isAuthenticated
      }
    }
  }

  const { githubUser } = decode(token);

  return {
    props: {
      githubUser
    },
  }
}