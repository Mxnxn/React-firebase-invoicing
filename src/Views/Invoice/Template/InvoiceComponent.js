import React, { Component } from "react";
// eslint-disable-next-line
import { withRouter } from "react-router";

import AsyncLoad from "../global/components/AsyncLoad";
import Loader from "../global/components/Loader/main";
// import SheetComponentPage from "../../Sheet/components/SheetComponentPage";
// import { client_backend } from "../client_backend";
import { entryBackend } from "../ClientViseEntry/clientEntry_backend";
import { materialsBackend } from "../Material/material_backend";
import InvoiceComponentPage from "./InvoiceComponentPagex";

import { clientsBackend } from "../Client/client_backend";

/**
 * Takes a sheet id from the url and fetches the sheet from firebase.
 * This then renders "ListItem" from data which was fetched
 * TODO: divide this component into smaller components
 */
const InvoiceComponent = (props) => {
  const [id] = React.useState(props.match.params.cid);
  console.log(props.download);
  function getTotal(entries) {
    let statex = { cgst: [], sgst: [] };
    for (let entry of entries) {
      for (let key in statex) {
        statex[key].push(Number(entry["amount"]) * (Number(entry[key]) / 100));
      }
    }
    return statex;
  }

  function getTotalforDisplay(entries) {
    let statex = { cgst: "", sgst: "", total: "", receive: "" };
    for (let entry of entries) {
      statex["cgst"] =
        Number(statex["cgst"]) +
        Number(entry["amount"] * (entry["cgst"] / 100));
      statex["sgst"] =
        Number(statex["sgst"]) +
        Number(entry["amount"] * (entry["sgst"] / 100));
      statex["total"] = Number(statex["total"]) + Number(entry["total"]);
      statex["receive"] = Number(statex["receive"]) + Number(entry["receive"]);
    }
    return statex;
  }

  return (
    <AsyncLoad
      promise={clientsBackend.getClientDetail(this.id)}
      LoadComponent={Loader}
    >
      {(sheet, error) => {
        return (
          <AsyncLoad
            promise={Promise.all(sheet.entries.map(entryBackend.getEntry))}
            LoadComponent={Loader}
          >
            {(entries, error) => {
              let total = this.getTotal(entries);
              let overall = this.getTotalforDisplay(entries);
              return (
                <AsyncLoad
                  promise={Promise.all(
                    sheet.materials.map(materialsBackend.getMaterials)
                  )}
                  LoadComponent={Loader}
                >
                  {(materials, error) => {
                    return (
                      <InvoiceComponentPage
                        sheet={sheet}
                        entries={entries}
                        total={total}
                        overall={overall}
                      />
                    );
                  }}
                </AsyncLoad>
              );
            }}
          </AsyncLoad>
        );
      }}
    </AsyncLoad>
  );
};

export default InvoiceComponent;
