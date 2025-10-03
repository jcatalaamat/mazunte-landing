-- Migration 5: Seed Mazunte Connect with realistic events and places
-- This provides initial data for testing and demo purposes

-- ============================================================================
-- EVENTS (30+ entries)
-- ============================================================================

-- YOGA EVENTS (8 entries)
INSERT INTO events (title, description, date, time, location_name, lat, lng, category, price, eco_conscious, organizer_name, organizer_contact) VALUES
('Morning Vinyasa Flow', 'Start your day with energizing vinyasa flow overlooking the Pacific Ocean. All levels welcome.', '2025-01-12', '07:00', 'Hola Ola Beach', 15.6658, -96.7347, 'yoga', 'Free', true, 'Maria', '@holaolamzt'),
('Sunset Yin Yoga', 'Slow-paced yin yoga practice with ocean views as the sun sets. Perfect for relaxation.', '2025-01-13', '17:30', 'Punta Cometa Lookout', 15.6632, -96.7312, 'yoga', '100 MXN', true, 'Carmen', '+52 958 111 2222'),
('Kundalini Awakening', 'Dynamic kundalini practice with breathwork, mantra, and meditation.', '2025-01-14', '08:00', 'Solstice Yoga Studio', 15.6662, -96.7350, 'yoga', '150 MXN', true, 'Raj', '@solsticeyogamzt'),
('Aerial Yoga Class', 'Experience the freedom of aerial yoga in hammocks suspended from the palapa ceiling.', '2025-01-15', '10:00', 'Casa Om', 15.6672, -96.7360, 'yoga', '200 MXN', true, 'Luna', 'luna@casaom.com'),
('Beach Yoga at Dawn', 'Gentle flow practice on the beach as the sun rises. Bring your mat!', '2025-01-16', '06:30', 'Rinconcito Beach', 15.6645, -96.7335, 'yoga', 'Donation', true, 'Collective', '@mazunteyoga'),
('Acro Yoga Playshop', 'Partner acrobatics and therapeutic flying. Beginners and experienced welcome.', '2025-01-17', '16:00', 'La Punta Beach', 15.6625, -96.7305, 'yoga', '150 MXN', true, 'David & Ana', '@acroyogamzt'),
('Restorative Yoga & Yoga Nidra', 'Deep rest and relaxation with supported poses and guided meditation.', '2025-01-18', '18:00', 'Hridaya Yoga Center', 15.6668, -96.7355, 'yoga', '120 MXN', true, 'Sarita', '@hridayamzt'),
('Morning Mysore Practice', 'Self-paced Ashtanga practice with individual adjustments. 6-9am drop-in.', '2025-01-19', '06:00', 'Solstice Yoga Studio', 15.6662, -96.7350, 'yoga', '150 MXN', true, 'Raj', '@solsticeyogamzt');

-- CEREMONY EVENTS (7 entries)
INSERT INTO events (title, description, date, time, location_name, lat, lng, category, price, eco_conscious, organizer_name, organizer_contact) VALUES
('Cacao Ceremony & Sound Healing', 'Heart-opening ceremonial cacao followed by crystal bowl sound bath and meditation.', '2025-01-13', '18:00', 'Casa Om', 15.6672, -96.7360, 'ceremony', '300 MXN', true, 'Luna', '+52 958 123 4567'),
('Full Moon Ceremony', 'Gather under the full moon for meditation, chanting, and intention setting.', '2025-01-15', '20:00', 'Punta Cometa', 15.6632, -96.7312, 'ceremony', 'Donation', true, 'Moon Circle', '@moonmzt'),
('Temazcal Sweat Lodge', 'Traditional Mexica purification ceremony led by indigenous guide. 4-hour experience.', '2025-01-16', '16:00', 'Tierra Viva Retreat', 15.6685, -96.7375, 'ceremony', '500 MXN', true, 'Don Miguel', '+52 958 222 3333'),
('Women''s Circle', 'Sacred space for women to share, connect, and support each other. Tea included.', '2025-01-17', '17:00', 'Hridaya Yoga Center', 15.6668, -96.7355, 'ceremony', '100 MXN', true, 'Sisters of Mazunte', '@womensmzt'),
('Breathwork Journey', 'Transformational conscious connected breathwork session with live music.', '2025-01-18', '18:30', 'Casa Om', 15.6672, -96.7360, 'ceremony', '250 MXN', true, 'Alex', 'alex.breathwork@gmail.com'),
('Ecstatic Dance', 'Free-form movement meditation. No talking, no phones, no substances. Pure embodiment.', '2025-01-19', '19:00', 'Hola Ola Beach', 15.6658, -96.7347, 'ceremony', '150 MXN', true, 'DJ Shakti', '@ecstaticdancemzt'),
('Kirtan & Mantra Chanting', 'Devotional singing with harmonium, guitars, and percussion. Open to all.', '2025-01-20', '19:30', 'Solstice Yoga Studio', 15.6662, -96.7350, 'ceremony', 'Donation', true, 'Bhakti Band', '@bhaktimzt');

