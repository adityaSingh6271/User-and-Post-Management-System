const supabase = require("../config/supabase");
const { validationResult } = require("express-validator");

const getAllPosts = async (req, res) => {
  try {
    const { data: posts, error } = await supabase
      .from("posts")
      .select(
        `
        *,
        users (
          id,
          name
        )
      `
      )
      .order("created_at", { ascending: false });

    if (error) throw error;
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createPost = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { title, description, user_id, images } = req.body;

    const { data: user, error: userError } = await supabase
      .from("users")
      .select("id")
      .eq("id", user_id)
      .single();

    if (userError || !user) {
      return res.status(404).json({ error: "User not found" });
    }

    const { data: post, error } = await supabase
      .from("posts")
      .insert([{ title, description, user_id, images }])
      .select()
      .single();

    if (error) throw error;
    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updatePost = async (req, res) => {
  try {
    const { id } = req.params; // Get ID from URL parameters
    if (!id) {
      return res.status(400).json({ error: "Post ID is required" });
    }

    const { title, description, user_id, images } = req.body;

    // Check if post exists
    const { data: existingPost, error: checkError } = await supabase
      .from("posts")
      .select("*")
      .eq("id", id)
      .single();

    if (checkError || !existingPost) {
      return res.status(404).json({ error: `Post with ID ${id} not found` });
    }

    // Update the post
    const { data: post, error } = await supabase
      .from("posts")
      .update({
        title,
        description,
        user_id,
        images,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deletePost = async (req, res) => {
  try {
    const { id } = req.params;

    const { data: existingPost, error: checkError } = await supabase
      .from("posts")
      .select("id")
      .eq("id", id)
      .single();

    if (checkError || !existingPost) {
      return res.status(404).json({ error: `Post with ID ${id} not found` });
    }

    const { error } = await supabase.from("posts").delete().eq("id", id);

    if (error) throw error;
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllPosts,
  createPost,
  updatePost,
  deletePost,
};
