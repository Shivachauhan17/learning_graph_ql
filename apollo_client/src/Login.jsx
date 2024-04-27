import React, { useState,useEffect } from 'react'
import { useMutation,gql,useApolloClient } from '@apollo/client'
import { CREATE_USER } from './queries'

function Login() {
  const [error,setError]=useState(null)
  const [token,setToken]=useState(null)
  const client = useApolloClient()

  const [createUser,setCreateUser]=useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('secret')


  const CREATE_USER=gql`
    mutation create_user($username: String!){
        createUser(
            username:$username
        ){
            username
            id
        }
    }
    `
  const [create_user,create_user_result]=useMutation(CREATE_USER,{
    onError:(error)=>{
      setError(error.graphQLErrors[0].message)
    }
  })

  useEffect(()=>{
    if(create_user_result.data){
      localStorage.setItem('username',create_user_result.data.username)
    }
  },[create_user_result.data])


  const handleCreateUserSubmit=async(e)=>{
    e.preventDefault()

    create_user({variables:{username: createUser}})
  }


  const LOGIN=gql`
    mutation login($username:String!,$password:String!){
      login(
        username:$username,
        password:$password
      )
    }
  `

  const [login,result]=useMutation(LOGIN,{onError:(error)=>{
    setError(error.graphQLErrors[0].message)
  }})

  const handleLogin=(e)=>{
    e.preventDefault()
    login({variables:{username,password}})
  }

  useEffect(() => {
    if ( result.data ) {
      const token = result.data.login.value
      setToken(token)
      localStorage.setItem('phonenumbers-user-token', token)
    }
  }, [result.data])



  const logout=()=>{
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  return (
    <div>
      <form onSubmit={handleCreateUserSubmit}>
        <input type='text' placeholder='enter username to create user' onChange={({target})=>{setCreateUser(target.value)}}/>
        <button type='submit'>create User</button>
      </form>

      <h3>login form</h3>
      <form onSubmit={handleLogin}>
        <label>username:</label>
        <input type='text' placeholder='give the username' value={username} onChange={({target})=>{setUsername(target.value)}}/>
        <label> password:</label>
        <input  type='text' placeholder='give your pass' value={password} onChange={({target})=>{setPassword(target.value)}}/>
        <button type='submit'>login</button>
      </form>


      <h4>logout button</h4>
      <button onClick={logout}>logout</button>

    </div>
  )
}

export default Login