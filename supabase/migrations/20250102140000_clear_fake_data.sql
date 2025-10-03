-- Clear all fake events and places data
-- This allows you to add real Mazunte data

-- Clear all events
DELETE FROM events;

-- Clear all places  
DELETE FROM places;

-- Reset sequences (optional, but good practice)
-- Note: This will reset auto-incrementing IDs, but since we're using UUIDs, this isn't necessary
