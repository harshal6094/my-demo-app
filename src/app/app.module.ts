import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { environment } from "../environments/environment";
import { AngularFireModule } from "@angular/fire";
import { AngularFireAuth } from "@angular/fire/auth";
import { AfService } from "../app/_services/af.service";
import { AlertService } from "../app/_services/alert.service";
import { AngularFireAnalyticsModule } from "@angular/fire/analytics";
import { AngularFirestoreModule } from "@angular/fire/firestore";
import { AngularFireDatabaseModule } from "@angular/fire/database";
//  AngularFireDatabase,
import { MatCardModule } from "@angular/material";
import { FormsModule } from "@angular/forms";

// import { AngularFirestore } from "@angular/fire/firestore";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HeaderComponent } from "./header/header.component";
import { FooterComponent } from "./footer/footer.component";
import { HomeComponent } from "./home/home.component";
import { AboutComponent } from "./about/about.component";
import { ContactComponent } from "./contact/contact.component";
import { HttpClientModule } from "@angular/common/http";
import { ReactiveFormsModule } from "@angular/forms";

import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import {
  MatToolbarModule,
  MatIconModule,
  MatSidenavModule,
  MatListModule,
  MatButtonModule,
} from "@angular/material";
import { LoginComponent } from "./login/login.component";
import { SignupComponent } from "./signup/signup.component";
import { ForgetPasswordComponent } from "./forget-password/forget-password.component";
import { VerifyEmailComponent } from "./verify-email/verify-email.component";
let firebase = {
  apiKey: "AIzaSyA6TZ8DdGfWappKE28Eo6MAxjqLuniupTM",
  authDomain: "fir-app-88475.firebaseapp.com",
  databaseURL: "https://fir-app-88475.firebaseio.com",
  projectId: "fir-app-88475",
  storageBucket: "fir-app-88475.appspot.com",
  messagingSenderId: "350574289985",
  appId: "1:350574289985:web:33cf0e528c0152e14292c0",
  measurementId: "G-LZLVGRLHHJ",
};
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    AboutComponent,
    ContactComponent,
    LoginComponent,
    SignupComponent,
    ForgetPasswordComponent,
    VerifyEmailComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(firebase),
    // AngularFireAuth,
    // AngularFirestore,
    AngularFireDatabaseModule,
    // AngularFireDatabase,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatButtonModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatCardModule,
    FormsModule,
    AngularFireAnalyticsModule,
    AngularFirestoreModule,
  ],
  providers: [AngularFireAuth, AfService, AlertService],
  bootstrap: [AppComponent],
})
export class AppModule {}
