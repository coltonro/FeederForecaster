interface logicController {
    forecast: any
}

const logicController = <logicController>{}

logicController.forecast = async (req: any, res: any, next: any) => {

    try {
      const feederForecast = {
        Today: 'low',
        Tomorrow: 'medium',
        DayThree: 'high'
      }

      const rateFeederActivity = () => {
        res.locals.days
      }

    } catch (err: any) {
        console.error(`Error in controller.js while calling retrieveWeather(): `, err.message);
        next(err);
    }
    next()
  }

  export default logicController