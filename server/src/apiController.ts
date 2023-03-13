import fetch from 'node-fetch';

interface weatherController {
    apiData: any
}

const weatherController = <weatherController>{}

weatherController.apiData = async (req: any, res: any, next: any) => {
    const { city } = req.body;

    try {
        const apiData = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}/next7days?unitGroup=us&elements=datetime%2Ctempmax%2Ctempmin%2Cprecip%2Cprecipprob%2Cwindspeed%2Ccloudcover&include=days&key=4NY853W3F9HGW9M5GW34GFUSR&contentType=json`)
        res.locals = await apiData.json()
    } catch (err: any) {
        console.error(`Error in controller.js while calling retrieveWeather(): `, err.message);
        next(err);
    }
    next()
  }

  export default weatherController