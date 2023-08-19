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
