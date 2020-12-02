import gql from 'graphql-tag';

const UserQuery = gql`
  query {
    users {
	id
	name
	email
    }
   }
`;

const UserLoginMutation = gql`
  mutation (
    $email: String!
    $password: String!
  ) {
    userLogin (
        email: $email
        password: $password
    ) {
        id
        name
        email
    }
  }
`;

export {
  UserQuery,
  UserLoginMutation
};
