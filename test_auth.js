const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: 'exam-platform/.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function testLogin() {
  console.log('Testing login for test@pakkitayyari.com...');
  const { data, error } = await supabase.auth.signInWithPassword({
    email: 'test@pakkitayyari.com',
    password: 'pakkitayyari',
  });

  if (error) {
    console.error('Login failed:', error.message);
  } else {
    console.log('Login successful!', data.user.email);
  }
}

testLogin();
