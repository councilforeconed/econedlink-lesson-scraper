#!/usr/bin/env node

var argv = require('optimist').argv;
var scrape = require('./lib/scrape');

if (argv.interactives) {
  scrape("interactives");
}

if (argv.lessons) {
  scrape("lessons");
}