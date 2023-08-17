-- postIDが一致するいいねの数を数える
-- postIDが一致するだまされた数を数える

create view post_view as
select
  posts.id,
  posts.auth_id,
  posts.created_at,
  posts.content,
  posts.is_lie,
  count(likes.post_id) as likes_num,
  count(val_lies.post_id) as val_lie_num
from posts
left join likes on posts.id = likes.post_id
left join val_lies on posts.id = val_lies.post_id
group by posts.id;