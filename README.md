# Naruto API

A simple Express.js API serving Naruto episodes and their summaries.

## Endpoints
- `GET /api/naruto/:season/:episode` - Get video URL and summary

## Example
```bash
GET /api/naruto/1/1
```
Response:
```json
{
  "videoUrl": "https://i.imgur.com/wV2slRV.mp4",
  "summary": "Naruto Uzumaki..."
}
```