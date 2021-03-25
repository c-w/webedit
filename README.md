# :pencil: webedit

[![CI status](https://github.com/c-w/webedit/workflows/CI/badge.svg)](https://github.com/c-w/webedit/actions?query=workflow%3ACI)

## What's this?

> :wrench: Webedit is a tool that lets you auto-generate UIs to edit JSON files on Github :octocat:.

I use JSON files on Github to collect data for a bunch of small tools (e.g. my [cocktail recipes](https://github.com/c-w/cocktails) or my [book reviews](https://github.com/c-w/redings)) so it became useful to have a UI to add items to the various collections while on the go. That's how webedit was born: a mobile-first site to facilitate adding items to JSON files on Github.

## How do I get started?

Using webedit is super simple:

1. :globe_with_meridians: Head over to the [webedit site](https://justamouse.com/webedit)
2. :lock: Log in using a [personal access token](https://github.com/settings/tokens)
3. :notebook: Start editing JSON files using a nice UI based on [Material design](https://material-ui.com/)
4. :heavy_check_mark: Webedit will automatically update the files for you using the [Github API](https://docs.github.com/en/rest)

Webedit will crawl your repositories and generate a UI for each repository that contains a `.webedit.json` or `.webedit.yaml` file at the root. The schema for the configuration file is as follows:

```jsonc
{
  // The first thing you need to provide webedit is the path
  // of the file for which you wish to generate editing UIs
  // this path is relative to the root of your repository
  "path/to/json/file": {
  
    // Required: the schema key tells webedit about the shape
    // of the items you wish to edit; provide any JSON schema
    // object here and webedit will generate the appropriate
    // form to create new items for you using the RJSF library
    // see https://json-schema.org for more information
    "schema": {},
    
    // Optional: if the array of items to edit isn't at the root
    // you can use the path key to provide a JMES path expression
    // for how webedit can find the arrya you with to edit
    // see https://jmespath.org for more information
    "path": "some.optional[0].jmespath.expression",
    
    // Optional: if you wish to customize the appearance of the
    // form that webedit generates for you, use the ui key and
    // configure custom RJSF widgets for your form
    // see https://react-jsonschema-form.readthedocs.io/en/latest/usage/widgets/
    "ui": {}
  },
  
  // Note: you can specify configuration blocks for multiple files
  // in the same repository and webedit will generate a separate
  // editor for each entry 
  "some/other/path/to/a/json/file": {}
}
```
