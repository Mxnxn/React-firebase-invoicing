import Invoice from "./invoice_model";

class InvoiceHelper {
  invoiceMethod(id, obj, entries) {
    return new Invoice(
      id,
      obj.uid,
      obj.date,
      entries,
      obj.clientName,
      obj.clientFirm,
      obj.clientGST,
      obj.clientAddress,
      obj.clientNumber,
      obj.total
    );
  }

  InvoiceDataConverter = {
    fromFirestore: function (snapshot, option) {
      const data = snapshot.data(option);
      return new Invoice(
        data.id,
        data.uid,
        data.date,
        data.clientName,
        data.clientFirm,
        data.clientGST,
        data.clientAddress,
        data.clientNumber,
        data.total
      );
    },
  };
}

export default InvoiceHelper;
