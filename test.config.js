'use strict';

const
    glob = require('glob'),
    path = require('path'),
    chai = require('chai'),
    sinon = require('sinon'),
    sinonChai = require('sinon-chai'),
    sinonAsPromised = require('sinon-as-promised'),
    q = require('q');

global.env = null;
global.sinon = sinon;
sinonAsPromised(q.Promise);
chai.should();

chai.use(sinonChai);

beforeEach(() => {
    global.env = sinon.sandbox.create();
});

afterEach(() => {
    global.env.restore();
});

const sourceDir = path.join(__dirname, 'src');
const SPECS_PATTERN = path.join(sourceDir, '/**/*.spec.js');

glob.sync(SPECS_PATTERN).forEach(spec => require(spec));