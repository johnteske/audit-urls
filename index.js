#!/usr/bin/env node
const checker = require("./checker");

const [_0, _1, ...links] = process.argv

checker(links);
