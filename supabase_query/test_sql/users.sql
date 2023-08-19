create table app_users (
    auth_id int,
    app_user_id text unique,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    name text not null default ''::text,
    profile text default ''::text,
    icon_url text,
    is_active boolean,

    primary key (auth_id),
    unique(app_user_id)
);



INSERT INTO app_users (auth_id, app_user_id, created_at, updated_at, name, profile, icon_url, is_active)
VALUES
    (1, 'user1', now(), now(), 'User 1', 'Profile 1', 'https://example.com/icon1.jpg', true),
    (2, 'user2', now(), now(), 'User 2', 'Profile 2', 'https://example.com/icon2.jpg', true),
    (3, 'user3', now(), now(), 'User 3', 'Profile 3', 'https://example.com/icon3.jpg', true),
    (4, 'user4', now(), now(), 'User 4', 'Profile 4', 'https://example.com/icon4.jpg', true),
    (5, 'user5', now(), now(), 'User 5', 'Profile 5', 'https://example.com/icon5.jpg', true),
    (6, 'user6', now(), now(), 'User 6', 'Profile 6', 'https://example.com/icon6.jpg', true),
    (7, 'user7', now(), now(), 'User 7', 'Profile 7', 'https://example.com/icon7.jpg', true),
    (8, 'user8', now(), now(), 'User 8', 'Profile 8', 'https://example.com/icon8.jpg', true),
    (9, 'user9', now(), now(), 'User 9', 'Profile 9', 'https://example.com/icon9.jpg', true),
    (10, 'user10', now(), now(), 'User 10', 'Profile 10', 'https://example.com/icon10.jpg', true);
