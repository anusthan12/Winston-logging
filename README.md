# Advanced Node.js Logger

A robust logging system built with Winston for Node.js applications, featuring multi-level logging, daily rotation, and comprehensive request tracking.

## Features

- Three-tier logging system:
  - Access logs (L1): Basic request/response information
  - Detail logs (L2): Comprehensive debug information
  - Error logs (L3): Error tracking with stack traces

- Daily log rotation with:
  - 200MB file size limit
  - 14-day retention period
  - Automatic file compression

## Installation

```bash
npm install winston winston-daily-rotate-file node-cron
```

## Usage

```javascript
const logger = require('./path/to/logger');
const express = require('express');
const app = express();

// Apply logger middleware
app.use(logger.requestLogger);

// Error handling
app.use(logger.errorHandler);
```

## Log Levels

| Level     | Code | Description                       |
|-----------|------|-----------------------------------|
| Emergency | 0    | System is unusable                |
| Alert     | 1    | Immediate action required         |
| Critical  | 2    | Critical conditions               |
| Error     | 3    | Error conditions                  |
| Warning   | 4    | Warning conditions                |
| Notice    | 5    | Normal but significant condition  |
| Info      | 6    | Informational messages           |
| Debug     | 7    | Debug-level messages             |

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

Customize logging behavior by modifying:
- File rotation schedule in cron expression
- File size limits
- Retention period
- Timestamp format
- Log formats

## Features

### Request Tracking
- Method and URL logging
- Response time measurement
- Status code monitoring
- IP address logging

### Error Handling
- Stack trace capture
- Request context preservation
- Detailed error metadata

### Security
- Automatic directory creation
- Safe file rotation
- Error protection

## Author

[@anusthan12](https://github.com/anusthan12)
