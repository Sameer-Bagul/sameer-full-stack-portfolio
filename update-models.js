const fs = require('fs');
const path = require('path');

const modelsDir = path.join(__dirname, 'lib', 'models');

fs.readdirSync(modelsDir).forEach(file => {
  if (file.endsWith('.js')) {
    const filePath = path.join(modelsDir, file);
    let content = fs.readFileSync(filePath, 'utf8');

    // Replace module.exports = mongoose.model('ModelName', modelSchema);
    // With module.exports = mongoose.models.ModelName || mongoose.model('ModelName', modelSchema);
    content = content.replace(
      /mongoose\.model\('([^']+)',\s*([a-zA-Z0-9_]+)\)/g,
      'mongoose.models.$1 || mongoose.model(\'$1\', $2)'
    );

    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated ${file}`);
  }
});
