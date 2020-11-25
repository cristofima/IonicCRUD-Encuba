import { Component, OnInit } from '@angular/core';
import { NativeStorage } from '@ionic-native/native-storage/ngx';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  isDarkTheme = false;

  constructor(private nativeStorage: NativeStorage) { }

  ngOnInit() {
    this.checkTheme();
  }

  private checkTheme(){
    this.nativeStorage.getItem('theme').then((theme: string) =>{
      if(theme == "dark"){
        this.isDarkTheme = true;
      }
    });
  }

  changeTheme($event){
    if($event.detail.checked){
      document.body.setAttribute('data-theme', 'dark');
      this.nativeStorage.setItem("theme", "dark");
    }
    else{
      document.body.setAttribute('data-theme', 'light');
      this.nativeStorage.setItem("theme", "light");
    }
  }


}
