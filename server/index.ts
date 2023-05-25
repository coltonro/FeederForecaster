import express from 'express';
import serverless from 'serverless-http';
import cors from 'cors';
import weatherController from './src/apiController.js';
import logicController from './src/logicController.js';
import seasonalFoods from './src/seasonalFoods.js';
const app = express();
const router = express.Router();
const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.static(process.cwd()+"/client/dist"));

app.get('/', (req,res) => {
  res.sendFile(`${process.cwd()}../client/dist/index.html`);
});

router.post('/cityForecast', weatherController.apiData, logicController.forecast, seasonalFoods.foods, (req, res) => {
    res.json(res.locals);
  });

/**
 * 404 handler
 */
router.use('*', (req, res) => {
  res.status(404).send(`${req} 404 Not Found`);
});

// Global error handler
router.use((err: any, req: any, res: any, next: any) => {
  console.log(err);
  res.status(500).send('Internal Server Error');
});

app.listen(PORT, () => { console.log(`Listening on port ${PORT}...`); });

app.use('/', router);

// import express from 'express';
// import serverless from 'serverless-http';
// import cors from 'cors';
// import weatherController from './src/apiController.js';
// import logicController from './src/logicController.js';
// import seasonalFoods from './src/seasonalFoods.js';

// const app = express();
// const router = express.Router();
// const PORT = 8080;

// app.use(cors());
// app.use(`/.netlify/functions/index`, router);

// app.get('/', (req,res) => {
//   res.sendFile(`${process.cwd()}../client/dist/index.html`);
// });

// router.post('/cityForecast', weatherController.apiData, logicController.forecast, seasonalFoods.foods, (req, res) => {
//     res.json(res.locals);
//   });

// /**
//  * 404 handler
//  */
// router.use('*', (req, res) => {
//   res.status(404).send(`${req} 404 Not Found`);
// });

// // Global error handler
// router.use((err: any, req: any, res: any, next: any) => {
//   console.log(err);
//   res.status(500).send('Internal Server Error');
// });

// app.listen(PORT, () => { console.log(`Listening on port ${PORT}...`); });

// module.exports = app;
// module.exports.handler = serverless(app);
