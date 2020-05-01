import InvoiceHelper from "./invoice_helper";
import { firebase } from "../../FirebaseAuth/Firebase";

class InvoiceBackend {
  constructor() {
    this.database = firebase.database;
    this.helper = new InvoiceHelper();
  }

  getInvoices(uid) {
    return new Promise((resolve, reject) => {
      this.database
        .collection("invoices")
        .where("uid", "==", uid)
        .get()
        .then((snapShot) => {
          let promises = [];

          snapShot.docs.forEach((solo) => {
            let arr = [];
            promises.push(
              this.database
                .collection("invoices")
                .doc(`${uid}_${solo.data()["id"]}`)
                .collection("entries")
                .get()
                .then((querySnapShot) => {
                  querySnapShot.docs.map((x) => arr.push(x.data()));
                })
                .then(() => {
                  return this.helper.invoiceMethod(
                    solo.data()["id"],
                    solo.data(),
                    arr
                  );
                })
            );
          });
          Promise.all(promises).then((data) => {
            resolve(data);
          });

          // let invoices = [];
          // snapShot.forEach((el) => {
          //   this.database
          //     .collection("invoices")
          //     .doc(`${uid}_${el.data()["id"]}`)
          //     .collection("entries")
          //     .get()
          //     .then((ok) => {
          //       let arr = [];
          //       ok.forEach((ele) => {
          //         arr.push(ele.data());
          //       });
          //       invoices.push(
          //         this.helper.invoiceMethod(el.data()["id"], el.data(), arr)
          //       );
          //     })
          //     .then(() => {});
          // });
          // resolve(invoices);
        })
        .catch((err) => {
          console.log(err);
          reject(err);
        });
    });
  }

  addNewInvoice(data) {
    return this.database
      .collection("invoices")
      .doc(`${data.uid}_${data.invno}`)
      .set({
        uid: data.uid,
        id: data.invno,
        date: data.date,
        clientName: data.clientName,
        clientFirm: data.clientFirm,
        clientGST: data.clientGST,
        clientAddress: data.clientAddress,
        clientNumber: data.clientNumber,
        total: data.total,
      })
      .then(() => {
        var promises = [];
        console.log(data.entries);
        data.entries.forEach((entry, index) => {
          promises.push(
            this.database
              .collection("invoices")
              .doc(`${data.uid}_${data.invno}`)
              .collection("entries")
              .doc(`${index + 1}`)
              .set(Object.assign({}, entry))
          );
        });
        Promise.all(promises).then(() => {
          console.log("ADDED");
        });
      });
  }
}

export let invoiceBackend = new InvoiceBackend();

// firebase.firestore().collection($scope.longLanguage + 'Words').doc($scope.word).set(wordData)
//   .then(function() {
//     console.log("Collection added to Firestore!");
//     var promises = [];
//     promises.push(firebase.firestore().collection($scope.longLanguage + 'Words').doc($scope.word).collection('AudioSources').doc($scope.accentDialect).set(accentDialectObject));
//     promises.push(firebase.firestore().collection($scope.longLanguage + 'Words').doc($scope.word).collection('FunFacts').doc($scope.longLanguage).set(funFactObject));
//     promises.push(firebase.firestore().collection($scope.longLanguage + 'Words').doc($scope.word).collection('Translations').doc($scope.translationLongLanguage).set(translationObject));
//     Promise.all(promises).then(function() {
//       console.log("All subcollections were added!");
//     })
//     .catch(function(error){
//       console.log("Error adding subcollections to Firestore: " + error);
//     });
//   })
//   .catch(function(error){
//     console.log("Error adding document to Firestore: " + error);
//   });
