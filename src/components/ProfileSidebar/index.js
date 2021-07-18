
import { AlurakutProfileSidebarMenuDefault } from '../../lib/AlurakutCommons';
import Box from '../Box';

export default function ProfileSidebar(propriedades) {
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

      <AlurakutProfileSidebarMenuDefault githubUser={propriedades.githubUser} />
    </Box>
  )
}
