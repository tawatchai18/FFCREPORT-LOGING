// eslint-disable-next-line import/no-extraneous-dependencies
import { Base64 } from 'js-base64'

// const API = 'https://ffcmaekawtom.herokuapp.com/v1'
const API = 'https://api-test.ffc.in.th/v1'

export function PostData(type, userData, id) {
  return new Promise((resolve, reject) => {
    const url = `${API}/org/${id}/authorize`
    fetch(url, {
      method: 'post',
      body: JSON.stringify(userData),
      headers: new Headers({
        'Content-Type': 'application/json',
        Authorization: `Basic ${Base64.encode(`${userData.username}:${userData.password}`)}`,
      }),
    })
      .then(response => response.json())
      .then(res => {
        resolve(res)
      })
      // eslint-disable-next-line no-unused-vars
      .catch(error => {
        // eslint-disable-next-line prefer-promise-reject-errors
        reject('Username or password is incorrect')
      })
  })
}

export function SignupData(type, userData) {
  // eslint-disable-next-line no-unused-vars
  return new Promise((resolve, reject) => {
    fetch(`${API}/org`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    })
  })
}

export function Data() {
  return new Promise((resolve, reject) => {
    fetch(`${API}/org`, {
      method: 'GET',
    })
      .then(response => response.json())
      .then(res => {
        resolve(res)
      })
      .catch(error => {
        reject(error)
      })
  })
}

export function MapData(id, token) {
  return new Promise((resolve, reject) => {
    fetch(`${API}/org/${id}/house`, {
      method: 'GET',
      headers: new Headers({
        // 'Content-Type': 'application/vnd.geo+json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      }),
    })
      .then(response => response.json())
      .then(res => {
        resolve(res)
      })
      .catch(error => {
        reject(error)
      })
  })
}

export function UserDatamap(id, token, houseid) {
  return new Promise((resolve, reject) => {
    fetch(`${API}/org/${id}/house/${houseid}/resident`, {
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      }),
    })
      .then(response => response.json())
      .then(res => {
        resolve(res)
      })
      .catch(error => {
        reject(error)
      })
  })
}

export function houseMap(id, token, houseid) {
  return new Promise((resolve, reject) => {
    fetch(`${API}/org/${id}/house/${houseid}`, {
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      }),
    })
      .then(response => response.json())
      .then(res => {
        console.log(res, 'housemap')
        resolve(res)
      })
      .catch(error => {
        reject(error)
      })
  })
}

export function editemarker(id, token, houseid, idhouse, dragMarkerLatlng) {
  return new Promise((resolve, reject) => {
    fetch(`${API}/org/${id}/house/${houseid}`, {
      method: 'PUT',
      body: JSON.stringify({
        identity: idhouse.identity,
        people: idhouse.people,
        haveChronic: idhouse.haveChronic,
        no: idhouse.no,
        villageName: idhouse.villageName,
        villageId: idhouse.villageId,
        location: {
          type: 'Point',
          coordinates: [dragMarkerLatlng.lng, dragMarkerLatlng.lat],
        },
        link: idhouse.link,
        imagesUrl: idhouse.imagesUrl,
        id: idhouse.id,
        type: idhouse.type,
        timestamp: idhouse.timestamp,
      }),
      headers: new Headers({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      }),
    })
      .then(response => response.json())
      .then(res => {
        console.log(res, 'editemarker')
        resolve(res)
      })
      .catch(error => {
        reject(error)
      })
  })
}

export function editemarkersubmit(id, token, newid, edithouse, geojson, newlatlng) {
  console.log(newid, 'id')
  // console.log(newlatlng,'coordinest');
  // console.log(edithouse,'poporties');
  // console.log(edithouse.id,'idpop');
  // console.log(geojson,'poppo');
  return new Promise((resolve, reject) => {
    fetch(`${API}/org/${id}/house/${edithouse}`, {
      method: 'PUT',
      body: JSON.stringify({
        identity: geojson.identity,
        people: geojson.people,
        haveChronic: geojson.haveChronic,
        no: geojson.no,
        villageName: geojson.villageName,
        villageId: geojson.villageId,
        location: {
          type: 'Point',
          coordinates: newlatlng,
        },
        link: geojson.link,
        imagesUrl: geojson.imagesUrl,
        id: geojson.id,
        type: geojson.type,
        timestamp: geojson.timestamp,
      }),
      headers: new Headers({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      }),
    })
      .then(response => response.json())
      .then(res => {
        console.log(res, 'editemarker')
        resolve(res)
      })
      .catch(error => {
        reject(error)
      })
  })
}

export function haveLocat(id, token, houseid) {
  console.log(houseid)
  return new Promise((resolve, reject) => {
    fetch(`${API}/org/${id}/house?haveLocation=false`, {
      method: 'GET',
      headers: new Headers({
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      }),
    })
      .then(response => response.json())
      .then(res => {
        resolve(res)
      })
      .catch(error => {
        reject(error)
      })
  })
}

export function userDetail(id, token, personuser) {
  return new Promise((resolve, reject) => {
    fetch(`${API}/org/${id}/person/${personuser}/healthcareservice`, {
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      }),
    })
      .then(response => response.json())
      .then(res => {
        resolve(res)
      })
      .catch(error => {
        reject(error)
      })
  })
}

export function CreatData(id, token) {
  return new Promise((resolve, reject) => {
    fetch(`${API}/org/${id}/user`, {
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      }),
    })
      .then(response => response.json())
      .then(res => {
        resolve(res)
      })
      .catch(error => {
        reject(error)
      })
  })
}

export function CreatUser(id, token, userData) {
  return new Promise((resolve, reject) => {
    fetch(`${API}/org/${id}/user`, {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      }),
      body: JSON.stringify(userData),
    })
      .then(response => response.json())
      .then(res => {
        resolve(res)
      })
      .catch(error => {
        reject(error)
      })
  })
}
