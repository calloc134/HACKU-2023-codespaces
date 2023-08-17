create table val_lies (
  id bigint generated by default as identity, 
  auth_id uuid references auth.users default auth.uid() not null,
  post_id bigint references posts not null,

  primary key (id)
);

alter table val_lies enable row level security;

create policy "Public val_lies are viewable by everyone." on val_lies for
    select using (true);

create policy "Individuals can create val_lies." on
val_lies for
    insert with check (auth.uid() = auth_id);

create policy "Individuals can update their own val_lies." on val_lies for
    update using (auth.uid() = auth_id);

create policy "Individuals can delete their own val_lies." on val_lies for
    delete using (auth.uid() = auth_id);