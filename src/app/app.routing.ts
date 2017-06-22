import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { RegisterComponent } from "./register/register.component";
import { AuthGuard } from "./guard/auth.guard";
import { ProfileComponent } from "./profile/profile.component";
import { NewPostComponent } from "./new-post/new-post.component";
import { PostComponent } from "./post/post.component";
import { EditPostComponent } from "./edit-post/edit-post.component";
const appRoutes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'profile/:id', component: ProfileComponent, canActivate: [AuthGuard] },
    { path: 'new_post', component: NewPostComponent, canActivate: [AuthGuard] },
    { path: 'edit_post/:id', component: EditPostComponent, canActivate: [AuthGuard] },
    { path: 'post/:id', component: PostComponent },
    { path: '**', redirectTo: 'home' }
];

export const routing = RouterModule.forRoot(appRoutes);