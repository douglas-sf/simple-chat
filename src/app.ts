import express from 'express';
import nunjucks from 'nunjucks';
import path from 'path';

const app = express();

nunjucks.configure(path.resolve(__dirname, 'pages'), {
  express: app,
  noCache: true,
});

app.set('view engine', 'html');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));

app.get('/', (req, res) => {
  return res.render('index');
});

export default app;
