
create table app_users (
    id uuid references auth.users default auth.uid() not null,
    updated_at timestamp with time zone,
    user_id text unique default auth.uid() not null,
    name text not null,
    profile text,
    icon_url text,

    primary key (id),
    unique(user_id)

);

alter table app_users enable row level security;

create policy "Public app_users are viewable by everyone."
    on app_users for select
    using ( true );

create policy "Users can insert their own app_users."
    on app_users for insert
    with check ( auth.uid() = id );

create policy "Users can update own app_users."
    on app_users for update
    using ( auth.uid() = id );

-- Set up Realtime!
begin;
    drop publication if exists supabase_realtime;
    create publication supabase_realtime;
commit;
alter publication supabase_realtime add table app_users;

-- Set up Storage!
insert into storage.buckets (id, name)
values ('icons', 'icons');

create policy "Avatar images are publicly accessible."
    on storage.objects for select
    using ( bucket_id = 'icons' );

create policy "Anyone can upload an icon."
    on storage.objects for insert
    with check ( bucket_id = 'icons' );

-- トリガーとファンクションの設定
/**
 * Supabase Authでサインアップしたら自動でユーザーを作成するためのトリガー
 */
-- inserts a row into public.profiles
create function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.app_users (id)
  values (new.id);
  return new;
end;
$$;

-- trigger the function every time a user is created
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();