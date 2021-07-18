import Link from 'next/link'
import { ProfileRelationsBoxWrapper } from '../ProfileRelations'
import ProfileRelationsTitle from '../ProfileRelationsTitle'

export default function ProfileRelationsFollowersBox(propriedades) {
  return (
    <ProfileRelationsBoxWrapper>
      <ProfileRelationsTitle title={propriedades.title} items={propriedades.items} />
      <ul>
        {propriedades.items.slice(0, 6).map((itemAtual) => {
          return (
            <li key={itemAtual.login}>
              <Link href={`/users/${itemAtual.login}`}>
                <a>
                  <img src={`https://github.com/${itemAtual.login}.png`} />
                  <span>{itemAtual.login}</span>
                </a>
              </Link>
            </li>
          )
        })}
      </ul>
    </ProfileRelationsBoxWrapper>
  )
}