import http.server
import socketserver
import webbrowser
import os

# Set the port
PORT = 8000

# Create handler
Handler = http.server.SimpleHTTPRequestHandler

# Create server
with socketserver.TCPServer(("", PORT), Handler) as httpd:
    print(f"Serving at http://localhost:{PORT}")
    # Open the website in the default browser
    webbrowser.open(f'http://localhost:{PORT}')
    # Start the server
    httpd.serve_forever() 