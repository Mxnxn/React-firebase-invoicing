/** Model for a sheet. Contains a list of entries */
class Sheet {
  /**
   * Create a sheet
   * @param {string} id - Firebase ID of sheet
   * @param {string} date
   * @param {Array<string>} entries - ID of entries in a sheet
   */
  constructor(id, date, entries) {
    this.id = id;
    this.date = date;
    this.entries = entries;

    this.getDate = this.getDate.bind(this);
  }

  getDate() {
    var dd = this.date.getDate();
    var mm = this.date.getMonth() + 1; //January is 0!

    var yyyy = this.date.getFullYear();
    if (dd < 10) {
      dd = "0" + dd;
    }
    if (mm < 10) {
      mm = "0" + mm;
    }
    return dd + "/" + mm + "/" + yyyy;
  }

  getObject() {
    return {
      id: this.id,
      date: this.date,
      entries: this.entries
    };
  }
}

export default Sheet;
