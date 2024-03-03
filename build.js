const esbuild = require('esbuild');
const fs = require('fs');
const path = require('path');
const loadAndInjectLluis = require('./custom-jsx-loader.js');

const inputDir = ".";
const outDir = "./dist";

function readGitIgnore() {
    const gitignorePath = path.resolve('.gitignore');

    if (!fs.existsSync(gitignorePath)) {
        return [];
    }

    // Leer el contenido del archivo .gitignore y dividirlo por líneas
    const gitignoreContent = fs.readFileSync(gitignorePath, 'utf-8');
    return gitignoreContent.split(/\r?\n/).filter(line => line.trim() !== '' && !line.startsWith('#'));
}

function isIgnored(file, gitignorePatterns) {
    return gitignorePatterns.some(pattern => {
        return file.name.match(new RegExp('^' + pattern.replace(/^\//, '').replace(/\/$/, '').replace(/\*\*/g, '.*').replace(/\*/g, '[^/]*') + '$'));
    });
}

const getAllFiles = (dir) => {
    const files = fs.readdirSync(dir, { withFileTypes: true });

    const gitignorePatterns = readGitIgnore();

    const filePaths = files
        .filter(file => !isIgnored(file, gitignorePatterns))
        .map(file => {
            const filePath = path.join(dir, file.name);
            return file.isDirectory() ? getAllFiles(filePath) : filePath;
        });
    return filePaths.flat();
};


const allFiles = getAllFiles(inputDir);

allFiles.forEach(file => {
  const relativePath = path.relative(inputDir, file);
  const outputPath = path.join(outDir, relativePath);
  const outputDirname = path.dirname(outputPath);
  if (!fs.existsSync(outputDirname)) {
    fs.mkdirSync(outputDirname, { recursive: true });
  }
  fs.copyFileSync(file, outputPath);
});

esbuild.build({
    define: {
        'process.env.FILES': `'${JSON.stringify(allFiles)}'`,
    },
    entryPoints: ['./src/main.jsx'],
    bundle: true,
    minify: true,
    sourcemap: true,
    outdir: "./dist/assets",
    jsxFactory: 'Lluis.createElement',

    plugins: [{
        name: 'custom-jsx-loader',
        setup(build) {
        build.onLoad({ filter: /\.jsx$/ }, loadAndInjectLluis);
        },
    }],
}).catch((err) => {
  console.error(err);
  process.exit(1);
});