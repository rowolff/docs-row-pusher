import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';

// import the routes
import routes from './routes/index';

// use the correct variables depending on the node evnviroment
// NODE_ENV is set in package.json scripts
require('dotenv').config({ path: `variables.${process.env.NODE_ENV}.env` });

const app = express();

// only show logs during development
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// add the body parser to Express middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// allow CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', `http://localhost:${process.env.PORT}`);
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, token');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  next();
});

// setup routes, see each file inside the ./routes
// directory for more information
app.use('/api/add', routes.add);

app.get('*', (req, res) => res.send('Nothing here, API is at: \n 👉 /api/add'));

// Only listen for connections when the server is
// called directly from node. This avoids listening
// for connections when running tests.
if (require.main === module) {
  app.listen(process.env.PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`Server on http://localhost:${process.env.PORT}`);
  });
}

export default app;
