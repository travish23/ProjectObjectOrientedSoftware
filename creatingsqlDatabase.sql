


CREATE TABLE IF NOT EXISTS Users (
    name VARCHAR(255) NOT NULL,
  	password VARCHAR(255) DEFAULT NULL,
  	user_id INT(11) NOT NULL AUTO_INCREMENT,
	PRIMARY KEY user_id(user_id),
	UNIQUE KEY (name)
);




CREATE TABLE IF NOT EXISTS Contacts (
    contact_id INT(11) NOT NULL AUTO_INCREMENT,
    owner_id INT(11) NOT NULL,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) DEFAULT NULL,
    phone BIGINT(11) UNSIGNED DEFAULT NULL,
    address VARCHAR(255) DEFAULT NULL,
    PRIMARY KEY (contact_id),
 	FOREIGN KEY (owner_id) 
        REFERENCES users (user_id) 
        ON DELETE CASCADE 
        ON UPDATE CASCADE
);