const weatherController = {}

weatherController.apiData = async (req, res, next) => {
    try {
        res.locals = 'weather data here'
    } catch (err) {
        console.error(`Error in controller.js while calling retrieveWeather(): `, err.message);
        next(err);
    }
    next()
  }

  export default weatherController