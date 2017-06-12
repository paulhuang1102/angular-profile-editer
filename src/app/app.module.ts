import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { routing } from "./app.routing";
import { SavePageService } from "./services/save-page.service";
import { HttpModule } from "@angular/http";
import { EditorComponent } from './editor/editor.component';
import { AuthService } from "./services/auth.service";

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        EditorComponent
    ],
    imports: [
        BrowserModule.withServerTransition({ appId: 'editor' }),
        routing,
        HttpModule
    ],
    providers: [SavePageService, AuthService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
