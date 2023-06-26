import { UserModel } from "@/schemas/userSchema"
import { User } from "@/types/user"
import { connectToDatabase } from "@/utils/db"
import { GetServerSideProps, NextPage } from "next"

type Props = {
  users: User[]
}

const Display: NextPage<Props> = ({ users }) => {
  /*const myTest = () => {
    
    return users.map(({ name, email, age }: User, index) => {
      return <li key={index}> {`${name} ${email} ${age}`} </li>
    })
  }*/

  return (
    <>
      <div>
        <h1>UsersList</h1>
        <p> Here are the users </p>
        <ul>
          {users.map((user) => (
            <li key={user.email}>
              {`${user._id} ${user.email} ${user.name} ${user.age} `}
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}

export default Display

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  await connectToDatabase()
  const users = await UserModel.find().lean().exec()

  const serializedUsers = users.map((user) => {
    return {
      ...user,
      _id: user._id.toString(),
    }
  })

  return {
    props: {
      users: serializedUsers,
    },
  }
}
