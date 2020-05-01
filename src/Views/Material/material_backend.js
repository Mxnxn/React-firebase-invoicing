import { firebase } from "../../FirebaseAuth/Firebase";

import MaterialHelper from "./material_helper";

const cMaterialHelper = new MaterialHelper();
class MaterialBackend {
  constructor() {
    this.backend = firebase;
    this.database = this.backend.database;
    this.helper = new MaterialHelper();

    this.getMaterials = this.getMaterials.bind(this);
  }

  getMaterials(entry_id) {
    return new Promise((resolve, reject) => {
      this.database
        .collection("material")
        .doc(entry_id)
        .get()
        .then(fetched => {
          let entry = this.helper.toMaterialEntry(
            entry_id,
            fetched.data()["client_id"],
            fetched.data()
          );
          resolve(entry);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  addNewMaterial(material_name, material_rate, client_id) {
    return new Promise((resolve, reject) => {
      this.database
        .collection("material")
        .add({
          material_name: material_name,
          material_rate: material_rate,
          client_id: client_id
        })
        .then(ref => {
          resolve(ref);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  getClientMaterials(client_id) {
    return new Promise((resolve, reject) => {
      let ids = [];
      this.database
        .collection("material")
        .where("client_id", "==", client_id)
        .get()
        .then(snapshot => {
          snapshot.forEach(element => {
            ids.push(element.id);
          });
          resolve(ids);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  getAllMaterials(uid) {
    return new Promise((resolve, reject) => {
      this.database
        .collection("material")
        .where("uid", "==", uid)
        .get()
        .then(querySnapshot => {
          let materials = [];
          querySnapshot.forEach(docSnapshot => {
            materials.push(
              cMaterialHelper.toMaterialEntry(
                docSnapshot.id,
                docSnapshot.data()
              )
            );
          });
          console.log(materials);
          resolve(materials);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  deleteEntry(entry_id) {
    return this.database
      .collection("material")
      .doc(entry_id)
      .delete();
  }

  updateEntry(entry) {
    return this.database
      .collection("material")
      .doc(entry.id)
      .set(entry.getObject());
  }
}

export let materialsBackend = new MaterialBackend();
