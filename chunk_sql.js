const fs = require('fs');
const content = fs.readFileSync('reseed_questions.sql', 'utf8');
const lines = content.split('\n');

const truncateLine = lines.find(l => l.startsWith('TRUNCATE'));
const insertLines = lines.filter(l => l.startsWith('INSERT'));
const updateLines = lines.filter(l => l.startsWith('UPDATE'));

const chunkSize = 40;
for (let i = 0; i < insertLines.length; i += chunkSize) {
    const chunk = insertLines.slice(i, i + chunkSize);
    let sql = '';
    if (i === 0) {
        sql += truncateLine + '\n\n';
    }
    sql += chunk.join('\n');
    if (i + chunkSize >= insertLines.length) {
        sql += '\n\n' + updateLines.join('\n');
    }
    fs.writeFileSync(`reseed_chunk_${i / chunkSize}.sql`, sql);
}
console.log(`Generated ${Math.ceil(insertLines.length / chunkSize)} chunks`);
