import React from "react";

const DropdownList = props => {
  let htmlFor = "input" + props.usage + "3";
  let extraClasses = "";
  let clients = props.clients;
  if (props.extraClasses) extraClasses = props.extraClasses;

  let status = false;

  function lol() {
    status = !status;
  }

  return (
    <select
      id={htmlFor}
      toggle={lol()}
      onClick="select"
      className={`form-control form-control-alternative ${extraClasses}`}
      placeholder={props.usage}
      value={props.value}
      onChange={props.onChange}
    >
      <option value="Not Selected">Select One</option>
      {clients.map(client => {
        return (
          <option style={{ paddingLeft: "10px" }} multiple value={client.id}>
            {client.clientName}
          </option>
        );
      })}
    </select>
  );
};

export default DropdownList;
