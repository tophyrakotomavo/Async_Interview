DO $$ BEGIN
 CREATE TYPE "UserRole" AS ENUM('admin', 'recruiter', 'candidate');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
