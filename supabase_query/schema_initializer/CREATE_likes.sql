create table likes (
    auth_id uuid references auth.users default auth.uid() not null,
    post_id bigint references posts not null,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    is_active boolean,

    primary key (auth_id, post_id)
);

alter table likes enable row level security;

create policy "Public likes are viewable by everyone." on likes for
    select using (true);

create policy "Individuals can create likes." on 
likes for
    insert with check (auth.uid() = auth_id);

create policy "Individuals can update their own likes." on likes for
    update using (auth.uid() = auth_id);

create policy "Individuals can delete their own likes." on likes for
    delete using (auth.uid() = auth_id);