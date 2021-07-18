import Box from '../Box';

export default function ProfileWidget(props) {
  const dataCriacao = new Date(props.userInfo.created_at);
  return (
    <>
      <Box>
        <h2 className="scrapTitle">Perfil</h2>

        <ul className="profileData">
          <li className="profileLine" key="name">
            <span className="profileTitle">Nome: </span>
            <span className="profileValue">{props.userInfo.name}</span>
          </li>
          <li className="profileLine" key="created_at">
            <span className="profileTitle">Data de criação: </span>
            {/* {https://www.carlrippon.com/formatting-dates-and-numbers-in-react/} */}
            <span className="profileValue">{props.userInfo.created_at
              ? new Intl.DateTimeFormat('pt-BR', { dateStyle: 'short', timeStyle: 'long' }).format(dataCriacao)
              : ''
            }</span>
          </li>
          <li className="profileLine" key="public_repos">
            <span className="profileTitle">Repositórios públicos: </span>
            <span className="profileValue">{props.userInfo.public_repos}</span>
          </li>
          <li className="profileLine" key="location">
            <span className="profileTitle">Localização: </span>
            <span className="profileValue">{props.userInfo.location}</span>
          </li>
          <li className="profileLine" key="followers">
            <span className="profileTitle">Seguidores: </span>
            <span className="profileValue">{props.userInfo.followers}</span>
          </li>
          <li className="profileLine" key="following">
            <span className="profileTitle">Seguindo: </span>
            <span className="profileValue">{props.userInfo.following}</span>
          </li>
        </ul>
      </Box>
    </>
  )
}
