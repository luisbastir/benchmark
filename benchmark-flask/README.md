# Flask
This is build with Flask in Python 3

## Scripts
Run with:
```sh
$ python3 runserver.py
```


## Sections
Sections defined by server configuration and methods

### routing.js
Paths:
- /hello - Simple text response
- /hello/json - Simple JSON response
- /hello/html - Simple static HTML response
- /hello/html/:msg - Simple HTML response with dynamic content
- /hello/msg/:msg - Simple text response with a simple variable path
- /hello/query?msg - Simple text response with a simple query
- /badrequest - Simple text response with a status code of 400 (bad request)
- /list - Simple text response with 5000 string iterations