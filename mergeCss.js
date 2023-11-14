import fs from "fs";

const file1Path = './lib/build.css';
const file2Path = './dist/style.css';
const outputPath = './dist/style.css';

// Read the contents of the first CSS file
const file1Content = fs.readFileSync(file1Path, 'utf8');

// Read the contents of the second CSS file
const file2Content = fs.readFileSync(file2Path, 'utf8');

// Merge the contents of the two files
const mergedContent = file1Content + file2Content;

// Write the merged content to the output file
fs.writeFileSync(outputPath, mergedContent);

console.log('CSS files merged successfully!');
