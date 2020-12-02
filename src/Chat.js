import React, { useState, useEffect, useRef } from 'react';
import { graphql, compose } from 'react-apollo';
import TextField from '@material-ui/core/TextField';
import moment from 'moment';
import {
  ChatQuery,
  CreateChatMutation,
  ChatSubscription
} from './Chat-Query';

const Chat = props => {
  const chatBox = useRef(null);

  const [chat, setChat] = useState('');

  const [timer, setTimer] = useState(null);

  const handleShow = () => {
    props.setStyle();
  };

  useEffect(() => {
    props.chat.subscribeToMore({
      document: ChatSubscription,
      variables: {
	group_id: props.all_groups,
	sender_email: props.sender_email
      },
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        const chat = subscriptionData.data.newChat;
        if (prev.chats.find(x => x.id === chat.id)) {
          return prev;
        }
        return { ...prev, chats: [...prev.chats, chat] };
      }
    });
    if (chatBox.current) {
      scrollToBottom();
    }
  });

  const scrollToBottom = () => {
    chatBox.current.scrollIntoView();
  };

  const handleChange = e => {
    setChat(e.target.value);
  };

  const handleSubmit = async (e, chat) => {
    setChat('');
    e.preventDefault();
    const { sender_email, sender_name, group_id } = props;
    if (!chat.length) return null;
    await props.newChat({
      variables: {
	sender_id: "5fc4fd303c879950a4419389",
	sender_email: sender_email,
	sender_name: sender_name,
	group_id: group_id,
	chat_text: chat,
	sent_at: (new Date()).getTime()
      },
      update: (store, { data: { newChat } }) => {
        const data = store.readQuery({ query: ChatQuery });
        store.writeQuery({ query: ChatQuery, data });
      }
    });
  };

  const {
    chat: { error, loading, chats },
    all_groups,
    group_name,
    group_id,
    sender_email,
    sender_name,
  } = props;

  if (error || loading) return null;

  return (
    <div className="personal-chat" style={props.style}>
      <div className="chats-header">
        <div className="back-button" onClick={handleShow}>
          <div className="bar1" />
          <div className="bar2" />
          <div className="bar3" />
        </div>
      </div>
      <div className="all-chats">
        {chats.map(item =>
          (item.group_id === group_id) ? (
            <div
              key={item.id}
              className={item.sender_email === sender_email ? 'sender' : 'receiver'}
            >
              <div className="sender-name">{item.sender_name}</div>
              {item.chat_body}{' '}
              <span className="time"> {moment(item.sent_at).fromNow()}</span>
            </div>
          ) : (
            ''
          )
        )}
      </div>
      {group_id ? (
        <form
          onSubmit={e => handleSubmit(e, chat)}
          ref={chatBox}
          className="chat-box"
        >
          <TextField
            style={{ margin: 10 }}
            placeholder={'Say something'}
            fullWidth
            name="chat"
	    onChange={handleChange}
            value={chat}
            margin="normal"
            variant="outlined"
          />
        </form>
      ) : (
        <div className="select-chat">
          Select a group from the left panel
        </div>
      )}
    </div>
  );
};

export default compose(
  graphql(ChatQuery, { name: 'chat' }),
  graphql(CreateChatMutation, { name: 'newChat' }),
)(Chat);
