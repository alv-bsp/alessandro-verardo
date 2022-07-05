require('dotenv').config();

const path = require('path');
const express = require('express');

const UAParser = require('ua-parser-js');

const prismicH = require('@prismicio/helpers');
const prismic = require('@prismicio/client');

const app = express();
const port = process.env.PORT || 3000;

const accessToken = process.env.PRISMIC_ACCESS_TOKEN;
const endpoint = "https://transcend-2022.prismic.io/api/v2"; // process.env.PRISMIC_ENDPOINT;

const initApi = (req) => {
  return prismic.getApi(endpoint, {
    accessToken: accessToken,
    req,
  });
};
// Set Pug as templating engine
app.use(express.static(path.join(__dirname, 'public')));
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send('Something broke!')
});

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use((req, res, next) => {
  const ua = UAParser(req.headers['user-agent']);

  res.locals.isDesktop = ua.device.type === undefined;
  res.locals.isPhone = ua.device.type === 'mobile';
  res.locals.isTablet = ua.device.type === 'tablet';

  res.locals.prismicH = prismicH;
  next();
});

// Get Prismic files common to all routes as locals
const handleRequest = async (api, res) => {
  const metadata = await api.getSingle('metadata');
  const preloader = await api.getSingle('preloader');
  const navigation = await api.getSingle('navigation');
  const footer = await api.getSingle('footer');

  res.locals.metadata = metadata.data;
  res.locals.preloader = preloader.data;
  res.locals.navigation = navigation.data;
  res.locals.footer = footer.data;
};

// Query for the root path.
app.get('/', async (req, res) => {
  const client = await initApi(req);
  await handleRequest(client, res);

  const document = await client.getSingle('homepage');
  res.render('pages/home', { document: document.data });
});

// Query for the application path.
app.get('/application', async (req, res) => {
  const client = await initApi(req);
  await handleRequest(client, res);

  const document = await client.getSingle('application');
  res.render('pages/application', {
    document: document.data,
  });
});

//Health check
app.get('/-/healthy', async (_req, res) => {
  res.status(200).json({ status: 'ok' });
});

// Listen to application port.
app.listen(port, () => {
  console.log(`App running on ${port}`);
});