-- WORKSHOP EVENTS (6 entries)
INSERT INTO events (title, description, date, time, location_name, lat, lng, category, price, eco_conscious, organizer_name, organizer_contact) VALUES
('Meditation for Beginners', 'Introduction to meditation techniques: breath awareness, body scan, and loving-kindness.', '2025-01-14', '09:00', 'Hridaya Yoga Center', 15.6668, -96.7355, 'workshop', 'Free', true, 'Sarita', '@hridayamzt'),
('Artisan Jewelry Making', 'Learn to create macramé jewelry using natural fibers and stones from local beaches.', '2025-01-15', '14:00', 'Community Center', 15.6665, -96.7342, 'workshop', '200 MXN', true, 'Isabella', '+52 958 333 4444'),
('Plant-Based Cooking Class', 'Cook traditional Mexican dishes with a vegan twist. Eat what you make!', '2025-01-16', '11:00', 'Estrella Fugaz', 15.6665, -96.7342, 'workshop', '350 MXN', true, 'Chef Rosa', '@estrellamzt'),
('Spanish Conversation Circle', 'Practice your Spanish in a relaxed environment with coffee and snacks.', '2025-01-17', '10:00', 'La Mora Café', 15.6660, -96.7345, 'workshop', '50 MXN', false, 'Language Exchange', 'spanish.mzt@gmail.com'),
('Permaculture Basics', 'Learn sustainable gardening techniques perfect for tropical climates.', '2025-01-18', '15:00', 'Tierra Viva Retreat', 15.6685, -96.7375, 'workshop', '250 MXN', true, 'Eco Team', '@tierravivamazunte'),
('Intuitive Dance Workshop', 'Explore movement, expression, and creativity through guided improvisation.', '2025-01-19', '10:00', 'Casa Om', 15.6672, -96.7360, 'workshop', '180 MXN', true, 'Mia', '+52 958 444 5555');

-- PARTY/SOCIAL EVENTS (5 entries)
INSERT INTO events (title, description, date, time, location_name, lat, lng, category, price, eco_conscious, organizer_name, organizer_contact) VALUES
('Full Moon Beach Party', 'Dance barefoot under the stars with local and international DJs. Bring reusable cups!', '2025-01-15', '21:00', 'Rinconcito Beach', 15.6645, -96.7335, 'party', 'Donation', true, 'Mazunte Collective', '@mazuntevibes'),
('Live Music Night', 'Acoustic performance by local musicians. Reggae, folk, and original songs.', '2025-01-16', '20:00', 'La Mora Café', 15.6660, -96.7345, 'party', 'Free', false, 'La Mora', '@lamoramazunte'),
('Salsa Night', 'Learn salsa basics then dance the night away! All levels welcome.', '2025-01-17', '20:30', 'Community Center', 15.6665, -96.7342, 'party', '100 MXN', false, 'Salsa Mazunte', '+52 958 555 6666'),
('DJ Set & Fire Show', 'Electronic beats meet poi and fire dancing on the beach. BYO drinks.', '2025-01-18', '22:00', 'Hola Ola Beach', 15.6658, -96.7347, 'party', '150 MXN', false, 'Flow Collective', '@flowartsmzt'),
('Movie Night on the Beach', 'Outdoor screening of spiritual/environmental documentaries. Bring cushions!', '2025-01-20', '19:30', 'Rinconcito Beach', 15.6645, -96.7335, 'party', 'Donation', true, 'Cine Club', '@cinemzt');

