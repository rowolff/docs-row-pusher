# usage

* `npm install`
* create a `variables.development.env` file in the project root to add the port you want to use on your machine for local testing (see `variables.template.env` for usage, e.g. "PORT=3003")
* `npm run build` to compile
* `npm start` to start the server

Use a `GET` to see the supported routes (there aren't that many yet)

You can then post a JSON to your local machine.

## POST /api/add

Will add a row to Google Docs (soon)

The expected format is

```{
    "title": "blabla",
    "error": "blubb"
}```

You'll get an error if the schema doesn't match.