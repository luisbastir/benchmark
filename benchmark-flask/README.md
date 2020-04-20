# Benchmark

## Description
- Language: Python 3 (*.py)
- Framework: Flask
- Template Engine: Flaskr package using HTML pages (*.html)
- Database: MySQL

## Scripts
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