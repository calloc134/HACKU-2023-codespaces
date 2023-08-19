-- postIDが一致するいいねの数を数える
-- postIDが一致するだまされた数を数える
-- app_usersとauth_idが一致する条件で結合する


-- create view posts_view as
-- SELECT
--   posts.post_id,
--   posts.auth_id,
--   app_users.name,
--   app_users.app_user_id,
--   posts.created_at,
--   posts.updated_at,
--   posts.is_active,
--   posts.content,
--   posts.is_lie,
--   COUNT(likes.post_id) AS likes_num
-- FROM posts
-- LEFT JOIN app_users ON posts.auth_id = app_users.auth_id
-- LEFT JOIN likes ON posts.post_id = likes.post_id
-- GROUP BY posts.post_id, posts.auth_id, app_users.name, app_users.app_user_id, posts.created_at, posts.updated_at, posts.is_active, posts.content, posts.is_lie;

CREATE VIEW posts_view AS
SELECT 
    p.*,
    u.name,
    u.app_user_id,
    (
        SELECT COUNT(*) 
        FROM likes l 
        WHERE l.post_id = p.post_id
    ) AS likes_num,
    (
        SELECT COUNT(*) 
        FROM likes l 
        WHERE l.post_id = p.post_id 
        AND l.auth_id = p.auth_id
    ) AS auth_likes,
    (
        SELECT COUNT(*) 
        FROM val_lies v 
        WHERE v.post_id = p.post_id
    ) AS val_lies_num,
    (
        SELECT COUNT(*) 
        FROM val_lies v 
        WHERE v.post_id = p.post_id 
        AND v.auth_id = p.auth_id
    ) AS auth_val_lies

FROM posts p
JOIN app_users u ON p.auth_id = u.auth_id;
