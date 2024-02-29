CREATE TABLE team (
    id uuid DEFAULT gen_random_uuid(),
    title varchar(100),

    CONSTRAINT PK_team_id PRIMARY KEY (id)
);

CREATE TABLE team_role (
    role varchar(50),

    CONSTRAINT PK_team_role PRIMARY KEY (role)
);

CREATE TABLE team_member (
    id uuid DEFAULT gen_random_uuid(),
    team_id uuid NOT NULL,
    profile_id uuid NOT NULL,
    role varchar(50) NOT NULL,

    CONSTRAINT PK_team_member_id PRIMARY KEY (id),

    CONSTRAINT FK_team_member_team_id FOREIGN KEY (team_id) REFERENCES "team"(id) ON DELETE CASCADE,
    CONSTRAINT FK_team_member_profile_id FOREIGN KEY (profile_id) REFERENCES "profile"(id) ON DELETE CASCADE,
    CONSTRAINT FK_team_member_role FOREIGN KEY (role) REFERENCES "team_role"(role) ON DELETE SET DEFAULT
)