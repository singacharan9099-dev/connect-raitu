-- NUCLEAR OPTION: Reset and Fix All Permissions
-- Run this if you are having trouble adding products

-- 1. Ensure columns exist
ALTER TABLE products ADD COLUMN IF NOT EXISTS brand text;
ALTER TABLE products ADD COLUMN IF NOT EXISTS mrp numeric;
ALTER TABLE products ADD COLUMN IF NOT EXISTS description text;
ALTER TABLE products ALTER COLUMN unit DROP NOT NULL;

-- 2. Disable RLS temporarily to confirm if that's the issue (Optional, but good for debugging)
-- ALTER TABLE products DISABLE ROW LEVEL SECURITY;

-- 3. OR, Re-apply the permissive policy
DROP POLICY IF EXISTS "Enable full access for all users" ON products;
DROP POLICY IF EXISTS "Enable read access for all users" ON products;
DROP POLICY IF EXISTS "Enable insert for all users" ON products;
DROP POLICY IF EXISTS "Enable update for all users" ON products;
DROP POLICY IF EXISTS "Enable delete for all users" ON products;
DROP POLICY IF EXISTS "Public products are viewable by everyone." ON products;

CREATE POLICY "Enable full access for all users" ON "public"."products"
AS PERMISSIVE FOR ALL
TO public
USING (true)
WITH CHECK (true);

-- 4. Grant permissions to the 'anon' and 'authenticated' roles explicitly
GRANT ALL ON TABLE products TO anon;
GRANT ALL ON TABLE products TO authenticated;
GRANT ALL ON TABLE products TO service_role;

-- 5. Ensure sequence permissions (for ID generation)
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO anon;
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO authenticated;
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO service_role;
