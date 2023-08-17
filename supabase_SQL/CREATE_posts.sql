create table posts (
  id bigint generated by default as identity, 
  auth_id uuid references auth.users default auth.uid() not null,
  created_at timestamp with time zone,
  content text check (char_length(content) < 200),
  is_lie boolean,

  primary key (id)
);

--  default timezone('utc'::text, now()) not null これなんぞ
-- is_lieは、嘘かどうかを判定するためのフラグです。嘘の場合はtrue、本当の場合はfalseです。
-- 変更する可能性が非常に大きい，嘘かどうかの2値だけではなくパラメータを格納すると思う

alter table posts enable row level security;

create policy "Individuals can create posts." on 
posts for
    insert with check (auth.uid() = auth_id);

create policy "Public posts are viewable by everyone." on posts for
    select using (true);

create policy "Individuals can update their own posts." on posts for
    update using (auth.uid() = auth_id);

create policy "Individuals can delete their own posts." on posts for
    delete using (auth.uid() = auth_id);