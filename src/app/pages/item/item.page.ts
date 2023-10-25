import { Component } from '@angular/core';
import { Noticias } from '../../clases/noticias';
import { NavigationExtras, Router } from '@angular/router';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { Platform, ToastController } from '@ionic/angular';
import { DbserviceService } from 'src/app/services/dbservice.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.page.html',
  styleUrls: ['./item.page.scss'],
})
export class ItemPage {

  noticias: any = [
    {
      titulo: "Titulo de la Noticia",
      texto: "Texto de la noticia que quiero que salga en el cuerpo del item"
    }
  ]
  constructor(private router: Router, private servicioBD: DbserviceService) { }

  ngOnInit(){
    this.servicioBD.dbState().subscribe((res: any) =>{
      if(res){
        this.servicioBD.fetchNoticias().subscribe((item: any) =>{
          this.noticias = item;
        })
      }
      //this.servicioBD.presentAlert("4");
    });
  }

  getItem($event: any) {
    const valor = $event.target.value;
    console.log('valor del control: ' + valor);
  }

  editar(item: any) {
    let navigationextras: NavigationExtras = {
      state : {
        idEnviado : item.id,
        tituloEnviado : item.titulo,
        textoEnviado : item.texto
      }
    }
    this.router.navigate(['/modif-item'],navigationextras);
  }

  eliminar(item: any) {
    this.servicioBD.deleteNoticia(item.id);
    this.servicioBD.presentToast("Noticia Eliminada");
  }
}
