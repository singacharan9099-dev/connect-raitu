-- Add missing columns expected by the Admin Panel
ALTER TABLE products ADD COLUMN IF NOT EXISTS brand text;
ALTER TABLE products ADD COLUMN IF NOT EXISTS mrp numeric;
ALTER TABLE products ADD COLUMN IF NOT EXISTS description text;

-- Make 'unit' optional since the Admin Panel doesn't currently have a field for it
ALTER TABLE products ALTER COLUMN unit DROP NOT NULL;

-- If you want to set a default for existing rows (optional)
UPDATE products SET unit = 'Pack' WHERE unit IS NULL;

-- Verify the schema
SELECT column_name, data_type, is_nullable 
FROM information_schema.columns 
WHERE table_name = 'products';
