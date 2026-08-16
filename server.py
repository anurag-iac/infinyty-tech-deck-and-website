import http.server
import socketserver
import os

PORT = 3000

class CleanUrlHandler(http.server.SimpleHTTPRequestHandler):
    def do_GET(self):
        # Strip query strings and hashes
        raw_path = self.path.split('?')[0].split('#')[0].strip('/')
        
        # If requested root path, serve index.html
        if not raw_path:
            self.path = '/index.html'
            return super().do_GET()
            
        # If path matches a root HTML file (e.g., demos -> demos.html, careers -> careers.html)
        html_candidate = raw_path + '.html'
        if os.path.exists(html_candidate):
            index_in_dir = os.path.join(raw_path, 'index.html')
            if not os.path.exists(raw_path) or not os.path.exists(index_in_dir):
                query = ''
                if '?' in self.path:
                    query = '?' + self.path.split('?')[1]
                self.path = '/' + html_candidate + query
                return super().do_GET()
                
        # If path doesn't exist, try adding .html
        if not os.path.exists(raw_path) and not raw_path.endswith('.html'):
            if os.path.exists(raw_path + '.html'):
                query = ''
                if '?' in self.path:
                    query = '?' + self.path.split('?')[1]
                self.path = '/' + raw_path + '.html' + query
                return super().do_GET()
                
        return super().do_GET()

class ThreadingHTTPServer(socketserver.ThreadingMixIn, http.server.HTTPServer):
    daemon_threads = True

if __name__ == '__main__':
    socketserver.TCPServer.allow_reuse_address = True
    server_address = ('', PORT)
    httpd = ThreadingHTTPServer(server_address, CleanUrlHandler)
    print(f"Serving Infinyty website & pitch deck at http://localhost:{PORT}")
    httpd.serve_forever()
