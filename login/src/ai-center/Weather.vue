<template>
  <div class="weather-app">
    <nav-bar :dates="dates" @date-selected="displayWeather"
      style="border: 2px solid rgba(7, 118, 181, .8);height: 30px;"></nav-bar>
    <div v-if="weather" style="height: 70px; display: flex; justify-content: center; align-items: center;">
      <div class="weather">
        <div style="display:flex; width: 40px; flex-direction: column;">
          <img :src="getWeatherIcon(weather.code_day)" alt="Weather Icon">
          <span style="display: flex;align-items:center;justify-content: center;">{{ weather.text_day }}</span>
        </div>
        <div class="wt03">
          <p><span>气温：</span>{{ weather.low }} ~ {{ weather.high }}℃</p>
          <p><span>降水量：</span>{{ weather.rainfall }}毫米</p>
          <p><span>风况：</span>{{ weather.wind_direction }}风 {{ weather.wind_speed }} km/h</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import NavBar from './NavBar.vue';

export default {
  name: 'WeatherApp',
  components: {
    NavBar
  },
  props: {
    weatherData: Array,
    dates: Array,
  },
  data() {
    return {
      weather: null,
    };
  },
  async mounted() {
    this.displayWeather(this.dates[0]);
  },
  methods: {
    async fetchWeatherData() {
      try {
        const response = await axios.get(`https://api.seniverse.com/v3/weather/daily.json?key=S9tx_yP-ulYPluPgr&location=tianjin&language=zh-Hans&days=3`);
        this.weatherData = response.data.results[0].daily;
        this.dates = this.weatherData.map(day => day.date);
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    },
    displayWeather(date) {
      const weatherData = this.dates.map(day => this.weatherData.find(d => d.date === day));
      this.weather = weatherData.find(day => day.date === date);
    },
    getWeatherIcon(code) {
      return `./src/assets/white/${code}@1x.png`;
    }
  }
};
</script>

<style scoped>
.weather-app {
  font-family: Arial, sans-serif;
  width: 100%;
  height: 100%;
}

.weather {
  display: flex;
  justify-content: space-between;
  padding: 0 10px;
  height: 100%;
  align-items: center;
  width: 260px;
  font-size: 14px;
}

.wt03 p span {
  display: inline-block;
  width: 70px;
  text-align: right;
  opacity: .6;
}
</style>