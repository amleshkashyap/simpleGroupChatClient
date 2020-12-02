import React, { useCallback } from "react";
import Button from "@material-ui/core/Button";

const Group = props => {
  const { groups, user, selectedGroup, userLogout } = props;

  const selectGroupFunction = useCallback((id, name) => {
    selectedGroup(id, name);
  }, [selectedGroup]);

  const logoutUserFunction = useCallback(() => {
    userLogout();
  }, [userLogout]);

  return (
    <div className="group-welcome" style={props.style}>
      <div className="group-heading">
	<p>Hello, {user.name}</p>
        <Button
          className="leave"
          size="small"
          variant="outlined"
          onClick={logoutUserFunction}
        >
          Logout
        </Button>
      </div>
      <div className="select-group">
        {groups.map(item =>
            <div
              key={item.id}
              className="groups"
              onClick={() => selectGroupFunction(item.id, item.name)}
            >
              {item.name}
            </div>
        )}
      </div>
    </div>
  );
};

export default Group;
