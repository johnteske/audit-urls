const test = require("tape-promise/tape");
const { getAllStatuses } = require("../dist/index");
const { notOk } = require("../dist/filter");
const { urls } = require("./data");

const allUrls = Object.values(urls);

test("notOk", async (t) => {
  const res = await getAllStatuses(allUrls);
  t.equal(res.length, 5);
  t.equal(res.filter(notOk).length, 4);
});
