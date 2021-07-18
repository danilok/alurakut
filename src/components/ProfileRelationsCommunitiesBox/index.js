import { ProfileRelationsBoxWrapper } from '../ProfileRelations'
import ProfileRelationsTitle from '../ProfileRelationsTitle'

export default function ProfileRelationsCommunitiesBox(propriedades) {
  return (
    <ProfileRelationsBoxWrapper>
      <ProfileRelationsTitle title={propriedades.title} items={propriedades.items} />
      <ul>
        {propriedades.items.slice(0, 6).map((itemAtual) => {
          return (
            <li key={itemAtual.id}>
              <a href={itemAtual.url}>
                <img src={itemAtual.image} />
                <span>{itemAtual.title}</span>
              </a>
            </li>
          )
        })}
      </ul>
    </ProfileRelationsBoxWrapper>
  )
}
