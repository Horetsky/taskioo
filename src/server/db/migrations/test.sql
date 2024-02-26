CREATE EXTENSION IF NOT EXISTS "uuid-ossp";


CREATE TABLE "user" (
    id uuid DEFAULT gen_random_uuid(),
    email varchar(100) NOT NULL,
    password varchar(255),

    CONSTRAINT PK_user_id PRIMARY KEY (id)
);
CREATE TABLE area (
    id uuid DEFAULT gen_random_uuid(),
    title varchar(100) NOT NULL,
    user_id uuid NOT NULL,

    CONSTRAINT FK_area_user FOREIGN KEY (user_id) REFERENCES "user"(id)
);