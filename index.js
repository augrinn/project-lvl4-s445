import Koa from 'koa';
import Pug from 'koa-pug';
import Rollbar from 'rollbar';
import dotenv from 'dotenv';
import Router from 'koa-router';
import path from 'path';
import koaWebpack from 'koa-webpack';
import webpackConfig from './webpack.config';

dotenv.config();
const app = new Koa();
const rollbar = new Rollbar(process.env.RB_TOKEN);
const router = new Router();

app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    rollbar.error(err, ctx.request);
  }
});
const pug = new Pug({
  viewPath: path.join(__dirname, 'views'),
  debug: false,
  pretty: false,
  compileDebug: false,
  basedir: path.join(__dirname, 'views'),
});
pug.use(app);

if (process.env.NODE_ENV !== 'production') {
  koaWebpack({ config: webpackConfig })
    .then(webpackMiddleware => app.use(webpackMiddleware));
}

router.get('/', async (ctx) => {
  const data = { title: 'Hey', message: 'Hello there!' };
  await ctx.render('index', data);
});

app.use(router.routes());

if (!module.parent) {
  app.listen(process.env.PORT || 5000, () => {
    console.log('start');
  });
}

export default app;
