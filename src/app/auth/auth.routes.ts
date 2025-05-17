import { Routes } from "@angular/router";
import { SignInComponent } from "./components/signin/signin.component";
import { SignupComponent } from "./components/signup/signup.component";
import { ForgotPasswordComponent } from "./components/forgot-password/forgot-password.component";
import { ResetPasswordComponent } from "./components/reset-password/reset-password.component";

export const routes: Routes = [
    { path: '', redirectTo: 'signin', pathMatch: 'full' },
    { path: 'signin', component: SignInComponent },
    { path: 'signup', component: SignupComponent },
    { path: 'forget-password', component: ForgotPasswordComponent },
    { path: 'reset-password', component: ResetPasswordComponent },
];