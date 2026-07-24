const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(function(file) {
    file = dir + '/' + file;
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) { 
      results = results.concat(walk(file));
    } else { 
      if (file.endsWith('.tsx') || file.endsWith('.ts')) results.push(file);
    }
  });
  return results;
}

const files = walk('./src');
files.forEach(file => {
  if (file.includes('data.ts') || file.includes('store.tsx') || file.includes('api')) return;
  
  let content = fs.readFileSync(file, 'utf8');
  let changed = false;

  // Pattern 1: products, bestSellers, freshToday
  if (content.includes('import { products') || content.includes('products, ') || content.includes(' bestSellers') || content.includes(' freshToday')) {
    // Just inject the hook usage right after the function component declaration
    // This is a bit tricky with regex, so let's do manual updates for specific files to be safe
    console.log('Needs refactoring:', file);
  }
});
