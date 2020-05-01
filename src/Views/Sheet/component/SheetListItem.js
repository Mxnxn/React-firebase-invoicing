import React, { useEffect } from "react";
/* eslint-disable */
import { Link } from "react-router-dom";
import { entryBackend } from "Views/ClientEntry/clientEntry_backend";
import { sheetsBackend } from "../sheet_backend";
import LoaderComponent from "global/Loader/LoaderComponent";

const SheetListItem = (props) => {
  let { date } = props;
  const [loading, setLoading] = React.useState(false);

  useEffect(() => {
    entryBackend.getDateEntry(date).then((entries) => {
      if (entries.length === 0 || entries.length < 0) {
        console.log(date);
        sheetsBackend.deleteSheetByDate(date);
        setLoading(true);
      } else {
        setLoading(true);
      }
    });
  });

  let link = "/sheet/" + date;
  return loading ? (
    <tr>
      <th scope="row">
        <Link
          className={
            props.darkModeFlag === "false" ? "text-info" : "text-primary"
          }
          to={link}
        >
          {date ? date : <></>}
        </Link>
      </th>
    </tr>
  ) : (
    <LoaderComponent />
  );
};

export default SheetListItem;
