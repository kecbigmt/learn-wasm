const fs = require('fs');
const bytes = fs.readFileSync(__dirname + '/module.wasm');

(async () => {
  const obj = await WebAssembly.instantiate(new Uint8Array(bytes));
  const value1 = parseInt(process.argv[2]);
  const value2 = parseInt(process.argv[3]);
  console.log(obj.instance.exports.SumSquared(value1, value2));
})();