-- MARKET EVENTS (3 entries)
INSERT INTO events (title, description, date, time, location_name, lat, lng, category, price, eco_conscious, organizer_name, organizer_contact) VALUES
('Artisan Market', 'Local crafts, jewelry, art, and handmade goods. Support local artists!', '2025-01-13', '10:00', 'Main Beach Road', 15.6658, -96.7347, 'market', 'Free entry', true, 'Artisan Collective', '@artisansmzt'),
('Organic Farmers Market', 'Fresh produce, kombucha, bread, and local honey. Bring your own bags!', '2025-01-17', '08:00', 'Village Center', 15.6665, -96.7342, 'market', 'Free entry', true, 'Farm Network', 'farms.mzt@gmail.com'),
('Clothing Swap & Sustainable Fashion', 'Bring 3-5 items, swap for new-to-you pieces. Reduce, reuse, refresh!', '2025-01-19', '14:00', 'Community Center', 15.6665, -96.7342, 'market', 'Free', true, 'Eco Fashion', '@sustainablemzt');

-- OTHER EVENTS (2 entries)
INSERT INTO events (title, description, date, time, location_name, lat, lng, category, price, eco_conscious, organizer_name, organizer_contact) VALUES
('Sunrise Surf Lesson', 'Beginner-friendly surf instruction with board rental included. Small groups.', '2025-01-14', '06:00', 'La Punta Beach', 15.6625, -96.7305, 'other', '400 MXN', false, 'Surf School Mzt', '+52 958 666 7777'),
('Turtle Release Experience', 'Witness baby turtles being released into the ocean. Educational and magical!', '2025-01-18', '18:30', 'Ventanilla Beach', 15.6692, -96.7265, 'other', '150 MXN', true, 'Turtle Sanctuary', '@turtlesmzt');


-- ============================================================================
-- PLACES (25+ entries)
-- ============================================================================

-- RETREATS (5 entries)
INSERT INTO places (name, type, category, description, location_name, lat, lng, hours, price_range, contact_phone, contact_whatsapp, contact_instagram, contact_email, tags, eco_conscious, featured, verified) VALUES
('Casa Om', 'retreat', 'Yoga Retreat Center', 'Peaceful oceanfront retreat center offering yoga, meditation, and holistic healing. Private rooms and dormitories available.', 'Hillside overlooking beach', 15.6672, -96.7360, 'Check-in 2pm, Check-out 11am', '$$$', NULL, '+52 958 123 4567', '@casaommazunte', 'info@casaom.com', ARRAY['yoga', 'meditation', 'ocean-view', 'vegetarian'], true, true, true),
('Punta Serena', 'retreat', 'Beachfront Retreat', 'Luxury eco-retreat with palapa-style bungalows, infinity pool, and daily yoga classes.', 'Exclusive beachfront', 15.6628, -96.7308, 'Reception 8am-8pm', '$$$$', NULL, '+52 958 234 5678', '@puntaserena', 'reservations@puntaserena.mx', ARRAY['luxury', 'solar-powered', 'ocean-view', 'spa'], true, true, true),
('Solstice Yoga Retreat', 'retreat', 'Yoga & Wellness', 'Intimate retreat center specializing in transformational yoga and wellness programs.', 'Village center', 15.6662, -96.7350, 'Office hours 9am-6pm', '$$', NULL, '+52 958 345 6789', '@solsticeyogamzt', 'hello@solsticeyoga.com', ARRAY['yoga', 'wellness', 'workshops', 'organic-food'], true, true, true),
('Hridaya Yoga Center', 'retreat', 'Silent Meditation Retreat', 'Traditional yoga and silent meditation retreats in a serene jungle setting.', 'Jungle hillside', 15.6668, -96.7355, 'Silent retreat - limited contact', '$$', NULL, '+52 958 456 7890', '@hridayamazunte', 'info@hridaya.mx', ARRAY['meditation', 'silent-retreat', 'traditional', 'vegetarian'], true, false, true),
('Tierra Viva Eco-Retreat', 'retreat', 'Permaculture & Wellness', 'Off-grid eco-retreat with permaculture gardens, yoga platform, and temazcal.', 'Mountain road', 15.6685, -96.7375, 'By appointment only', '$$', NULL, '+52 958 567 8901', '@tierravivamazunte', 'tierraviva.mzt@gmail.com', ARRAY['permaculture', 'off-grid', 'solar-powered', 'organic'], true, false, true);

