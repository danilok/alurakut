import React from 'react'
import Box from '../src/components/Box';
import MainGrid from '../src/components/MainGrid';
import ProfileSidebar from '../src/components/ProfileSidebar';
import { AlurakutMenu } from '../src/lib/AlurakutCommons';
import nookies from 'nookies'
import { decode } from 'jsonwebtoken'

import styled from 'styled-components';
import Loader from '../src/components/Loader';

const FriendsBoxWrapper = styled(Box)`
  min-height: 90vh;
  overflow: auto;
  background-color: ${({ theme }) => theme.colors.backgroundLight};
  .smallTitle {
    color: ${({ theme }) => theme.colors.title};
  }
  ul {
    display: flex;
    flex-direction: column;
    max-height: 220px;
    list-style: none;
  }
  img {
    object-fit: cover;
    background-position: center center;
    width: 92px;
    height: 92px;
    position: relative;
    border-radius: 50%;
    margin-right: 24px;
    margin-left: 19px;
    margin-top: 16px;
    margin-bottom: 16px;
  }
  ul li {
    box-sizing: border-box;
    padding: 8px 0;
  }
  ul li:nth-child(odd) {
    background-color: #ffffff50;
  }
  ul li a {
    display: flex;
    height: 102px;
    position: relative;
    overflow: hidden;
    border-radius: 8px;
    align-items: center;
    text-decoration: none;
    span {
      color: #FFFFFF;
      font-size: 18px;
      padding: 0 4px;
      overflow: hidden;
      text-overflow: ellipsis;
      width: 100%;
    }
  }
`;

export default function FriendsPage(props) {
  const [friends, setFriends] = React.useState([]);
  const [showLoader, setShowLoader] = React.useState(true);

  React.useEffect(async () => {
    try {
      const friendsRes = await fetch(`/api/friends?creator_slug=${props.githubUser}`);
      if (!friendsRes.ok) {
        throw new Error('Não foi possível pegar os dados :(');
      }
      const resposta = await friendsRes.json();
      setFriends(resposta)
      setShowLoader(false)
    } catch (error) {
      setShowLoader(false)
      console.log(error);
    }
  }, []);

  return (
    <>
      <AlurakutMenu githubUser={props.githubUser} />
      <MainGrid>
        <div className="profileArea" style={{ gridArea: 'profileArea' }}>
          <ProfileSidebar githubUser={props.githubUser} />
        </div>
        <div className="welcomeArea" style={{ gridArea: 'welcomeArea' }}>
          <FriendsBoxWrapper>
            <h1 className="title">
              Amigos ({friends.length})
            </h1>

            {showLoader && <Loader />}

            {!showLoader && (
              <ul>
                {friends.map((itemAtual) => {
                  return (
                    <li key={itemAtual}></li>
                  )
                })}
              </ul>
            )}

            {friends.length === 0
              ? <p style={{ color: 'white' }}>Você ainda não possui amigos. Conecte-se!</p>
              : ''
            }
          </FriendsBoxWrapper>
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