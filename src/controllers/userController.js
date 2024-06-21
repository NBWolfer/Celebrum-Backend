const userService = require('../services/userService');

exports.createUser = async (req, res) => {
  try {
    const { name, email, job } = req.body;
    const newUser = await userService.createUser({ name, email, job });

    res.status(201).json(newUser);
  } catch (error) {
    if (error.message === 'User not created') {
      return res.status(400).json({ error: error.message });
    }
    res.status(500).json({ error: error.message });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await userService.getAllUsers();
    res.json(users);
  } catch (error) {
    if (error.message === 'Users not found') {
      return res.status(404).json({ message: error.message });
    }
    res.status(500).json({ error: error.message });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const user = await userService.getUserById(req.params.id);
    res.json(user);
  } catch (error) {
    if (error.message === 'User not found') {
      return res.status(404).json({ message: error.message });
    }
    res.status(500).json({ error: error.message });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { name, email, job } = req.body;
    const user = await userService.updateUser(req.params.id, { name, email, job });
    res.json(user);
  } catch (error) {
    if (error.message === 'User not found') {
      return res.status(404).json({ message: error.message });
    }
    res.status(400).json({ error: error.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const user = await userService.deleteUser(req.params.id);
    res.status(204).send({ message: `${user.id}, ${user.name} deleted`});
  } catch (error) {
    if(error.message === 'User not found') {
      return res.status(404).json({ message: error.message });
    }
    res.status(500).json({ error: error.message });
  }
};

exports.getPostsByUserId = async (req, res) => {
  try {
    const posts = await userService.getPostsByUserId(req.params.id);
    res.status(200).json(posts);
  } catch (error) {
    if (error.message === 'User not found') {
      return res.status(404).json({ message: error.message });
    }
    if (error.message === 'Posts not found') {
      return res.status(200).json({ message: error.message });
    }
    res.status(500).json({ error: error.message });
  }
}