Buspaket Challenge
==================

Write a small vuejs app that submits the form below asynchronously. The “api-endpoint” accepts and emits json encoded data.

If there are errors when submitting the form, they should be displayed next to the corresponding form field based on the response from the server (assume the response has the errors for each form field). If the form submit is successful then display a success message above the form and reset it.

- For the Build version just by access index_build.html
- For the Dev version follow the installation steps

## Installing Dev

Getting dependencies:

```bash
$ npm install
```

Get the local server started

```bash
$ npm run dev
```

## Techs (besides Vue2)

- [Webpack](https://github.com/webpack/webpack) as the task runner. It handles the downgrading of ES6, module bundling, local server, watching changes in files, scss compilation,  ... just to name a few.
- [Axios](https://github.com/mzabriskie/axios) as the HTTP client (it is the official recommendation from Vue)
- [HTTP mockup](https://github.com/ctimmerm/axios-mock-adapter) replicating a communication with a server. Code found `src/main.js`
- [Theme provided](http://webapplayers.com/homer_admin-v2.0/light-shadow/panels.html) I've tried to replicate the design adding their css file and also using Bootstrap
