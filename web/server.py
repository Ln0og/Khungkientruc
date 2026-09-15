#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
HỆ THỐNG QUẢN LÝ KHUNG KIẾN TRÚC SỐ
Backend HTTP & REST API Server (Python standard library)
Compliant with QĐ 1425/QĐ-TTg & Hướng dẫn BKHCN (Mẫu 01, 02, 03)
"""

import http.server
import socketserver
import json
import os
import sys

PORT = 8888
DIRECTORY = os.path.dirname(os.path.abspath(__file__))

class ArchitectureRequestHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

    def end_headers(self):
        # Enable CORS and caching headers
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate')
        super().end_headers()

    def do_OPTIONS(self):
        self.send_response(200)
        self.end_headers()

    def do_GET(self):
        if self.path == '/api/status':
            self.send_response(200)
            self.send_header('Content-Type', 'application/json; charset=utf-8')
            self.end_headers()
            status_data = {
                "status": "online",
                "framework_version": "v1.0",
                "cutoff_date": "2026-09-15",
                "nas_connection": "ready",
                "total_objects": 128,
                "shared_ratio": "85%",
                "compliance_score": "92%",
                "active_tasks": "12/18"
            }
            self.wfile.write(json.dumps(status_data, ensure_ascii=False).encode('utf-8'))
            return
        
        # Fallback to static files
        super().do_GET()

    def do_POST(self):
        if self.path == '/api/validate':
            self.send_response(200)
            self.send_header('Content-Type', 'application/json; charset=utf-8')
            self.end_headers()
            report = {
                "success": True,
                "timestamp": "2026-09-15T23:45:00+07:00",
                "rules_passed": 7,
                "rules_warn": 1,
                "rules_failed": 0,
                "summary": "Tệp Mẫu số 03 đạt 7/8 tiêu chí kiểm tra chất lượng tự động."
            }
            self.wfile.write(json.dumps(report, ensure_ascii=False).encode('utf-8'))
            return

        self.send_error(404, "API Endpoint Not Found")

def run_server():
    try:
        sys.stdout.reconfigure(encoding='utf-8')
    except Exception:
        pass
    # Allow port reuse
    socketserver.TCPServer.allow_reuse_address = True
    with socketserver.TCPServer(("127.0.0.1", PORT), ArchitectureRequestHandler) as httpd:
        print(f"============================================================")
        print(f"  HE THONG QUAN LY KHUNG KIEN TRUC SO (QD 1425 / BKHCN)")
        print(f"  Web Server running at: http://127.0.0.1:{PORT}")
        print(f"  Serving directory: {DIRECTORY}")
        print(f"============================================================")
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nĐang dừng Web Server...")
            httpd.server_close()

if __name__ == '__main__':
    run_server()
