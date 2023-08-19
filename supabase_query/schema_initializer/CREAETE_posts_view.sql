-- postIDが一致するいいねの数を数える
-- postIDが一致するだまされた数を数える
-- app_usersとauth_idが一致する条件で結合する


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
        FROM val_lies v 
        WHERE v.post_id = p.post_id
    ) AS val_lies_num

FROM posts p
JOIN app_users u ON p.auth_id = u.auth_id;
