const express = require('express');

const app = express();

app.use((req, res, next) => {
  console.log(req.path);
  next();
})
function cleanIt(obj) {
  var cleaned = JSON.stringify(obj, null, 2);

  return cleaned.replace(/^[\t ]*"[^:\n\r]+(?<!\\)":/gm, function(match) {
    return match.replace(/"/g, "");
  });
}

app.get('/api/:time', (req, res) => {
  // let 
  let date, result, param = req.params.time;
  console.log("param", param,);

  if (!param) {
    date = new Date();
  } else {
    param = decodeURIComponent(req.params.time);
    date = new Date(param);
  }
  if (date.toString() === 'Invalid Date') {
    param = parseInt(req.params.time);
    date = new Date(param);
  }
  if (date.toString() === 'Invalid Date') {
    result = { error: "Invalid Date" }
  } else {
    result = {

      unix: date.getTime(),
      utc: date.toUTCString()
    }
  }
  console.log("param", param,);

  console.log("date", date);

  console.log({ result })
  // res.send(cleanIt(result));
  res.json(
    result
  )
});

app.get('/api', (req, res) => {
  // let 
  let date, result;
    date = new Date();

  
    result = {

      unix: date.getTime(),
      utc: date.toUTCString()
    
  }

  console.log({ result })
  // res.send(cleanIt(result));
  res.json(
    result
  )
});


app.listen(3000, () => {
  console.log('server started');
});
