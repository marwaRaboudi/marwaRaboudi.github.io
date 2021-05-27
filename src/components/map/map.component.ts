import {AfterViewInit, Component, ElementRef, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';

declare var H: any;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class MapComponent implements OnInit, AfterViewInit {
  apikey = 'wMx2D3pSP7MJhEmrhwpOIhP16wS3GeMc52hJVyUrsFI';
  latitude = 48.130323;
  longitude = 11.576362;
  @ViewChild('map')
  public mapElement!: ElementRef;
  @ViewChild('modal')
  public modalComponent!: any;
  markers: any[] = [];
  currentItemData: any = {};
  private platform: any;
  private map: any;
  private ui: any;
  homeIcon = new H.map.Icon('../../assets/images/home-icon.svg');
  homeIconActive = new H.map.Icon('../../assets/images/home-icon-active.svg');

  constructor() {
    this.platform = new H.service.Platform({
      apikey: this.apikey
    });
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    const defaultLayers: any = this.platform.createDefaultLayers();
    this.map = new H.Map(
      this.mapElement.nativeElement,
      defaultLayers.vector.normal.map,
      {
        center: {lat: this.latitude, lng: this.longitude},
        zoom: 14,
        pixelRatio: window.devicePixelRatio || 1
      }
    );
    window.addEventListener('resize', () => this.map.getViewPort().resize());
    const behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(this.map));
    this.ui = H.ui.UI.createDefault(this.map, defaultLayers);
    this.setCurrentPosition();
  }

  setCurrentPosition(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position: any) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        const coordinates = {lat: this.latitude, lng: this.longitude};
        this.map.setCenter(coordinates);
        const marker = new H.map.Marker(coordinates);
        this.map.addObject(marker);
        this.getPlaces();
      }, (error) => {
        switch (error.code) {
          case error.PERMISSION_DENIED:
            alert('User denied the request for Geolocation.');
            break;
          case error.POSITION_UNAVAILABLE:
            alert('Location information is unavailable.');
            break;
          case error.TIMEOUT:
            alert('The request to get user location timed out.');
            break;
          default:
            alert('An unknown error occurred.');
            break;
        }
      });
    } else {
      this.getPlaces();
    }
  }

  getPlaces(): void {
    const places = this.platform.getPlacesService();
    places.search({
      at: this.latitude + ',' + this.longitude,
      q: 'hotel'
    }, (response: any) => {
      response.results.items.forEach((place: any) => {
        this.dropMarker({lat: place.position[0], lng: place.position[1]}, place);
      });
    }, (error: any) => {
      console.error('ERROR: ' + error);
    });
  }

  dropMarker(coordinates: any, data: any): void {
    const marker = new H.map.Marker(coordinates, {icon: this.homeIcon});
    this.map.addObject(marker);
    this.markers.push(marker);
    marker.addEventListener('tap', (event: any) => {
      this.markers.forEach((markerItem: any) => {
        if (event.target === markerItem) {
          marker.setIcon(this.homeIconActive);
          this.currentItemData = data;
          this.modalComponent.displayForm = false;
          this.modalComponent.openModal();
          this.map.setCenter(event.target.getGeometry());
        } else {
          markerItem.setIcon(this.homeIcon);
        }
      });
    });
  }

}
