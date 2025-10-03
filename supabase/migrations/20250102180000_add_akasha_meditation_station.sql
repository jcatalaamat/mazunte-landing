-- Add Akasha and Meditation Station to places
INSERT INTO places (name, type, category, description, location_name, lat, lng, hours, price_range, contact_phone, contact_instagram, website_url, tags, eco_conscious, verified) VALUES
('Akasha Mazunte', 'wellness', 'Healing Center', 'Karate/yoga/acupuncture healing center run by Giuseppe and Cristian - two Italian practitioners. Offers acupuncture sessions, temazcal ceremonies, karate classes, and yoga sessions. Temazcal ceremonies held at Giuseppe''s house on a hill overlooking the ocean.', 'Main street near vegan spots', 15.6677, -96.5545, 'By appointment - WhatsApp', '$$', '+52 958 144 6080', '@akashamazunte', NULL, ARRAY['acupuncture', 'temazcal', 'karate', 'yoga', 'healing', 'italian-practitioners', 'sweat-lodge'], true, true),

('Meditation Station Mazunte', 'wellness', 'Holistic Center', 'Holistic healing center on main street with yoga classes, ice baths, massages, and co-working space with Starlink internet. Daily drop-in classes, retreat packages available, Yoga Shala rental for workshops.', 'Calle Principal entre Museo de la Tortuga y Hridaya Yoga', 15.6682, -96.5544, 'Daily 7am-9pm', '$$', '+52 958 144 6080', '@meditationstation.3xda', 'mazuntehealing.com', ARRAY['yoga', 'ice-baths', 'massage', 'co-working', 'starlink', 'holistic', 'retreats', 'workshops'], true, true);

-- Add some sample events for these venues (mix of past, present, and future)
INSERT INTO events (title, description, category, date, time, location_name, lat, lng, price, organizer_name, organizer_contact, eco_conscious) VALUES
('Temazcal Ceremony at Akasha', 'Traditional sweat lodge ceremony with Giuseppe at his hilltop house overlooking the ocean. 4 spiritual levels using heated volcanic stones. Bring swimsuit and hydrate beforehand!', 'ceremony', '2025-01-15', '18:00', 'Akasha Hilltop House', 15.6677, -96.5545, '200 MXN', 'Giuseppe', '+52 958 144 6080', true),

('Power Vinyasa Yoga', 'Dynamic yoga class with Paolo focusing on strength and flow. Perfect for all levels.', 'yoga', '2025-01-13', '13:00', 'Meditation Station Mazunte', 15.6682, -96.5544, '200 MXN', 'Paolo', 'elliotstone1@gmail.com', true),

('Ice Bath & Breathwork', 'Guided ice bath therapy combined with breathwork techniques for mental and physical resilience.', 'workshop', '2025-01-14', '14:00', 'Meditation Station Mazunte', 15.6682, -96.5544, '200 MXN', 'Adam', 'elliotstone1@gmail.com', true),

('Family Constellations', 'Therapeutic group work exploring family dynamics and healing ancestral patterns with Nico.', 'workshop', '2025-01-14', '15:00', 'Meditation Station Mazunte', 15.6682, -96.5544, '200 MXN', 'Nico', 'elliotstone1@gmail.com', true),

('Female Embodiment', 'Empowering yoga and movement class focused on feminine energy and embodiment with Marenka.', 'yoga', '2025-01-13', '11:30', 'Meditation Station Mazunte', 15.6682, -96.5544, '200 MXN', 'Marenka', 'elliotstone1@gmail.com', true),

('Acupuncture Session', 'Individual acupuncture treatment with Giuseppe - consultation and work on problem areas, followed by massage and acupuncture with Cristian.', 'workshop', '2025-01-16', '10:00', 'Akasha Mazunte', 15.6677, -96.5545, '500 MXN', 'Giuseppe', '+52 958 144 6080', true),

-- Add some events for today and tomorrow to ensure they show up
('Morning Meditation', 'Daily morning meditation session to start your day with mindfulness and intention.', 'yoga', CURRENT_DATE, '08:00', 'Meditation Station Mazunte', 15.6682, -96.5544, '150 MXN', 'Adam', 'elliotstone1@gmail.com', true),

('Sunset Yoga', 'Evening yoga session to wind down and connect with the natural rhythm of the day.', 'yoga', CURRENT_DATE + INTERVAL '1 day', '18:00', 'Meditation Station Mazunte', 15.6682, -96.5544, '150 MXN', 'Marenka', 'elliotstone1@gmail.com', true);
