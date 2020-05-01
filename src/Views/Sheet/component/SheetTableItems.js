import React from "react";
import { Button, Badge } from "reactstrap";
import { Link } from "react-router-dom";

const SheetTableItems = (props) => {
  let { entry } = props;

  return (
    <tr>
      <th scope="row">
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
      <th scope="row">{entry.product}</th>
      <th scope="row">{entry.description}</th>
      <th scope="row">{entry.qty}</th>
      <th scope="row">{entry.rate}</th>
      <th scope="row">&#8377;{entry.amount}</th>
      <th scope="row">
        &#8377;{(entry.amount * (entry.cgst / 100)).toFixed(2)}({entry.cgst}
        %)
      </th>
      <th scope="row">
        &#8377;{(entry.amount * (entry.cgst / 100)).toFixed(2)}({entry.cgst}
        %)
      </th>
      <th scope="row">&#8377;{entry.total}</th>
      <th scope="row">
        &#8377;{entry.receive}{" "}
        {entry.total === 0 ? (
          <Badge color="success">PAID</Badge>
        ) : (
          <Badge color="warning">RECEIVED</Badge>
        )}
      </th>
      <th scope="row">
        <Button
          size="sm"
          color="success"
          onClick={(e) => props.toggle(e, entry)}
        >
          <i className="ni ni-curved-next"></i>
        </Button>
        <Link className="btn btn-sm btn-warning" to={props.editRedirect}>
          <i className="ni ni-ruler-pencil"></i>
        </Link>
        <Button
          size="sm"
          color="danger"
          onClick={(e) => props.deleteToggle(e, entry)}
        >
          <i className="fa fa-times"></i>
        </Button>
      </th>
    </tr>
  );
};

export default SheetTableItems;
