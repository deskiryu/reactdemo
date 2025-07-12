const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, '..', 'cutesy-finance', 'enum');
const outDir = path.join(__dirname, '..', 'cutesy-finance', 'enums');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

function parseFile(file) {
  const text = fs.readFileSync(file, 'utf8');
  const enumMatch = text.match(/enum\s+(\w+)/);
  if (!enumMatch) return;
  const enumName = enumMatch[1];
  const bodyMatch = text.match(/\{([\s\S]*)\}/);
  if (!bodyMatch) return;
  let body = bodyMatch[1];
  // Remove attribute blocks like [Display(...)] which may span multiple lines
  body = body.replace(/\[[^\]]*\]/gs, '');
  const lines = body.split(/\r?\n/);
  const entries = [];
  let current = 0;
  for (let line of lines) {
    line = line.replace(/\/\/.*$/, '').trim();
    if (!line || line.startsWith('[')) continue;
    if (line.endsWith(',')) line = line.slice(0, -1);
    const m = line.match(/^(\w+)\s*(=\s*(.+))?$/);
    if (m) {
      const key = m[1];
      let value = null;
      if (m[3]) {
        value = m[3].trim();
        const parsed = parseInt(value, 10);
        if (!isNaN(parsed)) current = parsed;
      } else {
        value = String(current);
      }
      entries.push({ key, value });
      current += 1;
    }
  }
  let out = `export const ${enumName} = Object.freeze({\n`;
  entries.forEach(({ key, value }) => {
    out += `  ${key}: ${value},\n`;
  });
  out += '});\n';
  fs.writeFileSync(path.join(outDir, enumName + '.js'), out);
  return enumName;
}

const files = fs.readdirSync(srcDir).filter(f => f.endsWith('.cs'));
const names = [];
files.forEach(f => {
  const n = parseFile(path.join(srcDir, f));
  if (n) names.push(n);
});

let indexContent = names.map(n => `export * from './${n}.js';`).join('\n');
fs.writeFileSync(path.join(outDir, 'index.js'), indexContent + '\n');
