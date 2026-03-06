import server from './server';
import devEnv from "../config/ts-env/dev-env"


const SERVER_START_MESSAGE =
  'Express server started on port: ' + devEnv.PORT;

// Start the server
server.listen(devEnv.PORT, (err) => {
  console.log(SERVER_START_MESSAGE);
  if (err) {
    console.error('Error starting server: ', err);
  }
});
