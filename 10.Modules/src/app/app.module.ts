import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
// import { AboutComponent } from './about/about.component';
// import { AboutExtraComponent } from './about/about-extra/about-extra.component';
// import { PageNamePipe } from './shared/page-name.pipe';
// import { ColorDirective } from './shared/color.directive';
import {FormsModule} from '@angular/forms';
import {AppRouterModule} from './app-router.module';
// import {AboutModule} from './about/about.module';
import {SharedModule} from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    // AboutComponent,
    // AboutExtraComponent,
    // PageNamePipe,
    // ColorDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRouterModule,
    // AboutModule,
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
