'use strict';


const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');

let map, mapEvent;

class Workout {
    date = new Date();
    id = (Date.now() + '').slice(-10);
    clicks = 0;

    constructor(coords, distance, duration) {
        this.coords = coords; // [lat,lng]
        this.distance = distance; // in km
        this.duration = duration // in min

    }

    _setDescription() {
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

        this.description = `${this.type[0].toUpperCase()}${this.type.slice(1)} on ${months[this.date.getMonth()]} ${this.date.getDay()}`

    }

    click() {
        this.clicks++;
    }
}

class Running extends Workout {
    type = 'running';
    constructor(coords, distance, duration, cadence) {
        super(coords, distance, duration);
        this.cadence = cadence;
        this.calcPace();
        this._setDescription();
    }

    calcPace() {
        this.pace = this.duration / this.distance;
        return this.pace
    }

}

class Cycling extends Workout {
    type = 'cycling';
    constructor(coords, distance, duration, elevationGain) {
        super(coords, distance, duration);
        this.elevationGain = elevationGain;
        this.calcSpeed()
        this._setDescription();
    }

    calcSpeed() {
        this.speed = this.distance / (this.duration / 60)
        return this.speed

    }

}

const run1 = new Running([39, -12], 5.2, 24, 178)
const cycling1 = new Cycling([39, -14], 27, 95, 530)



class App {
    #map;
    #mapEvent;
    #mapZoomLevel = 13;
    #workouts = [];


    constructor() {
        this._getPosition();

        this._getLocalStorage();


        form.addEventListener('submit', this._newWorkout.bind(this))
        // change input
        inputType.addEventListener('change', this._toggleElevationField)
        containerWorkouts.addEventListener('click', this._moveToPopup.bind(this));
    }

    _getPosition() {

        if (navigator.geolocation) { // --> loading page
            navigator.geolocation.getCurrentPosition(this._loadMap.bind(this), function () {
                alert('Could not get your position')
            })
        }
    }

