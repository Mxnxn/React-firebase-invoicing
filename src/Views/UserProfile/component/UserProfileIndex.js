import React, { useEffect } from "react";
import LiteHeader from "Common/Header/LiteHeader";

import { Link } from "react-router-dom";

import { userBackend } from "../user_backend";

import {
  Row,
  Container,
  Col,
  Card,
  CardBody,
  Button,
  CardHeader,
  Progress,
  CardFooter,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "reactstrap";

const UserProfileIndex = (props) => {
  const inputRef = React.useRef();
  const [uid] = React.useState(props.uid);
  const [username, setUsername] = React.useState("");
  const [userEmail, setUserEmail] = React.useState("");
  const [userFirm, setUserFirm] = React.useState("");
  const [userPhone, setUserPhone] = React.useState("");
  const [userAddress, setUserAddress] = React.useState("");
  const [userGST, setUserGST] = React.useState("");
  const [userPhoto, setUserPhoto] = React.useState(null);
  const [error, setError] = React.useState(false);

  const [urlx, setUrl] = React.useState(false);
  const [objectId, setObjectId] = React.useState("");

  const [progressVar, setProgressVar] = React.useState(0);

  const [modal, setModal] = React.useState(false);

  const toggle = (e) => {
    try {
      setModal(!modal);
    } catch (err) {
      setModal(!modal);
    }
  };

  useEffect(() => {
    userBackend.getUserDetail(uid).then((data) => {
      if (data) {
        setObjectId(data.id);
        setUsername(data.name);
        setUserEmail(data.email);
        setUserFirm(data.firm);
        setUserPhone(data.phone);
        setUserAddress(data.address);
        setUserGST(data.gst);
        setUrl(data.url);
      }
    });
  }, [
    uid,
    objectId,
    username,
    userEmail,
    userFirm,
    userPhone,
    userAddress,
    userGST,
    urlx,
  ]);

  const handleSubmit = (e) => {
    if (userPhoto) {
      userBackend.storage
        .ref()
        .child(`${uid}`)
        .listAll()
        .then((data) => {
          data.items.forEach((elem) => {
            userBackend.storage
              .ref(`${uid}/${elem.name}`)
              .delete()
              .then((done) => {
                console.log("yay");
              });
          });
        })
        .catch((err) => console.log(err));
      const uploadTask = userBackend.storage
        .ref(`${uid}/${userPhoto.name}`)
        .put(userPhoto);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setProgressVar(progress);
        },
        (error) => {
          setError(error);
        },
        () => {
          userBackend.storage
            .ref(`${uid}`)
            .child(userPhoto.name)
            .getDownloadURL()
            .then((url) => {
              setUrl(url);
              let obj = {
                url: url,
              };
              userBackend.updateUserImageUrl(objectId, obj);
            });
        }
      );
    }
    setModal(!modal);
  };

  // const handleUpdate = e => {};

  const handlePhoto = (e) => {
    setError(false);
    try {
      const file = e.target.files[0];
      const validFileType = ["image/jpg", "image/jpeg", "image/png"];
      if (validFileType.includes(file["type"])) {
        setUserPhoto(file);
      } else {
        setError(true);
      }
    } catch (err) {
      alert(err);
    }
  };

  return (
    <>
      <LiteHeader bg={"primary"} />
      <Container className="mt--7 text-center" fluid>
        <Row>
          <Col xl="3"></Col>
          <Col className="order-xl-2 mb-5 mb-xl-0" xl="5">
            <Card className="card-profile shadow">
              <Row className="justify-content-center">
                <Col className="order-lg-2" lg="3">
                  <div className="card-profile-image">
                    {urlx ? (
                      <a href="#pablo">
                        <img className="rounded-square" alt="logo" src={urlx} />
                      </a>
                    ) : (
                      <h6 className="text-muted">LOGO Or Picture</h6>
                    )}
                  </div>
                </Col>
              </Row>
              <CardHeader className="text-center border-0 mt-7 pt-8 pt-md-4 pb-0 pb-md-4"></CardHeader>
              <CardBody className="pt-0 pt-md-4">
                <div className="text-center">
                  <h3>
                    {username}
                    <span className="font-weight-light"></span>
                  </h3>
                  <div className="h5 font-weight-300">
                    <i className="ni location_pin mr-2" />
                    Firm: {userFirm}
                  </div>
                  <hr className="my-4" />
                  <p>Address: {userAddress}</p>
                  <p>Phone: {userPhone}</p>
                  <p>Email: {userEmail}</p>
                  <p>Gst: {userGST}</p>
                  <Row className="mt-5">
                    <Col>
                      <Link
                        to={`/admin/userprofile/add`}
                        className="btn btn-primary btn-sm"
                      >
                        Add/Edit Detail
                      </Link>
                    </Col>
                    <Col>
                      <Button
                        color="success"
                        size="sm"
                        onClick={(e) => setModal(!modal)}
                      >
                        Upload/Change Picture
                      </Button>
                    </Col>
                  </Row>
                </div>
              </CardBody>
              <CardFooter>
                <div className="alert text-muted">
                  <span className="text-danger">Note:</span> Once you fill all
                  the detail it will be visible here and will use for Invoice.
                </div>
              </CardFooter>
            </Card>
          </Col>
        </Row>
      </Container>
      <div>
        <Modal isOpen={modal} toggle={toggle}>
          <ModalHeader className="bg " toggle={toggle}>
            <h3 className="text-default">Update Entry</h3>
          </ModalHeader>
          <ModalBody className="bg">
            <Row>
              <Col xl="12">
                {error ? (
                  <div className="alert alert-danger">
                    Please select correct file with jpg,jpeg or png format.
                  </div>
                ) : (
                  <></>
                )}

                <Button
                  color="warning"
                  onClick={(e) => inputRef.current.click()}
                >
                  Choose picture
                </Button>
                {userPhoto ? (
                  <p tag="h6 mt-5">Filename : {userPhoto.name}</p>
                ) : (
                  <></>
                )}
                {progressVar > 0 ? <Progress value={progressVar} /> : <></>}
                <input
                  type="file"
                  ref={inputRef}
                  onChange={handlePhoto}
                  style={{ display: "none" }}
                />
              </Col>
              <Col xl="6"></Col>
            </Row>
          </ModalBody>
          <ModalFooter className="bg">
            <Button
              color="primary"
              className="btn btn-success"
              onClick={handleSubmit}
            >
              Add
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    </>
  );
};

export default UserProfileIndex;
