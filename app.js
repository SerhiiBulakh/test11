setInterval(() => initApp(), 5000)

async function initApp() {
   await getCoordinates()
   await getPeople()
   getDate()
}

function getCoordinates() {
fetch('http://api.open-notify.org/iss-now.json')
    .then(response => response.json())
    .then(json => {
    renderCoordinates(json.iss_position)
    initMap(json.iss_position)
})
}
function getDate() {
    const event = new Date();
    const dateUTC = event.toUTCString().split(' ')
    const clock = dateUTC[4].split(':')
    renderDate(dateUTC, clock)

}
function getPeople() {
    fetch('http://api.open-notify.org/astros.json')
        .then(response => response.json())
        .then(json => renderPeople(json.people))
}

function renderDate(dateUTC, clock) {
    const [day, dateNum, month, year] = dateUTC
    const [hour, minutes] = clock
    const time = document.querySelector('.time').innerHTML = `Current UTC time: ${hour}:${minutes}`
    const date = document.querySelector('.date').innerHTML = `${day}  ${dateNum} ${month} ${year}`
}

function renderCoordinates({latitude, longitude}) {
    const location = document.querySelector('.location');
    location.innerHTML = `<div class='bold'>ISS is now located at:</div> 
                           <div> longitude: ${longitude}, latitude: ${latitude}</div>`
}

function renderPeople(people) {
    const peopleList = document.querySelector('.people-list');
    const amount = document.querySelector('.amount');
    const peopleCard = people.map(person => createPersonElement(person))
    peopleList.innerHTML = '';
    peopleList.append(...peopleCard)
    amount.innerHTML = `Total Amount: ${people.length} people on ISS`
}
function createPersonElement(person) {
    const div = document.createElement('div')
    div.className = 'card'
    div.innerHTML = `<img class='avatar' src='./person.png' /> <div class='name'> ${person.name} </div>`
    return div
}
function initMap({ latitude = -25.363, longitude = 131.044} = {}) {
    
    const myLatLng = {lat: +latitude, lng: +longitude};

    const map = new google.maps.Map(document.getElementById('map'), {
      zoom: 4,
      center: myLatLng
    });

    const marker = new google.maps.Marker({
      position: myLatLng,
      map: map,
      title: 'Hello World!'
    });
  }