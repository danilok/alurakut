import React from 'react';
import MainGrid from '../src/components/MainGrid'
import Box from '../src/components/Box'
import nookies from 'nookies'
import { decode } from 'jsonwebtoken'
import { AlurakutMenu, OrkutNostalgicIconSet } from '../src/lib/AlurakutCommons'
import ProfileSidebar from '../src/components/ProfileSidebar'
import { useState, useEffect } from 'react'
import ScrapsWidget from '../src/components/ScrapsWidget';
import TestimonialsWidget from '../src/components/TestimonialsWidget';
import CommunityWidget from '../src/components/CommunityWidget';
import ProfileRelationsCommunitiesBox from '../src/components/ProfileRelationsCommunitiesBox';
import ProfileRelationsFollowersBox from '../src/components/ProfileRelationsFollowersBox';
import ProfileRelationsPeopleBox from '../src/components/ProfileRelationsPeopleBox';

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
      const userLocalRes = await fetch(`/api/usuarios?login=${githubUser}`);
      if (!userLocalRes.ok) {
        // throw new Error('Não foi possível pegar os dados :(');
        const userRes = await fetch(`https://api.github.com/users/${githubUser}`);
        if (!userRes.ok) {
          throw new Error('Não foi possível pegar os dados :(');
        }
        const resposta = await userRes.json();
        setUserInfo(resposta);

        const creatUserInfoRes = await fetch('/api/usuarios', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            login: resposta.login,
            name: resposta.name,
            creationDate: resposta.created_at,
            publicRepos: resposta.public_repos,
            location: resposta.location,
            followers: resposta.followers,
            following: resposta.following
          })
        });
        return;
      }
      const resposta = await userLocalRes.json();
      setUserInfo(resposta);
    } catch (error) {
      console.log(error);
    }
  }, []);

  React.useEffect(async () => {
    try {
      const communitiesRes = await fetch(`/api/comunidades?creator_slug=${githubUser}`);
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
      const scrapsRes = await fetch(`/api/recados?user_receiver=${githubUser}`);
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
                loggedUser={githubUser}
                recados={recados}
                onSubmit={setRecados}
              />)}
            {screenState === screenStates.TESTIMONIALS && (
              <TestimonialsWidget
                githubUser={githubUser}
              />)}
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

  if (!token) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      }
    }
  }

  let isAuthenticated = false;
  try {
    const authRes = await fetch(`${process.env.NEXT_PUBLIC_AUTH_URL}/api/auth`, {
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