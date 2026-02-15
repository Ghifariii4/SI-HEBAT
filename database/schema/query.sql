--extension (WAJIB)
                                         
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

                                         
--ROLES
                                         
CREATE TABLE roles (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) UNIQUE NOT NULL
);

INSERT INTO roles (name) VALUES
('admin'),
('siswa'),
('guru'),
('orang_tua');

                                         
--USERS
                                         
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    role_id INT REFERENCES roles(id),
    nis VARCHAR(30) UNIQUE,
    nip VARCHAR(30) UNIQUE,
    full_name VARCHAR(150) NOT NULL,
    email VARCHAR(150) UNIQUE,
    password_hash TEXT NOT NULL,
    religion VARCHAR(50),
    class_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


--index penting:

CREATE INDEX idx_users_nis ON users(nis);
CREATE INDEX idx_users_role ON users(role_id);

                                         
--CLASSES
                                         
CREATE TABLE classes (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    grade INT NOT NULL,
    homeroom_teacher_id UUID REFERENCES users(id)
);


--relasi parent-siswa:

CREATE TABLE parent_student (
    id SERIAL PRIMARY KEY,
    parent_id UUID REFERENCES users(id) ON DELETE CASCADE,
    student_id UUID REFERENCES users(id) ON DELETE CASCADE
);

                                         
--HABITS MASTER
                                         
CREATE TABLE habits (
    id SERIAL PRIMARY KEY,
    code VARCHAR(50) UNIQUE NOT NULL,
    name VARCHAR(100) NOT NULL,
    max_star INT DEFAULT 1
);

INSERT INTO habits (code, name) VALUES
('bangun_pagi', 'Bangun Pagi'),
('ibadah', 'Beribadah'),
('olahraga', 'Olahraga'),
('makan_sehat', 'Makan Sehat'),
('belajar', 'Gemar Belajar'),
('sosial', 'Sosial'),
('tidur', 'Tidur Cepat');

                                         
--HABIT LOG (INTI SISTEM)
                                         
CREATE TABLE habit_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    habit_id INT REFERENCES habits(id),
    log_date DATE NOT NULL,
    base_xp INT DEFAULT 0,
    bonus_xp INT DEFAULT 0,
    coin_earned INT DEFAULT 0,
    star_earned INT DEFAULT 0,
    status VARCHAR(20) DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, habit_id, log_date)
);


--index penting:

CREATE INDEX idx_habit_logs_user ON habit_logs(user_id);
CREATE INDEX idx_habit_logs_date ON habit_logs(log_date);
CREATE INDEX idx_habit_logs_user_date ON habit_logs(user_id, log_date);

                                         
--HABIT DETAIL (FLEKSIBEL KEY VALUE)
                                         
CREATE TABLE habit_log_details (
    id SERIAL PRIMARY KEY,
    habit_log_id UUID REFERENCES habit_logs(id) ON DELETE CASCADE,
    key VARCHAR(100),
    value TEXT
);

                                         
--XP LEDGER
                                         
CREATE TABLE xp_ledger (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    source_type VARCHAR(50),
    source_id UUID,
    amount INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_xp_user ON xp_ledger(user_id);

                                         
--COIN LEDGER
                                         
CREATE TABLE coin_ledger (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    source_type VARCHAR(50),
    source_id UUID,
    amount INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_coin_user ON coin_ledger(user_id);

                                         
--  USER SUMMARY (CACHE TABLE)
                                         
CREATE TABLE user_stats (
    user_id UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
    total_xp BIGINT DEFAULT 0,
    total_coin BIGINT DEFAULT 0,
    current_level INT DEFAULT 1,
    current_rank VARCHAR(50),
    current_star INT DEFAULT 0,
    current_streak INT DEFAULT 0,
    longest_streak INT DEFAULT 0,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

                                         
--SEASON SYSTEM
                                         
CREATE TABLE seasons (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    start_date DATE,
    end_date DATE,
    is_active BOOLEAN DEFAULT FALSE
);


--rank per season:

CREATE TABLE season_ranks (
    id SERIAL PRIMARY KEY,
    season_id INT REFERENCES seasons(id) ON DELETE CASCADE,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    total_star INT DEFAULT 0,
    tier VARCHAR(50),
    division VARCHAR(10),
    UNIQUE(season_id, user_id)
);

CREATE INDEX idx_season_user ON season_ranks(season_id, user_id);

                                         
--STREAK TABLE
                                         
CREATE TABLE user_streaks (
    user_id UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
    current_streak INT DEFAULT 0,
    longest_streak INT DEFAULT 0,
    last_checkin_date DATE
);

                                         
--APPROVAL SYSTEM (ACC GURU)
                                         
CREATE TABLE approvals (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    habit_log_id UUID REFERENCES habit_logs(id) ON DELETE CASCADE,
    approved_by UUID REFERENCES users(id),
    status VARCHAR(20) NOT NULL,
    note TEXT,
    approved_at TIMESTAMP
);

CREATE INDEX idx_approval_log ON approvals(habit_log_id);

                                         
--MAILBOX
                                         
CREATE TABLE messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    from_user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    to_user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(200),
    body TEXT,
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_message_to_user ON messages(to_user_id);