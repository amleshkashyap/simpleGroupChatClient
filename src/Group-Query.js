import gql from 'graphql-tag';

const GroupQuery = gql`
  query {
    groups {
	id
	name
    }
   }
`;

export {
  GroupQuery,
};
