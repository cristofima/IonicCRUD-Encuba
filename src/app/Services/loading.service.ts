import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  constructor(private loadingController: LoadingController) { }

  async presentLoading(message: string = 'Cargando ...') {
    const loading = await this.loadingController.create({
      message: message
    });

    return loading;
  }
}
