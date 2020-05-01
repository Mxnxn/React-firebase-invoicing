import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { entryBackend } from "../../ClientEntry/clientEntry_backend";

import { materialsBackend } from "../../Material/material_backend";
import { invoiceBackend } from "Views/Invoice/invoice_backend";
import ListItem from "./ListItem";
import LoaderComponent from "global/Loader/LoaderComponent";

import {
  Row,
  Col,
  Card,
  CardHeader,
  Table,
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  FormGroup,
  Input,
} from "reactstrap";
import InvoiceComponentPage from "Views/Invoice/Template/InvoiceComponentPagex";

const ClientComponentPage = (props) => {
  let { sheet, materials, entries, overall } = props;
  const [uid] = useState(props.uid);

  const [obj, setObj] = useState("");
  const [objMaterial, setObjMaterial] = useState("");

  const [receive, setReceive] = useState("");
  const [total, setTotal] = useState("");

  const [material_name, setMaterialName] = useState("");
  const [material_rate, setMaterialRate] = useState("");

  const [materialId, setMaterialId] = useState("");

  const [entryId, setEntryId] = useState("");

  // TO UPDATE RECEIVE AMOUNT
  const [modal, setModal] = useState(false);
  // TO ADD NEW MATERIAL
  const [modalx2, setModalx2] = useState(false);
  // DELETE ADDED MATERIAL
  const [modalx3, setModalx3] = useState(false);
  // TO DELETE ENTRY
  const [modalx4, setModalx4] = useState(false);
  // TO UPDATE MATERIALs
  const [modalx5, setModalx5] = useState(false);
  //TO REPLACE ALL ENTRIES
  const [filterEntries, setFilterEntries] = useState("");
  // TO SHOW MODAL
  const [searchModal, setSearchModal] = useState(false);
  const [date, setDate] = useState("");

  //TO SET AND SHOW INVOICE
  const [invoiceNo, setInvno] = useState("");
  const [flag, setFlag] = useState(false);
  const [invTotal, setInvTotal] = useState(Number(0));
  let [filterArr] = useState([]);
  let [invoiceArr] = useState([]);

  let [arr] = useState([]);

  let [selectionDone, setSelectionDone] = useState(false);

  const [user] = useState(props.user);

  const [successFlag, setSuccessFlag] = useState(false);
  const [failFlag, setFailureFlag] = useState(false);
  const [progress, setProgress] = useState(false);

  const [lastInvoiceNo] = useState(
    window.localStorage.getItem("last_invoice_number")
      ? window.localStorage.getItem("last_invoice_number")
      : ""
  );

  const toggleSearchModal = (e) => {
    setSearchModal(!searchModal);
  };

  const togglex2 = (e) => {
    try {
      setMaterialRate("");
      setMaterialName("");
      setModalx2(!modalx2);
    } catch (err) {
      setModalx2(!modalx2);
    }
  };
  const togglex3 = (e, id) => {
    try {
      setMaterialId(id);
      setModalx3(!modalx3);
    } catch (errr) {
      setModalx3(!modalx3);
    }
  };
  const togglex4 = (e, id) => {
    try {
      setEntryId(id);
      setModalx4(!modalx4);
    } catch (err) {
      setModalx4(!modalx4);
    }
  };
  const toggle = (e, objx) => {
    try {
      setObj(objx);
      setTotal(objx.total);
      setReceive(objx.receive);

      setModal(!modal);
    } catch (err) {
      setModal(!modal);
    }
  };

  const togglex5 = (e, objx) => {
    try {
      setObjMaterial(objx);
      setMaterialName(objx.material_name);
      setMaterialRate(objx.material_rate);
      setModalx5(!modalx5);
    } catch (err) {
      setModalx5(!modalx5);
    }
  };

  const updateMaterialEntry = (e) => {
    objMaterial.material_name = material_name;
    objMaterial.material_rate = material_rate;
    materialsBackend
      .updateEntry(objMaterial)
      .then((value) => {
        setModalx5(!modalx5);
      })
      .catch((err) => {
        alert(err);
      });
  };

  const AddNewMaterial = (e) => {
    materialsBackend
      .addNewMaterial(material_name, material_rate, sheet.id)
      .then((value) => {
        setModalx2(!modalx2);
        window.location.reload();
      })
      .catch((err) => {
        alert(err);
      });
  };

  const removeEntry = (e) => {
    entryBackend
      .deleteEntry(entryId)
      .then((value) => {
        setModalx4(!modalx4);
        window.location.reload();
      })
      .catch((err) => {
        alert(err);
      });
  };
  const removeNewMaterial = (e) => {
    materialsBackend
      .deleteEntry(materialId)
      .then((value) => {
        setModalx3(!modalx3);
        window.location.reload();
      })
      .catch((err) => {
        alert(err);
      });
  };
  const Add = (e) => {
    obj.total = total;
    obj.receive = receive;
    entryBackend.updateEntry(obj);
    setModal(!modal);
    console.log(obj);
  };

  const Recieved = (e) => {
    const x = obj.amount + obj.amount * 0.12;
    setReceive(e.target.value);
    setTotal(x - e.target.value);
  };

  const searchFunc = (e) => {
    setSearchModal(!searchModal);
    if (date) {
      setFilterEntries(
        entries.filter((row) => {
          return row.date.match(date.toString());
        })
      );
    }
  };

  useEffect(() => {
    if (filterEntries) {
      console.log("HERE");
      filterEntries.forEach((fe) => {
        filterArr.push({ isChecked: false });
      });
    }
  }, [filterEntries, filterArr]);

  const checkFunc = (e) => {
    setFlag(!flag);
  };

  useEffect(() => {
    entries.forEach((entry) => {
      arr.push({ isChecked: false });
    });
    return;
  }, [entries, arr]);

  const checkedState = (e) => {
    arr[e.target.value].isChecked = !arr[e.target.value].isChecked;
    invoiceArr.length = 0;
    setSelectionDone(false);
  };

  const checkedFilterState = (e) => {
    filterArr[e.target.value].isChecked = !filterArr[e.target.value].isChecked;
    invoiceArr.length = 0;
    setSelectionDone(false);
  };

  const doneSelection = (e) => {
    let total = Number(0);
    arr.map((el, index) => {
      if (el.isChecked === true) {
        invoiceArr.push(entries[index]);
        total +=
          Number(entries[index].amount) +
          Number(entries[index].amount) * (Number(entries[index].cgst) / 50);
      }
      return null;
    });
    setInvTotal(total);
    if (invoiceArr) setSelectionDone(true);
  };

  const cancelSelection = (e) => {
    arr = [];
    setInvTotal(Number(0));
    setInvno("");
  };

  const doneSelectionInFilter = (e) => {
    let totalx;
    filterArr.map((el, index) => {
      if (el.isChecked === true) {
        invoiceArr.push(filterEntries[index]);
        totalx +=
          Number(entries[index].amount) +
          Number(entries[index].amount) * (Number(entries[index].cgst) / 50);
      }
      return "";
    });
    setInvTotal(totalx);
    if (invoiceArr) setSelectionDone(true);
    return "";
  };

  const cancelSelectionInFilter = (e) => {
    filterArr = [];
    setInvTotal(Number(0));
    setInvno("");
  };

  const saveInvoice = (e) => {
    setProgress(true);
    let object = {
      uid: uid,
      invno: invoiceNo,
      date: date,
      entries: invoiceArr,
      clientName: sheet.clientName,
      clientFirm: sheet.clientFirm,
      clientGST: sheet.clientGST,
      clientAddress: sheet.clientAddress,
      clientNumber: sheet.clientNumber,
      total: invTotal,
    };

    window.localStorage.setItem("last_invoice_number", invoiceNo);
    console.log(object);
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
  };

  return (
    <>
      <Row className="">
        <Col>
          <div className="mb-1">
            {filterEntries ? (
              <></>
            ) : (
              <Button
                onClick={(e) => setSearchModal(!searchModal)}
                size="sm"
                color="white"
              >
                <i className="fa fa-filter"></i> Filter
              </Button>
            )}
            {filterEntries ? (
              <>
                {" "}
                <Button
                  onClick={(e) => {
                    setDate("");
                    setFilterEntries("");
                  }}
                  size="sm"
                  color="danger"
                >
                  <i className="fa fa-times"></i> Cancel
                </Button>
              </>
            ) : (
              <></>
            )}
          </div>
          <Card
            className={
              props.darkModeFlag === "false" ? "bg-default shadow" : "bg shadow"
            }
          >
            <CardHeader className="bg-transparent border-0">
              <Row>
                <Col xl="9">
                  <h3
                    className={
                      props.darkModeFlag === "false"
                        ? "text-white"
                        : "text-default"
                    }
                  >
                    Clients/Customers
                  </h3>
                </Col>

                <Col xl="1" className="text-center">
                  <Link
                    to={`/client/${uid}/${sheet.id}/entry/new`}
                    className="btn-sm btn btn-warning"
                  >
                    Add Entry
                  </Link>
                </Col>
                <Col xl="1" className="text-center">
                  <Button onClick={checkFunc} size="sm" color="primary">
                    Invoice
                  </Button>
                </Col>
                <Col xl="1" className="text-center">
                  <Button
                    onClick={props.downloadHandler}
                    size="sm"
                    color="danger"
                  >
                    Download
                  </Button>
                </Col>
              </Row>
            </CardHeader>
            <Table
              className={
                props.darkModeFlag === "false"
                  ? "align-items-center table-dark table-flush"
                  : "align-items-center table table-flush"
              }
              responsive
            >
              <thead
                className={
                  props.darkModeFlag === "false" ? "thead-dark" : "thead-light"
                }
              >
                <tr>
                  {invoiceNo ? <th scope="col">Select</th> : <></>}
                  <th scope="col">Date</th>
                  <th scope="col">Product</th>
                  <th scope="col">Description</th>
                  <th scope="col">Qty</th>
                  <th scope="col">Rate</th>
                  <th scope="col">SubTotal(&#8377;)</th>
                  <th scope="col">CGST(&#8377;)</th>
                  <th scope="col">SGST(&#8377;)</th>
                  <th scope="col">Due(&#8377;)</th>
                  <th scope="col">Received(&#8377;)</th>
                  <th scope="col">Receive/Edit/Delete</th>
                </tr>
              </thead>
              <tbody>
                {filterEntries
                  ? filterEntries.map((entry, index) => {
                      let stats = { cgst: [], sgst: [] };
                      stats.cgst.push((entry.amount * (entry.cgst / 50)) / 2);
                      return (
                        <ListItem
                          invoiceNo={invoiceNo}
                          entry={entry}
                          tax={stats}
                          index={index}
                          isChecked={checkedFilterState}
                          // receiveRedirect={`/receivePayment/${entry.id}`}
                          editRedirect={`/client/${sheet.id}/${entry.id}/edit`}
                          key={entry.id}
                          toggle={toggle}
                          togglex4={togglex4}
                        />
                      );
                    })
                  : entries.map((entry, index) => {
                      let stats = { cgst: [], sgst: [] };
                      stats.cgst.push((entry.amount * (entry.cgst / 50)) / 2);
                      return (
                        <ListItem
                          invoiceNo={invoiceNo}
                          entry={entry}
                          tax={stats}
                          index={index}
                          isChecked={checkedState}
                          // receiveRedirect={`/receivePayment/${entry.id}`}
                          editRedirect={`/client/${sheet.id}/${entry.id}/edit`}
                          key={entry.id}
                          toggle={toggle}
                          togglex4={togglex4}
                        />
                      );
                    })}
              </tbody>
            </Table>
          </Card>
        </Col>
      </Row>
      {invoiceNo ? (
        <Row className="mt-2">
          {filterEntries ? (
            <Col xl="4">
              <Button size="sm" onClick={doneSelectionInFilter} color="success">
                <i className="fa fa-check"></i>
              </Button>
              <Button
                size="sm"
                onClick={cancelSelectionInFilter}
                color="danger"
              >
                <i className="fa fa-times"></i>
              </Button>
            </Col>
          ) : (
            <Col xl="4">
              <Button size="sm" onClick={doneSelection} color="success">
                <i className="fa fa-check"></i>
              </Button>
              <Button size="sm" onClick={cancelSelection} color="danger">
                <i className="fa fa-times"></i>
              </Button>
            </Col>
          )}
          <Col xl="5">
            {selectionDone ? (
              <InvoiceComponentPage
                entries={invoiceArr}
                total={invTotal}
                ino={invoiceNo}
                date={date ? date : ""}
                sheet={sheet}
                owner={user}
                overall={overall}
              />
            ) : (
              <> </>
            )}
          </Col>
          <Col>
            {progress ? <LoaderComponent /> : <></>}
            {successFlag ? (
              <div className="alert alert-success">Successfully saved!</div>
            ) : (
              <></>
            )}
            {failFlag ? (
              <div className="alert alert-danger">Something got wrong!</div>
            ) : (
              <></>
            )}

            {selectionDone ? (
              <Button color="white" onClick={saveInvoice}>
                Save
              </Button>
            ) : (
              <></>
            )}
          </Col>
        </Row>
      ) : (
        <></>
      )}

      <Row className="mt-3">
        <Col>
          <Card
            className={
              props.darkModeFlag === "false" ? "bg-default shadow" : "bg shadow"
            }
          >
            <CardHeader className="bg-transparent border-0">
              <h3
                className={
                  props.darkModeFlag === "false" ? "text-white" : "text-default"
                }
              >
                Overall
              </h3>
            </CardHeader>
            <Table
              className={
                props.darkModeFlag === "false"
                  ? "align-items-center table-dark table-flush"
                  : "align-items-center table table-flush"
              }
              responsive
            >
              <thead
                className={
                  props.darkModeFlag === "false" ? "thead-dark" : "thead-light"
                }
              >
                <tr>
                  <th scope="col">CGST(&#8377;)</th>
                  <th scope="col">SGST(&#8377;)</th>
                  <th scope="col">Total(&#8377;)</th>
                  <th scope="col">Received(&#8377;)</th>
                </tr>
              </thead>
              <tbody>
                {overall.cgst ? (
                  <tr className="ListItemStateless">
                    <th scope="row">&#8377;{overall.cgst}</th>
                    <th scope="row">&#8377;{overall.sgst}</th>
                    <th scope="row">&#8377;{overall.total}</th>
                    <th scope="row">&#8377;{overall.receive}</th>
                  </tr>
                ) : (
                  <></>
                )}
              </tbody>
            </Table>
          </Card>
        </Col>
        <Col>
          <Card
            className={
              props.darkModeFlag === "false" ? "bg-default shadow" : "bg shadow"
            }
          >
            <CardHeader className="bg-transparent border-0">
              <Row>
                <Col xs="10">
                  <h3
                    className={
                      props.darkModeFlag === "false"
                        ? "text-white"
                        : "text-default"
                    }
                  >
                    Materials/Products
                  </h3>
                </Col>
                <Col xs="2" className="d-flex py-1 flex-row-reverse">
                  <Button size="sm" color="warning" onClick={togglex2}>
                    New
                  </Button>
                </Col>
              </Row>
            </CardHeader>
            <Table
              className={
                props.darkModeFlag === "false"
                  ? "align-items-center table-dark table-flush"
                  : "align-items-center table table-flush"
              }
              responsive
            >
              <thead
                className={
                  props.darkModeFlag === "false" ? "thead-dark" : "thead-light"
                }
              >
                <tr>
                  <th scope="col">Product</th>

                  <th scope="col">Rate(&#8377;)</th>
                  <th scope="col">Edit</th>
                  <th scope="col">Delete</th>
                </tr>
              </thead>
              <tbody>
                {materials.map((material, index) => (
                  <tr key={index}>
                    <th scope="row">{material.material_name}</th>
                    <th scope="row">&#8377; {material.material_rate}</th>
                    <th scope="row" className="pr-3">
                      <Button
                        size="sm"
                        color="success"
                        onClick={(e) => togglex5(e, material)}
                      >
                        <i className="ni ni-curved-next"></i>
                      </Button>
                    </th>
                    <th scope="row" className="pr-3">
                      <Button
                        size="sm"
                        color="danger"
                        onClick={(e) => togglex3(e, material.id)}
                      >
                        <i className="fa fa-times"></i>
                      </Button>
                    </th>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card>
        </Col>
      </Row>
      {/* MODAL FOR UPDATE RECEIVE */}
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
                    value={total}
                    onChange={(e) => setTotal(e.target.value)}
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
      {/* ADD NEW MATERIAL */}
      <div>
        <Modal isOpen={modalx2} toggle={togglex2}>
          <ModalHeader className="bg-default " toggle={togglex2}>
            <h3 className="text-white">Add Material/Product</h3>
          </ModalHeader>
          <ModalBody className="bg-default">
            <Row>
              <Col xl="6">
                <FormGroup>
                  <label
                    className="form-control-label text-white"
                    htmlFor="input-name"
                  >
                    Name
                  </label>
                  <Input
                    className="form-control-alternative"
                    placeholder="Name"
                    type="text"
                    name="material_name"
                    value={material_name}
                    onChange={(e) => setMaterialName(e.target.value)}
                  />
                </FormGroup>
              </Col>
              <Col xl="6">
                <FormGroup>
                  <label
                    className="form-control-label text-white"
                    htmlFor="input-name"
                  >
                    Rate
                  </label>
                  <Input
                    className="form-control-alternative"
                    placeholder="rate"
                    type="number"
                    name="rate"
                    value={material_rate}
                    onChange={(e) => setMaterialRate(e.target.value)}
                  />
                </FormGroup>
              </Col>
            </Row>
          </ModalBody>
          <ModalFooter className="bg-default">
            <Button
              color="primary"
              className="btn btn-success"
              onClick={AddNewMaterial}
            >
              Add
            </Button>{" "}
            <Button
              color="secondary"
              className="btn btn-warning"
              onClick={togglex2}
            >
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </div>
      {/* DELETE MATERIAL */}
      <div>
        <Modal isOpen={modalx3} toggle={togglex3}>
          <ModalHeader className="bg-default" toggle={togglex3}>
            <h3 className="text-white">Delete Material/Product</h3>
          </ModalHeader>
          <ModalBody className="bg-default">
            <Row>
              <Col>
                <h4 className="text-white">Are you sure?</h4>
              </Col>
            </Row>
          </ModalBody>
          <ModalFooter className="bg-default">
            <Button
              color="primary"
              className="btn btn-Danger"
              onClick={removeNewMaterial}
            >
              Delete
            </Button>{" "}
            <Button
              color="secondary"
              className="btn btn-primary"
              onClick={togglex3}
            >
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </div>
      {/* DELETE ENTRY */}
      <div>
        <Modal isOpen={modalx4} toggle={togglex4}>
          <ModalHeader className="bg-default" toggle={togglex4}>
            <h3 className="text-white">Add Material/Product</h3>
          </ModalHeader>
          <ModalBody className="bg-default">
            <Row>
              <Col>
                <h4 className="text-white">Are you sure?</h4>
              </Col>
            </Row>
          </ModalBody>
          <ModalFooter className="bg-default">
            <Button
              color="primary"
              className="btn btn-Danger"
              onClick={removeEntry}
            >
              Delete
            </Button>{" "}
            <Button
              color="secondary"
              className="btn btn-primary"
              onClick={togglex4}
            >
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </div>
      {/* UPDATE MATERIAL */}
      <div>
        <Modal isOpen={modalx5} toggle={togglex5}>
          <ModalHeader className="bg-default" toggle={togglex5}>
            <h3 className="text-white">Update Material/Product</h3>
          </ModalHeader>
          <ModalBody className="bg-default">
            <Row>
              <Col xl="6">
                <FormGroup>
                  <label
                    className="form-control-label text-white"
                    htmlFor="input-name"
                  >
                    Name
                  </label>
                  <Input
                    className="form-control-alternative"
                    placeholder="Name"
                    type="text"
                    name="material_name"
                    value={material_name}
                    onChange={(e) => setMaterialName(e.target.value)}
                  />
                </FormGroup>
              </Col>
              <Col xl="6">
                <FormGroup>
                  <label
                    className="form-control-label text-white"
                    htmlFor="input-name"
                  >
                    Rate
                  </label>
                  <Input
                    className="form-control-alternative"
                    placeholder="Name"
                    type="number"
                    name="rate"
                    value={material_rate}
                    onChange={(e) => setMaterialRate(e.target.value)}
                  />
                </FormGroup>
              </Col>
            </Row>
          </ModalBody>
          <ModalFooter className="bg-default">
            <Button
              color="primary"
              className="btn btn-success"
              onClick={updateMaterialEntry}
            >
              Update
            </Button>{" "}
            <Button
              color="secondary"
              className="btn btn-primary"
              onClick={(e) => setModalx5(!modalx5)}
            >
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </div>
      {/* FOR INVOICE */}
      <div>
        <Modal isOpen={flag} toggle={(e) => setFlag(!flag)}>
          <ModalHeader className="bg" toggle={(e) => setFlag(!flag)}>
            Invoice Requirements
          </ModalHeader>
          <ModalBody className="bg">
            <div className="alert alert-warning">
              Warning: Enter and Save new invoice number else existing invoice
              with that number will be erased{" "}
            </div>

            <FormGroup>
              <label className="form-control-label" htmlFor="input-email">
                Issue Date for Invoice :
              </label>
              <Input
                className="form-control-alternative"
                type="date"
                name="date"
                value={date}
                onChange={(e) => {
                  setDate(e.target.value);
                }}
              />
            </FormGroup>
            <FormGroup>
              <label className="form-control-label" htmlFor="input-email">
                Invoice Number :
                {lastInvoiceNo ? (
                  <div className="mt-2">
                    <small className="text-muted">
                      {"Last invoice number : "}
                    </small>
                    <small className="text-danger">{lastInvoiceNo}</small>
                    <small className="text-muted">{", Try: "}</small>
                    <small className=" text-left text-success">
                      {Number(lastInvoiceNo) + 1}
                    </small>
                  </div>
                ) : (
                  <span className="text-muted alert">
                    Last invoice number : Error getting it!
                  </span>
                )}
              </label>
              <Input
                className="form-control-alternative"
                placeholder="Number"
                type="number"
                name="invoiceNo"
                value={invoiceNo}
                onChange={(e) => {
                  setInvno(e.target.value);
                  setFlag(!flag);
                }}
              />
            </FormGroup>
          </ModalBody>
          <ModalFooter className="bg">
            <Button
              color="secondary"
              className="btn btn-warning"
              onClick={(e) => {
                setFlag(!flag);
                setInvno("");
              }}
            >
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </div>
      <Modal
        className="modal-dialog-top modal-danger"
        contentClassName="bg-gradient-danger"
        isOpen={searchModal}
        toggle={toggleSearchModal}
      >
        <ModalHeader toggle={toggleSearchModal}>
          Your attention is required
        </ModalHeader>
        <ModalBody>
          <div className="text-center">
            <i className="fa fa-search fa-3x" />
            <h4 className="heading mt-2">Enter Date</h4>
            {/* <Row>
              <Col xl="3"></Col>
              <Col xl="6">
                {" "}
                <Input
                  placeholder="0"
                  name="invoice_number"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                />
              </Col>
            </Row> */}
            {/* <h4 className="heading mt-2">or</h4> */}
            <Row>
              <Col xl="3"></Col>
              <Col xl="6">
                {" "}
                <Input
                  placeholder="0"
                  type="date"
                  name="select_date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </Col>
            </Row>
          </div>
        </ModalBody>
        <ModalFooter className="modal-footer">
          <Button
            className="btn-white"
            color="default"
            type="button"
            onClick={searchFunc}
          >
            Filter
          </Button>
          <Button
            className="text-white ml-auto"
            color="link"
            data-dismiss="modal"
            type="button"
            onClick={toggleSearchModal}
          >
            Close
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default ClientComponentPage;
