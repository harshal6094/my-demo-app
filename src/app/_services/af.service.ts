import { Injectable } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { AngularFireAuth } from "@angular/fire/auth";
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from "@angular/fire/firestore";
import { Observable, of } from "rxjs";
import * as firebase from "firebase/app";
import "firebase/auth";
import { User } from "../_models/interfaces";
import { switchMap } from "rxjs/operators";
// import { environment } from "../../../environments/environment";
import { AlertService } from "./alert.service";
// import { HubspotService } from "../hubspot.service";

@Injectable()
export class AfService {
  user$: Observable<User>;
  error: any;

  constructor(
    private router: Router,
    public afAuth: AngularFireAuth,
    public afs: AngularFirestore,
    private alertService: AlertService // private hubspotService: HubspotService
  ) {
    this.user$ = afAuth.authState.pipe(
      switchMap((user) => {
        if (user) {
          /*
           * Here we are checking whether the user logged in using either FB or Google,
           * and are updating his document and adding him to HubSpot if he's logged in for the
           * first time
           */

          // if (
          //   user.providerData[0].providerId === "google.com" ||
          //   user.providerData[0].providerId === "facebook.com"
          // ) {
          //   /* Check if the user has signed in for the first time */
          //   //if (user.metadata.creationTime === user.metadata.lastSignInTime) {
          //   this.hubspotService.searchContact(user.email).subscribe((count) => {
          //     if (count === 0) {
          //       this.updateUser(user);
          //       this.hubspotService.addGoogleContact(user);
          //     }
          //   });
          // }

          // FB always gives emailVerified as false, but we will log the user in anyway
          //if (user.emailVerified || user.providerData[0].providerId === 'facebook.com') {
          /*
        if(user.emailVerified) {
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        }
        else {
          //return Observable.of(null);
          return of(null);

        }
        */
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          /*
         * The user is null, but we were trying to log in using some provider
         * such as FB. In this case, we should display the error that led to not
         * getting a user

        this.afAuth.auth.getRedirectResult().then((credential) => {

        }).catch(
          (err) => {
            this.alertService.error(err.message);
          });
          */
          //return Observable.of(null);
          return of(null);
        }
      })
    );
  }

  isLoggedIn() {
    return false;
  }

  updateUser(user) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${user.uid}`
    );
  }
  //   const data: User = {
  //     uid: user.uid,
  //     email: user.email,
  //     displayName: user.displayName,
  //     photoURL: user.photoURL,
  //     websiteURL: "",
  //     roles: {
  //       subscriber: true,
  //       admin: false,
  //     },
  //     accounts: ["J6StyOerQAPMQBN1ZN7P"],
  //   };
  //   var result = userRef.set(data, { merge: true });
  //   return result;
  // }

  // loginWithGoogle() {
  //   const provider = new firebase.auth.GoogleAuthProvider();
  //   this.afAuth.auth.signInWithRedirect(provider);
  // }

  // loginWithFacebook() {
  //   const provider = new firebase.auth.FacebookAuthProvider();
  //   provider.addScope("email");
  //   this.afAuth.auth.signInWithRedirect(provider);
  // }

  updateEmailUser(user, formdata) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${user.uid}`
    );
    formdata.url = formdata.url ? formdata.url : "";

    const data: User = {
      uid: user.uid,
      displayName: formdata.first_name + " " + formdata.last_name,
      email: user.email,
      photoURL: "",
      websiteURL: formdata.url,
      roles: {
        subscriber: true,
        admin: false,
      },
      accounts: ["J6StyOerQAPMQBN1ZN7P"],
    };
    var result = userRef.set(data, { merge: true });
    console.log(result);
    return result;
  }

  signUpWithEmail(formData) {
    if (formData.valid) {
      var email = formData.value.email;
      var password = formData.value.password;
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)

        .then((newUser) => {
          newUser.user
            .sendEmailVerification()
            .then((success) => {
              this.alertService.success(
                "Please verify your email and login. We have sent a verification email to '" +
                  email +
                  "'.",
                true
              );
              this.router.navigate(["/login"]);
              this.updateEmailUser(newUser.user, formData.value);
              //  this.hubspotService.addEmailContact(formData.value);
            })
            .catch((error) => {
              this.alertService.error(error.message);
            });
        })
        .catch((err) => {
          this.alertService.error(err.message);
        });
    }
  }

  updateEmailUserForWebAudit(user, formdata) {
    console.log("In updateEmailUser");
    let slug = `${formdata.first_name} ${formdata.last_name}`
      .replace(/[\s+/+_+]/g, "-")
      .toLowerCase();
    let acc = {
      isDemo: false,
      name: `${formdata.first_name} ${formdata.last_name}`,
      account_currency: "INR",
      account_slug: slug,
      url: formdata.url || "",
      form_settings: {
        email: `${user.email}`,
        hubspot_form_id: "",
        hubspot_id: "",
      },
    };

    return this.afs
      .collection(`accounts`)
      .add(acc)
      .then(
        (account) => {
          console.log("Account document created");
          const userRef: AngularFirestoreDocument<any> = this.afs.doc(
            `users/${user.uid}`
          );
          formdata.url = formdata.url ? formdata.url : "";
          const data: User = {
            uid: user.uid,
            displayName: formdata.first_name + " " + formdata.last_name,
            email: user.email,
            photoURL: "",
            websiteURL: formdata.url,
            roles: {
              subscriber: true,
              admin: false,
            },
            accounts: [account.id],
          };
          var result = userRef.set(data, { merge: true });
          console.log("User document created");
          return result;
        },
        (error) => {
          console.error(error.message);
          //this.alertService.error(error.message);
          return error;
        }
      );
  }

  signUpWithEmailForWebAudit(formData) {
    if (formData.valid) {
      var email = formData.value.email;
      var password = formData.value.password;
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then((newUser) => {
          //  newUser.user.sendEmailVerification().then(success => {
          //  this.alertService.success("Please verify your email and login. We have sent a verification email to '" + email + "'.", true);
          this.updateEmailUserForWebAudit(newUser.user, formData.value)
            .then((success) => {
              //this.alertService.success("Your website audit has started. Please log in to view your results.", true);
              console.log("Account and user created successfully!");
              //  this.hubspotService.addEmailContact(formData.value);
              //this.logout();
              this.router.navigate(["/login"]);
            })
            .catch((error) => {
              this.alertService.error(error.message);
            });
        })
        .catch((err) => {
          this.alertService.error(err.message);
        });
    }
  }

  loginWithEmail(formData) {
    if (formData.valid) {
      var email = formData.value.email;
      var password = formData.value.password;

      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then((success) => {
          console.log("Login Successful");
        })
        .catch((err) => {
          if (err.code == "auth/user-not-found") {
            this.alertService.error(
              "We don't have an account with this email address. Perhaps you entered it incorrectly?"
            );
          } else if (err.code == "auth/wrong-password") {
            this.alertService.error("The password you entered is incorrect");
            console.log("The password you entered is incorrect");
          } else if (err.code == "auth/invalid-email") {
            this.alertService.error(
              "The email address you've entered has an invalid format"
            );
            console.log(
              "The email address you've entered has an invalid format"
            );
          } else {
            this.alertService.error(err.message);
            console.log("error here");
          }
        });
    }
    let loginStatus = this.isLoggedIn();
    console.log(loginStatus);
  }

  logout() {
    // await this.afAuthA.signOut();
    // return this.afAuth.auth.signOut().then(() => {
    // this.router.navigate(["sign-in"]);
    // });
    this.router.navigate(["/"]);
    sessionStorage.clear();
  }
}
