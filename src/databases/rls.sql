-- Enable RLS on the tables
ALTER TABLE games ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Create a policy to allow all users to read from the tables
CREATE POLICY games_select_policy ON games FOR SELECT USING (true);
CREATE POLICY users_select_policy ON users FOR SELECT USING (true);

-- Create policies to allow only authenticated users to perform mutation operations
CREATE POLICY games_auth_policy ON games FOR ALL USING (auth.uid() IS NOT NULL);
CREATE POLICY users_auth_policy ON users FOR ALL USING (auth.uid() IS NOT NULL);