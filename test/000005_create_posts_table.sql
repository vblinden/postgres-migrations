create table posts (
  id serial primary key,
  user_id integer,

  title varchar,
  content text,

  updated_at timestamp,
  created_at timestamp,

  constraint fk_posts_users
    foreign key (user_id)
    references users (id)
)
