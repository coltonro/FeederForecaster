import express from 'express';
import cors from 'cors';
import weatherController from './src/apiController.js';
import logicController from './src/logicController.js';
import seasonalFoods from './src/seasonalFoods.js';
const app = express();
const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.static(process.cwd()+"/client/dist"));

app.get('/', (req,res) => {
  res.sendFile(`${process.cwd()}../client/dist/index.html`);
});

app.use('/cityForecast', weatherController.apiData, logicController.forecast, seasonalFoods.foods, (req, res) => {
  console.log('res.locals: ', res.locals)
    res.json(res.locals);
  });

/**
 * 404 handler
 */
app.use('*', (req, res) => {
  res.status(404).send(`${req} 404 Not Found`);
});

// Global error handler
app.use((err: any, req: any, res: any, next: any) => {
  console.log(err);
  res.status(500).send('Internal Server Error');
});

app.listen(PORT, () => { console.log(`Listening on port ${PORT}...`); });

// export default app;