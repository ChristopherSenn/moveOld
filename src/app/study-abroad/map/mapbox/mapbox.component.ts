import { Component, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { FormsModule } from '@angular/forms';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { University } from '../../../../assets/Data/University';
import { UniversityService } from '../../university/university.service';
import { Identifiers } from '@angular/compiler';


@Component({
  selector: 'app-mapbox',
  templateUrl: './mapbox.component.html',
  styleUrls: ['./mapbox.component.scss']
})
export class MapboxComponent implements OnInit {

  unis: University[]; // Liste aller Universitäten
  data;
  uni: University; // Die ausgewählte Universität (Bei Hover oder Klick)
  showPopup: boolean; // Boolean der die Popup Anzeige Regelt
  showHover: boolean; // Boolean der die Hover Anzeige Regelt

  // Filter
  sortings = ['Alphabetical', 'Movers', 'Rating'];
  languages = ['English', 'France', 'German', 'Italian', 'Chinese', 'Spanish'];

  // show more less Variablen
  public show = false;
  public showMore = 'Show';

  // Die gekürzte Universitätsbeschreibung im Popup
  unidescription: String;

  // Standard Einstellungen der Karte
  map: mapboxgl.Map;
  style = 'mapbox://styles/grandmagauss/cjggub0jm00242so9u41xd01o';

  constructor(
    private universityService: UniversityService,
    private http: HttpClient
  ) {
    (mapboxgl as any).accessToken = 'pk.eyJ1IjoiY2hzNTQyMSIsImEiOiJjamlmbnRxaW0wNXEwM3ByMm0yaGE5MnQ3In0.HK9VqcBSfLpSs6LfcWENRw';
  }


  ngOnInit() {
    this.showPopup = false;
    this.showHover = false;
    this.buildMap();
    this.buildData();
  }

  // mehr Buttons anzeigen
  toggle(element, text) {
    element.textContent = text;
    this.show = !this.show;
    if (this.show) {
      this.showMore = 'Hide';
    } else {
      this.showMore = 'Show';
    }
    if (!this.show) {
      element.textContent = 'More ...';
    }
  }

  // Zentriert die Karte auf die Universität, über die in der Liste gehovert wird
  onHoverList(e) {
    this.map.flyTo({
      center: [
        e.target.parentElement.getAttribute('lang'),
        e.target.parentElement.getAttribute('id')],
      zoom: 4
    });
    // Anzeigen eines orangen Rings in der Mitte der Karte, um den Nutzer zu zeigen, wo sich die Universität auf der Karte befindet
    this.showCircle();
  }

  // Zeigen eines orangen Rings in der Mitte der Karte, um den Nutzer zu zeigen, wo sich die Universität auf der Karte befindet
  showCircle() {
    document.getElementById('focus_ring').setAttribute('style', 'opacity: 1; z-index: 1;');
  }
  hideCircle() {
    document.getElementById('focus_ring').setAttribute('style', 'opacity: 0; z-index: -1');
  }
  


  async buildData() {
    this.unis = <University[]>await this.universityService.getUnisAsync();
    this.uni = this.unis[0];

    const iterations = this.unis.length;

    const toAdd = new Array<{ type: string;
                              properties: {
                                description: string;
                                ADDRESS?: undefined;
                              };
                              geometry: {
                                type: string;
                                coordinates: number[];
                              };
                            } | { type: string;
                              properties: {
                                Name: string;
                                ADDRESS: string;
                                Address?: undefined;
                              }; geometry: {
                                type: string;
                                coordinates: number[];
                              };
                            }>(iterations);
    //toAdd Array mit Daten befüllen 
    for (let i = 0; i < iterations; i++) {
      toAdd[i] = {
        type: 'Feature',
        properties: {
          description: (String(i)),
        },
        //Koordinaten der Uni
        geometry: {
          type: 'Point',
          coordinates: [this.unis[i].lang, this.unis[i].lat]
        }
      };
    }

    this.data = { type: 'FeatureCollection', features: toAdd };

    //Mapbox Layer mit Unis aus Data/University in die Karte einfügen
    this.map.addLayer({
      id: 'unis',
      type: 'symbol',
      source: {
        type: 'geojson',
        data: this.data
      },
      //Styling des Symbols, das in der Map an den Standorten der Unis angezeigt wird
      layout: {
        'icon-image': 'town-hall-15',
        'icon-allow-overlap': true,
        'icon-size': 1.5
      },
      paint: {}
    });
  }

  //Standard Verhalten der Map
  buildMap() {
    this.map = new mapboxgl.Map({
      container: 'map',
      style: this.style,
      zoom: 1.5,
      center: [11.5, 38.05]
    });

    // Regeln für den minimalen und Maximalen Zoom
    this.map.setMaxZoom(5);
    this.map.setMinZoom(1.6);

    this.map.on('load', () => {
      // Das Verhalten für den Klick auf eine Universität auf der Karte
      this.map.on('click', 'unis', (e) => {

        // Die geklickte Univeristät wird identifiziert und abgespeichert
        this.uni = this.unis[e.features[0].properties.description];

        this.unidescription = this.uni.descriptionText.substring(0, 300).concat('...');
        // Der Boolean wird auf true gesetzt, um das Popup auf der Seite anzeigen zu lassen
        this.showPopup = true;
      });

      // Universitätsname anzeigen wenn über ein Symbol gehovert wird
      this.map.on('mouseenter', 'unis', (e) => {
        this.map.getCanvas().style.cursor = 'pointer';

        // Die gehoverte Univeristät wird identifiziert und abgespeichert
        this.uni = this.unis[e.features[0].properties.description];

        // Da ngIf asynchron arbeitet, kann hier nicht damit gearbeitet werden. Als workaround wird mit der Display Variable gearbeitet.
        const hover = document.getElementById('map-hover-university');
        hover.style.display = 'initial'; // Macht den Hovereffekt sichtbar
        hover.style.top = e.point.y + 'px'; // Setzt die richtige y Position
        hover.style.left = e.point.x + 20 + 'px'; // Setzt die richtige x Position
      });

      this.map.on('mouseleave', 'unis', () => {
        this.map.getCanvas().style.cursor = '';
        const hover = document.getElementById('map-hover-university');
        hover.style.display = 'none'; // Macht den Hovereffekt wieder unsichtbar
      });

    });
  }



  // Zeigen der Universitätsvorschau , wenn eine der Universitäten in der Liste ausgewählt wird
  showPopupFromList(uniID) {
    // parentElement, da die Identifikationsnummer der Universität in der Klasse des parentElement gespeichert ist
    const parentElement = uniID.target.parentElement;
    let classStringOfParentElement = parentElement.getAttribute('class');
    // von der Klasse wird nur die Identifikationsnummer benötigt, Styleanweisungen und andere Bezeichnungen werden abgeschnitten
    classStringOfParentElement = classStringOfParentElement.substring(11, classStringOfParentElement.length);
    // Arrays starten bei 0
    this.uni = this.unis[(classStringOfParentElement - 1)];
    // nur die ersten 300 Zeichen der Universitätbeschreibung werden angezeigt für die Vorschau
    this.unidescription = this.uni.descriptionText.substring(0, 300).concat('...');
    // Anzeigen der Universitätsvorschau
    this.showPopup = true;
  }

  closeWindow() {
    this.showPopup = false;
  }
}
