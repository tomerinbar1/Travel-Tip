
import { storageService } from './async-storage.service.js'
export const placeService = {
    getPlaces,
    createNewPlace,
    getPlace,
    removePlace,
    savePlace
}

const PLACE_KEY = 'placesDB'

function getPlaces() {
    return storageService.query(PLACE_KEY).then(places => {
        if (!places.length) places = _createDemo()
        return places
    })
}

function createNewPlace(name, lat, lng) {

    const newPlace = {
        name,
        lat,
        lng
    }

    storageService.post(PLACE_KEY, newPlace)
}

function getPlace(placeId) {
    return storageService.get(PLACE_KEY, placeId)
}

function removePlace(placeId) {
    return storageService.remove(PLACE_KEY, placeId)
}

function savePlace(place) {
    if (place.id) {
        return storageService.put(PLACE_KEY, place)
    } else {
        return storageService.post(PLACE_KEY, place)
    }
}

function _createDemo() {
    return [{
        id: _makeId(),
        name: 'Tel Aviv',
        lat: 32.082,
        lng: 34.780,
    }]
}
function _makeId(length = 5) {
    var txt = ''
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return txt
}