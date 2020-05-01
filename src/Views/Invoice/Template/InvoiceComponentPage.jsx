import React from "react";
import { firebaseBase } from "../global/base_backend";
import LinkButton from "../global/components/LinkButton";
import ListItem from "./ListItem";
/* Stateless component that takes props and displays the sheet page
 * props:
 * `sheet`
 * `entries`
 * `total`
 * `downloadHandler`
 * `deleteHandler`
 */
const InvoiceComponentPage = props => {
  let { sheet, entries, overall } = props;
  let invoice = {
    id: sheet.id,
    invoice_no: "201906-28",
    balance: overall.total,
    owner: "Manan Graphics",
    ownerAddress:
      "FF-113/114 Sundaram Hub,\n Bahuchraji Road,Karelibaug,\nVadodara, Gujarat, India 390018 ",
    ownerPhone: "+91 9825505771",
    ownerEmail: "care@manangraphics.com",
    ownerGST: "GSTIN: 24EYJPS6587R2Z1",
    company: sheet.clientName,
    phone: sheet.clientNumber,
    address: sheet.clientAddress,
    GST: sheet.clientGST,
    items: []
  };

  firebaseBase.database
    .collection("invoice_number")
    .get()
    .then(datax => {
      datax.forEach(id => {
        invoice.invoice_no = id.data().number;
      });
    });

  entries.forEach(entry => {
    invoice.items.push(entry);
  });

  console.log(invoice.items);

  let deleteHandler = index => {
    invoice.items.splice(index, 1);
    console.log(invoice.items);
  };

  let style = {
    marginLeft: "4%"
  };

  let actionStyle = {
    marginBottom: "4%",
    marginTop: "2%"
  };
  let stylex2 = {
    paddingRight: "4%"
  };

  return (
    <div className="Sheet" style={style}>
      <h1>Prepare for Invoice</h1>
      <h4 className="subheading">Firm: {sheet.clientFirm}</h4>
      <div className="row text-center" style={actionStyle}>
        <div className="col-xs-1">
          <h5>Invoice</h5>
          {/* <LinkButton btnColor="btn-warning" icon="glyphicon-edit" /> */}
        </div>
      </div>
      <div className="col-sm-11">
        <table className="table table-bordered" style={stylex2}>
          <thead>
            <tr>
              <th>Date</th>
              <th>Product</th>
              <th>Description</th>
              <th>Quantity</th>
              <th>Rate(&#8377;)</th>
              <th>SubTotal(&#8377;)</th>
              <th>CGST(&#8377;)</th>
              <th>SGST(&#8377;)</th>
              <th>Total/Due(&#8377;)</th>
              <th>Received Payment(&#8377;)</th>

              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {invoice.items.map((entry, index) => {
              let stats = { cgst: [], sgst: [] };
              stats.cgst.push((entry.amount * (entry.cgst / 50)) / 2);
              return (
                <ListItem
                  entry={entry}
                  tax={stats}
                  receiveRedirect={`/receivePayment/${entry.id}`}
                  editRedirect={`/${sheet.id}/clientEntry/${entry.id}`}
                  key={entry.id}
                  deleteHandler={deleteHandler.bind(invoice, index)}
                  deleteHandlerIndex={index}
                />
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InvoiceComponentPage;
