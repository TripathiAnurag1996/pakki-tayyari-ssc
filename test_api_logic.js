const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://mcdyhcjkadkvyfczlxti.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1jZHloY2prYWRrdnlmY3pseHRpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzcxMjY5OTgsImV4cCI6MjA5MjcwMjk5OH0.EoE2YpiJL5RytzQB6QYGVUYeAv-n_wU5Gs0u7Tnl2cU';
const supabase = createClient(supabaseUrl, supabaseKey);

async function testFetch() {
  const { data, error } = await supabase
    .from('questions')
    .select('subject, subtopic, chapter');

  if (error) {
    console.error('Error:', error);
    return;
  }

  const organizedData = [];
  data.forEach((item) => {
    let subjectObj = organizedData.find(s => s.subject === item.subject);
    if (!subjectObj) {
      subjectObj = { subject: item.subject, subtopics: [] };
      organizedData.push(subjectObj);
    }
    
    let subtopicObj = subjectObj.subtopics.find((st) => st.subtopic === item.subtopic);
    if (!subtopicObj) {
      subtopicObj = { subtopic: item.subtopic, chapters: [] };
      subjectObj.subtopics.push(subtopicObj);
    }
    
    if (item.chapter && !subtopicObj.chapters.includes(item.chapter)) {
      subtopicObj.chapters.push(item.chapter);
    }
  });

  console.log('Subjects found:', organizedData.map(s => s.subject));
  console.log('Full structure:', JSON.stringify(organizedData, null, 2));
}

testFetch();