-- WELLNESS (8 entries)
INSERT INTO places (name, type, category, description, location_name, lat, lng, hours, price_range, contact_instagram, contact_email, tags, eco_conscious, verified) VALUES
('Solstice Yoga Studio', 'wellness', 'Yoga Studio', 'Beautiful open-air yoga studio with ocean views. Drop-in classes daily.', 'Main Beach Road', 15.6662, -96.7350, 'Classes 7am-7pm Mon-Sat', '$$', '@solsticeyogamzt', 'classes@solsticeyoga.com', ARRAY['yoga', 'ocean-view', 'daily-classes'], true, true),
('Healing Hands Massage', 'wellness', 'Massage Therapy', 'Professional massage including Thai, Swedish, deep tissue, and hot stone.', 'Village center', 15.6660, -96.7343, 'By appointment 10am-8pm', '$$', '@healinghandsmzt', 'healinghands.mzt@gmail.com', ARRAY['massage', 'therapeutic', 'couples-massage'], false, true),
('Osteopathy Mazunte', 'wellness', 'Osteopathic Medicine', 'Registered osteopath offering gentle structural treatment and craniosacral therapy.', 'Side street', 15.6658, -96.7340, 'Mon-Fri 9am-5pm', '$$$', '@osteomzt', 'osteopath.mazunte@gmail.com', ARRAY['osteopathy', 'craniosacral', 'holistic'], false, true),
('Reiki & Energy Healing', 'wellness', 'Energy Work', 'Reiki master offering sessions, classes, and attunements in peaceful garden setting.', 'Quiet neighborhood', 15.6670, -96.7352, 'By appointment', '$$', '@reikimazunte', 'reiki.mzt@gmail.com', ARRAY['reiki', 'energy-healing', 'spiritual'], true, false),
('Sound Healing Temple', 'wellness', 'Sound Therapy', 'Individual and group sound baths with crystal bowls, gongs, and indigenous instruments.', 'Jungle location', 15.6675, -96.7365, 'Sessions daily 6pm', '$$', '@soundtemplemzt', 'sound@temple.mx', ARRAY['sound-healing', 'meditation', 'group-sessions'], true, true),
('Mazunte Bodywork', 'wellness', 'Bodywork & Movement', 'Rolfing, myofascial release, and somatic movement therapy.', 'Main road', 15.6663, -96.7348, 'Tue-Sat 10am-6pm', '$$$', '@bodyworkmzt', 'bodywork.mazunte@gmail.com', ARRAY['rolfing', 'somatic', 'therapeutic'], false, false),
('Acupuncture Clinic', 'wellness', 'Traditional Chinese Medicine', 'Licensed acupuncturist offering treatments for pain, stress, and wellness.', 'Village center', 15.6665, -96.7344, 'Mon-Fri 9am-5pm', '$$', '@acumzt', 'acupuncture.mzt@proton.me', ARRAY['acupuncture', 'tcm', 'holistic'], false, true),
('Yoga Nidra Center', 'wellness', 'Deep Relaxation', 'Dedicated space for yoga nidra (yogic sleep) sessions and training.', 'Quiet zone', 15.6668, -96.7354, 'Daily 5pm & 7pm', '$', '@yoganidramzt', NULL, ARRAY['yoga-nidra', 'meditation', 'relaxation'], true, false);

