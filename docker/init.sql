CREATE TABLE IF NOT EXISTS sport_events (
  event_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_name TEXT,
  odds NUMERIC
);

INSERT INTO sport_events VALUES (gen_random_uuid(), 'Soccer: Team A vs. Team B', 1.75);
INSERT INTO sport_events VALUES (gen_random_uuid(), 'Soccer: Team C vs. Team D', 1.75);
INSERT INTO sport_events VALUES (gen_random_uuid(), 'Soccer: Team E vs. Team F', 1.75);
INSERT INTO sport_events VALUES (gen_random_uuid(), 'Soccer: Team G vs. Team H', 1.75);
INSERT INTO sport_events VALUES (gen_random_uuid(), 'Soccer: Team I vs. Team J', 1.75);