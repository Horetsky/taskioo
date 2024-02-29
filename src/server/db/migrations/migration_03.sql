CREATE TABLE list (
    id uuid DEFAULT gen_random_uuid(),
    title varchar(100) NOT NULL,
    subtitle varchar(255),

    owner_id uuid NOT NULL,
    area_id uuid NOT NULL,
    team_id uuid,

    CONSTRAINT PK_list_id PRIMARY KEY (id),

    CONSTRAINT FK_list_owner_id FOREIGN KEY (owner_id) REFERENCES "profile"(id),
    CONSTRAINT FK_list_area_id FOREIGN KEY (area_id) REFERENCES "area"(id),
    CONSTRAINT FK_list_team_id FOREIGN KEY (team_id) REFERENCES "team"(id)
);


CREATE type priority AS ENUM ('LOWEST', 'LOW', 'MEDIUM', 'HIGH', 'HIGHEST');

CREATE TABLE task (
    id uuid DEFAULT gen_random_uuid(),
    title varchar(100) NOT NULL,
    description text,
    priority priority DEFAULT 'MEDIUM',
    creator_id uuid NOT NULL,
    assignee_id uuid,
    list_id uuid,

    createdAt TIMESTAMP DEFAULT NOW(),
    deadline TIMESTAMP,

    CONSTRAINT PK_task_id PRIMARY KEY (id),

    CONSTRAINT FK_task_creator_id FOREIGN KEY (creator_id) REFERENCES "profile"(id),
    CONSTRAINT FK_task_assignee_id FOREIGN KEY (assignee_id) REFERENCES "profile"(id),
    CONSTRAINT FK_task_list_id FOREIGN KEY (list_id) REFERENCES "list"(id)
)