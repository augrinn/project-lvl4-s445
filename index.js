import Koa from 'koa';
import koaWebpack from 'koa-webpack';
import webpackConfig from './webpack.config';
import Pug from 'koa-pug';
import Rollbar from 'rollbar';
import Router from 'koa-router';
import path from 'path';
import dotenv from 'dotenv';
import serve from 'koa-static';

dotenv.config();
const app = new Koa();
const rollbar = new Rollbar(process.env.RB_TOKEN);
const router = new Router();

app.use(serve(path.join(__dirname, 'public')));
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

router.get('/', async (ctx) => {
  const data = { title: 'Task manager', message: 'Welcome to the task Manager!' };
  await ctx.render('index', data);
});

app.use(router.routes());

if (process.env.NODE_ENV !== 'production') {
  koaWebpack({ config: webpackConfig })
  .then(m => app.use(m));
}

if (!module.parent) {
  app.listen(process.env.PORT || 5000, () => {
    console.log('start');
  });
}

export default app;
