CREATE TABLE products(
k INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
name VARCHAR(100) NOT NULL,
num INT NOT NULL,
color VARCHAR(10),
type VARCHAR(50),
img TEXT,
kw VARCHAR(50),
detail VARCHAR(400),
price DOUBLE,
local VARCHAR(100),
freight DOUBLE,
brand VARCHAR(50),
comment VARCHAR(500),
vid VARCHAR(500),
time DATETIME,
pm VARCHAR(50)
);