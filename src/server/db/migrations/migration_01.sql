CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE "user" (
    id uuid DEFAULT gen_random_uuid(),
    email varchar(100) NOT NULL UNIQUE,
    password varchar(255),

    CONSTRAINT PK_user_id PRIMARY KEY (id)
);

CREATE TABLE area (
    id uuid DEFAULT gen_random_uuid(),
    title varchar(100) NOT NULL,
    user_id uuid NOT NULL,

    CONSTRAINT PK_area_id PRIMARY KEY (id),
    CONSTRAINT FK_area_user FOREIGN KEY (user_id) REFERENCES "user"(id) ON DELETE CASCADE
);

CREATE TABLE profile (
    id uuid DEFAULT gen_random_uuid(),
    name varchar(100) NOT NULL,
    surname varchar(100) NOT NULL,
    avatar varchar(255),
    user_id uuid NOT NULL,

    CONSTRAINT PK_profile_id PRIMARY KEY (id),
    CONSTRAINT FK_profile_user FOREIGN KEY (user_id) REFERENCES "user"(id) ON DELETE CASCADE
);