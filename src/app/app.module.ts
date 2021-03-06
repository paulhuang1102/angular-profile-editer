import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { routing } from "./app.routing";
import { SavePageService } from "./services/save-page.service";
import { HttpModule } from "@angular/http";
import { AuthService } from "./services/auth.service";
import { UserService } from "./services/user.service";
import { FormsModule } from "@angular/forms";
import { AlertComponent } from './alert/alert.component';
import { RegisterComponent } from './register/register.component';
import { AlertService } from "./services/alert.service";
import { AuthGuard } from "./guard/auth.guard";
import { ProfileComponent } from './profile/profile.component';
import { NewPostComponent } from './new-post/new-post.component';
import { PostComponent } from './post/post.component';
import { PostService } from "./services/post.service";
import { EditPostComponent } from './edit-post/edit-post.component';

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        AlertComponent,
        RegisterComponent,
        ProfileComponent,
        NewPostComponent,
        PostComponent,
        EditPostComponent
    ],
    imports: [
        BrowserModule.withServerTransition({ appId: 'editor' }),
        routing,
        HttpModule,
        FormsModule
    ],
    providers: [SavePageService, AuthService, UserService, AlertService, AuthGuard, PostService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
