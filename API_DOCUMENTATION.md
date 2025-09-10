# StudBuddy Communities API Documentation

## Base URL
```
http://localhost:8000/api
```

## WebSocket URL
```
ws://localhost:8000/ws/communities/{community_id}/?token={access_token}
```

## Authentication
All API endpoints require JWT authentication. Include the token in the Authorization header:
```
Authorization: Bearer <your_access_token>
```

For WebSocket connections, pass the token as a query parameter: `?token=<your_access_token>`

## Endpoints

### 1. Authentication

#### Login
- **POST** `/api/token/`
- **Body:**
  ```json
  {
    "username": "your_username",
    "password": "your_password"
  }
  ```
- **Response:**
  ```json
  {
    "access": "your_access_token",
    "refresh": "your_refresh_token"
  }
  ```

#### Refresh Token
- **POST** `/api/token/refresh/`
- **Body:**
  ```json
  {
    "refresh": "your_refresh_token"
  }
  ```
- **Response:**
  ```json
  {
    "access": "new_access_token"
  }
  ```

### 2. Communities

#### Get All Communities
- **GET** `/api/communities/`
- **Query Parameters:**
  - `type` (optional): Filter by community type (student, teacher, organization, custom)
- **Response:**
  ```json
  [
    {
      "id": 1,
      "name": "Computer Science Students",
      "description": "A community for CS students",
      "community_type": "student",
      "created_by": 1,
      "created_at": "2024-01-01T00:00:00Z",
      "updated_at": "2024-01-01T00:00:00Z",
      "is_public": true,
      "max_members": 1000
    }
  ]
  ```

#### Get Community by ID
- **GET** `/api/communities/{id}/`
- **Response:** Single community object

#### Create Custom Community
- **POST** `/api/communities/create-custom/`
- **Body:**
  ```json
  {
    "name": "Community Name",
    "description": "Community Description",
    "max_members": 100,
    "is_public": true
  }
  ```
- **Response:** Created community object

#### Join Community
- **POST** `/api/communities/{community_id}/join/`
- **Response:**
  ```json
  {
    "id": 1,
    "community": 1,
    "user": 1,
    "role": "member",
    "joined_at": "2024-01-01T00:00:00Z",
    "is_active": true
  }
  ```

#### Leave Community
- **POST** `/api/communities/{community_id}/leave/`
- **Response:**
  ```json
  {
    "detail": "Left community successfully"
  }
  ```

#### Get Community Members
- **GET** `/api/communities/{community_id}/members/`
- **Response:**
  ```json
  [
    {
      "id": 1,
      "community": 1,
      "user": {
        "id": 1,
        "username": "john_doe",
        "email": "john@example.com"
      },
      "role": "admin",
      "joined_at": "2024-01-01T00:00:00Z",
      "is_active": true
    }
  ]
  ```

#### Get User's Communities
- **GET** `/api/communities/my-communities/`
- **Response:** Array of communities the user is a member of

### 3. Chat Messages

#### Get Community Messages
- **GET** `/api/communities/{community_id}/messages/`
- **Response:**
  ```json
  [
    {
      "id": 1,
      "community": 1,
      "sender": 1,
      "content": "Hello everyone!",
      "timestamp": "2024-01-01T00:00:00Z",
      "is_edited": false,
      "edited_at": null,
      "reply_to": null
    }
  ]
  ```

#### Send Message
- **POST** `/api/communities/{community_id}/messages/`
- **Body:**
  ```json
  {
    "content": "Your message content"
  }
  ```
- **Response:** Created message object

### 4. WebSocket Real-time Chat

#### Connect to Community Chat
- **WebSocket:** `ws://localhost:8000/ws/communities/{community_id}/?token={access_token}`
- **Authentication:** Pass JWT token as query parameter
- **Purpose:** Real-time chat messaging

#### WebSocket Message Format

**Send Message:**
```json
{
  "type": "chat_message",
  "message": "Your message content"
}
```

**Receive Message:**
```json
{
  "type": "chat_message",
  "message": "Message content",
  "username": "sender_username",
  "user_id": 1,
  "timestamp": "2024-01-01T00:00:00Z",
  "message_id": 1
}
```

#### WebSocket Events

1. **Connection Established:**
   - WebSocket connects successfully
   - User must be authenticated and a member of the community

2. **Message Received:**
   - Real-time message updates
   - Messages are automatically saved to database
   - All connected members receive the message instantly

3. **Connection Closed:**
   - WebSocket disconnects
   - User leaves the chat room

### 5. Users

#### Get User Profile
- **GET** `/api/users/profile/`
- **Response:** User profile object

#### Update User Profile
- **PUT** `/api/users/profile/`
- **Body:** User data to update
- **Response:** Updated user profile

## Error Responses

### 400 Bad Request
```json
{
  "detail": "Error message"
}
```

### 401 Unauthorized
```json
{
  "detail": "Authentication credentials were not provided."
}
```

### 403 Forbidden
```json
{
  "detail": "You do not have permission to perform this action."
}
```

### 404 Not Found
```json
{
  "detail": "Not found."
}
```

## Frontend Integration

The frontend is built with React and Material-UI, providing:

1. **Community List**: Browse and join communities
2. **Community Creation**: Create new custom communities
3. **Community Detail**: View community info, members, and chat
4. **Real-time Chat**: WebSocket-based messaging system
5. **Member Management**: View community members and their roles
6. **Authentication**: JWT-based login/logout system

## Running the Application

### Backend (Django + Channels)
```bash
cd backend
python manage.py runserver
```
Server runs on: http://localhost:8000
WebSocket runs on: ws://localhost:8000

### Frontend (React)
```bash
cd frontend
npm start
```
App runs on: http://localhost:3000

## Features

- **JWT Authentication**: Secure API access
- **CORS Support**: Frontend-backend communication
- **WebSocket Support**: Real-time chat using Django Channels
- **Community Types**: Student, Teacher, Organization, Custom
- **Role-based Access**: Member, Moderator, Admin roles
- **Real-time Chat**: Instant messaging with WebSocket
- **Member Management**: Join/leave communities
- **Responsive UI**: Modern Material-UI design

## Database Models

- **Community**: Main community information
- **CommunityMember**: User membership and roles
- **ChatMessage**: Community chat messages
- **CustomUser**: Extended user model with roles

## Security Features

- JWT token authentication
- Role-based permissions
- CORS configuration
- WebSocket authentication
- Input validation
- SQL injection protection

## WebSocket Architecture

The WebSocket implementation uses Django Channels with:

1. **ASGI Application**: Supports both HTTP and WebSocket protocols
2. **Channel Layers**: In-memory message routing
3. **Custom Middleware**: JWT authentication for WebSocket connections
4. **Consumer**: Handles WebSocket connections and message routing
5. **Real-time Updates**: Instant message delivery to all connected users

## Testing WebSocket

1. **Login** to get JWT token
2. **Join a community** or create one
3. **Open community detail** page
4. **WebSocket automatically connects** with authentication
5. **Send messages** and see real-time updates
6. **Multiple users** can chat simultaneously
