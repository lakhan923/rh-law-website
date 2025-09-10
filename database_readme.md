# To run maria DB
sudo /opt/lampp/lampp start
/opt/lampp/bin$ ./mysql -u root -p

# To start XAMPP
sudo /opt/lampp/lampp start

# To stop XAMPP
sudo /opt/lampp/lampp stop

# To start your backend server 
rh-law-website/database_rh_law$ node server.js

# TO STOP ALREADY RUNNING APACHE
sudo systemctl stop apache2

# To run project simply
npm start

# To make new database
mkdir database_rh_law
cd database_rh_law
npm init -y
npm install express cors body-parser mysql2 dotenv


# Create a .env file in /database_rh_law:
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=law_firm
PORT=5000
ADMIN_USERNAME=admin
ADMIN_PASSWORD=


CREATE DATABASE law_firm;
USE law_firm;

# Contact Messages Table
CREATE TABLE contact_messages (
id INT AUTO_INCREMENT PRIMARY KEY,
name VARCHAR(100) NOT NULL,
email VARCHAR(150) NOT NULL,
message TEXT NOT NULL,
submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

# Appointments Table
CREATE TABLE appointments (
id INT AUTO_INCREMENT PRIMARY KEY,
name VARCHAR(100) NOT NULL,
email VARCHAR(150) NOT NULL,
phone VARCHAR(20) NOT NULL,
preferred_date DATE NOT NULL,
preferred_time TIME NOT NULL,
additional_info TEXT,
submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

# feedback Table
CREATE TABLE feedback (
id INT AUTO_INCREMENT PRIMARY KEY,
name VARCHAR(100) NOT NULL,
email VARCHAR(150) NOT NULL,
feedback TEXT NOT NULL,
submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
