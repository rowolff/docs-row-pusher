import GoogleSpreadsheet from "google-spreadsheet"
import async from "async"
import creds from "../../google-generated-creds.json"

export function row(req, res) {
    
    if (req.body.spreadsheet) {
        if (!req.body.spreadsheet.id) {
            return new Promise((resolve, reject) => {
                reject({ message : "No spreadsheetId in spreadsheet object"})
            })
        }
    } 
    
    const spreadsheetId = req.body.spreadsheet ? req.body.spreadsheet.id : process.env.DEFAULTSHEET
    const doc = new GoogleSpreadsheet(spreadsheetId)
    let sheet
    
    return new Promise((resolve, reject) => {
        async.series([
            function setAuth(step) {
                doc.useServiceAccountAuth(creds, step)
            },
            function getInfoAndWorksheets(step) {
                doc.getInfo(function(err, info) {
                    console.log('Loaded doc: '+info.title+' by '+info.author.email);
                    sheet = info.worksheets[0];
                    console.log('sheet 1: '+sheet.title+' '+sheet.rowCount+'x'+sheet.colCount);
                    step();
                })
            },
            function addNewRow(step) {
                doc.addRow(1, {
                        errortitle: req.body.title,
                        error: req.body.error
                    }, (err, row) => {
                        if (err) {
                            step(err)
                        }
                        step(null, row.id)
                    }
                )
            }
        ], function(err, result) {
            if (err) {
                reject({ message: "Sheets Error: " + err })
            }
            resolve({ message: result.pop()})
        })
    })
                                                    
}