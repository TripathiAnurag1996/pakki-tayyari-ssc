const fs = require('fs');
const data = JSON.parse(fs.readFileSync('./public/ssc_cgl_questions_updated.json', 'utf8'));

let sql = 'TRUNCATE public.questions CASCADE;\n\n';

data.forEach(q => {
  const options = JSON.stringify(q.options).replace(/'/g, "''");
  const qText = q.question_text.replace(/'/g, "''");
  const sText = (q.solution_text || '').replace(/'/g, "''");
  const sub = q.subject.replace(/'/g, "''");
  const st = q.subtopic.replace(/'/g, "''");
  const ch = (q.chapter || '').replace(/'/g, "''");
  
  sql += `INSERT INTO public.questions (exam, subject, subtopic, chapter, difficulty, question_text, options, correct_option, solution_text) VALUES ('SSC CGL', '${sub}', '${st}', '${ch}', '${q.difficulty}', '${qText}', '${options}'::jsonb, ${q.correct_option}, '${sText}');\n`;
});

sql += "\nUPDATE public.test_sessions SET subject = 'Mathematics' WHERE subject = 'Quantitative Aptitude';\n";
sql += "UPDATE public.test_sessions SET subject = 'Reasoning' WHERE subject = 'General Intelligence & Reasoning';\n";
sql += "UPDATE public.test_sessions SET subject = 'General Knowledge' WHERE subject = 'General Awareness';\n";
sql += "UPDATE public.test_sessions SET subject = 'English' WHERE subject = 'English Comprehension';\n";

fs.writeFileSync('reseed_questions.sql', sql);
console.log('Generated reseed_questions.sql');
