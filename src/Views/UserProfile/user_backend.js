import { firebase } from "../../FirebaseAuth/Firebase";
import UserHelper from "./user_helper";
class UserBackend {
  constructor() {
    this.storage = firebase.storage;
    this.database = firebase.database;
    this.helper = new UserHelper();
  }

  addUserData(uid, data) {
    return this.database.collection("user").add({
      uid: uid,
      name: data.name,
      email: data.email,
      phone: data.phone,
      address: data.address,
      firm: data.firm,
      gst: data.gst,
      url: data.url
    });
  }

  getUserDetail(uid) {
    return new Promise((resolve, reject) => {
      this.database
        .collection("user")
        .where("uid", "==", uid)
        .get()
        .then(snapshot => {
          let detail;
          snapshot.forEach(data => {
            detail = this.helper.toFirebase(data.id, uid, data.data());
          });
          resolve(detail);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  updateUserDetail(id, obj) {
    let details = {
      name: obj.name,
      firm: obj.firm,
      email: obj.email,
      address: obj.address,
      phone: obj.phone,
      gst: obj.gst
    };
    return this.database
      .collection("user")
      .doc(id)
      .update(details);
  }

  updateUserImageUrl(id, obj) {
    let details = {
      url: obj.url
    };
    return this.database
      .collection("user")
      .doc(id)
      .update(details);
  }
}

export let userBackend = new UserBackend();
