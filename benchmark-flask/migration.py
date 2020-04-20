from flask import Flask
from flask_migrate import Migrate, MigrateCommand
from flask_script import Manager
from BenchmarkFlask import app, db

if __name__ == '__main__':
  import os
  HOST = os.environ.get('SERVER_HOST', 'localhost')

  migrate = Migrate(app, db)
  manager = Manager(app)
  manager.add_command("db", MigrateCommand)
  manager.run()