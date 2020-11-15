import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.scss'],
})
export class OptionsComponent implements OnInit {

  constructor(private router: Router, private popoverController: PopoverController) { }

  ngOnInit() {}

  goToPage(route: string){
    this.popoverController.dismiss();
    this.router.navigate([route]);
  }

}
