-- ============================================================================
-- HELPER QUERIES FOR MAZUNTE CONNECT
-- ============================================================================
-- Common queries for the Mazunte Connect app
-- Copy and adapt these queries for your React Query hooks and API calls

-- ============================================================================
-- EVENTS QUERIES
-- ============================================================================

-- Get all upcoming events (next 30 days)
SELECT * FROM events
WHERE date >= CURRENT_DATE
  AND date <= CURRENT_DATE + INTERVAL '30 days'
ORDER BY date, time
LIMIT 50;

-- Get events by category
SELECT * FROM events
WHERE category = 'yoga'
  AND date >= CURRENT_DATE
ORDER BY date, time;

-- Get today's events
SELECT * FROM events
WHERE date = CURRENT_DATE
ORDER BY time;

-- Get this week's events
SELECT * FROM events
WHERE date >= CURRENT_DATE
  AND date < CURRENT_DATE + INTERVAL '7 days'
ORDER BY date, time;

-- Get featured events
SELECT * FROM events
WHERE featured = true
  AND date >= CURRENT_DATE
ORDER BY date, time
LIMIT 10;

-- Get eco-conscious events
SELECT * FROM events
WHERE eco_conscious = true
  AND date >= CURRENT_DATE
ORDER BY date, time;

-- Search events by keyword (title or description)
SELECT * FROM events
WHERE (
    title ILIKE '%yoga%'
    OR description ILIKE '%yoga%'
  )
  AND date >= CURRENT_DATE
ORDER BY date, time;

-- Get events near a location (within ~5km)
-- Note: This is a simple box search. For production, consider PostGIS
SELECT * FROM events
WHERE lat BETWEEN 15.6158 AND 15.7158
  AND lng BETWEEN -96.7847 AND -96.6847
  AND date >= CURRENT_DATE
ORDER BY date, time;

-- Get user's created events
SELECT * FROM events
WHERE profile_id = '<user_id>'
ORDER BY date DESC;

-- ============================================================================
-- PLACES QUERIES
-- ============================================================================

-- Get all places
SELECT * FROM places
ORDER BY name;

-- Get places by type
SELECT * FROM places
WHERE type = 'wellness'
ORDER BY name;

-- Get featured places
SELECT * FROM places
WHERE featured = true
ORDER BY name;

-- Get eco-conscious places
SELECT * FROM places
WHERE eco_conscious = true
ORDER BY name;

-- Get verified places
SELECT * FROM places
WHERE verified = true
ORDER BY name;

-- Get places by price range
SELECT * FROM places
WHERE price_range = '$$'
ORDER BY name;

-- Search places by tag
SELECT * FROM places
WHERE tags @> ARRAY['vegan']
ORDER BY name;

-- Search places by keyword
SELECT * FROM places
WHERE name ILIKE '%yoga%'
   OR description ILIKE '%yoga%'
   OR category ILIKE '%yoga%'
ORDER BY name;

-- Get places near a location (within ~5km)
SELECT * FROM places
WHERE lat BETWEEN 15.6158 AND 15.7158
  AND lng BETWEEN -96.7847 AND -96.6847
ORDER BY name;

-- Get user's created places
SELECT * FROM places
WHERE created_by = '<user_id>'
ORDER BY created_at DESC;

-- ============================================================================
-- FAVORITES QUERIES
-- ============================================================================

-- Get all user's favorites (events and places combined)
SELECT
  e.id,
  e.title as name,
  e.description,
  e.date,
  e.time,
  e.location_name,
  e.category,
  'event' as item_type,
  f.created_at as favorited_at
FROM events e
JOIN favorites f ON e.id = f.item_id AND f.item_type = 'event'
WHERE f.user_id = '<user_id>'

UNION ALL

SELECT
  p.id,
  p.name,
  p.description,
  NULL as date,
  NULL as time,
  p.location_name,
  p.type as category,
  'place' as item_type,
  f.created_at as favorited_at
FROM places p
JOIN favorites f ON p.id = f.item_id AND f.item_type = 'place'
WHERE f.user_id = '<user_id>'

ORDER BY favorited_at DESC;

-- Get user's favorite events only
SELECT e.*, f.created_at as favorited_at
FROM events e
JOIN favorites f ON e.id = f.item_id AND f.item_type = 'event'
WHERE f.user_id = '<user_id>'
ORDER BY f.created_at DESC;

