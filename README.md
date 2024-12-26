# User Post Management System

A RESTful API service for managing users and their posts built with Node.js, Express, and Supabase.

## Features

- User management with post count tracking
- Post management with image support
- RESTful API endpoints
- Input validation
- Unit tests
- Database triggers for automatic post count updates

## Prerequisites

- Node.js (v14 or higher)
- Supabase account and project

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_anon_key
PORT=3000
```

## Installation

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run database migrations (through Supabase dashboard)

3. Start the development server:
   ```bash
   npm run dev
   ```

## API Endpoints

### Users
- `GET /api/users` - Get all users

### Posts
- `GET /api/posts` - Get all posts
- `POST /api/posts` - Create a new post
- `PUT /api/posts/:id` - Update a post
- `DELETE /api/posts/:id` - Delete a post

## Running Tests

```bash
npm test
```

## API Documentation

### Get All Users
```http
GET /api/users
```

### Get All Posts
```http
GET /api/posts
```

### Create Post
```http
POST /api/posts
Content-Type: application/json

{
  "title": "Post Title",
  "description": "Post Description",
  "user_id": 1,
  "images": ["image1.jpg", "image2.jpg"]
}
```

### Update Post
```http
PUT /api/posts/:id
Content-Type: application/json

{
  "title": "Updated Title",
  "description": "Updated Description",
  "user_id": 1,
  "images": ["updated-image.jpg"]
}
```

### Delete Post
```http
DELETE /api/posts/:id
```