import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireStorage } from '@angular/fire/storage';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { finalize } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';

import {readAndCompressImage} from 'browser-image-resizer'
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  picture: string =
    'https://learnyst.s3.amazonaws.com/assets/schools/2410/resources/images/logo_lco_i3oab.png';

  constructor(
    private auth: AuthService,
    private router: Router,
    private db: AngularFireDatabase,
    private storage: AngularFireStorage,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {}


  onSubmit(f: NgForm){


    const {email,password,username,country,bio,name}= f.form.value

    this.auth.signUp(email,password)
    .then((res)=>{

console.log(res);
const {uid} =res.user
this.db.object(`/users/${uid}`).set({
  id: uid,
  name: name,
  email: email,
  instaUserName: username,
  country: country,
  bio: bio,
  picture: this.picture,
});


    })
    .then(()=>{
      this.router.navigateByUrl("/");
      this.toastr.success("Sign up success")
    })
    .catch((err)=>{
      this.toastr.error("SignUp failed")
    })

  }


}