-- RESTAURANTS & CAFES (6 entries) - Real Spiritual & Cool Cafes in Mazunte
INSERT INTO places (name, type, category, description, location_name, lat, lng, hours, price_range, contact_instagram, website_url, tags, eco_conscious, verified) VALUES
('Cometa Café Mazunte', 'restaurant', 'Specialty Coffee', 'Known for having one of the best coffees in Mexico - they roast it themselves. Central meeting spot on main street.', 'Calle Principal', 15.6677, -96.5545, 'Daily 7am-8pm', '$$', '@cometacafemazunte', NULL, ARRAY['coffee', 'roasted-in-house', 'main-street', 'meeting-spot'], true, true),
('Ícaro Café', 'restaurant', 'Garden Café', 'Outdoor garden cafe with French pastries, coffee, colorful walls, and shelves of books. Opens early but pastries sell out by 10-11am.', 'C. la Barrita', 15.666608022368132, -96.55484771364324, 'Daily 6am-2pm', '$$', '@icarocafemazunte', NULL, ARRAY['garden', 'french-pastries', 'books', 'colorful', 'early-bird'], true, true),
('Café Panchatantra', 'restaurant', 'Cultural Café', 'Located just behind the basketball court, serves amazing coffee with incredible cappuccino art and vegan desserts. Beautiful bohemian space with open mic nights.', 'Behind Centro deportivo', 15.6678703, -96.5535813, 'Daily 8am-10pm', '$$', '@cafepanchatantra', NULL, ARRAY['coffee-art', 'vegan-desserts', 'bohemian', 'open-mic', 'cultural'], true, true),
('Nutopia', 'restaurant', 'Brunch Café', 'Coffee and brunch place with breakfast bowls, owned by a German and friends. Chill atmosphere, good for digital nomads with outlets.', 'México 175, Street Parota', 15.6677, -96.5545, 'Daily 7am-4pm', '$$', '@nutopiamazunte', NULL, ARRAY['brunch', 'breakfast-bowls', 'digital-nomad', 'outlets', 'german-owned'], false, true),
('Tiburón Juice Bar', 'restaurant', 'Superfood Juice Bar', 'Smoothie bowls and blended drinks with superfoods like spirulina, chia seeds, maca, moringa. Meeting point for locals and travelers.', 'Main street next to El Baguette', 15.6677, -96.5545, 'Daily 7am-7pm', '$', '@tiburonjuicebar', NULL, ARRAY['smoothie-bowls', 'superfoods', 'spirulina', 'maca', 'moringa', 'local-meeting-point'], true, true),
('Meditation Station Mazunte', 'wellness', 'Holistic Healing Center', 'Holistic healing center on main street with yoga classes, ice baths, massages, and co-working space with Starlink internet.', 'Calle Principal entre Museo de la Tortuga y Hridaya Yoga', 15.6680, -96.5545, 'Daily 7am-9pm', '$$', '@meditationstationmazunte', NULL, ARRAY['yoga', 'ice-baths', 'massage', 'co-working', 'starlink', 'holistic'], true, true);

-- ACTIVITIES (4 entries)
INSERT INTO places (name, type, category, description, location_name, lat, lng, hours, price_range, contact_whatsapp, contact_instagram, tags, eco_conscious, verified) VALUES
('Mazunte Surf School', 'activity', 'Surf Lessons', 'Certified instructors offering group and private surf lessons. Board rental available.', 'La Punta Beach', 15.6625, -96.7305, 'Daily 6am-5pm', '$$', '+52 958 666 7777', '@surfscho olmzt', ARRAY['surfing', 'lessons', 'board-rental'], false, true),
('Eco-Tours Mazunte', 'activity', 'Nature Tours', 'Guided tours to turtle sanctuary, mangroves, and bioluminescence. Kayak rentals.', 'Beach office', 15.6658, -96.7347, 'Daily 8am-6pm', '$$', '+52 958 777 8888', '@ecotoursmzt', ARRAY['eco-tours', 'kayaking', 'turtles', 'nature'], true, true),
('Spanish School Mazunte', 'activity', 'Language Classes', 'One-on-one and group Spanish classes. All levels. Flexible schedule.', 'Village center', 15.6663, -96.7342, 'Mon-Fri 9am-5pm', '$', '+52 958 888 9999', '@spanishmzt', ARRAY['spanish', 'language', 'classes'], false, false),
('Boat Tours Ventanilla', 'activity', 'Boat Tours', 'Mangrove tours, fishing trips, and wildlife watching. Local fishermen guides.', 'Ventanilla lagoon', 15.6695, -96.7268, 'Daily 7am-4pm', '$', '+52 958 999 0000', '@boatsmzt', ARRAY['boat-tours', 'wildlife', 'fishing'], false, true);

-- COMMUNITY (2 entries)
INSERT INTO places (name, type, category, description, location_name, lat, lng, hours, price_range, contact_email, tags, eco_conscious, verified) VALUES
('Mazunte Co-working Space', 'community', 'Co-working', 'Quiet workspace with fast wifi, air conditioning, and coffee. Day passes available.', 'Village center', 15.6664, -96.7343, 'Mon-Sat 8am-6pm', '$', 'cowork.mzt@gmail.com', ARRAY['wifi', 'workspace', 'coffee', 'ac'], false, false),
('Community Center Mazunte', 'community', 'Community Hub', 'Free public space for events, workshops, and gatherings. Bulletin board and library.', 'Main plaza', 15.6665, -96.7342, 'Daily 8am-8pm', NULL, 'community.mzt@gmail.com', ARRAY['community', 'events', 'free', 'library'], true, true);
