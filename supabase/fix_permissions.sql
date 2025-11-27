-- Enable RLS on products table
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- Create policy to allow everyone to view products (SELECT)
CREATE POLICY "Enable read access for all users" ON "public"."products"
AS PERMISSIVE FOR SELECT
TO public
USING (true);

-- Create policy to allow everyone to insert products (INSERT)
-- Note: In a real app, you'd restrict this to admins, but for this demo/testing we allow all
CREATE POLICY "Enable insert for all users" ON "public"."products"
AS PERMISSIVE FOR INSERT
TO public
WITH CHECK (true);

-- Create policy to allow everyone to update products (UPDATE)
CREATE POLICY "Enable update for all users" ON "public"."products"
AS PERMISSIVE FOR UPDATE
TO public
USING (true)
WITH CHECK (true);

-- Create policy to allow everyone to delete products (DELETE)
CREATE POLICY "Enable delete for all users" ON "public"."products"
AS PERMISSIVE FOR DELETE
TO public
USING (true);

-- Verify policies
SELECT * FROM pg_policies WHERE tablename = 'products';
