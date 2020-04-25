# Benchmark

## Description
- Language: Python 3 (*.py)
- Framework: Django 3
- Template Engine: Django Model View Template class using HTML pages (*.html)
- Database: MySQL

## Scripts
Create migration script with:
```sh
$ python3 manage.py makemigration <app_name>
```

Run migration script with:
```sh
$ python3 manage.py migrate
```

Run rollback script with:
```sh
$ python3 manage.py migrate <app_name> <version_name or zero>
```

Run server with:
```sh
$ python3 manage.py runserver 3000
```