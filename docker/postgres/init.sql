-- PostgreSQL initialization script for Synexian Labs
-- This script runs when the container is first created

-- Create extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "citext";

-- Set timezone
SET timezone = 'UTC';

-- Create additional indexes for performance (will be created by Drizzle migrations)
-- This file is mainly for any custom database setup needed

-- Grant permissions
GRANT ALL PRIVILEGES ON DATABASE synexian TO synexian;

-- Log initialization
\echo 'PostgreSQL database initialized for Synexian Labs'