
CREATE OR REPLACE FUNCTION get_posts(my_auth_id uuid)
RETURNS TABLE (
    post_id bigint,
    auth_id uuid,
    content text,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    is_active boolean,
    is_lie boolean,
    name TEXT,
    app_user_id text,
    likes_num bigINT,
    liked BOOLEAN,
    val_lies_num bigint,
    val_lied boolean
) AS $$
BEGIN
    RETURN QUERY
    SELECT posts.post_id,
            posts.auth_id,
            posts.content,
            posts.created_at,
            posts.updated_at,
            posts.is_active,
            posts.is_lie,
           app_users.name,
           app_users.app_user_id,
           (
               SELECT COUNT(*) 
               FROM likes l 
               WHERE l.post_id = posts.post_id
           ) AS likes_num,
           CASE 
               WHEN likes.auth_id IS NOT NULL 
               THEN true 
               ELSE false 
           END AS liked,
           (
               SELECT COUNT(*) 
               FROM val_lies v
               WHERE v.post_id = posts.post_id
           ) AS val_lies_num,
           CASE 
               WHEN val_lies.auth_id IS NOT NULL 
               THEN true 
               ELSE false 
           END AS val_lied
    FROM posts
    LEFT JOIN likes 
        ON posts.post_id = likes.post_id 
        AND likes.auth_id = my_auth_id
    LEFT JOIN val_lies 
        ON posts.post_id = val_lies.post_id 
        AND val_lies.auth_id = my_auth_id
    JOIN app_users ON posts.auth_id = app_users.auth_id;
END;
$$ LANGUAGE plpgsql;
