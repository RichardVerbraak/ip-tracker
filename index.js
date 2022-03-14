// DOM Elements
const input = document.querySelector('.header__input--input')
const button = document.querySelector('.header__input--btn')

// Header Panels
const ipInfo = document.querySelector('.ip')
const locationInfo = document.querySelector('.location')
const timezoneInfo = document.querySelector('.timezone')
const ispInfo = document.querySelector('.isp')

// 'Submit' button
button.addEventListener('click', () => {
	getIPAdress(input.value)
})

// Initialize the map with own IP Address on page load
const map = L.map('map', { zoomControl: false })

// Add a tilelayer
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

// Change the DOM to the new data
const updateDOM = ({ ip, location, isp }) => {
	const { city, country, region, timezone } = location

	ipInfo.textContent = `${ip}`
	locationInfo.textContent = `${city}, ${country} ${region}`
	timezoneInfo.textContent = `${timezone}`
	ispInfo.textContent = `${isp}`
}

// Draws a new map + a marker based on the locations latitude and longitude
const drawNewMap = (lat, lng) => {
	// Changes the map to the new coordinates
	map.setView([lat, lng], 13)

	// Custom icon
	const myIcon = L.icon({
		iconUrl: './images/icon-location.svg',
		iconSize: [40, 50],
		iconAnchor: [22, 94],
		popupAnchor: [-3, -76],
		shadowSize: [68, 95],
		shadowAnchor: [22, 94],
	})

	// Adds the location marker
	L.marker([lat, lng], { icon: myIcon }).addTo(map)
}

// !!! Adblocker will block the fetch request
// Get data from IP -> update the header + draw new Leaflet map
const getIPAdress = async (query) => {
	try {
		// Check if valid domain name (checks for http prefix and w/o)
		const domain = query?.match(
			/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g
		)

		// Fetch data based on the query (no query will get the location of the user who send the request)
		const res = await fetch(
			`https://geo.ipify.org/api/v1?apiKey=at_6SceFSek4Lwg9pbTODk2tFenU1JX2${
				domain ? `&domain=${query}` : query ? `&ipAddress=${query}` : ''
			}`
		)

		const data = await res.json()

		// Destructure needed data
		const {
			location: { lat, lng },
		} = data

		// Change the DOM of the header to reflect the fetched data
		updateDOM(data)

		// Draw the new Leaflet map
		drawNewMap(lat, lng)
	} catch (error) {
		console.log(error)
	}
}

// Get initial location
getIPAdress()
