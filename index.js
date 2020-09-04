// DOM Elements
const input = document.querySelector('.header__input--input')
const button = document.querySelector('.header__input--btn')
const map = document.querySelector('#mapid')

// Panels
const ipInfo = document.querySelector('.ip')
const locationInfo = document.querySelector('.location')
const timezoneInfo = document.querySelector('.timezone')
const ispInfo = document.querySelector('.isp')

button.addEventListener('click', () => {
	console.log('clicked')
	getIPAdress(input.value)
})

// const myMap = L.map('mapid').setView([51.505, -0.09], 13)
// L.tileLayer(
// 	'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}',
// 	{
// 		attribution:
// 			'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
// 		maxZoom: 18,
// 		id: 'mapbox/streets-v11',
// 		tileSize: 512,
// 		zoomOffset: -1,
// 		accessToken:
// 			'pk.eyJ1Ijoibm90eWV0cmF0ZWQiLCJhIjoiY2tlb2R6Mng4Mjc1eTJ5bnAyZDN4YXU3MSJ9.YXRNzz7lF9FGnSD6QPvB2Q',
// 	}
// ).addTo(myMap)

const getIPAdress = async (address) => {
	const res = await fetch(`https://geo.ipify.org/api/v1?apiKey=at_6SceFSek4Lwg9pbTODk2tFenU1JX2&ipAddress=${address}
    `)
	const data = await res.json()

	const { ip, location, isp } = data
	const { city, country, region, timezone, lat, lng } = location

	ipInfo.textContent = `${ip}`
	locationInfo.textContent = `${city}, ${country} ${region}`
	timezoneInfo.textContent = `${timezone}`
	ispInfo.textContent = `${isp}`

	let myMap = L.map('mapid').setView([`${lat}`, `${lng}`], 13)
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
	).addTo(myMap)
	console.log(data)
}
