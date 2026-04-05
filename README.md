# Advanced Node.js Logger

Implementation of Winston with daily file rotation for logging in Node.js applications, featuring multi-level logging, daily rotation, and comprehensive request tracking.

[![Node.js](https://img.shields.io/badge/Node.js-Backend-339933?style=flat-square&logo=node.js&logoColor=white)](#)
[![Winston](https://img.shields.io/badge/Winston-Logger-231F20?style=flat-square&logo=winston&logoColor=white)](#)
[![MVC](https://img.shields.io/badge/Architecture-MVC-007ACC?style=flat-square)](#)

## Features

- **Three-tier logging system:**
  - Access logs (L1) — Basic request/response information
  - Detail logs (L2) — Comprehensive debug information
  - Error logs (L3) — Error tracking with stack traces
- **Daily log rotation** with 200MB file size limit, 14-day retention, and automatic compression
- **Request Tracking** — Method, URL, response time, status code, and IP address logging
- **Error Handling** — Stack trace capture, request context preservation, and detailed error metadata
- **Security** — Automatic directory creation, safe file rotation, and error protection

## Installation

```bash
npm install winston winston-daily-rotate-file node-cron
```

## Usage

```javascript
const logger = require('./path/to/logger');
const express = require('express');
const app = express();

app.use(logger.requestLogger);  // Apply logger middleware
app.use(logger.errorHandler);   // Error handling
```

## Log Levels

| Level | Code | Description |
| :--- | :---: | :--- |
| Emergency | 0 | System is unusable |
| Alert | 1 | Immediate action required |
| Critical | 2 | Critical conditions |
| Error | 3 | Error conditions |
| Warning | 4 | Warning conditions |
| Notice | 5 | Normal but significant condition |
| Info | 6 | Informational messages |
| Debug | 7 | Debug-level messages |

## File Structure

```
logs/
├── access/
│   └── DD-MM-YYYY-access.log
├── detail/
│   └── DD-MM-YYYY-detail.log
└── error/
    └── DD-MM-YYYY-error.log
```

## Configuration

Customize logging behavior by modifying the file rotation schedule (cron expression), file size limits, retention period, timestamp format, and log formats.

## Author

<div align="center">
  <p>Built and maintained by <a href="https://github.com/anusthan12">Anusthan Singh</a> · © 2025</p>
</div>
