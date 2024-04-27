import { gql } from '@apollo/client'


export const CREATE_USER=gql`
    mutation create_user($username: String!){
        createUser(
            username:$username
        ){
            username
            id
        }
    }
`