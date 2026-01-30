import supabase from '../config/supabaseClient.js';
import bcrypt from 'bcrypt';

export const createUser = async (req, res) => {
  try {
    const { name, email, password, age, role } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const { data, error } = await supabase
      .from('users')
      .insert([{ name, email, password: hashedPassword, age, role }])
      .select();

    if (error) {
      if (error.code === '23505') {
        return res.status(409).json({ error: 'Email already exists' });
      }
      return res.status(500).json({ error: error.message });
    }

    res.status(201).json(data[0]);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

export const getUsers = async (req, res) => {
  const { data, error } = await supabase.from('users').select('*');
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
};

export const getUserById = async (req, res) => {
  const { id } = req.params;

  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', id)
    .single();

  if (!data) return res.status(404).json({ error: 'User not found' });
  if (error) return res.status(400).json({ error: error.message });

  res.json(data);
};

export const updateUser = async (req, res) => {
  const { id } = req.params;

  const { data, error } = await supabase
    .from('users')
    .update(req.body)
    .eq('id', id)
    .select();

  if (!data.length) return res.status(404).json({ error: 'User not found' });
  if (error) return res.status(400).json({ error: error.message });

  res.json(data[0]);
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;

  const { error } = await supabase.from('users').delete().eq('id', id);

  if (error) return res.status(400).json({ error: error.message });

  res.json({ message: 'User deleted successfully' });
};
