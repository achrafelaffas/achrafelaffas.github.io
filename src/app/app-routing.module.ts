import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddDonorComponent } from './components/add-donor/add-donor.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DonorsListComponent } from './components/donors-list/donors-list.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { StatisticsComponent } from './components/statistics/statistics.component';
import { VerifyEmailComponent } from './components/verify-email/verify-email.component';
import { AuthGuard } from './shared/guard/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/sign-in', pathMatch: 'full' },
  { path: 'sign-in', component: SignInComponent },
  { path: 'register-user', component: SignUpComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'verify-email-address', component: VerifyEmailComponent },
  { path: 'dashboard', component: DashboardComponent,  canActivate: [AuthGuard], 
    children :[
      { path: 'statistics', component: StatisticsComponent},
      { path: 'donors', component: DonorsListComponent},
      { path: 'add', component: AddDonorComponent },
    ]
  },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
