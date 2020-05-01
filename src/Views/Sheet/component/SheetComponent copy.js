import React, { useState } from "react";
import LiteHeader from "Common/Header/LiteHeader";
import AsyncLoad from "global/AsyncLoad";
import { entryBackend } from "Views/ClientEntry/clientEntry_backend";
import Loader from "global/Loader/LoaderComponent";
import { clientsBackend } from "Views/Client/client_backend";
import SheetComponentPage from "./SheetComponentPage";
import {
  Row,
  Card,
  CardHeader,
  Table,
  CardFooter,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Col,
  FormGroup,
  Input,
  Button,
} from "reactstrap";
import { Link } from "react-router-dom";

const SheetComponent = (props) => {
  const [uid] = useState(props.uid);
  const [date] = useState(props.id);
  const [entry, setEntry] = useState("");
  const [receive, setReceive] = useState("");
  const [total, setTotal] = useState("");

  const [modal, setModal] = React.useState(false);
  const [modal2, setModal2] = React.useState(false);

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
  return (
    <>
      <LiteHeader />
      <div className="ml-3" style={{ marginTop: -15 + "rem" }}>
        <Row>
          <div className="col-lg-9">
            <h1
              className="text-white text-weight-bold"
              style={{ fontSize: "40px" }}
            >
              Date: {date}
            </h1>
          </div>
        </Row>

        <AsyncLoad
          promise={entryBackend.getDateEntry(date)}
          LoadComponent={Loader}
        >
          {(entries, errors) => {
            return entries.map((entry) => {
              return (
                <AsyncLoad
                  promise={clientsBackend.getClientDetail(entry.client_id)}
                  LoadComponent={Loader}
                >
                  {(client, error) => {
                    return (
                      <SheetComponentPage
                        client={client}
                        entry={entry}
                        uid={uid}
                        toggle={toggle}
                        deleteToggle={toggle2}
                        editRedirect={`/sheet/${entry.client_id}/${entry.id}/edit`}
                      />
                    );
                  }}
                </AsyncLoad>
              );
            });
          }}
        </AsyncLoad>
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
