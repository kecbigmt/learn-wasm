const fs = require('fs');
const bytes = fs.readFileSync(__dirname + '/module.wasm');
const n = parseInt(process.argv[2]);
const importObject = {
  env: {
    log: (i, factorial) => { console.log(`${i}: ${factorial}`) },
  },
};

(async () => {
  const obj = await WebAssembly.instantiate(new Uint8Array(bytes), importObject);
  const result = obj.instance.exports.loop_test(n);
  console.log(`result: ${result}`);
})();