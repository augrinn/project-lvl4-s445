import Koa from 'koa';
import Pug from 'koa-pug';
import Rollbar from 'rollbar';
import dotenv from 'dotenv';
import Router from 'koa-router';
import path from 'path';

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
  viewPath: path.join(__dirname, '../../views'),
  debug: false,
  pretty: false,
  compileDebug: false,
  basedir: path.join(__dirname, '../../views'),
});
pug.use(app);

router.get('/', async (ctx) => {
  const data = { title: 'Hey', message: 'Hello there!' };
  await ctx.render('index', data);
});

app.use(router.routes());

export default app;
