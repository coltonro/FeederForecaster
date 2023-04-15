interface logicController {
    forecast: any
}

interface Day {
  tempmax: number,
  cloudcover: number,
  windspeed: number,
  [prop: string]: any; // this allows for additional values without defining them
}

const logicController = <logicController>{}


logicController.forecast = async (req: any, res: any, next: any) => {
  // important values: temp, cloud cover, chance precip., month
  // helpful wind direct chart: 
  // https://www.researchgate.net/figure/Wind-Direction-and-Degree-Values_fig16_264876359
  const { tempmax, cloudcover, windspeed, winddir } = res.locals;
  const determineWindDirection = (winddir: number) => {
    if(winddir > 337.5 && winddir < 22.5) return "north";
    if(winddir >= 22.5 && winddir < 67.5) return "northeast";
    if(winddir >= 67.5 && winddir < 112.5) return "east";
    if(winddir >= 112.5 && winddir < 157.5) return "southeast";
    if(winddir >= 157.5 && winddir < 202.5) return "south";
    if(winddir >= 202.5 && winddir < 247.5) return "southwest";
    if(winddir >= 247.5 && winddir < 292.5) return "west";
    if(winddir >= 292.5 && winddir < 337.5) return "northwest";
  }

  const predictFeederActivity = (tempmax: number, cloudcover: number, windspeed: number) => {
    if (tempmax >= 80) return 'low';
    if (tempmax <= 60 && windspeed <= 10) return 'high';
    return 'medium';
  }

    try {
      const weatherForecast = res.locals.weather.days
      const predictionValues = weatherForecast.map((day: Day) => {
        const tempmax = day.tempmax;
        const cloudcover = day.tempmax;
        const windspeed = day.tempmax;
        return predictFeederActivity(tempmax, cloudcover, windspeed)
      })
      res.locals = predictionValues;

    } catch (err: any) {
        console.error("Error in logicController.forecast: ", err.message);
        next(err);
    }
    next()
  }

  export default logicController