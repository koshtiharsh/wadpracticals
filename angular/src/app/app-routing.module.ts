import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Comp1Component } from './components/comp1/comp1.component';
import { Comp2Component } from './components/comp2/comp2.component';
import { Comp3Component } from './components/comp3/comp3.component';

const routes: Routes = [{
  component:Comp1Component,
  path:"comp1"
},

{
  component:Comp2Component,
  path:"comp2"
},

{
  component:Comp3Component,
  path:"comp3"
}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
