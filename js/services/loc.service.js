export const locService = {
  getLocs,
}

const locs = [
  { id: 1, name: 'Haifa', lat: 32.793685, lng: 35.006470 },
  { id: 2, name: 'Eilat', lat: 29.556078, lng: 34.950580 },
]

function getLocs() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(locs)
    }, 2000)
  })
}
