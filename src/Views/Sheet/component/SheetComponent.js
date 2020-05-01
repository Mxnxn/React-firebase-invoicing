import React, { useState } from "react";
import AsyncLoad from "global/AsyncLoad";
import { entryBackend } from "../../ClientEntry/clientEntry_backend";
import Loader from "global/Loader/Loader";
import SheetComponentPage from "./SheetComponentPage";

import {
  Row,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Col,
  FormGroup,
  Input,
  Button,
} from "reactstrap";

import InvoiceComponentPage from "../../Invoice/Template/InvoiceComponentPagex";
import { invoiceBackend } from "../../Invoice/invoice_backend";
import LoaderComponent from "global/Loader/LoaderComponent";
// import { Link } from "react-router-dom";

const SheetComponent = (props) => {
  const [uid] = useState(props.uid);
  const [last_invoiceno] = useState(
    window.localStorage.getItem("last_invoice_number")
      ? window.localStorage.getItem("last_invoice_number")
      : ""
  );
  const [date] = useState(props.id);
  const [entry, setEntry] = useState("");
  const [receive, setReceive] = useState("");
  const [total, setTotal] = useState("");

  const [clientInv, setClientInv] = useState("");
  const [entries, setEntries] = useState("");
  const [overall, setOverall] = useState("");
  const [user, setUser] = useState("");
  const [flag, setFlag] = useState(false);
  const [loading, setLoading] = useState(false);

  const [modal, setModal] = React.useState(false);
  const [modal2, setModal2] = React.useState(false);

  const [onSuccessfulSavingFlag, setSuccessFlag] = React.useState(false);
  const [onFailureFlag, setFailureFlag] = React.useState(false);
  const [downloadFlag] = React.useState(false);
  const [invoiceNo, setInvoiceNo] = React.useState(false);

  const [progress, setProgress] = React.useState(false);

  const toggle = (e, entry) => {
    try {
      setEntry(entry);
      setReceive(entry.receive);
      setTotal(entry.total);
      setModal(!modal);
    } catch (e) {}
  };

  const toggle2 = (e, entry) => {
    try {
      setEntry(entry);
      setModal2(!modal2);
    } catch (e) {}
  };

  const Recieved = (e) => {
    setReceive(e.target.value);
    let temp = Number(entry.amount) + Number((entry.amount * entry.cgst) / 50);
    if (!e.target.value) {
      setTotal(temp);
    } else setTotal(temp - e.target.value);
  };

  const deleteEntry = (e) => {
    entryBackend
      .deleteEntry(entry.id)
      .then((value) => {
        setModal2(!modal2);
        window.location.reload();
        setEntry("");
      })
      .catch((err) => {
        setModal2(!modal2);
      });
  };

  const Add = (e) => {
    entry.total = total;
    entry.receive = receive;
    entryBackend.updateEntry(entry);
    setReceive("");
    setTotal("");
    setEntry("");
    setModal(!modal);
  };

  const btnInvoice = (e, client, entries, overall, user) => {
    try {
      setClientInv(client);
      setEntries(entries);
      setOverall(overall);
      setUser(user);
      setFlag(!flag);
    } catch (err) {
      setFlag(!flag);
    }
  };

  const [client] = React.useState(props.client);

  // React.useEffect(() => {
  //   let entries = [];
  //   let clientsx = clientsBackend.getAllClientWithDate(uid, date);
  //   clientsx.then((obj) => {
  //     setClients(obj);
  //     setLoading(true);
  //   });
  // }, []);

  const saveToInvoices = (e) => {
    setProgress(true);
    let total = Number(0);
    entries.forEach((entry) => {
      total += Number(entry.total);
    });

    let object = {
      uid: uid,
      invno: invoiceNo,
      date: date,
      entries: entries,
      clientName: clientInv.clientName,
      clientFirm: clientInv.clientFirm,
      clientGST: clientInv.clientGST,
      clientAddress: clientInv.clientAddress,
      clientNumber: clientInv.clientNumber,
      total: total,
    };

    window.localStorage.setItem("last_invoice_number", invoiceNo);

    entryBackend.updateStatusOfEntry(object.entries);

    invoiceBackend
      .addNewInvoice(object)
      .then((done) => {
        setSuccessFlag(true);
      })
      .catch((err) => {
        console.log(err);
        setFailureFlag(true);
      });

    setProgress(false);

    // {
    //   invno: "xyz",
    //   data:"20-20-2020",
    //   entries : [
    //     {
    //       id:"1",
    //       name:"hellow",

    //     },
    //     {
    //       id:"2",
    //       name:"world"
    //     }
    //   ],
    //   client:{

    //   },user:"xyz"
  };

  return (
    <>
      <AsyncLoad
        promise={entryBackend.getAllOfClientWithDate(client.id, date)}
        LoadComponent={Loader}
      >
        {(fetchedEntries, errors) => {
          return fetchedEntries.length >= 1 ? (
            <SheetComponentPage
              download={downloadFlag}
              darkModeFlag={props.darkModeFlag}
              client={client}
              entry={fetchedEntries}
              uid={uid}
              toggle={toggle}
              deleteToggle={toggle2}
              editRedirect={`/sheet/${entry.client_id}/${entry.id}/edit`}
              invoice={btnInvoice}
            />
          ) : (
            <></>
          );
        }}
      </AsyncLoad>
      <Row className="mt-3" style={{ width: "100vw" }}>
        {loading ? (
          <>
            <Col xl="4" className="text-right">
              {progress ? (
                <>
                  <LoaderComponent></LoaderComponent>
                </>
              ) : (
                <></>
              )}
              {onSuccessfulSavingFlag ? (
                <>
                  <div className="alert alert-success">It has been saved!</div>
                </>
              ) : (
                <></>
              )}
              {onFailureFlag ? (
                <div className="alert alert-danger">Something went wrong!</div>
              ) : (
                <></>
              )}

              <Button
                color={props.darkModeFlag === "false" ? "primary" : "success"}
                onClick={(e) => saveToInvoices(e)}
              >
                Save
              </Button>
              <h6
                className={
                  props.darkModeFlag === "false"
                    ? "mt-3 heading text-danger"
                    : "mt-3 heading text-white"
                }
              >
                * It's require to save data if Invoice is issued
              </h6>
            </Col>
            <Col>
              <InvoiceComponentPage
                ino={invoiceNo}
                date={date}
                sheet={clientInv}
                entries={entries}
                total={total}
                owner={user}
                overall={overall}
              />
            </Col>
            <Col xl="4"></Col>
          </>
        ) : (
          <></>
        )}
      </Row>
      <div>
        <Modal isOpen={flag} toggle={(e) => setFlag(!flag)}>
          <ModalHeader className="bg" toggle={(e) => setFlag(!flag)}>
            Invoice Number:
          </ModalHeader>
          <ModalBody className="bg">
            <div className="alert alert-warning">
              Warning: Enter and Save new invoice number else existing invoice
              with that number will be erased{" "}
            </div>
            <Input
              className="form-control-alternative"
              placeholder="Number"
              type="number"
              name="invoiceNo"
              value={invoiceNo}
              onChange={(e) => setInvoiceNo(e.target.value)}
            />
            {last_invoiceno ? (
              <div className="mt-2">
                <small className="text-muted">{"Last invoice number : "}</small>
                <small className="text-danger">{last_invoiceno}</small>
                <small className="text-muted">{", Try: "}</small>
                <small className=" text-left text-success">
                  {Number(last_invoiceno) + 1}
                </small>
              </div>
            ) : (
              <span className="text-danger">
                Last invoice number : Error getting it!
              </span>
            )}
          </ModalBody>
          <ModalFooter className="bg">
            <Button
              color={loading ? "danger" : "primary"}
              onClick={(e) => {
                setFlag(!flag);
                setLoading(true);
              }}
            >
              {loading ? "Reload" : "Preview"}
            </Button>{" "}
            <Button
              color="secondary"
              className="btn btn-warning"
              onClick={(e) => {
                setFlag(!flag);
                setLoading(false);
              }}
            >
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </div>
      <div>
        <Modal isOpen={modal} toggle={toggle}>
          <ModalHeader className="bg-default " toggle={toggle}>
            <h3 className="text-white">Update Entry</h3>
          </ModalHeader>
          <ModalBody className="bg-default">
            <Row>
              <Col xl="6">
                <FormGroup>
                  <label
                    className="form-control-label text-white"
                    htmlFor="input-name"
                  >
                    Total
                  </label>
                  <Input
                    className="form-control-alternative"
                    placeholder="Name"
                    type="text"
                    name="total"
                    readOnly
                    value={total}
                  />
                </FormGroup>
              </Col>
              <Col xl="6">
                <FormGroup>
                  <label
                    className="form-control-label text-white"
                    htmlFor="input-name"
                  >
                    Received
                  </label>
                  <Input
                    className="form-control-alternative"
                    placeholder="Name"
                    type="number"
                    name="rate"
                    value={receive}
                    onChange={(e) => Recieved(e)}
                  />
                </FormGroup>
              </Col>
            </Row>
          </ModalBody>
          <ModalFooter className="bg-default">
            <Button color="primary" className="btn btn-success" onClick={Add}>
              Add
            </Button>{" "}
            <Button
              color="secondary"
              className="btn btn-warning"
              onClick={(e) => setModal(!modal)}
            >
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </div>
      {/* FOR DELETING ENTRIES */}
      <div>
        <Modal isOpen={modal2} toggle={toggle2}>
          <ModalHeader className="bg-default " toggle={toggle2}>
            <h3 className="text-white">Delete Entry</h3>
          </ModalHeader>
          <ModalBody className="bg-default">
            <Row>
              <Col xl="6" className="text-white">
                Are you sure?
              </Col>
            </Row>
          </ModalBody>
          <ModalFooter className="bg-default">
            <Button
              color="primary"
              className="btn btn-danger"
              onClick={deleteEntry}
            >
              Delete
            </Button>{" "}
            <Button
              color="secondary"
              className="btn btn-info"
              onClick={(e) => {
                setEntry("");
                setModal2(!modal2);
              }}
            >
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    </>
  );
};

export default SheetComponent;
