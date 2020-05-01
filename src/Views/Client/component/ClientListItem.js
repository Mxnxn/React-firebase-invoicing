import React from "react";
import { Link } from "react-router-dom";
// import { Button } from "reactstrap";

const ClientListItem = (props) => {
  let link = `/client/${props.client.id}`;

  return (
    <tr>
      <th scope="row">
        <Link
          className={
            props.darkModeFlag === "false"
              ? "text-sm text-info"
              : "text-sm text-primary"
          }
          to={link}
        >
          {props.client.clientName}
        </Link>
      </th>

      <td>{props.client.clientFirm}</td>
      <td>{props.client.clientNumber}</td>
    </tr>
  );
};

export default ClientListItem;
