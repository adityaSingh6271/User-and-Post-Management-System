/*
  # Add insert policy for users table

  1. Security Changes
    - Add policy to allow public insertion of users
*/

CREATE POLICY "Allow public insert access to users"
  ON users
  FOR INSERT
  TO public
  WITH CHECK (true);