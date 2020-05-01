import { firebase } from "../../FirebaseAuth/Firebase";
import ClientHelper from "./client_helper";

// import EntryHelper from "../ClientEntry/clientEntry_helper";

const cClientHelper = new ClientHelper();
class ClientsBackend {
  constructor() {
    this.backend = firebase;
    this.database = this.backend.database;
  }

  /**
   * @param {string} entry
   * */

  addNewClient(entry, uid) {
    return this.database.collection("client").add({
      date: entry.date,
      clientName: entry.clientName,
      clientFirm: entry.clientFirm,
      clientNumber: entry.clientNumber,
      clientGST: entry.clientGST,
      clientAddress: entry.clientAddress,
      uid: uid,
    });
  }

  getClientNames(uid) {
    return new Promise((resolve, reject) => {
      this.database
        .collection("client")
        .where("uid", "==", uid)
        .get()
        .then((snapshot) => {
          let clients = [];
          snapshot.forEach((data) => {
            clients.push(
              cClientHelper.toClientWithoutEntry(data.id, data.data())
            );
          });
          resolve(clients);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  getAllClient(uid) {
    return new Promise((resolve, reject) => {
      this.database
        .collection("client")
        .where("uid", "==", uid)
        .get()
        .then((snapshot) => {
          let clients = [];
          snapshot.forEach((data) => {
            clients.push(
              cClientHelper.toClientWithoutEntry(data.id, data.data())
            );
          });
          let entries = [];
          clients.forEach((client) => {
            this.database
              .collection("client_entries")
              .where("client_id", "==", client.id)
              .get()
              .then((snapshotx) => {
                if (snapshotx.exists)
                  snapshotx.forEach((singlesnap) => {
                    entries.push(singlesnap.id);
                  });
              });
            client.entries = entries;
          });
          resolve(clients);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  getAllClientWithDate(uid, date) {
    return new Promise((resolve, reject) => {
      this.database
        .collection("client")
        .where("uid", "==", uid)
        .get()
        .then((snapshot) => {
          let clients = [];
          let entries = [];
          snapshot.forEach((data) => {
            clients.push(
              cClientHelper.toClientWithoutEntry(data.id, data.data())
            );
          });
          clients.forEach((client) => {
            this.database
              .collection("client_entries")
              .where("client_id", "==", client.id)
              .where("date", "==", date)
              .get()
              .then((snapshotx) => {
                snapshotx.forEach((singlesnap) => {
                  entries.push(singlesnap.id);
                });
                client.entries = entries;
              });
          });
          resolve(clients);
        })
        .catch((err) => {
          console.log(err);
          alert(err);
        });
    });
  }

  getIds(uid) {
    return new Promise((resolve, reject) => {
      let clients;
      this.database
        .collection("client")
        .where("uid", "==", uid)
        .get()
        .then((snapshot) => {
          clients = cClientHelper.toClientWithoutEntry(
            snapshot.id,
            snapshot.data()
          );
          return this.database
            .collection("client_entries")
            .where("client_id", "==", uid)
            .get();
        })
        .then((querySnapshot) => {
          if (!querySnapshot.empty) {
            let entries = [];
            querySnapshot.forEach((docSnapshot) => {
              entries.push(docSnapshot.id);
            });
            clients.entries = entries;
          }
          resolve(clients);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  getClientDetail(id) {
    return new Promise((resolve, reject) => {
      let client;
      this.database
        .collection("client")
        .doc(id)
        .get()
        .then((docSnapshot) => {
          client = cClientHelper.toClientWithoutEntry(id, docSnapshot.data());
          return this.database
            .collection("client_entries")
            .where("client_id", "==", id)
            .get();
        })
        .then((querySnapshot) => {
          if (!querySnapshot.empty) {
            let entries = [];
            querySnapshot.forEach((docSnapshot) => {
              entries.push(docSnapshot.id);
            });
            client.entries = entries;
          }
          return this.database
            .collection("material")
            .where("client_id", "==", id)
            .get();
        })
        .then((ref) => {
          if (!ref.empty) {
            let materials = [];
            ref.forEach((docSnapshot) => {
              materials.push(docSnapshot.id);
            });
            client.materials = materials;
          }
          resolve(client);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  getClientMaterialDetail(id) {
    return new Promise((resolve, reject) => {
      let client;
      this.database
        .collection("client")
        .doc(id)
        .get()
        .then((docSnapshot) => {
          client = cClientHelper.toClientWithoutEntry(id, docSnapshot.data());
          return this.database
            .collection("materials")
            .where("client_id", "==", id)
            .get();
        })
        .then((querySnapshot) => {
          if (!querySnapshot.empty) {
            let entries = [];
            querySnapshot.forEach((docSnapshot) => {
              entries.push(docSnapshot.id);
            });
            client.materials = entries;
          }
          resolve(client);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  updateClient(client_id, obj) {
    return this.database.collection("client").doc(client_id).update(obj);
  }

  deleteClient(sheet_id, entries, materials) {
    let batch = this.database.batch();
    batch.delete(this.database.collection("client").doc(sheet_id));
    for (let entry_id in entries) {
      batch.delete(this.database.collection("client_entries").doc(entry_id));
    }
    console.log(materials);
    for (let material in materials) {
      batch.delete(this.database.collection("material").doc(material));
    }
    return batch.commit();
  }
}

export let clientsBackend = new ClientsBackend();
