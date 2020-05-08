import app from "firebase/app";
import "firebase/firebase-firestore";
import "firebase/auth";
import "firebase/storage";

var firebaseConfig = {
  apiKey: "",
  authDomain: "",
  databaseURL: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
  measurementId: "",
};
// Initialize Firebase

class Firebase {
  constructor() {
    app.initializeApp(firebaseConfig);
    this.storage = app.storage();
    this.auth = app.auth();
    this.app = app;
    this.database = app.firestore();
  }

  isInitialized(func) {
    return app.auth().onAuthStateChanged(func);
  }

  isOk() {
    return new Promise((resolve) => {
      this.auth.onAuthStateChanged(resolve);
    });
  }

  Logout() {
    return this.auth.signOut();
  }
}

/**
 * @static
 */
export let firebase = new Firebase();
