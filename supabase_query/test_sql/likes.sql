create table likes ( 
    auth_id int references app_users,
    post_id bigint references posts not null,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    is_active boolean,

    primary key (auth_id, post_id)
);

INSERT INTO likes (auth_id, post_id, created_at, updated_at, is_active)
VALUES
    (1, 1, now(), now(), true),
    (2, 1, now(), now(), true),
    (3, 1, now(), now(), true),
    (4, 2, now(), now(), true),
    (5, 2, now(), now(), true),
    (6, 3, now(), now(), true),
    (7, 3, now(), now(), true),
    (8, 4, now(), now(), true),
    (9, 4, now(), now(), true),
    (10, 4, now(), now(), true),
    (1, 5, now(), now(), true),
    (2, 5, now(), now(), true),
    (3, 5, now(), now(), true),
    (4, 6, now(), now(), true),
    (5, 6, now(), now(), true),
    (6, 6, now(), now(), true),
    (7, 7, now(), now(), true),
    (8, 7, now(), now(), true),
    (9, 8, now(), now(), true),
    (10, 8, now(), now(), true);

INSERT INTO likes (auth_id, post_id, created_at, updated_at, is_active)
VALUES
    (1, 2, now(), now(), true);


create table val_lies (
    auth_id uuid references auth.users default auth.uid() not null,
    post_id bigint references posts not null,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    is_active boolean,

    primary key (auth_id, post_id)
);
