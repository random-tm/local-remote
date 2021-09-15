import fs from "fs";
import express from "express";
import { exec } from "child_process";
const app = express()
const port = 3000

const data = JSON.parse(fs.readFileSync("config.json"));
console.log(data);

for (const action in data.actions) {
  app.post(`/${data.key}/${action}`, (req, res) => {
    const actionToExec = data.actions[action];
    res.send(`Executing: ${actionToExec}`);
    exec(actionToExec);
  })
}

setTimeout(() => {
  exec(data.start);
}, 5000)

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
