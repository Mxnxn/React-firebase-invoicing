import Client from "./client_model";

export default class ClientHelper {
  /**
   * Create a sheet with empty entries
   * @returns {Client}
   */
  toClientWithoutEntry(key, data) {
    return new Client(
      key,
      data.date,
      data.clientName,
      data.clientFirm,
      data.clientNumber,
      data.clientGST,
      data.clientAddress,
      [],
      []
    );
  }
}
