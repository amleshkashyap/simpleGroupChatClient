import gql from 'graphql-tag';

const ChatQuery = gql`
  query {
    chats {
	id
	chat_body
	sender_email
	sender_name
	group_id
	sent_at
    }
  }
`;

const CreateChatMutation = gql`
  mutation (
    $sender_id: String!
    $sender_email: String!
    $sender_name: String!
    $chat_text: String!
    $group_id: String!
    $sent_at: Float!
  ) {
    newChat (
	sender_id: $sender_id
	sender_email: $sender_email
	sender_name: $sender_name
	chat_text: $chat_text
	group_id: $group_id
	sent_at: $sent_at
    ) {
	id
	chat_body
	sender_email
	sender_name
	sent_at
	group_id
    }
  }
`;

const ChatSubscription = gql`
  subscription(
    $group_id: [ String! ]!
    $sender_email: String
  ) {
    newChat(
	group_id: $group_id
	sender_email: $sender_email
    ) {
	id
	chat_body
	sender_email
	sender_name
	sent_at
	group_id
    }
  }
`;

export {
  ChatQuery,
  CreateChatMutation,
  ChatSubscription,
};
