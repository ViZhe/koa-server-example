
import app from './app';
import { IS_PRODUCTION, SERVER } from './config';
import { graphql as gqlServer } from './routes';


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
