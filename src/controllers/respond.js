export function message(req, res) {
    return new Promise((resolve, reject) => {
        const returnMessage = {
            "status" : res.statusCode,
            "message" : res.statusMessage,
            "addedAt" : res.addedAt,
            "data" : req.body
        }
        resolve(returnMessage)
    })
}