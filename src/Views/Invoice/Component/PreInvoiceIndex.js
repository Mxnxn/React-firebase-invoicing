import React, { useState, useEffect } from "react";
import InvoiceIndex from "./InvoiceIndex";
import { invoiceBackend } from "../invoice_backend";
import Loader from "global/Loader/Loader";

const PreInvoiceIndex = ({ user, uid, darkModeFlag }) => {
  const [loading, setLoading] = useState(false);
  const [allInvoices, setInvoiceObj] = useState("");

  useEffect(() => {
    invoiceBackend
      .getInvoices(uid)
      .then((data) => {
        console.log(data);
        setInvoiceObj(data);
        setLoading(true);
      })
      .catch((err) => {
        alert(err);
      });
  }, [uid]);

  const [previewFlag, setPreviewFlag] = useState(false);

  const previewClick = (invoice) => {
    setObj({
      ...obj,
      invoice_no: invoice.invoice_no,
      date: invoice.date,
      owner: user.name,
      ownerAddress: user.address,
      ownerEmail: user.email,
      ownerGST: user.gst,
      ownerPhone: user.phone,
      url: user.url,
      company: invoice.clientFirm,
      phone: invoice.clientNumber,
      address: invoice.clientAddress,
      GST: invoice.clientGST,
      items: invoice.entries,
    });
    setPreviewFlag(true);
  };

  const previewCancel = (e) => {
    setObj({
      date: "",
      invoice_no: "",
      balance: "",
      owner: "",
      ownerAddress: "",
      ownerEmail: "",
      ownerGST: "",
      ownerPhone: "",
      company: "",
      phone: "",
      address: "",
      GST: "",
      items: [],
      url: "",
    });
    setPreviewFlag(!previewFlag);
  };

  const [obj, setObj] = useState({
    date: "",
    invoice_no: "",
    balance: "",
    owner: "",
    ownerAddress: "",
    ownerEmail: "",
    ownerGST: "",
    ownerPhone: "",
    company: "",
    phone: "",
    address: "",
    GST: "",
    items: [],
    url: "",
  });

  return loading ? (
    <InvoiceIndex
      loading={loading}
      user={user}
      previewClick={previewClick}
      dataForInvoice={obj}
      invoice={allInvoices}
      darkModeFlag={darkModeFlag}
      previewFlag={previewFlag}
      previewCancel={previewCancel}
    />
  ) : (
    <Loader />
  );
};

export default PreInvoiceIndex;
