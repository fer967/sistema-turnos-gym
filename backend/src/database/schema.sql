-- ==========================================
-- GYM BOOKING SYSTEM
-- Schema
-- ==========================================

CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ==========================
-- USERS
-- ==========================

CREATE TABLE gym_users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    phone VARCHAR(20),
    role VARCHAR(20) NOT NULL DEFAULT 'client',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ==========================
-- DISCIPLINES
-- ==========================

CREATE TABLE disciplines (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL UNIQUE,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ==========================
-- SCHEDULES
-- ==========================

CREATE TABLE schedules (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    discipline_id UUID NOT NULL REFERENCES disciplines(id) ON DELETE CASCADE,

    day_of_week SMALLINT NOT NULL CHECK (day_of_week BETWEEN 0 AND 6),

    start_time TIME NOT NULL,
    end_time TIME NOT NULL,

    capacity INTEGER NOT NULL CHECK (capacity > 0),

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ==========================
-- RESERVATIONS
-- ==========================

CREATE TABLE reservations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    user_id UUID NOT NULL REFERENCES gym_users(id) ON DELETE CASCADE,

    schedule_id UUID NOT NULL REFERENCES schedules(id) ON DELETE CASCADE,

    reservation_date DATE NOT NULL,

    status VARCHAR(20) NOT NULL DEFAULT 'reserved',

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ==========================
-- INDEXES
-- ==========================

CREATE INDEX idx_gym_users_email
ON gym_users(email);

CREATE INDEX idx_schedule_day
ON schedules(day_of_week);

CREATE INDEX idx_reservation_date
ON reservations(reservation_date);

CREATE INDEX idx_reservation_user
ON reservations(user_id);