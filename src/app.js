import express from "express"
import bodyParser from "body-parser"

const App = express()
const jsonParser = bodyParser.json()

App.post("/add", jsonParser, (req, res) => {
    if (!req.body) {
        return res.sendStatus(400)
    }
    console.log("Incoming: " + JSON.stringify(req.body, null, 2))
    res.sendStatus(200)
})

App.get("/", (req, res) => {
    res.send("POST /add using 'title' and 'error'")
})

App.listen(3003)

export default App