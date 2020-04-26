import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { AfService } from "../_services/af.service";
import { AngularFireAuth } from "@angular/fire/auth";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"],
})
export class HeaderComponent implements OnInit {
  user: any;
  isLoggedIn: boolean;
  constructor(
    private router: Router,
    public afAuth: AngularFireAuth,
    public afservice: AfService
  ) {
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        // this.processing = true;
        this.user = user;
        // this.handleUserAuthentication();
      }
    });
  }

  ngOnInit() {}

  logout() {
    this.afservice.logout();
    this.isLoggedIn = false;
  }
  goToLogin() {
    this.router.navigate(["/login"]);
  }
}
