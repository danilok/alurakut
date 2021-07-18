/* eslint-disable linebreak-style */
import React from 'react';
import Box from '../../src/components/Box';
import Loader from '../../src/components/Loader';
import MainGrid from '../../src/components/MainGrid';
import ProfileSidebar from '../../src/components/ProfileSidebar';
import { AlurakutMenu } from '../../src/lib/AlurakutCommons';

import styled from 'styled-components';

const TestimonialsBoxWrapper = styled(Box)`
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
      align-self: flex-start;
    }
  }
`;

export default function TestimonialsPage({ githubUser }) {

  const [depoimentos, setDepoimentos] = React.useState([]);
  const [showLoader, setShowLoader] = React.useState(true);

  React.useEffect(async () => {
    try {
      const scrapsRes = await fetch(`/api/depoimentos?user_receiver=${githubUser}`);
      if (!scrapsRes.ok) {
        throw new Error('Não foi possível pegar os dados :(');
      }
      const resposta = await scrapsRes.json();
      setDepoimentos(resposta)
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
          <TestimonialsBoxWrapper>
            <h1 className="title">
              Depoimentos ({depoimentos.length})
            </h1>
            {depoimentos.length === 0
              ? <p style={{ color: 'white' }}>Nenhum depoimento encontrado</p>
              : ''
            }

            {showLoader && <Loader />}

            {!showLoader && (
              <ul>
                {depoimentos.map((itemAtual) => {
                  return (
                    <li key={itemAtual.id}>
                      <a>
                        <img src={`https://github.com/${itemAtual.creatorSlug}.png`} />
                        <span>{itemAtual.testimonial}</span>
                      </a>
                    </li>
                  )
                })}
              </ul>
            )}
          </TestimonialsBoxWrapper>
        </div>
      </MainGrid>
    </>
  )
}

export async function getServerSideProps(context) {

  const githubUser = context.query.id;
  // validar usuario no github

  // console.log('dbExterno', dbExterno);
  return {
    props: {
      githubUser,
    }, // will be passed to the page component as props
  };
}
