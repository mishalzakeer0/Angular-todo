import { Routes } from '@angular/router';
import { HomeComponent  } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { AuthGuard } from './guards/auth-guard.guard';
export const routes: Routes = [
    {
        path:"",
        component:LoginComponent,
        
    },
    {
        path:"home",
        title:'home',
        component:HomeComponent,
        canActivate:[AuthGuard],
    }
]; 
