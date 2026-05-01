const fs = require('fs');

const masterData = JSON.parse(fs.readFileSync('public/ssc_cgl_questions_updated.json', 'utf8'));
const newData = JSON.parse(fs.readFileSync('public/ssc_cgl_questions_updated_2_cleaned.json', 'utf8'));

const combinedData = [...masterData, ...newData];

fs.writeFileSync('public/ssc_cgl_questions_updated.json', JSON.stringify(combinedData, null, 2));
console.log(`Merged ${newData.length} questions into master. Total questions: ${combinedData.length}`);
