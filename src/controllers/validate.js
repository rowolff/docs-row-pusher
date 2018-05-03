export function request(req, res) {
    return new Promise((resolve, reject) => {
        if (req.body.title && req.body.error) {
            resolve({ message: "No validation errors" });
        }
        else {            
            reject({ message: "Could not validate the request" });
        }
    });
}