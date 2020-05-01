import React from "react";
import { Link } from "react-router-dom";
import { Button, Badge } from "reactstrap";
const ListItem = (props) => {
  let { entry, tax, toggle, togglex4, editRedirect } = props;
  return (
    <tr>
      {props.invoiceNo ? (
        <th scope="row">
          <input
            type="checkbox"
            onClick={props.isChecked}
            value={props.index}
          />
        </th>
      ) : (
        <></>
      )}
      <th scope="row">{entry.date}</th>
      <th scope="row">
        {entry.product}{" "}
        {entry.issued === "true" ? (
          <Badge size="sm" color="success">
            <i className="fa fa-check mr-0"></i>
          </Badge>
        ) : (
          <Badge size="sm" color="warning">
            pending
          </Badge>
        )}
      </th>
      <th scope="row">{entry.description}</th>
      <th scope="row">{entry.qty}</th>
      <th scope="row">{entry.rate}</th>
      <th scope="row">&#8377;{entry.amount}</th>
      <th scope="row">
        &#8377;{tax.cgst} ({entry.cgst}%)
      </th>
      <th scope="row">
        &#8377;{tax.cgst} ({entry.cgst}%)
      </th>
      <th scope="row">&#8377;{entry.total}</th>
      <th scope="row">
        &#8377;{entry.receive}{" "}
        {entry.total === 0 ? (
          <Badge size="sm" color="success">
            Paid
          </Badge>
        ) : (
          <Badge size="sm" color="warning">
            received
          </Badge>
        )}
      </th>
      <th scope="row" className="text-center">
        <Button size="sm" color="success" onClick={(e) => toggle(e, entry)}>
          <i className="ni ni-curved-next"></i>
        </Button>
        <Link className="btn btn-warning btn-sm" to={editRedirect}>
          <i className="ni ni-ruler-pencil"></i>
        </Link>
        <Button size="sm" color="danger" onClick={(e) => togglex4(e, entry.id)}>
          <i className="fa fa-times"></i>
        </Button>
      </th>
    </tr>
  );
};

export default ListItem;
