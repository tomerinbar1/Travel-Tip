import { locService } from './services/loc.service.js'
import { placeService } from './services/place.service.js'
import { mapService } from './services/map.service.js'

window.onload = onInit
window.onAddMarker = onAddMarker
window.onPanTo = onPanTo
window.onGetLocs = onGetLocs
window.onGetUserPos = onGetUserPos
window.onSearch = onSearch
window.onGo = onGo
window.onDelete = onDelete
window.renderLocs = renderLocs

function onInit() {
    mapService.initMap()
        .then(() => {
            console.log('Map is ready')
        })
        .catch(() => console.log('Error: cannot init map'))

    placeService.getPlaces().then(places => console.log(places))
}

// This function provides a Promise API to the callback-based-api of getCurrentPosition
function getPosition() {
  console.log('Getting Pos')
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject)
  })
}

function onAddMarker() {
  console.log('Adding a marker')
  mapService.addMarker({ lat: 32.0749831, lng: 34.9120554 })
}

function onGetLocs() {
  locService.getLocs().then(locs => {
    console.log('Locations:', locs)
    // document.querySelector('.locs').innerText = JSON.stringify(locs, null, 2)
    renderLocs()
  })
}

function onGetUserPos() {
  getPosition()
    .then(pos => {
      console.log('User position is:', pos.coords)
      document.querySelector(
        '.user-pos'
      ).innerText = `Latitude: ${pos.coords.latitude} - Longitude: ${pos.coords.longitude}`
    })
    .catch(err => {
      console.log('err!!!', err)
    })
}

function onPanTo() {
  console.log('Panning the Map')
  mapService.panTo(35.6895, 139.6917)
}

function onSearch(search) {}

function renderLocs() {
  locService.getLocs().then(locs => {
    console.log('Locations:', locs)
    const strHtmls = locs.map(loc => {
      return `
        <tr>
          <td>${loc.name}</td>
          <td>${loc.lat}</td>
          <td>${loc.lng}</td>
          <td><button onclick="onGo(${loc.lat}, ${loc.lng})">Go</button></td>
          <td><button onclick="onDelete(${loc.id})">Delete</button></td>
        </tr>
        `
    })
    const tableHtml = `
        <table class="location-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Latitude</th>
              <th>Longitude</th>
              <th>Go</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            ${strHtmls.join('')}
          </tbody>
        </table>
      `
    document.querySelector('.location-table').innerHTML = tableHtml
  })
}

function onGo(lat, lng) {
  mapService.panTo(lat, lng)
}

function onDelete(id) {
  mapService.deleteLoc(id)
  renderLocs()
}
