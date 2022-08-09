create table users
(
  id integer primary key generated always as identity,
  email varchar(255) unique not null,
  name varchar(255) not null,
  surname varchar(255) not null,
  password_hash varchar(255) not null,
  avatar varchar(50)
);

create table articles
(
  id integer primary key generated always as identity,
  title varchar(255) not null,
  announce varchar(255) not null,
  fulltext varchar(1000),
  date timestamp default current_timestamp,
  picture varchar(50),
  user_id integer not null,
  foreign key (user_id) references users(id)
 );

create table comments
(
  id integer primary key generated always as identity,
  text text not null,
  date timestamp default current_timestamp,
  user_id integer not null,
  article_id integer not null,
  foreign key (user_id) references users(id),
  foreign key (article_id) references articles(id)
);

create table categories
(
  id integer primary key generated always as identity,
  name varchar(255) not null
);

create table articles_categories
(
  article_id integer not null,
  category_id integer not null,
  primary key (article_id, category_id),
  foreign key (article_id) references articles(id),
  foreign key (category_id) references categories(id)
);

