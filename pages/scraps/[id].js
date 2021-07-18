/* eslint-disable linebreak-style */
import React from 'react';
import Box from '../../src/components/Box';
import Loader from '../../src/components/Loader';
import MainGrid from '../../src/components/MainGrid';
import ProfileSidebar from '../../src/components/ProfileSidebar';
import ScrapsWidget from '../../src/components/ScrapsWidget';
import { AlurakutMenu } from '../../src/lib/AlurakutCommons';

export default function ScrapsPage({ githubUser }) {

  const [recados, setRecados] = React.useState([]);
  const [showLoader, setShowLoader] = React.useState(true);

  React.useEffect(async () => {
    try {
      const scrapsRes = await fetch(`/api/recados`);
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
              Meus recados
            </h1>

            {showLoader && <Loader />}

            {!showLoader && (
              <ScrapsWidget
                githubUser={githubUser}
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

  const githubUser = context.query.id;
  // validar usuario no github

  return {
    props: {
      githubUser,
    }, // will be passed to the page component as props
  };
}
