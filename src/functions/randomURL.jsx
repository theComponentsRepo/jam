export function randomNumber(min, max) {
  return Math.floor(Math.random() * max) + min;
}

export function options() {
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '577990ecfemshcaf230c6fa2818dp1d2fa8jsn711963dcaf86',
      'X-RapidAPI-Host': 'deezerdevs-deezer.p.rapidapi.com'
    }
  };
  return options
}

export function randomURL() {
  const url = 'https://deezerdevs-deezer.p.rapidapi.com/album/' + randomNumber(200000,300000)
  return url
} 