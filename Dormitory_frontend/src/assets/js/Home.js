import axios from 'axios';

export default {
    data() {
        return {
            weatherData: {
                temperature: '',
                condition: '',
                location: ''
            }
        };
    },
    methods: {
        getWeatherDescription(code) {
            console.log(code)
            const weatherConditions = {
                0: '晴朗',
                1: '少云',
                2: '局部多云',
                3: '多云',
                45: '雾',
                48: '薄雾',
                51: '小雨',
                53: '中雨',
                55: '大雨',
                95: '雷阵雨',
                96: '雷阵雨伴有冰雹'
            };
            return weatherConditions[code] || '未知天气状况';
        },
        async fetchWeatherData(latitude, longitude) {
                console.log("weather")
            const url = `/weather-api/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`;
            try {
                const response = await axios.get(url);
                console.log(response.data)
                this.weatherData = {
                    location: `${latitude}, ${longitude}`,  // 这里可以换成具体的地名，如果您有解析位置的方式
                    temperature: response.data.current_weather.temperature,
                    condition: response.data.current_weather.weathercode
                };
            } catch (error) {
                console.error('获取天气数据出错:', error);
            }
        },

        getUserLocation() {
            if ("geolocation" in navigator) {
                navigator.geolocation.getCurrentPosition(
                    position => {
                        this.fetchWeatherData(position.coords.latitude, position.coords.longitude);
                    },
                    error => {
                        console.error('获取地理位置失败:', error);
                    }
                );
            } else {
                console.error('浏览器不支持地理定位');
            }
        }
    },
    mounted() {
        this.getUserLocation();
    }
}