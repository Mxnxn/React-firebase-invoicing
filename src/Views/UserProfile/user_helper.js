import User from "./user_model";

export default class UserHelper {
  toFirebase(id, uid, data) {
    return new User(
      id,
      uid,
      data.name,
      data.phone,
      data.email,
      data.firm,
      data.address,
      data.gst,
      data.url
    );
  }
}
