/* eslint-disable linebreak-style */
import React from 'react';
import Box from '../../src/components/Box';
import MainGrid from '../../src/components/MainGrid';
import ProfileSidebar from '../../src/components/ProfileSidebar';
import { AlurakutMenu } from '../../src/lib/AlurakutCommons';

export default function AlbunsPage({ githubUser }) {

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
              Álbuns
            </h1>
            <p style={{ color: 'white' }}>Nenhum álbum encontrado</p>
          </Box>
        </div>
      </MainGrid>
    </>
  )
}

export async function getServerSideProps(context) {

  const githubUser = context.query.id;
  // validar usuario no github

  return {
    props: {
      githubUser,
    }, // will be passed to the page component as props
  };
}
