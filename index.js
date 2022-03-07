// DOM Elements
const input = document.querySelector('.header__input--input')
const button = document.querySelector('.header__input--btn')

// Panels
const ipInfo = document.querySelector('.ip')
const locationInfo = document.querySelector('.location')
const timezoneInfo = document.querySelector('.timezone')
const ispInfo = document.querySelector('.isp')

button.addEventListener('click', () => {
	console.log('clicked')
	getIPAdress(input.value)
})

// Initialize the map with own IP Address on page load

const map = L.map('map', { zoomControl: false })

L.tileLayer(
	'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}',
	{
		attribution:
			'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
		maxZoom: 18,
		id: 'mapbox/streets-v11',
		tileSize: 512,
		zoomOffset: -1,
		accessToken:
			'pk.eyJ1Ijoibm90eWV0cmF0ZWQiLCJhIjoiY2tlb2R6Mng4Mjc1eTJ5bnAyZDN4YXU3MSJ9.YXRNzz7lF9FGnSD6QPvB2Q',
	}
).addTo(map)

// Draws a new map + a marker based on the locations latitude and longitude
const drawNewMap = (lat, lng) => {
	// Changes the map to the new coordinates
	map.setView([lat, lng], 13)

	const myIcon = L.icon({
		iconUrl: './images/icon-location.svg',
		iconSize: [40, 50],
		iconAnchor: [22, 94],
		popupAnchor: [-3, -76],
		shadowSize: [68, 95],
		shadowAnchor: [22, 94],
	})

	// Adds the marker
	L.marker([lat, lng], { icon: myIcon }).addTo(map)
}

// Gets the location based on the IP address from the input
const getIPAdress = async (address) => {
	// Fetch location based on IP
	const res = await fetch(
		`https://geo.ipify.org/api/v1?apiKey=at_6SceFSek4Lwg9pbTODk2tFenU1JX2&${
			address && `ipAddress=${address}`
		}`
	)

	const data = await res.json()

	// Destructure needed data
	const { ip, location, isp } = data
	const { city, country, region, timezone, lat, lng } = location

	// Change the DOM of the header to reflect the fetched data
	ipInfo.textContent = `${ip}`
	locationInfo.textContent = `${city}, ${country} ${region}`
	timezoneInfo.textContent = `${timezone}`
	ispInfo.textContent = `${isp}`

	// Draw the new Leaflet map
	drawNewMap(lat, lng)
}

getIPAdress()
