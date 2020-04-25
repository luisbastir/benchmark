# Benchmark

## Description
- Language: Ruby (*.rb)
- Framework: Rails
- Template Engine: Embedded Ruby (*.html.erb)
- Database: MySQL

## Scripts
Install dependencies with:
```sh
$ bundle install
```

Create migration scripts with:
```sh
$ rails generate migration <CustomRubyClassName>
```

Run migration script with:
```sh
$ rails db:migrate
```

Run rollback script with:
```sh
$ rails db:rollback
```

Run server with:
```sh
$ rails s
```
