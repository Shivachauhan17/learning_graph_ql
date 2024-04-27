import React from 'react'
import Persons from './Persons'
import {gql,useQuery} from '@apollo/client'
import Mutation from './Mutation'
import {Routes,Route,BrowserRouter} from "react-router-dom"
import Login from './Login'

const ALL_PERSONS = gql`
query {
  allPersons {
    name
    phone
    id
  }
}
`


function App() {
  const result = useQuery(ALL_PERSONS)

  if (result.loading) {
    return <div>loading...</div>
  }
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Mutation/>}/>
          <Route path='/persons' element={<Persons persons={result.data.allPersons}/>}/>
          <Route path='/login' element={<Login/>} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App


