const supabase = require("../config/supabase");

const getAllUsers = async (req, res) => {
  try {
    const { data: users, error } = await supabase
      .from("users")
      .select("*")
      .order("id");

    if (error) throw error;

    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createUser = async (req, res) => {
  try {
    const { name, mobile_number, address } = req.body;

    const { data: user, error } = await supabase
      .from("users")
      .insert([{ name, mobile_number, address }])
      .select()
      .single();

    if (error) throw error;

    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllUsers,
  createUser,
};
