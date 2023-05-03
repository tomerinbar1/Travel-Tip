export const mapService = {
  initMap,
  addMarker,
  panTo,
  deleteLoc,
}

import { locService } from '../services/loc.service.js'

// Var that is used throughout this Module (not global)
var gMap

function initMap(lat = 32.0749831, lng = 34.9120554) {

    return _connectGoogleApi().then(() => {

        gMap = new google.maps.Map(document.querySelector('#map'), {
            center: { lat, lng },
            zoom: 15,
        })
    })
}

function addMarker(loc) {
    var marker = new google.maps.Marker({
        position: loc,
        map: gMap,
        title: 'Hello World!',
    })
    return marker
}

function panTo(lat, lng) {
    var laLatLng = new google.maps.LatLng(lat, lng)
    gMap.panTo(laLatLng)
}

function deleteLoc(placeId) {
    locService.getLocs().then(locs => {
    locs.forEach((loc) => {
        console.log('loc', loc);
        const idx = locs.findIndex(loc => loc.id === placeId)
        locs.splice(idx, 1)
    })
  })
}

function _connectGoogleApi() {
  if (window.google) return Promise.resolve()
  const API_KEY = 'AIzaSyC5npTxFk7UL7btXdc70lyEfjwH8Mhet5g'
  var elGoogleApi = document.createElement('script')
  elGoogleApi.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}`
  elGoogleApi.async = true
  document.body.append(elGoogleApi)

    return new Promise((resolve, reject) => {
        elGoogleApi.onload = resolve
        elGoogleApi.onerror = () => reject('Google script failed to load')
    })
}

function getLatLng() {
    const myLatlng = { lat: 32.082, lng: 34.780 }
    const map = new google.maps.Map(document.getElementById('map'), {
        zoom: 4,
        center: myLatlng,
    })
    // Create the initial InfoWindow.
    let infoWindow = new google.maps.InfoWindow({
        content: 'Click the map to get Lat/Lng!',
        position: myLatlng,
    })

    map.addListener('click', mapsMouseEvent => {
        infoWindow = new google.maps.InfoWindow({
            position: mapsMouseEvent.latLng,
        })
        infoWindow.setContent(
            JSON.stringify(mapsMouseEvent.latLng.toJSON(), null, 2)
        )
        infoWindow.open(map)
    })
}


function _createDemo() {
    return [{
        id: utils.makeId(),
        name: 'Tel Aviv',
        lat: 32.082,
        lng: 34.780,
    }]
}

// function onGoToPlace(placeId) {
//     placeService.getPlace(placeId).then(place => initMap(place.lat, place.lng))
// }

// function onDeletePlace(placeId) {
//     placeService.removePlace(placeId)
// }
