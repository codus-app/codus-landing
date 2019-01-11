// Node.js script to generate the APNG 'typing' animation displayed in some illustrations
// Manipulates a SVG for each frame, renders those frames to PNG, and combines the PNG frames into
// a single APNG

const fs = require('fs');
const { JSDOM } = require('jsdom');
const rimraf = require('rimraf');
const svgexport = require('svgexport');
const { promisify } = require('util');
const UPNG = require('upng-js');

// Maps most common characters to the key combo required to type them
/* eslint-disable quote-props */
const charMap = {
  ...'abcdefghijklmnopqrstuvwxyz1234567890`-=[]\\;\',./'.split('').reduce((obj, l) => ({ ...obj, [l]: [l] }), {}),
  ...'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').reduce((obj, l) => ({ ...obj, [l]: ['shift', l.toLowerCase()] }), {}),

  ' ': ['space'],
  '\n': ['return'],
  '\t': ['tab'],

  '!': ['shift', '1'],
  '@': ['shift', '2'],
  '#': ['shift', '3'],
  '$': ['shift', '4'],
  '%': ['shift', '5'],
  '^': ['shift', '6'],
  '&': ['shift', '7'],
  '*': ['shift', '8'],
  '(': ['shift', '9'],
  ')': ['shift', '0'],
  '_': ['shift', '-'],
  '+': ['shift', '='],
  '{': ['shift', '['],
  '}': ['shift', ']'],
  '|': ['shift', '\\'],
  ':': ['shift', ';'],
  '"': ['shift', "'"],
  '<': ['shift', ','],
  '>': ['shift', '.'],
  '?': ['shift', '/'],
};
/* eslint-enable */
const getKeysForChar = char => [charMap[char].slice(0, -1), charMap[char].slice(-1)[0]];


const getDom = () => new JSDOM(`
  <!DOCTYPE html>
  <html>
    <body>
      <div id="svg">
        ${fs.readFileSync('src/sections/features/illustrations/_laptop/keyboard.svg', 'utf-8')}
      </div>
    </body>
  </html>
`);


function getFrame(keysPressed) {
  const { document } = getDom().window;
  keysPressed.forEach(id => document.getElementById(id).setAttribute('style', 'fill-opacity: .2'));
  return document.getElementById('svg').innerHTML;
}

// DO IT

rimraf.sync('frames');
fs.mkdirSync('frames');
fs.mkdirSync('frames/svg');
fs.mkdirSync('frames/png');


const saveFrame = (text, path) => {

  return promisify(fs.writeFile)(path, text)
    .then(() => path);
};

let frameCount = 0;
const frame = (keys) => {
  frameCount += 1;
  return saveFrame(getFrame(keys), `frames/svg/${frameCount}.svg`);
};


const text = 'console.log({ book: "Alice was beginning to get very tired..." })'.split('');

// 1. Generate SVG of each frame

process.stdout.write('Generating frames...');
const frames = [];
const frameDelays = [];
text.forEach((char, i) => {
  const [modifiers, key] = getKeysForChar(char);
  frames.push(frame([...modifiers, key]));
  frameDelays.push(Math.floor(Math.random() * 7 + 5) * 10); // 50ms to 120ms
  // Any modifiers that are held onto the next frame can be kept for the blank frame
  const nextModifiers = i < text.length - 1 ? getKeysForChar(text[i+1])[0] : [];
  const commonModifiers = modifiers.filter(m => nextModifiers.includes(m));
  frames.push(frame(commonModifiers)); // Blank frame (might hold like shift or something)
  frameDelays.push(Math.floor(Math.random() * 5 + 2) * 10); // 20ms to 70ms
});

// 2. Export frames to 200x86 PNGs

Promise.all(frames)
  // Export to PNG
  .then((filenames) => { process.stdout.write(' done!\nExporting frames...'); return filenames; })
  .then(filenames => filenames.map(f => ({ input: [f], output: [[f.replace(/svg/g, 'png'), '.2x']] })))
  .then(filenames => new Promise((resolve) => {
    svgexport.render(filenames, () => resolve(filenames.map(f => f.output[0][0])));
  }))

// Compile those PNG frames into an APNG

  .then((exported) => { process.stdout.write(' done!\nCompiling frames...'); return exported; })
  .then(paths => Promise.all(paths.map(path => promisify(fs.readFile)(path))))
  .then((buffs) => {
    let size;
    const images = buffs.map((buff) => {
      const decoded = UPNG.decode(buff);
      const { width, height } = decoded;
      size = [width, height];
      return UPNG.toRGBA8(decoded)[0]; // Only one frame
    });
    return { images, size };
  })
  .then(({ images, size }) => {
    const [width, height] = size;
    return UPNG.encode(images, width, height, 0, frameDelays);
  })
  .then(data => promisify(fs.writeFile)('src/sections/features/illustrations/_laptop/keyboard-anim.png', Buffer.from(data)))

// Remove 'frames' folder

  .then(() => {
    process.stdout.write(' done!\nCleaning up...');
    rimraf.sync('frames');
    process.stdout.write(' done!\n');
  });
