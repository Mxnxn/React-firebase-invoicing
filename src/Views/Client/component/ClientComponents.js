import React from "react";
/* eslint-disable */

import AsyncLoad from "global/AsyncLoad";
import Loader from "../../../global/Loader/Loader";
import Liteheader from "../../../Common/Header/LiteHeader";
// import SheetComponentPage from "../../Sheet/components/SheetComponentPage";
import ClientComponentPage from "./ClientComponentPage";
// import { client_backend } from "../client_backend";
// import { entryBackend } from "../../ClientViseEntry/clientEntry_backend";
import { materialsBackend } from "../../Material/material_backend";

import { clientsBackend } from "../client_backend";
import { entryBackend } from "../../ClientEntry/clientEntry_backend";
import { Row, Container, Col } from "reactstrap";
import * as xlsx from "xlsx";

const ClientComponents = (props) => {
  const client_id = props.id;

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

  const downloadXLSX = async (entries, title, total) => {
    let data =
      "date,product,description,qty,rate,amount,cgst,sgst,total,receive,issued";
    data = [data.split(",")];
    for (let entry of entries) {
      const entryKeys = [
        "date",
        "product",
        "description",
        "qty",
        "rate",
        "amount",
        "cgst",
        "sgst",
        "total",
        "receive",
        "issued",
      ];
      data.push(Array.from(entryKeys.map((key) => entry[key])));
    }
    let ws_name = title;
    let wb = xlsx.utils.book_new();
    let ws = xlsx.utils.aoa_to_sheet(data);
    xlsx.utils.book_append_sheet(wb, ws, ws_name);
    xlsx.writeFile(wb, `${title}.xlsx`);
  };

  return (
    <>
      <Liteheader bg="primary" />

      <AsyncLoad
        promise={clientsBackend.getClientDetail(client_id)}
        LoadComponent={Loader}
      >
        {(sheet, error) => {
          return (
            <AsyncLoad
              promise={Promise.all(sheet.entries.map(entryBackend.getEntry))}
              LoadComponent={Loader}
            >
              {(entries, error) => {
                let total = getTotal(entries);
                let overall = getTotalforDisplay(entries);
                return (
                  <AsyncLoad
                    promise={Promise.all(
                      sheet.materials.map(materialsBackend.getMaterials)
                    )}
                    LoadComponent={Loader}
                  >
                    {(materials, error) => {
                      return (
                        <>
                          <Container
                            fluid
                            className={
                              props.darkModeFlag === "false"
                                ? ""
                                : "bg-gradient-primary"
                            }
                            style={{ marginTop: -15 + "rem" }}
                          >
                            <Row>
                              <Col xl="12">
                                <h1
                                  className="text-white text-weight-bold"
                                  style={{ fontSize: "40px" }}
                                >
                                  {sheet.clientName}
                                </h1>
                                <h4 className="text-white">
                                  Firm: {sheet.clientFirm}
                                </h4>
                              </Col>
                            </Row>
                            <ClientComponentPage
                              darkModeFlag={props.darkModeFlag}
                              sheet={sheet}
                              entries={entries}
                              uid={props.uid}
                              total={total}
                              user={props.user}
                              overall={overall}
                              materials={materials}
                              downloadHandler={() =>
                                downloadXLSX(entries, sheet.clientName, total)
                              }
                            />
                          </Container>
                        </>
                      );
                    }}
                  </AsyncLoad>
                );
              }}
            </AsyncLoad>
          );
        }}
      </AsyncLoad>
    </>
  );
};

export default ClientComponents;
