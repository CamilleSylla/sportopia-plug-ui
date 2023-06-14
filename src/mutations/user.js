import { gql } from "@apollo/client";

export const CREATE_USER = gql`
mutation createUser ($user: CreateUserInput!) {
	createUser (user: $user) {
		id
		email
		lastname
		firstname
		accessToken
	}
}
`