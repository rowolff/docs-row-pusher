# usage

Prerequisites: You have node installed.

* `npm install`
* create a `variables.development.env` file in the project root to add the port you want to use on your machine for local testing (see variables.template.env for usage, e.g. PORT=3003)
* `npm run build` to compile
* `npm start` to start the server locally

Use a `GET` to see the supported routes (there aren't that many yet)

You can then post a JSON to your local machine.

## POST /api/add

Will add a row to Google Docs (soon)

The expected format is

```javascript
{
    "title": "blabla",
    "error": "blubb",
    "spreadsheet": {
        "id" : "123",
        "worksheet" : "myTab"
    }
}
```

You'll get an error if title or error are missing/empty. "Sheet" is optional, if ommited a default sheet/tab is used.