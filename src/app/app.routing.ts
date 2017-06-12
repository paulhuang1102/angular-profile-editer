import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { EditorComponent } from "./editor/editor.component";
const appRoutes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'editor', component: EditorComponent },
    { path: '**', redirectTo: '/home' }
];

export const routing = RouterModule.forRoot(appRoutes);