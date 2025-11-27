-- COMPLETE DATABASE SETUP FOR ADMIN PANEL
-- Run this in Supabase SQL Editor

-- 1. Add missing columns to products table
ALTER TABLE products ADD COLUMN IF NOT EXISTS brand text;
ALTER TABLE products ADD COLUMN IF NOT EXISTS mrp numeric;
ALTER TABLE products ADD COLUMN IF NOT EXISTS description text;

-- 2. Make unit optional
ALTER TABLE products ALTER COLUMN unit DROP NOT NULL;

-- 3. Set default for existing rows
UPDATE products SET unit = 'Pack' WHERE unit IS NULL;
UPDATE products SET brand = 'Generic' WHERE brand IS NULL OR brand = '';
UPDATE products SET mrp = price * 1.2 WHERE mrp IS NULL;

-- 4. Drop ALL existing policies
DROP POLICY IF EXISTS "Enable full access for all users" ON products;
DROP POLICY IF EXISTS "Enable read access for all users" ON products;
DROP POLICY IF EXISTS "Enable insert for all users" ON products;
DROP POLICY IF EXISTS "Enable update for all users" ON products;
DROP POLICY IF EXISTS "Enable delete for all users" ON products;
DROP POLICY IF EXISTS "Public products are viewable by everyone." ON products;

-- 5. Enable RLS
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- 6. Create simple, permissive policy for all operations
CREATE POLICY "Allow all operations for everyone" ON "public"."products"
AS PERMISSIVE FOR ALL
TO public
USING (true)
WITH CHECK (true);

-- 7. Grant all permissions to roles
GRANT ALL ON TABLE products TO anon;
GRANT ALL ON TABLE products TO authenticated;
GRANT ALL ON TABLE products TO service_role;

-- 8. Grant sequence permissions (for auto-incrementing ID)
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO anon;
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO authenticated;
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO service_role;

-- 9. Verify the setup
SELECT 
    column_name, 
    data_type, 
    is_nullable,
    column_default
FROM information_schema.columns 
WHERE table_name = 'products'
ORDER BY ordinal_position;

-- 10. Show active policies
SELECT * FROM pg_policies WHERE tablename = 'products';
