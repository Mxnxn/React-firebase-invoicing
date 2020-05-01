import { firebase } from "../../FirebaseAuth/Firebase";
import SheetHelper from "./sheet_helper";

class SheetsBackend {
  constructor() {
    this.backend = firebase;
    this.database = this.backend.database;

    this.helper = new SheetHelper();
  }

  /**
   * Fetches list of all sheets
   * @param {string} uid - User ID of ssheet owner
   * @returns {Promise<Sheet>}
   */
  getAllSheets(uid) {
    return new Promise((resolve, reject) => {
      this.database
        .collection("sheet")
        .where("uid", "==", uid)
        .get()
        .then(querySnapshot => {
          let sheets = [];
          querySnapshot.forEach(docSnapshot => {
            sheets.push(
              this.helper.toSheetWithoutEntries(
                docSnapshot.id,
                docSnapshot.data()
              )
            );
          });
          resolve(sheets);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  getSheets(uid) {
    return new Promise((resolve, reject) => {
      let sheets = [];
      this.database
        .collection("sheet")
        .where("uid", "==", uid)
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(docSnapshot => {
            sheets.push(
              this.helper.toSheetWithoutEntries(
                docSnapshot.id,
                docSnapshot.data()
              )
            );
          });
          resolve(sheets);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  /**
   * Add a new sheet
   * @param {string} date
   * @param {string} uid - User ID of sheet owner
   * @returns {Promise<DocumentReference>} after the write is done
   */
  addNewSheet(date, uid) {
    return this.database.collection("sheet").add({
      date: date.toString(),
      uid: uid
    });
  }

  /**
   * Fetches details of a sheet from it's id
   * @param {string} id - Sheet ID to be retrieved
   * @returns {Promise<Sheet>} - with all entries id
   */
  getSheetDetail(id) {
    return new Promise((resolve, reject) => {
      let sheet;
      this.database
        .collection("sheet")
        .doc(id)
        .get()
        .then(docSnapshot => {
          sheet = this.helper.toSheetWithoutEntries(id, docSnapshot.data());
          return this.database
            .collection("entry")
            .where("sheet_id", "==", id)
            .get();
        })
        .then(querySnapshot => {
          if (!querySnapshot.empty) {
            let entries = [];
            querySnapshot.forEach(docSnapshot => {
              entries.push(docSnapshot.id);
            });
            sheet.entries = entries;
          }
          resolve(sheet);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  /**
   * Deletes sheet
   * @param {string} sheet_id - Sheet ID to be deleted
   * @param {Array<string>} entries - List of Entries to be deleted
   * @returns {Promise<void>}
   */
  deleteSheet(sheet_id, entries) {
    let batch = this.database.batch();
    batch.delete(this.database.collection("sheet").doc(sheet_id));
    for (let entry_id in entries) {
      batch.delete(this.database.collection("entry").doc(entry_id));
    }
    return batch.commit();
  }

  deleteSheetByDate(date) {
    return this.database
      .collection("sheet")
      .where("date", "==", date)
      .get()
      .then(snapshot => {
        let id = "";
        snapshot.forEach(elem => {
          id = elem.id;
        });
        let batch = this.database.batch();
        batch.delete(this.database.collection("sheet").doc(id));
        return batch.commit();
      })
      .catch(err => {
        console.log(err);
      });
  }

  /**
   * Update a sheet with new data
   * @param {string} sheet_id - Id of the sheet to be editted
   * @param {string} date - title of the sheet
   * @returns {Promise<DocumentReference>} after the write is done
   */
  editSheet(sheet_id, date) {
    let obj = { date: date };
    return this.database
      .collection("sheet")
      .doc(sheet_id)
      .set(obj, { merge: true });
  }
}

export let sheetsBackend = new SheetsBackend();
