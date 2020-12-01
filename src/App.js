import React, { useState, useEffect } from 'react';
import Chat from './Chat';
import User from './User';
import Group from './Group';
import Registration from './Frontpage';
import { graphql, compose } from 'react-apollo';
import { GroupQuery } from './Group-Query';
import { UserQuery } from './User-Query';

const App = props => {
  const user =
    (localStorage.getItem('token') &&
      JSON.parse(localStorage.getItem('token'))) ||
    {};

  const [receivingGroupState, setReceivingGroupState] = useState({
    receivingGroupId: '',
    receivingGroupName: ''
  });

  const [hidden, setHidden] = useState(false);

  const setSelectedGroup = (id, name) => {
    setReceivingGroupState(receivingGroupState => {
      return { ...receivingGroupState, receivingGroupId: id, receivingGroupName: name };
    });
    setHidden(!hidden);
  };

  const setStyle = () => {
    setHidden(!hidden);
  };

  const { receivingGroupId, receivingGroupName } = receivingGroupState;
  const {
    data: { groups, error, loading }
  } = props;

  if (loading || error) return null;
  if (localStorage.getItem('token')) {
    return (
      <div className="chat-page">
        <Group
          style={{ display: hidden ? 'none' : 'block' }}
          groups={groups}
	  user={user}
	  selectedGroup={setSelectedGroup}
        />
        <Chat
          style={{ display: hidden ? 'block' : 'none' }}
          sender_email={user.email}
	  sender_id={user._id}
	  sender_name={user.name}
	  all_groups={groups.map(item => item.id)}
	  group_id={receivingGroupId}
	  group_name={receivingGroupName}
          setStyle={setStyle}
        />
      </div>
    );
  }
  return <Registration />;
};

export default compose(
  graphql(GroupQuery)
)(App);
