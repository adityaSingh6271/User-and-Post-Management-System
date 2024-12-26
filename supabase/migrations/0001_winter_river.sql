/*
  # Initial Schema Setup

  1. New Tables
    - `users`
      - `id` (bigint, primary key, auto-increment)
      - `name` (varchar(256))
      - `mobile_number` (bigint, unique)
      - `address` (text)
      - `post_count` (integer, default 0)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `posts`
      - `id` (bigint, primary key, auto-increment)
      - `title` (text)
      - `description` (text)
      - `user_id` (bigint, foreign key)
      - `images` (jsonb, array of strings)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on both tables
    - Add policies for CRUD operations
*/

-- Create users table
CREATE TABLE users (
  id bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name varchar(256) NOT NULL,
  mobile_number bigint UNIQUE NOT NULL,
  address text,
  post_count integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create posts table
CREATE TABLE posts (
  id bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  title text NOT NULL,
  description text,
  user_id bigint REFERENCES users(id) ON DELETE CASCADE,
  images jsonb DEFAULT '[]'::jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Allow public read access to users"
  ON users
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow public read access to posts"
  ON posts
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow authenticated users to create posts"
  ON posts
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Allow users to update their own posts"
  ON posts
  FOR UPDATE
  TO authenticated
  USING (auth.uid()::text = (SELECT id::text FROM users WHERE id = posts.user_id))
  WITH CHECK (auth.uid()::text = (SELECT id::text FROM users WHERE id = posts.user_id));

CREATE POLICY "Allow users to delete their own posts"
  ON posts
  FOR DELETE
  TO authenticated
  USING (auth.uid()::text = (SELECT id::text FROM users WHERE id = posts.user_id));

-- Create function to update post count
CREATE OR REPLACE FUNCTION update_post_count()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE users SET post_count = post_count + 1 WHERE id = NEW.user_id;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE users SET post_count = post_count - 1 WHERE id = OLD.user_id;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for post count
CREATE TRIGGER update_post_count_trigger
AFTER INSERT OR DELETE ON posts
FOR EACH ROW
EXECUTE FUNCTION update_post_count();