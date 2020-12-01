import React, { useCallback } from "react";
import Button from "@material-ui/core/Button";

const User = props => {
  const { id, email, name, selectedMail } = props;

  const selectUserFunction = useCallback((mail, user) => {
    selectedMail(mail, user);
  }, [selectedMail]);

  return (
    <div className="group-welcome" style={props.style}>
      <div className="group-heading">
        <p>Hello, {name}</p>
      </div>
    </div>
  );
};

export default User;
