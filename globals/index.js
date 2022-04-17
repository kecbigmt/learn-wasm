const fs = require('fs');
const bytes = fs.readFileSync(__dirname + '/module.wasm');
const importObject = {
  env: {
    import_i32: 5_000_000_000,
    import_f32: 123.0123456789,
    import_f64: 123.0123456789,
  },
  js: {
    log_i32: (value) => { console.log("i32: ", value) },
    log_f32: (value) => { console.log("f32: ", value) },
    log_f64: (value) => { console.log("f64: ", value) },
  },
};

(async () => {
  const obj = await WebAssembly.instantiate(new Uint8Array(bytes), importObject);
  obj.instance.exports.globaltest();
})();
