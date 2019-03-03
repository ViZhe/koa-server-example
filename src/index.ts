
import koa from 'koa';
import koaBodyparser from 'koa-bodyparser';
import koaHelmet from 'koa-helmet';
import koaJwt from 'koa-jwt';
import koaLogger from 'koa-logger';
import mongoose from 'mongoose';

import {
  IS_PRODUCTION,
  JWT,
  MONGO,
  SERVER,
} from './config';
import { graphql as gqlServer, rest } from './routes';


mongoose.Promise = Promise;
mongoose.connect(MONGO.MAIN, {
  reconnectInterval: 10000,
  reconnectTries: 1000,
  useCreateIndex: true,
  useNewUrlParser: true,
});
mongoose.set('debug', IS_PRODUCTION);

const app = new koa();
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

app.listen(SERVER.PORT, () => {
  // tslint:disable-next-line no-console
  console.info(`
##################
# ==> The server is running.
# ==> Link: http://${SERVER.HOST}:${SERVER.PORT}
# ==> REST: http://${SERVER.HOST}:${SERVER.PORT}/api
# ==> GraphQl: http://${SERVER.HOST}:${SERVER.PORT}${gqlServer.graphqlPath}
# ==> Mode: ${IS_PRODUCTION ? 'Production ' : 'Development'}
##################
`);
});