-- Get user's favorite places only
SELECT p.*, f.created_at as favorited_at
FROM places p
JOIN favorites f ON p.id = f.item_id AND f.item_type = 'place'
WHERE f.user_id = '<user_id>'
ORDER BY f.created_at DESC;

-- Check if user has favorited a specific event
SELECT EXISTS(
  SELECT 1 FROM favorites
  WHERE user_id = '<user_id>'
    AND item_id = '<event_id>'
    AND item_type = 'event'
);

-- Check if user has favorited a specific place
SELECT EXISTS(
  SELECT 1 FROM favorites
  WHERE user_id = '<user_id>'
    AND item_id = '<place_id>'
    AND item_type = 'place'
);

-- Add favorite (event)
INSERT INTO favorites (user_id, item_id, item_type)
VALUES ('<user_id>', '<event_id>', 'event')
ON CONFLICT (user_id, item_id, item_type) DO NOTHING;

-- Add favorite (place)
INSERT INTO favorites (user_id, item_id, item_type)
VALUES ('<user_id>', '<place_id>', 'place')
ON CONFLICT (user_id, item_id, item_type) DO NOTHING;

-- Remove favorite
DELETE FROM favorites
WHERE user_id = '<user_id>'
  AND item_id = '<item_id>'
  AND item_type = '<item_type>';

-- ============================================================================
-- STATISTICS & ANALYTICS
-- ============================================================================

-- Count events by category
SELECT category, COUNT(*) as count
FROM events
WHERE date >= CURRENT_DATE
GROUP BY category
ORDER BY count DESC;

-- Count places by type
SELECT type, COUNT(*) as count
FROM places
GROUP BY type
ORDER BY count DESC;

-- Count upcoming events by week
SELECT
  DATE_TRUNC('week', date) as week_start,
  COUNT(*) as event_count
FROM events
WHERE date >= CURRENT_DATE
  AND date < CURRENT_DATE + INTERVAL '4 weeks'
GROUP BY week_start
ORDER BY week_start;

-- Most popular tags on places
SELECT UNNEST(tags) as tag, COUNT(*) as count
FROM places
GROUP BY tag
ORDER BY count DESC
LIMIT 10;

-- ============================================================================
-- COMBINED/COMPLEX QUERIES
-- ============================================================================

-- Get everything happening today (events + places open now)
-- Events
SELECT
  'event' as type,
  title as name,
  date,
  time,
  location_name,
  category
FROM events
WHERE date = CURRENT_DATE

UNION ALL

-- Places (all places, as they're generally always available)
SELECT
  'place' as type,
  name,
  NULL as date,
  NULL as time,
  location_name,
  type as category
FROM places

ORDER BY date, time;

-- Get eco-conscious options (events + places)
SELECT
  'event' as type,
  title as name,
  eco_conscious,
  location_name
FROM events
WHERE eco_conscious = true AND date >= CURRENT_DATE

UNION ALL

SELECT
  'place' as type,
  name,
  eco_conscious,
  location_name
FROM places
WHERE eco_conscious = true

ORDER BY name;

-- ============================================================================
-- USEFUL FUNCTIONS
-- ============================================================================

-- Calculate distance between two coordinates (approximate, in km)
-- Usage: SELECT calculate_distance(15.6658, -96.7347, 15.6672, -96.7360);
CREATE OR REPLACE FUNCTION calculate_distance(
  lat1 NUMERIC, lon1 NUMERIC,
  lat2 NUMERIC, lon2 NUMERIC
)
RETURNS NUMERIC AS $$
DECLARE
  R NUMERIC := 6371; -- Earth's radius in km
  dLat NUMERIC;
  dLon NUMERIC;
  a NUMERIC;
  c NUMERIC;
BEGIN
  dLat := RADIANS(lat2 - lat1);
  dLon := RADIANS(lon2 - lon1);

  a := SIN(dLat/2) * SIN(dLat/2) +
       COS(RADIANS(lat1)) * COS(RADIANS(lat2)) *
       SIN(dLon/2) * SIN(dLon/2);

  c := 2 * ATAN2(SQRT(a), SQRT(1-a));

  RETURN R * c; -- Distance in kilometers
END;
$$ LANGUAGE plpgsql IMMUTABLE;

-- Example usage:
-- Find events within 2km of Mazunte center
SELECT *,
  calculate_distance(15.6658, -96.7347, lat, lng) as distance_km
FROM events
WHERE calculate_distance(15.6658, -96.7347, lat, lng) < 2
  AND date >= CURRENT_DATE
ORDER BY distance_km, date, time;
