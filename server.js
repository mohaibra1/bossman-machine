const express = require('express');
const app = express('');
const cors = require('cors');
const bodyParser = require('body-parser');
module.exports = app;


//minions router
const minionsRouter  = require('./server/minionsApi.js')
app.use('/api/minions', minionsRouter);

/* Do not change the following line! It is required for testing and allowing
*  the frontend application to interact as planned with the api server
*/
const PORT = process.env.PORT || 4001;

// Add middleware for handling CORS requests from index.html
app.use(cors())

// Add middware for parsing request bodies here:


// Mount your existing apiRouter below at the '/api' path.
//const apiRouter = require('./server/api');


// This conditional is here for testing purposes:
if (!module.parent) { 
  // Add your code to start the server listening at PORT below:

}


//listening on port 4001
app.listen(PORT, () => {
  console.log(`Server is listening on ${PORT}`);
})