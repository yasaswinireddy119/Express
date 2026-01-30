export const addTodo = async (req, res) => {
  const { title, description, userId } = req.body;

  const { data, error } = await supabase
    .from('todos')
    .insert([{ title, description, user_id: userId }])
    .select();

  if (error) {
    return res.status(400).json({ error: error.message });
  }

  res.status(201).json(data[0]);
};
