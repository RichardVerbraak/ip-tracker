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

const getIPAdress = async (address) => {
	const res = await fetch(`https://geo.ipify.org/api/v1?apiKey=at_6SceFSek4Lwg9pbTODk2tFenU1JX2&ipAddress=${address}
    `)
	const data = await res.json()

	const { ip, location, isp } = data
	const { city, country, region, timezone } = location

	ipInfo.textContent = `${ip}`
	locationInfo.textContent = `${city}, ${country} ${region}`
	timezoneInfo.textContent = `${timezone}`
	ispInfo.textContent = `${isp}`
	console.log(data)
}
