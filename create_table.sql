CREATE TABLE test_db.`user` (
	id INT auto_increment NOT NULL,
	username varchar(100) NOT NULL,
	password varchar(100) NOT NULL,
	created_at DATETIME DEFAULT CURRENT_TIMESTAMP NULL,
	CONSTRAINT user_pk PRIMARY KEY (id)
)
ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_general_ci;
