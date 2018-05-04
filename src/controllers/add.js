import GoogleSpreadsheet from 'google-spreadsheet';
import async from 'async';
import creds from '../../google-generated-creds.json';

const add = {
  row: (req, res) => {
    if (req.body.spreadsheet) {
      if (!req.body.spreadsheet.id) {
        return new Promise((resolve, reject) => {
          reject(new Error('No spreadsheetId in spreadsheet object'));
        });
      }
    }

    const spreadsheetId = req.body.spreadsheet ? req.body.spreadsheet.id : process.env.DEFAULTSHEET;
    const doc = new GoogleSpreadsheet(spreadsheetId);
    let sheet;

    return new Promise((resolve, reject) => {
      async.series(
        [
          function setAuth(step) {
            doc.useServiceAccountAuth(creds, step);
          },
          function getInfoAndWorksheets(step) {
            doc.getInfo((err, info) => {
              console.log(`Loaded doc: ${info.title} by ${info.author.email}`);
              [sheet] = info.worksheets;
              console.log(`sheet 1: ${sheet.title} ${sheet.rowCount}x${sheet.colCount}`);
              step();
            });
          },
          function addNewRow(step) {
            doc.addRow(
              1,
              {
                errortitle: req.body.title,
                error: req.body.error,
              },
              (err, returnedRow) => {
                if (err) {
                  step(err);
                }
                step(null, returnedRow.id);
              }
            );
          },
        ],
        (err, result) => {
          if (err) {
            reject(new Error(`Sheets Error: ${err}`));
          }
          resolve({ message: result.pop() });
        }
      );
    });
  },
};

export default add;
