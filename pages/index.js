import { useState } from "react"
import jwt from "jsonwebtoken"


export default function Home() {


  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [message, setMessage] = useState("Not logged in")
  const [secret, setSecret] = useState("")

  async function submitForm() {

    const res = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ username, password })
    }).then((data) => data.json())

   const token = res.token
   console.log(username)

   if(token) {
     const json = jwt.decode(token)
     console.log(json)
    setMessage(`Logged In as ${json.username}`)

    const res = await fetch("/api/secret", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ token })
    }).then((data) => data.json())

    if(res.secretAdminKey) {
      setSecret(res.secretAdminKey)
      return {
        redirect: {
          destination: '/login',
          permanent: false,
        },
      }
     
    } else {
      setSecret("Not verified")

    }

   } else {
     setMessage(`Logged In as ${json.username}`)
   }

  }



  return (
    <div>
      <h4>{message}</h4>
      <h5>Secret Key: {secret}</h5>
      <form>
        <input type="text" name="username" value={username} onChange={e => setUsername(e.target.value)}></input>
        <br></br>
        <input type="password" name="password" value={password} onChange={e => setPassword(e.target.value)} ></input>
        <br></br>
        <input type="button" value="Login" onClick={submitForm}></input>
      </form>
    </div>
  )
}
