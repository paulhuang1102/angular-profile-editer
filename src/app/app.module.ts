import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { routing } from "./app.routing";
import { SavePageService } from "./services/save-page.service";
import { HttpModule } from "@angular/http";
import { EditorComponent } from './editor/editor.component';
import { AuthService } from "./services/auth.service";
import { UserService } from "./services/user.service";
import { FormsModule } from "@angular/forms";

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        EditorComponent
    ],
    imports: [
        BrowserModule.withServerTransition({ appId: 'editor' }),
        routing,
        HttpModule,
        FormsModule
    ],
    providers: [SavePageService, AuthService, UserService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
