import { ProfileRelationsBoxWrapper } from '../ProfileRelations'
import ProfileRelationsTitle from '../ProfileRelationsTitle'

export default function ProfileRelationsPeopleBox(propriedades) {
  return (
    <ProfileRelationsBoxWrapper>
      <ProfileRelationsTitle title={propriedades.title} items={propriedades.items} />
      <ul>
        {propriedades.items.slice(0, 6).map((itemAtual) => {
          return (
            <li key={itemAtual}>
              <a href={`https://github.com/${itemAtual}`}>
                <img src={`https://github.com/${itemAtual}.png`} />
                <span>{itemAtual}</span>
              </a>
            </li>
          )
        })}
      </ul>
    </ProfileRelationsBoxWrapper>
  )
}
