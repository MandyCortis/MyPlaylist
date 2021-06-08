import axios from 'axios'

const options = axios.create ({
  method: 'GET',
  baseURL: 'https://shazam-core.p.rapidapi.com/v1/charts/world',
  params: {limit: '10'},
  headers: {
    'x-rapidapi-key': 'd26bcd01famshedbad97a494f702p1c12a0jsn649315fc076a',
    'x-rapidapi-host': 'shazam-core.p.rapidapi.com'
  }
})

export default {
  getTasks() {
    console.log(options.get())
    return options.get()
  },
  
  getStat(title) {
    return stats.get(title)
  }
}