export default async function getStdin() {
  let result = "";

  process.stdin.setEncoding("utf8");

  for await (const chunk of process.stdin) {
    result += chunk;
  }

  return result;
};
