/* eslint-disable linebreak-style */
import React from 'react';
import Box from '../../src/components/Box';
import CommunityWidget from '../../src/components/CommunityWidget';
import MainGrid from '../../src/components/MainGrid';
import ProfileRelationsCommunitiesBox from '../../src/components/ProfileRelationsCommunitiesBox';
import ProfileRelationsFollowersBox from '../../src/components/ProfileRelationsFollowersBox';
import ProfileRelationsPeopleBox from '../../src/components/ProfileRelationsPeopleBox';
import ProfileSidebar from '../../src/components/ProfileSidebar';
import ProfileWidget from '../../src/components/ProfileWidget';
import ScrapsWidget from '../../src/components/ScrapsWidget';
import { AlurakutMenu, OrkutNostalgicIconSet } from '../../src/lib/AlurakutCommons';

export default function UserPage(props) {
  const [githubUser, setGithubUser] = React.useState(props.githubUser);
  React.useEffect(() => setGithubUser(props.githubUser), [])
  const pessoasFavoritas = [
    'juunegreiros',
    'omariosouto',
    'peas',
    'rafaballerini',
    'marcobrunodev',
    'felipefialho'
  ]
  const screenStates = {
    PROFILE: 'PROFILE',
    COMMUNITY: 'COMMUNITY',
    SCRAPS: 'SCRAPS',
    TESTIMONIALS: 'TESTIMONIALS',
  };
  const [comunidades, setComunidades] = React.useState([]);
  const [followers, setFollowers] = React.useState([]);
  const [userInfo, setUserInfo] = React.useState({});
  const [recados, setRecados] = React.useState([]);

  React.useEffect(async () => {
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
  }, [githubUser]);

  React.useEffect(async () => {
    try {
      const userRes = await fetch(`/api/usuarios?login=${githubUser}`);
      if (!userRes.ok) {
        throw new Error('Não foi possível pegar os dados :(');
      }
      const resposta = await userRes.json();
      setUserInfo(resposta[0]);
    } catch (error) {
      console.log(error);
    }
  }, [githubUser]);

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
  }, [githubUser]);

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
  }, [githubUser]);

  const [screenState, setScreenState] = React.useState(screenStates.PROFILE);
  React.useEffect(() => {
    setTimeout(() => {
      setScreenState(screenStates.PROFILE);
    }, 1 * 1000);
  }, [githubUser]);
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
              {userInfo.name}
            </h1>

            <OrkutNostalgicIconSet confiavel="3" legal="2" sexy="1" />

          </Box>

          {screenState === screenStates.PROFILE && (
            <ProfileWidget
              userInfo={userInfo}
            />)}
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

  const githubUser = context.query.id;
  // validar usuario no github

  return {
    props: {
      githubUser,
    }, // will be passed to the page component as props
  };
}
