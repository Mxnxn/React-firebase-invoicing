class User {
  constructor(id, uid, name, phone, email, firm, address, gst, url) {
    this.id = id;
    this.uid = uid;
    this.name = name;
    this.phone = phone;
    this.email = email;
    this.firm = firm;
    this.address = address;
    this.gst = gst;
    this.url = url;
  }
  getObject() {
    return {
      id: this.id,
      uid: this.uid,
      name: this.name,
      phone: this.phone,
      email: this.email,
      firm: this.firm,
      address: this.address,
      gst: this.gst,
      url: this.url
    };
  }
}

export default User;
