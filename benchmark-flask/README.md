# Benchmark

## Description
- Language: Python 3 (*.py)
- Framework: Flask
- Template Engine: Flaskr package using HTML pages (*.html)
- Database: MySQL

## Scripts
Create migration scripts with:
```sh
## Only first time
$ python3 migration.py db init

## then
$ python3 migration.py db migrate
```

Run migration script with:
```sh
$ python3 migration.py db upgrade
```

Run rollback script with:
```sh
$ python3 migration.py db downgrade
```

Run server with:
```sh
$ python3 server.py
```
