import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { AuthService } from "../_services/auth.service";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from "@angular/fire/firestore";
import { AfService } from "../_services/af.service";
import { AlertService } from "../_services/alert.service";
// import { User } from "../_models/interfaces";
import { AngularFireAuth } from "@angular/fire/auth";

@Component({
  selector: "login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  state: string = "";
  error: any;
  user: any;
  showVerificationMsg: boolean;
  processing: boolean;

  loginForm = new FormGroup({
    email: new FormControl("", [Validators.required]),
    password: new FormControl("", [Validators.required]),
  });
  constructor(
    private router: Router,
    private authService: AuthService,
    public AfService: AfService,
    public afAuth: AngularFireAuth,
    public afs: AngularFirestore // private alertService: AlertService
  ) {
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        // this.processing = true;
        this.user = user;
        this.handleUserAuthentication();
      }
    });
  }

  loginWithEmail() {
    this.AfService.loginWithEmail(this.loginForm);
    console.log(this.loginForm.value);
    this.router.navigate(["/contact"]);
  }

  ngOnInit() {
    // this.showVerificationMsg = false;
    // this.processing = true;
    // this.user = this.afAuth.auth.currentUser;
    this.handleUserAuthentication();
  }

  handleUserAuthentication() {
    if (this.user) {
      // FB always gives emailVerified as false, but we will log the user in anyway
      //if(this.user.emailVerified || this.user.providerData[0].providerId === 'facebook.com') {
      /*
        if(this.user.emailVerified) {
          this.router.navigateByUrl('/websites');
        }
        else {
          this.processing = false;
          this.alertService.reset('');
          this.showVerificationMsg = true;
          this.afAuth.auth.signOut();
        }
        */
      // this.router.navigateByUrl("/websites");
    } else {
      /*
       * 1. Void: There was no redirect operation called. All we did was to navigate
       *    to the login component. So we should stop the spinner.
       * 2. Error: The user is null, but we were trying to log in using some provider
       *    such as FB. In this case, we should display the error that led to not
       *    getting a user and stop the spinner.
       */
      // this.afAuth.auth.getRedirectResult().then(
      //   () => {
      //     this.processing = false;
      //   },
      //   (error) => {
      //     console.error(error.message);
      //     this.processing = false;
      //   }
      // );
    }
  }

  resendVerification() {
    this.user.sendEmailVerification().then(
      (success) => {
        // this.showVerificationMsg = false;
        // this.alertService.success(
        //   "The verification email was re-sent successfully to '" +
        //     this.user.email +
        //     "'."
        // );
      },
      (error) => {
        // this.alertService.error(error.message);
      }
    );
  }

  login() {
    // this.AfService.loginWithGoogle();
  }

  loginWithFacebook() {
    // this.AfService.loginWithFacebook();
  }

  logout() {
    // this.AfService.logout();
  }
}

// import { Component, OnInit } from "@angular/core";
// import { Router, ActivatedRoute } from "@angular/router";
// import { FormBuilder, FormGroup, Validators } from "@angular/forms";
// import { first } from "rxjs/operators";
// import { LoginService } from "../_services/login.service";
// import { AlertService } from "../_services/alert.service";
// @Component({
//   selector: "app-login",
//   templateUrl: "./login.component.html",
//   styleUrls: ["./login.component.css"],
// })
// export class LoginComponent implements OnInit {
//   loginForm: FormGroup;
//   loading = false;
//   submitted = false;
//   returnUrl: string;
//   constructor(
//     private formBuilder: FormBuilder,
//     private route: ActivatedRoute,
//     private router: Router,
//     private authenticationService: LoginService,
//     private alertService: AlertService
//   ) {}

//   ngOnInit() {
//     // this.loginForm = this.formBuilder.group({
//     //   username: ["", Validators.required],
//     //   password: ["", Validators.required],
//     // });
//   }

//   onSubmit() {
//     this.submitted = true;
//   }
//   get f() {
//     return this.loginForm.controls;
//   }
// }
