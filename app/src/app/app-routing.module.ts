import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddAgencyComponent } from './components/admin/add-agency/add-agency.component';
import { AddMicrolocationComponent } from './components/admin/add-microlocation/add-microlocation.component';
import { AddUserComponent } from './components/admin/add-user/add-user.component';
import { AdminHomeComponent } from './components/admin/admin-home/admin-home.component';
import { AdminPageComponent } from './components/admin/admin-page/admin-page.component';
import { AdminProfileComponent } from './components/admin/admin-profile/admin-profile.component';
import { AdministrationComponent } from './components/admin/administration/administration.component';
import { DeleteMicrolocationComponent } from './components/admin/delete-microlocation/delete-microlocation.component';
import { DeleteUserComponent } from './components/admin/delete-user/delete-user.component';
import { RegisterRequestsComponent } from './components/admin/register-requests/register-requests.component';
import { UpdateUserComponent } from './components/admin/update-user/update-user.component';
import { AddRealEstateComponent } from './components/advertiser/add-real-estate/add-real-estate.component';
import { AdvertiserHomeComponent } from './components/advertiser/advertiser-home/advertiser-home.component';
import { AdvertiserPageComponent } from './components/advertiser/advertiser-page/advertiser-page.component';
import { AdvertiserProfileComponent } from './components/advertiser/advertiser-profile/advertiser-profile.component';
import { BuyerAdvancedSearchComponent } from './components/buyer/buyer-advanced-search/buyer-advanced-search.component';
import { BuyerFavoritesComponent } from './components/buyer/buyer-favorites/buyer-favorites.component';
import { BuyerHomeComponent } from './components/buyer/buyer-home/buyer-home.component';
import { BuyerPageComponent } from './components/buyer/buyer-page/buyer-page.component';
import { BuyerProfileComponent } from './components/buyer/buyer-profile/buyer-profile.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';



const routes: Routes = [
  {path:"", redirectTo:"/login",pathMatch: "full"},
  {path:"login",component: LoginComponent},
  {path:"register",component: RegisterComponent},
  {path:"admin",component: AdminPageComponent,children:[
    {path:"home", component:AdminHomeComponent},
    {path:"administration", component: AdministrationComponent,children:[
      {path:"", component:RegisterRequestsComponent},
      {path:"addUsers", component:AddUserComponent},
      {path:"deleteUsers", component:DeleteUserComponent},
      {path:"updateUsers", component:UpdateUserComponent},
      {path:"addAgency", component:AddAgencyComponent},
      {path:"addMicrolocation", component:AddMicrolocationComponent},
      {path:"deleteMicrolocation", component:DeleteMicrolocationComponent}
    ]},
    {path:"profile", component: AdminProfileComponent}
  ]},
  {path:"advertiser",component: AdvertiserPageComponent,children:[
    {path:"home", component:AdvertiserHomeComponent},
    {path:"addRealEstate", component:AddRealEstateComponent},
    {path:"profile", component: AdvertiserProfileComponent}
  ]},
  {path:"buyer",component: BuyerPageComponent,children:[
    {path:"home",component: BuyerHomeComponent},
    {path:"advancedSearch", component: BuyerAdvancedSearchComponent},
    {path:"favorites", component: BuyerFavoritesComponent},
    {path:"profile", component: BuyerProfileComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
