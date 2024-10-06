@echo off
xk6 build ^
    --with github.com/grafana/xk6-faker@latest ^
    --with github.com/szkiba/xk6-dotenv@latest

echo build complete
