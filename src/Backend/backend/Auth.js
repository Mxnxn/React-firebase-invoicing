import { firebase } from "../../FirebaseAuth/Firebase";

class AuthBackend {
  constructor() {
    this.auth = firebase.auth;
    this.backend = firebase;
    this.database = this.backend.database;
  }

  Login(email, password) {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  async Register(name, email, password) {
    await this.auth.createUserWithEmailAndPassword(email, password);
    return this.auth.currentUser.updateProfile({
      displayName: name
    });
  }
}

export let authBackend = new AuthBackend();
