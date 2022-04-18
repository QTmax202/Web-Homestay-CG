import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./component/home/home.component";
import {AboutComponent} from "./component/about/about.component";
import {BlogComponent} from "./component/blog/blog.component";
import {ContactComponent} from "./component/contact/contact.component";
import {HomestayComponent} from "./component/homestay/homestay.component";
import {HomestayDetailComponent} from "./component/homestay-detail/homestay-detail.component";
import {MyHomestayComponent} from "./component/my-homestay/my-homestay.component";
import {ProfileComponent} from "./component/profile/profile.component";
import {TripsComponent} from "./component/trips/trips.component";
import {SignInComponent} from "./dialog/sign-in/sign-in.component";
import {SignUpComponent} from "./dialog/sign-up/sign-up.component";
import {NotifyComponent} from "./dialog/notify/notify.component";

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'about', component: AboutComponent},
  {path: 'blog', component: BlogComponent},
  {path: 'contact', component: ContactComponent},
  {path: 'homestay', component: HomestayComponent},
  {path: 'homestay-detail/:id', component: HomestayDetailComponent},
  {path: 'my-homestay', component: MyHomestayComponent},
  {path: 'profile', component: ProfileComponent},
  {path: 'trips', component: TripsComponent},
  {path: 'sign-in', component: SignInComponent},
  {path: "logout", component: SignInComponent},
  {path: 'sign-up', component: SignUpComponent},
  {path: '', redirectTo: 'home', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
