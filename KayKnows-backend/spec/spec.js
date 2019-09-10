const request = require('supertest');
const assert = require("assert");

let server = require('../index')();

// Reporters
const JasmineConsoleReporter = require('jasmine-console-reporter');
let HtmlReporter = require('jasmine-pretty-html-reporter').Reporter;

const reporter = new JasmineConsoleReporter({
  colors: 1,           // (0|false)|(1|true)|2
  cleanStack: 1,       // (0|false)|(1|true)|2|3
  verbosity: 4,        // (0|false)|1|2|(3|true)|4|Object
  listStyle: 'indent', // "flat"|"indent"
  timeUnit: 'ms',      // "ms"|"ns"|"s"
  timeThreshold: {ok: 500, warn: 1000, ouch: 3000}, // Object|Number
  activity: false,     // boolean or string ("dots"|"star"|"flip"|"bouncingBar"|...)
  emoji: true,
  beep: true
});

jasmine.getEnv().addReporter(reporter);
jasmine.getEnv().addReporter(new HtmlReporter({
  path: './results'
}));

// Tests below me
describe('loading express', () => {
  it('should load without errors', () => {
    assert(server);
    assert(server != null);
  });
});

// These tests assume that the dummy data script has been run
describe('get endpoints for base tables', () => {
  it('should respond to /capabilities', function () {
    request(server)
    .get('/capabilities')
    .expect(200)
    .expect(function (res) {
      assert(res.length, 6);
    })
  });
  // TODO Rest of the get end point tests
});
