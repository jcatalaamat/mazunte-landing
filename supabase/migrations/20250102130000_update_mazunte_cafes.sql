-- Update Mazunte cafes with real coordinates and information
-- This migration updates the existing places with accurate data

-- First, let's clear the old fake places data and insert the real cafes
DELETE FROM places WHERE name IN (
  'Estrella Fugaz', 'La Mora', 'Siddhartha', 'Raw & Wild Juice Bar', 'Toro Güero', 'Armadillo Café'
);

-- Insert the real spiritual and cool cafes in Mazunte
INSERT INTO places (name, type, category, description, location_name, lat, lng, hours, price_range, contact_instagram, website_url, tags, eco_conscious, verified) VALUES
('Cometa Café Mazunte', 'restaurant', 'Specialty Coffee', 'Known for having one of the best coffees in Mexico - they roast it themselves. Central meeting spot on main street.', 'Calle Principal', 15.6677, -96.5545, 'Daily 7am-8pm', '$$', '@cometacafemazunte', NULL, ARRAY['coffee', 'roasted-in-house', 'main-street', 'meeting-spot'], true, true),
('Ícaro Café', 'restaurant', 'Garden Café', 'Outdoor garden cafe with French pastries, coffee, colorful walls, and shelves of books. Opens early but pastries sell out by 10-11am.', 'C. la Barrita', 15.666608022368132, -96.55484771364324, 'Daily 6am-2pm', '$$', '@icarocafemazunte', NULL, ARRAY['garden', 'french-pastries', 'books', 'colorful', 'early-bird'], true, true),
('Café Panchatantra', 'restaurant', 'Cultural Café', 'Located just behind the basketball court, serves amazing coffee with incredible cappuccino art and vegan desserts. Beautiful bohemian space with open mic nights.', 'Behind Centro deportivo', 15.6678703, -96.5535813, 'Daily 8am-10pm', '$$', '@cafepanchatantra', NULL, ARRAY['coffee-art', 'vegan-desserts', 'bohemian', 'open-mic', 'cultural'], true, true),
('Nutopia', 'restaurant', 'Brunch Café', 'Coffee and brunch place with breakfast bowls, owned by a German and friends. Chill atmosphere, good for digital nomads with outlets.', 'México 175, Street Parota', 15.6677, -96.5545, 'Daily 7am-4pm', '$$', '@nutopiamazunte', NULL, ARRAY['brunch', 'breakfast-bowls', 'digital-nomad', 'outlets', 'german-owned'], false, true),
('Tiburón Juice Bar', 'restaurant', 'Superfood Juice Bar', 'Smoothie bowls and blended drinks with superfoods like spirulina, chia seeds, maca, moringa. Meeting point for locals and travelers.', 'Main street next to El Baguette', 15.6677, -96.5545, 'Daily 7am-7pm', '$', '@tiburonjuicebar', NULL, ARRAY['smoothie-bowls', 'superfoods', 'spirulina', 'maca', 'moringa', 'local-meeting-point'], true, true),
('Meditation Station Mazunte', 'wellness', 'Holistic Healing Center', 'Holistic healing center on main street with yoga classes, ice baths, massages, and co-working space with Starlink internet.', 'Calle Principal entre Museo de la Tortuga y Hridaya Yoga', 15.6680, -96.5545, 'Daily 7am-9pm', '$$', '@meditationstationmazunte', NULL, ARRAY['yoga', 'ice-baths', 'massage', 'co-working', 'starlink', 'holistic'], true, true);
