import { firebase } from "../../FirebaseAuth/Firebase";
// eslint-disable-next-line
import Entry from "./clientEntry_model";
import EntryHelper from "./clientEntry_helper";
// import { createDispatchHook } from "react-redux";

class EntryBackend {
  constructor() {
    this.backend = firebase;
    this.database = this.backend.database;
    this.helper = new EntryHelper();

    this.getEntry = this.getEntry.bind(this);
  }

  /**
   * Get an entry from database
   * @param {string} entry_id - ID of the entry to retrieve
   * @returns {Promise<Entry>}
   */
  getEntry(entry_id) {
    return new Promise((resolve, reject) => {
      this.database
        .collection("client_entries")
        .doc(entry_id)
        .get()
        .then((fetched) => {
          let entry = this.helper.toEntry(
            entry_id,
            fetched.data()["client_id"],
            fetched.data()
          );
          resolve(entry);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  getEntryWithDate(entry_id, date) {
    return new Promise((resolve, reject) => {
      this.database
        .collection("client_entries")
        .where("date", "==", date)
        .doc(entry_id)
        .get()
        .then((fetched) => {
          let entry = this.helper.toEntry(
            entry_id,
            fetched.data()["client_id"],
            fetched.data()
          );
          resolve(entry);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  getAllEntry() {
    return new Promise((resolve, reject) => {
      this.database
        .collection("client_entries")
        .get()
        .then((fetched) => {
          let entries = [];
          fetched.forEach((elem) => {
            entries.push(
              this.helper.toEntry(
                elem.id,
                elem.data()["client_id"],
                elem.data()
              )
            );
          });
          resolve(entries);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  getAllOfSingleClient(client_id) {
    return new Promise((resolve, reject) => {
      this.database
        .collection("client_entries")
        .where("client_id", "==", client_id)
        .get()
        .then((fetched) => {
          let entries = [];
          fetched.forEach((elem) => {
            entries.push(
              this.helper.toEntry(
                elem.id,
                elem.data()["client_id"],
                elem.data()
              )
            );
          });
          resolve(entries);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  getAllOfClientWithDate(client_id, date) {
    return new Promise((resolve, reject) => {
      this.database
        .collection("client_entries")
        .where("client_id", "==", client_id)
        .where("date", "==", date)
        .get()
        .then((fetched) => {
          let entries = [];
          fetched.forEach((elem) => {
            entries.push(
              this.helper.toEntry(
                elem.id,
                elem.data()["client_id"],
                elem.data()
              )
            );
          });
          resolve(entries);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  getDateEntry(date) {
    return new Promise((resolve, reject) => {
      this.database
        .collection("client_entries")
        .where("date", "==", date)
        .get()
        .then((fetched) => {
          let entries = [];
          fetched.forEach((elem) => {
            entries.push(
              this.helper.toEntry(
                elem.id,
                elem.data()["client_id"],
                elem.data()
              )
            );
          });
          resolve(entries);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  getEntryx(entry_id) {
    this.database
      .collection("client_entries")
      .where("client_id", "==", entry_id)
      .get()
      .then((fetched) => {
        let lol = [];
        fetched.forEach((elem) => {
          lol.push(elem);
        });
        return lol;
      });
  }

  /**
   * Add a new entry to the database.
   * @param {Entry} entry - Entry object to be added
   * @returns {Promise<DocumentReference>}
   */

  addNewEntry(entry) {
    return new Promise((resolve, reject) => {
      let data = {
        client_id: entry.client_id,
        date: entry.date.toString(),
        product: entry.product,
        description: entry.description,
        qty: entry.qty,
        rate: entry.rate,
        amount: entry.amount,
        cgst: entry.cgst,
        sgst: entry.sgst,
        total: entry.total,
        receive: entry.receive,
        issued: "false",
      };
      this.database
        .collection("client_entries")
        .add(data)
        .then((ref) => {
          resolve(ref);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  /**
   * Delete an entry
   * @param {string} entry_id - ID of entry to be deleted
   * @returns {Promise<void>}
   */
  deleteEntry(entry_id) {
    return this.database.collection("client_entries").doc(entry_id).delete();
  }

  /**
   * @param {Entry} entry
   */
  updateEntry(entry) {
    return this.database
      .collection("client_entries")
      .doc(entry.id)
      .set(entry.getObject());
  }

  updateStatusOfEntry(entries) {
    let batch = this.database.batch();
    entries.forEach((entry) => {
      batch.update(this.database.collection("client_entries").doc(entry.id), {
        issued: "true",
      });
    });
    return batch.commit();
  }
}

export let entryBackend = new EntryBackend();
