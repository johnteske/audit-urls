const util = require("util");
const exec = util.promisify(require("child_process").exec);

const CODE_BLOCK = "```";

(async () => {
  const { stdout, stderr } = await exec("node dist/cli -h");
  if (stderr) {
    throw stderr;
  }

  const out = `# audit-urls

## cli

${CODE_BLOCK}
${stdout}
${CODE_BLOCK}
`;

  process.stdout.write(out);
})();
