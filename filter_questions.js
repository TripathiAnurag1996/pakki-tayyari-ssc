const fs = require('fs');

const data = JSON.parse(fs.readFileSync('public/ssc_cgl_questions_updated_2.json', 'utf8'));

const brokenIndices = [];
const cleanedData = data.filter((q, index) => {
  let isBroken = false;

  // 1. Missing statements in question_text
  if (q.question_text.includes("Read the following statements") && !q.question_text.includes("Statement 1")) {
    isBroken = true;
  }
  
  // 2. Specific known broken questions
  if (q.question_text.includes("Match the dance with state:") || 
      q.question_text.includes("Rearrange the following sentences") ||
      q.question_text.includes("Which of the following statements about the Asian Games is/are correct?")) {
    isBroken = true;
  }

  // 3. Mangled options (e.g. "Gujarat 2. Garba")
  if (q.options.some(opt => /^\d+\.\s/.test(opt) || /\d+\.\s/.test(opt))) {
    isBroken = true;
  }

  // 4. The inconsistent math question
  if (q.question_text.includes("radius of 14 cm") && q.question_text.includes("radius 3.5 cm")) {
    isBroken = true;
  }

  if (isBroken) {
    brokenIndices.push({ index, question: q.question_text.substring(0, 50) + "..." });
    return false;
  }
  return true;
});

fs.writeFileSync('public/ssc_cgl_questions_updated_2_cleaned.json', JSON.stringify(cleanedData, null, 2));
console.log(`Cleaned ${cleanedData.length} questions.`);
console.log(`Removed ${brokenIndices.length} broken questions:`, brokenIndices);
