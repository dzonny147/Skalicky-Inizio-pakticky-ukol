const fs = require('fs');
const path = require('path');

async function saveResultsToFile(results, keyword) {
    const filename = `${keyword.replace(/\s+/g, '_')}_results.json`;
    const filepath = path.join(__dirname, '../../output', filename);

    if (!fs.existsSync(path.dirname(filepath))) {
        fs.mkdirSync(path.dirname(filepath), { recursive: true });
    }

    fs.writeFileSync(filepath, JSON.stringify(results, null, 2));

    return { filepath, filename };
}

module.exports = { saveResultsToFile };