/** Model for a sheet. Contains a list of entries */
class Client {
  /**
   * Create a sheet
   * @param {string} id - Firebase ID of sheet
   * @param {string} clientName
   * @param {string} clientFirm
   * @param {string} clientNumber
   * @param {string} clientGST
   * @param {string} clientAddress
   * @param {Array<string>} entries
   */
  constructor(
    id,
    date,
    clientName,
    clientFirm,
    clientNumber,
    clientGST,
    clientAddress,
    entries,
    materials
  ) {
    this.id = id;
    this.date = date;
    this.clientName = clientName;
    this.clientFirm = clientFirm;
    this.clientNumber = clientNumber;
    this.clientGST = clientGST;
    this.clientAddress = clientAddress;
    this.entries = entries;
    this.materials = materials;
  }
}

export default Client;
