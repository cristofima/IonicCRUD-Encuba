import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  isDarkTheme = false;

  constructor() { }

  ngOnInit() {
    this.checkTheme();
  }

  private checkTheme(){
    let theme = localStorage.getItem("theme");

    if(theme && theme == "dark"){
      this.isDarkTheme = true;
    }
  }

  changeTheme($event){
    if($event.detail.checked){
      document.body.setAttribute('data-theme', 'dark');
      localStorage.setItem("theme", "dark");
    }
    else{
      document.body.setAttribute('data-theme', 'light');
      localStorage.setItem("theme", "light");
    }
  }


}
