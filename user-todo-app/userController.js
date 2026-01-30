import supabase from '../config/supabaseClient.js';
import bcrypt from 'bcrypt';

export const signupUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const { data, error } = await supabase
      .from('users')
      .insert([{ name, email, password: hashedPassword }])
      .select();

    if (error) {
      if (error.code === '23505') {
        return res.status(409).json({ error: 'Email already exists' });
      }
      return res.status(500).json({ error: error.message });
    }

    res.status(201).json(data[0]);
  } catch {
    res.status(500).json({ error: 'Server error' });
  }
};
