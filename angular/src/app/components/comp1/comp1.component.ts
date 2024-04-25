import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-comp1',
  templateUrl: './comp1.component.html',
  styleUrl: './comp1.component.css'
})
export class Comp1Component {
  name:string="abc";

  constructor(private router:Router){}

  change()
  {
    localStorage.setItem("name",this.name)
    this.router.navigate(['comp2'])
  }
}
