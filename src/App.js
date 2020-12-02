import React, { useState, useEffect } from 'react';
import Chat from './Chat';
import User from './User';
import Group from './Group';
import Login from './Login';
import { graphql, compose } from 'react-apollo';
import { GroupQuery } from './Group-Query';
import { UserQuery, UserLoginMutation } from './User-Query';

const App = props => {
  const user =
    (localStorage.getItem('jwtToken') &&
      JSON.parse(localStorage.getItem('jwtToken'))) ||
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

  const userLogin = async (email, password) => {
    await props.userLogin({
      variables: {
        email,
        password
      },
      update: (store, { data: { userLogin } }) => {
	if(!userLogin) alert("Invalid Credentials");
	if(userLogin) {
	    const jwtToken = {name: userLogin.name, email: userLogin.email, jwt: ""};
	    localStorage["jwtToken"] = JSON.stringify(jwtToken);
	    window.location.reload(true);
	};
      }
    });
  };

  const userLogout = async => {
    localStorage.removeItem('jwtToken');
    window.location.reload(true);
  };

  const setStyle = () => {
    setHidden(!hidden);
  };

  const { receivingGroupId, receivingGroupName } = receivingGroupState;

  const {
    data: { groups, error, loading }
  } = props;

  if (loading || error) return null;
  if (localStorage['jwtToken']) {
    return (
      <div className="chat-page">
        <Group
          style={{ display: hidden ? 'none' : 'block' }}
          groups={groups}
	  user={user}
	  selectedGroup={setSelectedGroup}
	  userLogout={userLogout}
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
  return <Login userLogin={userLogin} />;
};

export default compose(
  graphql(GroupQuery),
  graphql(UserLoginMutation, { name: 'userLogin' }),
)(App);
