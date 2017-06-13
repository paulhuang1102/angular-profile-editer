import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { EditorComponent } from "./editor/editor.component";
import { RegisterComponent } from "./register/register.component";
import { RedirectComponent } from "./redirect/redirect.component";
import { AuthGuard } from "./guard/auth.guard";
const appRoutes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'editor', component: EditorComponent, canActivate: [AuthGuard] },
    { path: 'register', component: RegisterComponent },
    { path: 'redirect', component: RedirectComponent },
    { path: '**', redirectTo: '/home' }
];

export const routing = RouterModule.forRoot(appRoutes);