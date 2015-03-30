# Kola Starter App
This is a boilerplate project to start developing with Kola

## Prerequisites
* [NodeJS](https://nodejs.org)
* NPM (comes bundled with NodeJS)
* Gulp
```shell
npm install gulp -g
```
* Domer (optional, if you don't use Domer for HTML templating)
```shell
npm install domer -g
```


## Gulp
### Build
This compiles the application with module type commonjs
```shell
    gulp build
```

### Bundle
This browserifies the compiled ts code into one app.js file and at the same time, copies the non js code(css, html) to the
bundle folder.
```shell
    gulp bundle
```

### Run
runs a webserver on bundle folder.
```shell
    gulp run
```

### debug mode
You can run any task with by adding --debug flag. This will produce a build with sourcemaps.
```shell
    gulp run --debug
```