import { NextPage } from "next"
import { useState } from "react"
import { User } from "../types/user"

interface Props {
  name: string
  setName: (name: string) => void
}

const user: User = {
  name: "Benny",
  email: "Benny@gmail.com",
  age: 35,
  username: "",
  password: "",
}

const addUser = async (user: User) => {
  try {
    const response = await fetch("/api/user/newUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })

    if (!response.ok) {
      throw new Error("Network response was not ok")
    }

    const data = await response.json()
    console.log(data)
  } catch (error) {
    console.error("Error:", error)
  }
}

const InputComponent = ({ name, setName }: Props) => {
  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newName = event.target.value
    setName(newName)
  }

  return <input type="text" value={name} onChange={handleNameChange} />
}

const OutputComponent = ({ name }: { name: string }) => {
  return <div>{name}</div>
}

const Index: NextPage<Props> = ({}) => {
  const [name, setName] = useState("")

  return (
    <>
      <InputComponent name={name} setName={setName} />
      <OutputComponent name={name} />
      <button
        onClick={() => {
          addUser(user)
        }}
      >
        Post the {JSON.stringify(user)}
      </button>
    </>
  )
}

export default Index
