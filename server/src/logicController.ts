import forecastString from "./forecastStrings.js";

interface logicController {
  forecast: any
}

interface Hour {
  datetime: string,
  precip: number,
  precipprob: number,
  windspeed: number,
  winddir: number,
  cloudcover: number
}

interface Day {
  tempmax: number,
  cloudcover: number,
  windspeed: number,
  precip: number,
  hours: [Hour],
  [prop: string]: any; // this allows for additional values without defining them
}

const logicController = <logicController>{}

logicController.forecast = async (req: any, res: any, next: any) => {
  // important values: temp, cloud cover, chance precip., month
  // helpful wind direct chart: 
  // https://www.researchgate.net/figure/Wind-Direction-and-Degree-Values_fig16_264876359
  const determineWindDirection = (winddir: number) => {
    if (winddir > 337.5 && winddir < 22.5) return "north";
    if (winddir >= 22.5 && winddir < 67.5) return "northeast";
    if (winddir >= 67.5 && winddir < 112.5) return "east";
    if (winddir >= 112.5 && winddir < 157.5) return "southeast";
    if (winddir >= 157.5 && winddir < 202.5) return "south";
    if (winddir >= 202.5 && winddir < 247.5) return "southwest";
    if (winddir >= 247.5 && winddir < 292.5) return "west";
    if (winddir >= 292.5 && winddir < 337.5) return "northwest";
  }

  const predictFeederActivity = (tempmax: number, cloudcover: number, windspeed: number, precipprob: number) => {
    // set sky as clear, partly cloudy, or cloudy
    // console.log('windspeed: ', windspeed)
    const sky = cloudcover < 20 ? 'sunny' : cloudcover < 80 ? 'partly cloudy' : 'cloudy';
    const wind = windspeed < 10 ? 'low' : windspeed <= 14 ? 'light' : 'windy';

    // high temp
    if (tempmax > 84) return {
      activity: 'low',
      tempmax: tempmax,
      cloudcover: sky,
      windspeed: wind,
      precipprob: precipprob,
      description: forecastString.highTemps
    }
    // warm with rain
    if (tempmax > 70 && tempmax < 84 && precipprob > 78) return {
      activity: 'moderate',
      tempmax: tempmax,
      cloudcover: sky,
      windspeed: wind,
      precipprob: precipprob,
      description: forecastString.warmWithRain
    }
    // warm, low wind, overcast, no rain
    if (tempmax > 70 && tempmax < 84 && cloudcover >= 80 && windspeed < 14 && precipprob <= 20) return {
      activity: 'moderate',
      tempmax: tempmax,
      cloudcover: sky,
      windspeed: wind,
      precipprob: precipprob,
      description: forecastString.warmLowWindOvercast
    }
    // warm, low wind, sun, no rain
    if (tempmax > 70 && tempmax < 84 && cloudcover < 75 && windspeed < 14 && precipprob <= 20) return {
      activity: 'low',
      tempmax: tempmax,
      cloudcover: sky,
      windspeed: wind,
      precipprob: precipprob,
      description: forecastString.warmLowWindSun
    }
    // cold with high winds
    if (tempmax <= 50 && windspeed >= 14) return {
      activity: 'moderate',
      tempmax: tempmax,
      cloudcover: sky,
      windspeed: wind,
      description: forecastString.highWindsButCold
    };
    // cold
    if (tempmax <= 45) return {
      activity: 'high',
      tempmax: tempmax,
      cloudcover: sky,
      windspeed: wind,
      description: forecastString.cold
    };
    // high winds
    if (tempmax >= 82 && cloudcover >= 80 && windspeed <= 10) return {
      activity: 'moderate',
      tempmax: tempmax,
      cloudcover: sky,
      windspeed: wind,
      description: ''
    };
    if (tempmax <= 60 && windspeed <= 10) return {
      activity: 'high',
      tempmax: tempmax,
      cloudcover: sky,
      windspeed: wind,
      description: ''
    };
    return {
      activity: 'N/A',
      tempmax: tempmax,
      cloudcover: sky,
      windspeed: wind,
      description: ''
    };
  }

  try {
    const weatherForecast = res.locals.weather.days
    const predictionValues = weatherForecast.map((day: Day) => {
      const tempmax = day.tempmax;
      const cloudcover = day.cloudcover;
      const windspeed = day.windspeed;
      const precipprob = day.precipprob;
      return predictFeederActivity(tempmax, cloudcover, windspeed, precipprob)
    })
    res.locals.forecast = predictionValues;

  } catch (err: any) {
    console.error("Error in logicController.forecast: ", err.message);
    next(err);
  }
  next()
}

export default logicController