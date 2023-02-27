interface apiData {
    apiData: any
}

const weatherController = <apiData>{}

weatherController.apiData = async (req: any, res: any, next: any) => {
    try {
        res.locals = 'weather data here'
    } catch (err: any) {
        console.error(`Error in controller.js while calling retrieveWeather(): `, err.message);
        next(err);
    }
    next()
  }

  export default weatherController