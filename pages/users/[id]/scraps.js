/* eslint-disable linebreak-style */
import React from 'react';
import Box from '../../../src/components/Box';
import Loader from '../../../src/components/Loader';
import MainGrid from '../../../src/components/MainGrid';
import ProfileSidebar from '../../../src/components/ProfileSidebar';
import ScrapsWidget from '../../../src/components/ScrapsWidget';
import { AlurakutMenu } from '../../../src/lib/AlurakutCommons';
import nookies from 'nookies'
import { decode } from 'jsonwebtoken'

export default function ScrapsPage({ githubUser, loggedUser }) {

  const [recados, setRecados] = React.useState([]);
  const [showLoader, setShowLoader] = React.useState(true);

  React.useEffect(async () => {
    try {
      const scrapsRes = await fetch(`/api/recados?user_receiver=${githubUser}`);
      if (!scrapsRes.ok) {
        throw new Error('Não foi possível pegar os dados :(');
      }
      const resposta = await scrapsRes.json();
      setRecados(resposta)
      setShowLoader(false)
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
              Recados de {githubUser}
            </h1>

            {showLoader && <Loader />}

            {!showLoader && (
              <ScrapsWidget
                githubUser={githubUser}
                loggedUser={loggedUser}
                recados={recados}
                onSubmit={setRecados}
              />
            )}
          </Box>
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

  const targetUser = context.query.id;
  // validar usuario no github

  const { githubUser } = decode(token);

  return {
    props: {
      loggedUser: githubUser,
      githubUser: targetUser
    },
  }
}
