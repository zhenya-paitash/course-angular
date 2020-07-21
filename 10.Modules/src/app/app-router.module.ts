import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './home/home.component';
// import {AboutComponent} from './about/about.component';
// import {AboutExtraComponent} from './about/about-extra/about-extra.component';

const routes: Routes = [
  // ../
  {path: '', component: HomeComponent, pathMatch: 'full'},
  // {path: 'about', loadChildren: './about/about.module#AboutModule'}
  {path: 'about', loadChildren: () => import('./about/about.module').then(M => M.AboutModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules
  })],
  exports: [RouterModule]
})
export class AppRouterModule {

}