    _loadMap(position) {

        // load position default ( onde estamos )
        const latitude = position.coords.latitude
        const longitude = position.coords.longitude
        console.log(`https://www.google.com/maps/@${latitude},${longitude}`)



        const coords = [latitude, longitude]

        this.#map = L.map('map').setView(coords, this.#mapZoomLevel); // receive position 
        // layer ao mapa
        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(this.#map);


        //handling clicks on map
        this.#map.on('click', this._showForm.bind(this))

        // isto serve para renderizar os workouts que estão guardados no local store, tem que ser aqui porque quando fazemos load á pagina, o getLocalStore é iniciado ( porque está na função construtora da class APP) e acontece que é iniciado antes de fazer o load do map .. 
        this.#workouts.forEach(work => {
            this._renderWorkoutMarker(work)

        })


    }


    _showForm(mapE) {
        this.#mapEvent = mapE
        form.classList.remove('hidden')
        inputDistance.focus()
    }

    _hideForm() {
        //Empty input

        inputDistance.value = inputDuration.value = inputCadence.value = inputElevation.value =
            '';

        form.style.display = 'none';
        form.classList.add('hidden');
        setTimeout(() => (form.style.display = 'grid'), 1000);
    }

    _toggleElevationField() {
        //selecionas o closest parent porque queres "esconder" a div que contem o form elevation ou cadence, a div é o que os contem portanto tens que esconder a div 

        inputElevation.closest('.form__row').classList.toggle('form__row--hidden')
        inputCadence.closest('.form__row').classList.toggle('form__row--hidden')

    }

    _newWorkout(e) {
        e.preventDefault()

        //Get data from Form

        const type = inputType.value;
        const distance = +inputDistance.value;
        const duration = +inputDuration.value;
        const { lat, lng } = this.#mapEvent.latlng
        let workout;

        //if workout running, create running object

        const validInputs = (...inputs) => inputs.every(inp => Number.isFinite(inp))

        const allPositive = (...inputs) => inputs.every(inp => inp > 0)


        if (type === 'running') {
            const cadence = +inputCadence.value;

            //Check if data is valid
            if (!validInputs(distance, duration, cadence) || !allPositive(distance, duration, cadence)) {
                return alert('Inputs have to be positive numbers')
            }
            workout = new Running([lat, lng], distance, duration, cadence)

        }



        if (type === 'cycling') {
            const elevation = +inputElevation.value;
            //Check if data is valid
            if (!validInputs(distance, duration, elevation) || !allPositive(distance, duration)) {
                return alert('Inputs have to be positive numbers')
            }
            workout = new Cycling([lat, lng], distance, duration, elevation)

        }


        //add new object to workout array

        this.#workouts.push(workout);
        console.log(workout)


        //render workout on map as marker
        this._renderWorkoutMarker(workout)


        // render workout on list
        this._renderWorkout(workout)


        //hide form + clear input fields 
        inputDistance.value = inputDuration.value = inputCadence.value = inputElevation.value = '';

        // hide form + clear inputs fields 

        this._hideForm();

        //Set local  storage to all workouts
        this._setLocalStorage()

    }
    _renderWorkoutMarker(workout) {
        L.marker(workout.coords).addTo(this.#map).bindPopup(L.popup({ maxWidth: 250, minWidth: 100, autoClose: false, closeOnClick: false, className: `${workout.type}-popup` })).setPopupContent(`${workout.type === 'running' ? '🏃‍♂️' : '🚴‍♀️'} ${workout.description}`).openPopup();
        console.log(workout)
    }

    _renderWorkout(workout) {

        let html = `  
        <li class="workout workout--${workout.type}" data-id="${workout.id}">
        <h2 class="workout__title">${workout.description}</h2>
        <div class="workout__details">
          <span class="workout__icon">${workout.type === 'running' ? '🏃‍♂️' : '🚴‍♀️'}</span>
          <span class="workout__value">${workout.distance}</span>
          <span class="workout__unit">km</span>
        </div>
        <div class="workout__details">
          <span class="workout__icon">⏱</span>
          <span class="workout__value">${workout.duration}</span>
          <span class="workout__unit">min</span>
        </div>
        `

        if (workout.type === 'running')
            html += `<div class="workout__details">
            <span class="workout__icon">⚡️</span>
            <span class="workout__value">${workout.pace.toFixed(1)}</span>
            <span class="workout__unit">km/h</span>
          </div>
          <div class="workout__details">
            <span class="workout__icon">🦶🏼</span>
            <span class="workout__value">${workout.cadence}</span>
            <span class="workout__unit">m</span>
          </div>
        </li>
        `
        if (workout.type === 'cycling')
            html += `<div class="workout__details">
        <span class="workout__icon">⚡️</span>
        <span class="workout__value">${workout.speed.toFixed(1)}</span>
        <span class="workout__unit">km/h</span>
      </div>
      <div class="workout__details">
        <span class="workout__icon">⛰</span>
        <span class="workout__value">${workout.elevationGain}</span>
        <span class="workout__unit">m</span>
      </div>
    </li>
    `
        form.insertAdjacentHTML('afterend', html)


    }
    _moveToPopup(e) {

        const workoutEl = e.target.closest('.workout')
        console.log(workoutEl)

        if (!workoutEl) return;

        const workout = this.#workouts.find(work => work.id === workoutEl.dataset.id)
        console.log(workout)

        this.#map.setView(workout.coords, this.#mapZoomLevel, { anime: true, pan: { duration: 1 }, })

        //workout.click();
    }


    _setLocalStorage() {
        localStorage.setItem('workouts', JSON.stringify(this.#workouts)) // primeiro argumento é o nome e a key  , o segundo argumento  tambem deve ser uma string que vamos armazenar associado ao primeiro argumento
    }

    _getLocalStorage() {

        const data = JSON.parse(localStorage.getItem('workouts')); // voltar a converter os dados do local store que estão em string para um objecto

        if (!data) return;

        this.#workouts = data;

        this.#workouts.forEach(work => {
            this._renderWorkout(work)

        })




    }

    reset() {
        localStorage.removeItem('workouts')
        location.reload()
    }

}


const app = new App();


