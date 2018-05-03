import express from "express"
import controllers from "../controllers/index"

const router = express.Router()

router.post("/",
    (req, res, next) => {
        controllers.validate.request(req, res)
            .then(() => next())
            .catch(error => res.json(error))
    },
    (req, res, next) => {
        controllers.add.row(req, res)
            .then(() => next())
            .catch(error => res.json(error))
    },
    (req,res) => {
        controllers.respond.message(req, res)
            .then(message => res.end(JSON.stringify(message, null, 2)))
    }
)

module.exports = router