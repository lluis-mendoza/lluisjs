const fs = require('fs');

function loadAndInjectLluis(args) {
  const content = fs.readFileSync(args.path, 'utf8');

  const updatedContent = `import Lluis from './lluis';\n\n${content}`;

  return { contents: updatedContent, loader: 'jsx' };
}

module.exports = loadAndInjectLluis;