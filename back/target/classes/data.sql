

INSERT INTO category(name) VALUES ('Eurogames');
INSERT INTO category(name) VALUES ('Ameritrash');
INSERT INTO category(name) VALUES ('Familiar');


INSERT INTO author(name, nationality) VALUES ('Alan R. Moon', 'US');
INSERT INTO author(name, nationality) VALUES ('Vital Lacerda', 'PT');
INSERT INTO author(name, nationality) VALUES ('Simone Luciani', 'IT');
INSERT INTO author(name, nationality) VALUES ('Perepau Llistosella', 'ES');
INSERT INTO author(name, nationality) VALUES ('Michael Kiesling', 'DE');
INSERT INTO author(name, nationality) VALUES ('Phil Walker-Harding', 'US');

INSERT INTO game(title, age, category_id, author_id) VALUES ('On Mars', '14', 1, 2);
INSERT INTO game(title, age, category_id, author_id) VALUES ('Aventureros al tren', '8', 3, 1);
INSERT INTO game(title, age, category_id, author_id) VALUES ('1920: Wall Street', '12', 1, 4);
INSERT INTO game(title, age, category_id, author_id) VALUES ('Barrage', '14', 1, 3);
INSERT INTO game(title, age, category_id, author_id) VALUES ('Los viajes de Marco Polo', '12', 1, 3);
INSERT INTO game(title, age, category_id, author_id) VALUES ('Azul', '8', 3, 5);

INSERT INTO client(name) VALUES ('Bellaco');
INSERT INTO client(name) VALUES ('Visko');
INSERT INTO client(name) VALUES ('Amanda');
INSERT INTO client(name) VALUES ('Roller');
INSERT INTO client(name) VALUES ('Tabata');
INSERT INTO client(name) VALUES ('TeamElectra' );
INSERT INTO client(name) VALUES ('GuerraLimpia') ;
INSERT INTO client(name) VALUES ('Malakita' );

ALTER TABLE loan DROP CONSTRAINT UKb8hjt9f0vfof52xait5x649l0;
ALTER TABLE loan ADD CONSTRAINT unique_game_date UNIQUE (game_id, date1, date2);
INSERT INTO loan(game_id, client_id, date1, date2) VALUES (1,2,'2025-01-06', '2025-01-16');
INSERT INTO loan(game_id, client_id, date1, date2) VALUES (2,2,'2025-01-06', '2025-01-16');
INSERT INTO loan(game_id, client_id, date1, date2) VALUES (3,1,'2025-01-07', '2025-01-17');
INSERT INTO loan(game_id, client_id, date1, date2) VALUES (4,3,'2025-01-06', '2025-01-16');
INSERT INTO loan(game_id, client_id, date1, date2) VALUES (5,6,'2025-01-06', '2025-01-16');

