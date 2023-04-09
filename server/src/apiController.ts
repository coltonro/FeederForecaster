import fetch from 'node-fetch';
import NodeCache from "node-cache";

interface weatherController {
    apiData: any
}

type WeatherData = {
    days: {
      cloudcover: number,
      datetime: string,
      precip: number,
      precipprob: number,
      tempmax: number,
      tempmin: number,
      windspeed: number
    }[]
  } | null;

const weatherController = <weatherController>{}
const myCache = new NodeCache();

weatherController.apiData = async (req: any, res: any, next: any) => {
    const { city } = req.body;
    const weatherData = <WeatherData>myCache.get(`${city}`);
    const todaysDate = new Date().toISOString().split('T')[0];

    try {
        if(weatherData == undefined || weatherData.days[0].datetime != todaysDate) {
        const apiData = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}/next3days?unitGroup=us&elements=datetime%2Ctempmax%2Ctempmin%2Cprecip%2Cprecipprob%2Cwindspeed%2Ccloudcover&include=days&key=4NY853W3F9HGW9M5GW34GFUSR&contentType=json`)
        const weather = await apiData.json()
        myCache.set(`${city}`, weather, 86400)
        console.log('cache set')
        res.locals = myCache.get(`${city}`)
        } else {
            console.log('cache hit!')
            res.locals = myCache.get(`${city}`)
        }
        
    } catch (err: any) {
        console.error(`Error in controller.js while calling retrieveWeather(): `, err.message);
        next(err);
    }
    console.log('myCache: ', myCache.get(`${city}`))
    next()
  }

  export default weatherController