import fs from "fs";
import express from "express";
import bodyParser from "body-parser";
import { exec } from "child_process";
const app = express()
const port = 3000

const data = JSON.parse(fs.readFileSync("config.json"));
console.log(data);

app.use(bodyParser.json())

for (const action in data.actions) {
  app.post(`/${data.key}/${action}`, (req, res) => {
    const actionToExec = data.actions[action];
    res.send(`Executing: ${actionToExec}`);
    const parsedActionToExec = replaceWithVals(actionToExec, req.body);
    exec(parsedActionToExec);
  })
}

if(data.startDelay){
  setTimeout(() => {
    if(data.start){
      exec(data.start);
    }
  }, data.startDelay)
}

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

const replaceWithVals = (string, vals) => {
  for(const val in vals){
    const configStr = `%${val}`;
    const passedVal = vals[val];
    string = string.replaceAll(configStr, passedVal)
  }
  return string;
}