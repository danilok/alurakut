import MainGrid from '../src/components/MainGrid'
import Box from '../src/components/Box'
import { AlurakutMenu, OrkutNostalgicIconSet } from '../src/lib/AlurakutCommons'
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelations'
import { useState, useEffect } from 'react'

function ProfileSidebar(propriedades) {
  return (
    <Box>
      <img src={`https://www.github.com/${propriedades.githubUser}.png`}></img>
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
  const [followers, setFollowers] = useState([]);

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

  return (
    <>
      <AlurakutMenu />
      <MainGrid>
        <div className="profileArea" style={{ gridArea: 'profileArea' }}>
          <ProfileSidebar githubUser={githubUser} />
        </div>
        <div className="welcomeArea" style={{ gridArea: 'welcomeArea' }}>
          <Box>
            <h1 className="title">
              Bem-vindo(a)
            </h1>

            <OrkutNostalgicIconSet confiavel="3" legal="2" sexy="1" />
          </Box>
        </div>
        <div className="profileRelationsArea" style={{ gridArea: 'profileRelationsArea' }}>
          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
              Pessoas da comunidade ({followers.length})
            </h2>
            <ul>
              {followers.map((itemAtual) => {
                return (
                  <li key={itemAtual}>
                    <a href={`/users/${itemAtual}`} key={itemAtual}>
                      <img src={`https://github.com/${itemAtual}.png`} />
                      <span>{itemAtual}</span>
                    </a>
                  </li>
                )
              })}
            </ul>
          </ProfileRelationsBoxWrapper>
          {/* <Box>
            Comunidades
          </Box> */}
        </div>
      </MainGrid>
    </>
  )
}
