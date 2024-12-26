/*
  # Update posts table policies

  1. Security Changes
    - Add policy to allow public insertion of posts
    - Update existing policies to allow public access
*/

-- Drop existing restrictive policies
DROP POLICY IF EXISTS "Allow authenticated users to create posts" ON posts;
DROP POLICY IF EXISTS "Allow users to update their own posts" ON posts;
DROP POLICY IF EXISTS "Allow users to delete their own posts" ON posts;

-- Create new public access policies
CREATE POLICY "Allow public insert access to posts"
  ON posts
  FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Allow public update access to posts"
  ON posts
  FOR UPDATE
  TO public
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow public delete access to posts"
  ON posts
  FOR DELETE
  TO public
  USING (true);