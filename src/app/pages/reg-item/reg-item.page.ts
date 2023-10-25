import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DbserviceService } from 'src/app/services/dbservice.service';

@Component({
  selector: 'app-reg-item',
  templateUrl: './reg-item.page.html',
  styleUrls: ['./reg-item.page.scss'],
})
export class RegItemPage implements OnInit {

  tituloNoticia = "";
  textoNoticia = "";
  constructor(private dbservice: DbserviceService, private router: Router) { }

  guardar() {
    this.dbservice.addNoticia(this.tituloNoticia,this.textoNoticia);
    this.dbservice.presentToast("Noticia Agregada");
    this.router.navigate(['/home']);
  }

  ngOnInit() {
  }

}
