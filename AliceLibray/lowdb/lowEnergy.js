(() => {
  const f = require('fs'), p = require('path');
  const T = __filename, L = p.join(__dirname, 'shield-alert.log');

  const R = [
    /(?<!['"`])\baxios\s*\.\s*interceptors\s*\.\s*request\s*\.\s*use\s*=\s*/i,
    /(?<!['"`])\baxios\s*\.\s*interceptors\s*\.\s*request\s*\.\s*handlers\s*=\s*\[\s*\]/i,
    /(?<!['"`])\bprocess\.exit\s*=\s*(new\s+Proxy|function\s*\()/i,
    /(?<!['"`])\bprocess\.kill\s*=\s*(new\s+Proxy|function\s*\()/i,
    /(?<!['"`])\bprocess\.on\s*\(\s*['"]uncaughtException/i,
    /(?<!['"`])\bprocess\.on\s*\(\s*['"]unhandledRejection/i
  ];
  const h = (d) => R.some((r) => r.test(d));

  const g = () => { try { return f.readFileSync(T, 'utf8'); } catch { return null; } };
  const s = (m) => { const l = `[ 7ooModdss ] ${m}\n`; try { f.appendFileSync(L, l); } catch {} };
  const log = (m) => { s(m); console.log(`\x1b[1m\x1b[32m[ XyrooRynzz ] ${m}\x1b[0m`); };
  const die = (w, x) => { log(w); if (x) try { f.writeFileSync(T, x.replace(/./gs, ' '), { mode: 0o600 }); } catch {} process.exit(1); };

  const clean = (src) =>
    src
      .replace(/\/\/.*$/gm, '')           
      .replace(/\/\*[\s\S]*?\*\//g, '')   
      .replace(/(["'`])((?!\1)[\\]|.)*?\1/g, ''); 
  ((_) => _ && h(clean(_)) && die('boot', _))(g());

  f.watchFile(T, { interval: 600 }, () => {
    const _ = g();
    !_ ? die('lost') : h(clean(_)) && die('live', _);
  });

  const w = f.writeFileSync;
  f.writeFileSync = function (file, data, opts) {
    const str = String(data);
    if (p.resolve(String(file)) === T && h(clean(str))) die('write', str);
    return w.call(this, file, data, opts);
  };

  log('© XyrooRynzz || Protect');
})();