const express = require('express');
const redis = require('redis');
const process = require('process')


const app = express();
const client = redis.createClient({
  host: 'redis-server',
  port: 6379
  });
client.set('visits', 0)
const port = 8081;

app.get('/', (req, res) => {
  process.exit(100);
  client.get('visits', (err, visits) => {
    res.send('Number of visits is ' + visits)
    client.set('visits', +visits + 1)
  })
});

app.listen(port, () => {
  console.log('Listening on port ' + port)
})
