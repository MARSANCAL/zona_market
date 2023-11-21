import { GmapsService } from 'src/app/services/maps.service';
import { Component, ElementRef, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';

@Component({
  selector: 'app-compbuscar',
  templateUrl: './compbuscar.component.html',
  styleUrls: ['./compbuscar.component.scss'],
})
export class CompbuscarComponent  implements OnInit, OnDestroy {

  @ViewChild('map', {static: true}) mapElementRef: ElementRef;
  googleMaps: any;
  center = { lat: -33.03368868781387, lng: -71.53318803472894 };
  map: any;
  mapClickListener: any;
  markerClickListener: any;
  markers: any[] = [];

  constructor(
    private gmaps: GmapsService,
    private renderer: Renderer2,
    private actionSheetCtrl: ActionSheetController
  ) {}

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.loadMap();
  }

  async loadMap() {
    try {
      let googleMaps: any = await this.gmaps.loadGoogleMaps();
      this.googleMaps = googleMaps;
      const mapEl = this.mapElementRef.nativeElement;

      // Obtener la ubicación actual del usuario
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLocation = new googleMaps.LatLng(position.coords.latitude, position.coords.longitude);

          this.map = new googleMaps.Map(mapEl, {
            center: userLocation, // Utiliza la ubicación del usuario como centro del mapa
            zoom: 12,
          });

          this.renderer.addClass(mapEl, 'visible');
          this.addMarker(userLocation);
          this.onMapClick();
        },
        (error) => {
          console.error('Error al obtener la ubicación:', error);
        }
      );
    } catch (e) {
      console.log(e);
    }

    
  }

  onMapClick() {
    this.mapClickListener = this.googleMaps.event.addListener(this.map, "click", (mapsMouseEvent) => {
      console.log(mapsMouseEvent.latLng.toJSON());
      this.addMarker(mapsMouseEvent.latLng);
    });
  }

  addMarker(location) {
    let googleMaps: any = this.googleMaps;
    const icon = {
      url: 'assets/icon/location-pin.png',
      scaledSize: new googleMaps.Size(50, 50), 
    };
    const marker = new googleMaps.Marker({
      position: location,
      map: this.map,
      icon: icon,
      // draggable: true,
      animation: googleMaps.Animation.DROP
    });
    this.markers.push(marker);
    // this.presentActionSheet();
    this.markerClickListener = this.googleMaps.event.addListener(marker, 'click', () => {
      console.log('markerclick', marker);
      this.checkAndRemoveMarker(marker);
      console.log('markers: ', this.markers);
    });
  }

  checkAndRemoveMarker(marker) {
    const index = this.markers.findIndex(x => x.position.lat() == marker.position.lat() && x.position.lng() == marker.position.lng());
    console.log('is marker already: ', index);
    if(index >= 0) {
      this.markers[index].setMap(null);
      this.markers.splice(index, 1);
      return;
    }
  }

  async presentActionSheet() {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Added Marker',
      subHeader: '',
      buttons: [
        {
          text: 'Remove',
          role: 'destructive',
          data: {
            action: 'delete',
          },
        },
        {
          text: 'Save',
          data: {
            action: 'share',
          },
        },
        {
          text: 'Cancel',
          role: 'cancel',
          data: {
            action: 'cancel',
          },
        },
      ],
    });

    await actionSheet.present();
  }

  ngOnDestroy() {
    // this.googleMaps.event.removeAllListeners();
    if(this.mapClickListener) this.googleMaps.event.removeListener(this.mapClickListener);
    if(this.markerClickListener) this.googleMaps.event.removeListener(this.markerClickListener);
  }

}
