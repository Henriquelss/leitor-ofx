const fs = require('fs');
const ofx = require('ofx-js');

async function test() {
  const text = fs.readFileSync('./teste.ofx', 'utf8');
  try {
    const data = await ofx.parse(text);
    console.log(JSON.stringify(data, null, 2));
  } catch (err) {
    console.error("Parse Error:", err);
  }
}
test();
