# digitech-website-2022
An interactive map of John McGlashan College, made for NCEA Web Design and Development Standards 91891, 91893 and 91897.
<!-- Insert an image preview here when project is finished -->

# Setup 
## Setting up MySQL 
1. Download and install [MySQL Community Server](https://dev.mysql.com/downloads/mysql/).
2. Log in to MySQL (`mysql -u root -p` or `sudo mysql`, depending on your system).
3. Set up a user with the neccessary permissions. This user will be used by the webapp to connect to the database.
```sql
CREATE USER 'joebloggs'@'localhost' IDENTIFIED BY 'password';
GRANT CREATE, ALTER, DROP, INSERT, UPDATE, DELETE, SELECT, REFERENCES, RELOAD on *.* TO 'joebloggs'@'localhost' WITH GRANT OPTION;
```
4. Load the example database. 
```sql
CREATE DATABASE classroom_db;
```
*Exit mysql and run this in your shell.*
```shell
mysql -u USERNAME -p classroom_db < mysql/classroom_db_dump.sql
```

## Setting up the webapp
1. Install all required packages with `pip install -r requirements.txt`. It is reccomended that you do this in a [virtual environment](https://www.dataquest.io/blog/a-complete-guide-to-python-virtual-environments/).
2. Run `setup.py` to set both the webapp username & password (for the admin panel), and the MySQL username & password that you set up in the first section.
3. You can now run the webapp with `flask run`. Keep in mind that this is a development server, and you should not use it in a production deployment. For more information on deploying, read the [flask deployment instructions](https://flask.palletsprojects.com/en/2.2.x/deploying/).

# Licensing
The source code of this project (excluding external packages and software) is licensed under the GNU GPL v3.0 license.