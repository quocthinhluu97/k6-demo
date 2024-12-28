@echo off

set K6_ENV=development
set K6_WEB_DASHBOARD=true
set K6_WEB_DASHBOARD_OUTPUT=html-report.html
set K6_REPORTS_FOLDER=./reports/
set K6_TEST_FILE=tests/smoke.ts
set K6_PACKED_FILE=../dist/smoke
set K6_OUTPUT_STREAM=experimental-prometheus-rw
@REM set K6_OUTPUT_STREAM=json=output.json
set K6_COMPATIBILITY_MODE=experimental_enhanced

echo Set env variables successfully

