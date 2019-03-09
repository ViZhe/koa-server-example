
import Koa from 'koa';
import koaBodyparser from 'koa-bodyparser';
import koaHelmet from 'koa-helmet';
import koaJwt from 'koa-jwt';
import koaLogger from 'koa-logger';
import mongoose from 'mongoose';

import { IS_PRODUCTION, JWT, MONGO } from './config';
import { graphql as gqlServer, rest } from './routes';


mongoose.Promise = Promise;
mongoose.connect(MONGO.MAIN, {
  reconnectInterval: 10000,
  reconnectTries: 1000,
  useCreateIndex: true,
  useNewUrlParser: true,
});
mongoose.set('debug', IS_PRODUCTION);

const app = new Koa();
app.use(koaHelmet());
app.use(koaBodyparser());
app.use(koaLogger());
app.use(rest.routes());
app.use(rest.allowedMethods());
app.use(koaJwt({
  passthrough: true,
  secret: JWT.SECRET,
}));
gqlServer.applyMiddleware({ app });


export default app;
