import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MultByPipe } from "./pipes/mult-by.pipe";
import { MyPipePipe } from './pipes/my-pipe.pipe';
import {FormsModule} from "@angular/forms";
import { FilterPostsPipe } from './pipes/filter-posts.pipe';

@NgModule({
  declarations: [
    AppComponent,
    MultByPipe,
    MyPipePipe,
    FilterPostsPipe
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
