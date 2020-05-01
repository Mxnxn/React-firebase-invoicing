class Invoice {
  constructor(
    id,
    uid,
    date,
    entries,
    clientName,
    clientFirm,
    clientGST,
    clientAddress,
    clientNumber,
    total
  ) {
    this.id = id;
    this.date = date;
    this.uid = uid;
    this.entries = entries;
    this.clientName = clientName;
    this.clientFirm = clientFirm;
    this.clientGST = clientGST;
    this.clientAddress = clientAddress;
    this.clientNumber = clientNumber;
    this.total = total;
  }
}
export default Invoice;
