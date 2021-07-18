export default function ProfileRelationsTitle(props) {
  return (
    <h2 className="smallTitle">
      {props.title} ({props.items.length})
    </h2>
  )
}
