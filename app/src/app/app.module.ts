import { ErrorHandler, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HttpClientModule } from '@angular/common/http';
import { AdminHomeComponent } from './components/admin/admin-home/admin-home.component';
import {NgbModule, NgbPaginationModule} from '@ng-bootstrap/ng-bootstrap';
import { NgxCaptchaModule } from 'ngx-captcha';
import { RegisterRequestsComponent } from './components/admin/register-requests/register-requests.component';
import { NavigationBarComponent } from './components/navigation/navigation-bar/navigation-bar.component';
import { AdminPageComponent } from './components/admin/admin-page/admin-page.component';
import { AdministrationComponent } from './components/admin/administration/administration.component';
import { FooterComponent } from './components/footers/footer/footer.component';
import { AddUserComponent } from './components/admin/add-user/add-user.component';
import { DeleteUserComponent } from './components/admin/delete-user/delete-user.component';
import { UpdateUserComponent } from './components/admin/update-user/update-user.component';
import { AddAgencyComponent } from './components/admin/add-agency/add-agency.component';
import { AdvertiserPageComponent } from './components/advertiser/advertiser-page/advertiser-page.component';
import { AdvertiserHomeComponent } from './components/advertiser/advertiser-home/advertiser-home.component';
import { AddRealEstateComponent } from './components/advertiser/add-real-estate/add-real-estate.component';
import { AddMicrolocationComponent } from './components/admin/add-microlocation/add-microlocation.component';
import { DeleteMicrolocationComponent } from './components/admin/delete-microlocation/delete-microlocation.component';
import { DatePipe } from '@angular/common';
import { BuyerPageComponent } from './components/buyer/buyer-page/buyer-page.component';
import { BuyerHomeComponent } from './components/buyer/buyer-home/buyer-home.component';
import { BuyerAdvancedSearchComponent } from './components/buyer/buyer-advanced-search/buyer-advanced-search.component';
import { EstateShowBriefComponent } from './components/buyer/estate-show-brief/estate-show-brief.component';
import { EstateShowDetailsComponent } from './components/buyer/estate-show-details/estate-show-details.component';
import { BuyerFavoritesComponent } from './components/buyer/buyer-favorites/buyer-favorites.component';
import { BuyerProfileComponent } from './components/buyer/buyer-profile/buyer-profile.component';
import { AdvertiserProfileComponent } from './components/advertiser/advertiser-profile/advertiser-profile.component';
import { AdminProfileComponent } from './components/admin/admin-profile/admin-profile.component'

export class MyErrorHandler implements ErrorHandler{
  handleError(error: any): void {
      if(error){
        console.log(error);
      }
  }
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    AdminHomeComponent,
    RegisterRequestsComponent,
    NavigationBarComponent,
    AdminPageComponent,
    AdministrationComponent,
    FooterComponent,
    AddUserComponent,
    DeleteUserComponent,
    UpdateUserComponent,
    AddAgencyComponent,
    AdvertiserPageComponent,
    AdvertiserHomeComponent,
    AddRealEstateComponent,
    AddMicrolocationComponent,
    DeleteMicrolocationComponent,
    BuyerPageComponent,
    BuyerHomeComponent,
    BuyerAdvancedSearchComponent,
    EstateShowBriefComponent,
    EstateShowDetailsComponent,
    BuyerFavoritesComponent,
    BuyerProfileComponent,
    AdvertiserProfileComponent,
    AdminProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgbModule,
    NgxCaptchaModule
  ],
  providers: [
    DatePipe,
    {
      provide: ErrorHandler,
      useClass: MyErrorHandler
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
