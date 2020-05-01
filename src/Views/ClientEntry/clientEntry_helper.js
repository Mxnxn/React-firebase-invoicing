import Entry from "./clientEntry_model";

export default class EntryHelper {
  /**
   * Convert object to entry
   * @param {string} id
   * @param {string} client_id
   * @param {Object} data - This represents the object to be converted to Entry object
   * @returns {Entry}
   */
  toEntry(id, client_id, data) {
    return new Entry(
      id,
      client_id,
      data.date,
      data.product,
      data.description,
      data.qty,
      data.rate,
      data.amount,
      data.cgst,
      data.sgst,
      data.total,
      data.receive,
      data.issued
    );
  }

  toEntryForFireStore(
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
    receive
  ) {
    return new Entry(
      null,
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
      false
    );
  }
}
