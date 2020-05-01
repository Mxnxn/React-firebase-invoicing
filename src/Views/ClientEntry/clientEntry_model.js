/* Model for an entry */

export default class Entry {
  constructor(
    id,
    client_id,
    date,
    product,
    description,
    qty,
    rate,
    amount,
    cgst,
    sgst,
    total,
    receive,
    issued
  ) {
    this.id = id;
    this.client_id = client_id;
    this.date = date;
    this.product = product;
    this.description = description;
    this.qty = qty;
    this.amount = amount;
    this.total = total;
    this.rate = rate;
    this.cgst = Number(cgst);
    this.sgst = Number(sgst);
    this.receive = receive;
    this.issued = issued;
  }

  getObject() {
    return {
      id: this.id,
      client_id: this.client_id,
      date: this.date,
      product: this.product,
      description: this.description,
      qty: this.qty,
      amount: this.amount,
      rate: this.rate,
      total: this.total,
      cgst: this.cgst,
      sgst: this.sgst,
      receive: this.receive,
    };
  }
}
