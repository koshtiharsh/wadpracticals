import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-comp2',
  templateUrl: './comp2.component.html',
  styleUrl: './comp2.component.css'
})
export class Comp2Component {

  constructor(private router:Router){}

  change1(){
    this.router.navigate(['comp3'])
  }
}
