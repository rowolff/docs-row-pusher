export function message(req, res) {
    return new Promise((resolve, reject) => {
        const returnMessage = {
            "status" : res.statusCode,
            "message" : res.statusMessage,
            "insertedAtRow" : res.insertedRow,
            "data" : req.body
        }
        resolve(returnMessage)
    })
}