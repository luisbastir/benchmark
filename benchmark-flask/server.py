from flask import Flask
from BenchmarkFlask import app

if __name__ == '__main__':
  import os
  HOST = os.environ.get('SERVER_HOST', 'localhost')
  try:
    PORT = int(os.environ.get('SERVER_PORT', '3000'))
  except ValueError:
    PORT = 3000
  app.run(HOST, PORT)