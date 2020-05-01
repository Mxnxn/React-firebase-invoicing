import app from "firebase/app";
import "firebase/firebase-firestore";
import "firebase/auth";
import "firebase/storage";

var firebaseConfig = {
  apiKey: "AIzaSyDES67pRclk4zygGCeSdQt_7bssggIAZSY",
  authDomain: "gst-invoice-53f40.firebaseapp.com",
  databaseURL: "https://gst-invoice-53f40.firebaseio.com",
  projectId: "gst-invoice-53f40",
  storageBucket: "gst-invoice-53f40.appspot.com",
  messagingSenderId: "352618342871",
  appId: "1:352618342871:web:d7849f55eb5c114b9b4392",
  measurementId: "G-RTV4PLG8S3",
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
