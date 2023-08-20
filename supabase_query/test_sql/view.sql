SELECT 
    p.*,
    u.name,
    u.app_user_id,
    (
        SELECT COUNT(*) 
        FROM likes l 
        WHERE l.post_id = p.post_id
    ) AS total_likes,
    (
        SELECT COUNT(*) 
        FROM likes l 
        WHERE l.post_id = p.post_id 
        AND l.auth_id = p.auth_id
    ) AS auth_likes
    (
        SELECT COUNT(*) 
        FROM val_lies v 
        WHERE v.post_id = p.post_id
    ) AS total_val_lies,
    (
        SELECT COUNT(*) 
        FROM val_lies v 
        WHERE v.post_id = p.post_id 
        AND v.auth_id = p.auth_id
    ) AS auth_val_lies

FROM posts p
JOIN app_users u ON p.auth_id = u.auth_id;




-----------------------------------


SELECT posts.*, 
    app_users.name,
    app_users.app_user_id,
    (
        SELECT COUNT(*) 
        FROM likes l 
        WHERE l.post_id = p.post_id
    ) AS total_likes,
    CASE 
        WHEN likes.auth_id IS NOT NULL 
        THEN true 
        ELSE false 
    END AS liked
FROM posts
LEFT JOIN likes ON posts.post_id = likes.post_id AND likes.auth_id = :my_user_id
JOIN app_users ON posts.auth_id = app_users.auth_id;

---------------------------


CREATE OR REPLACE FUNCTION get_posts(my_user_id INT)
RETURNS TABLE (
    post_id INT,
    name TEXT,
    app_user_id INT,
    likes_num INT,
    liked BOOLEAN
) AS $$
BEGIN
    RETURN QUERY
    SELECT posts.post_id,
           app_users.name,
           app_users.app_user_id,
           (
               SELECT COUNT(*) 
               FROM likes l 
               WHERE l.post_id = posts.post_id
           ) AS total_likes,
           CASE 
               WHEN likes.auth_id IS NOT NULL 
               THEN true 
               ELSE false 
           END AS liked
    FROM posts
    LEFT JOIN likes ON posts.post_id = likes.post_id AND likes.auth_id = my_user_id
    JOIN app_users ON posts.auth_id = app_users.auth_id;
END;
$$ LANGUAGE plpgsql;
