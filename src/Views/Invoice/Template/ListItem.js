import React from "react";
import Button from "../global/components/Button";

const ListItem = (props) => {
  let { entry, tax, deleteHandler, value } = props;
  return (
    <tr className="ListItemStateless">
      <td>{value + 1}</td>
      <td>{entry.date}</td>
      <td>{entry.product}</td>
      <td>{entry.description}</td>
      <td>{entry.qty}</td>
      <td>{entry.rate}</td>
      <td>&#8377;{entry.amount}</td>
      <td>
        &#8377;{tax.cgst} ({entry.cgst}%)
      </td>
      <td>
        &#8377;{tax.cgst} ({entry.cgst}%)
      </td>
      <td>&#8377;{entry.total}</td>
      <td>
        <Button
          className="btn btn-warning"
          icon="glyphicon-remove"
          onClick={deleteHandler}
        >
          Delete
        </Button>
      </td>
    </tr>
  );
};

export default ListItem;
