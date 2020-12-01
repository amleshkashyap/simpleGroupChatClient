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

export {
  UserQuery,
};
