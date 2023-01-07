
// {
//   id: 3,
//   user_id: 2,
//   title: "An Example Sound",
//   url: "/examplesound1",
//   category: "Sound Effect"
// }

export default function SoundListItem(props){
  const { title, category } = props

  return (
    <li className="SoundListItem">
      <p>{title}</p>
      <p>Category: {category}</p>
    </li>
  )
}