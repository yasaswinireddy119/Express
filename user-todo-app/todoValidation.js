export const validateTodo = (req, res, next) => {
  const { title, userId } = req.body;

  if (!title || !userId) {
    return res.status(400).json({ error: 'Title and userId are required' });
  }

  next();
};
