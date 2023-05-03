
import { storageService } from './async-storage.service.js'
export const placeService = {
    getPlaces,
    createNewPlace,
    getPlace,
    removePlace,
    savePlace
}

const PLACE_KEY = 'placesDB'

function getPlaces(){
    return storageService.query(PLACE_KEY)
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