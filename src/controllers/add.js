export function row(req, res) {
    return new Promise((resolve, reject) => {
        if(req.body.title.length > 0) {
            resolve({ message: "Added a new row" })
        } else {
            reject({ message: "Cannot add row" })
        }
    })
}