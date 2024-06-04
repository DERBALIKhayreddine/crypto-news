create table appuser(
    id int primary key AUTO_INCREMENT,
    name varchar(250),
    email varchar(50),
    password varchar(250),
    status varchar(20),
    isDeletable varchar(20),
    UNIQUE(email)
);
insert into appuser(name, email, password, status, isDeletable) values('admin', 'admin@gmail.com', 'admin', 'true', 'false');

CREATE TABLE category (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(250)
);

create TABLE article(
    id int primary key AUTO_INCREMENT,
    title varchar(250),
    content LONGTEXT not null,
    category_id integer not null,
    publication_date date ,
    status varchar(20),
    FOREIGN KEY (category_id) REFERENCES category(id)
);

