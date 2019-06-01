import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LightMenuComponent } from './light-menu/light-menu.component';
import { BoardLightComponent } from './board-light/board-light.component';

const routes: Routes = [
	{ path: '', component: LightMenuComponent },
	{ path: 'board/:id', component: BoardLightComponent }
];

@NgModule({
	imports: [ RouterModule.forRoot(routes) ],
	exports: [ RouterModule ]
})
export class AppRoutingModule {}
