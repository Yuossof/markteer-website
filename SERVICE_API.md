# Service CRUD API Documentation

## Overview
Complete REST API for managing services with role-based access control. Only admin users can create, update, or delete services. All users can view services.

## Authentication
All write operations (CREATE, UPDATE, DELETE) require:
- Valid JWT token in HTTP-only cookie (`authToken`)
- User must have `isAdmin: true` in the database

## Endpoints

### 1. Create Service (Admin Only)
**POST** `/api/services/create`

#### Request
```json
{
  "title": "Web Development",
  "description": "Complete web development solutions using modern technologies and best practices"
}
```

#### Response (201)
```json
{
  "message": "Service created successfully",
  "service": {
    "id": "uuid-string",
    "title": "Web Development",
    "description": "Complete web development solutions..."
  }
}
```

#### Error Responses
- `400`: Missing or invalid fields
- `403`: Unauthorized (not admin)
- `500`: Server error

---

### 2. Get All Services (Public)
**GET** `/api/services`

#### Response (200)
```json
{
  "services": [
    {
      "id": "uuid-string",
      "title": "Web Development",
      "description": "...",
      "projects": [
        {
          "id": "uuid-string",
          "name": "Project Name",
          ...
        }
      ]
    }
  ]
}
```

#### Error Responses
- `500`: Server error

---

### 3. Get Single Service (Public)
**GET** `/api/services/:id`

#### Response (200)
```json
{
  "service": {
    "id": "uuid-string",
    "title": "Web Development",
    "description": "...",
    "projects": [
      {
        "id": "uuid-string",
        "name": "Project Name",
        "images": [
          {
            "id": "uuid-string",
            "url": "https://example.com/image.jpg"
          }
        ]
      }
    ]
  }
}
```

#### Error Responses
- `400`: Invalid or missing ID
- `404`: Service not found
- `500`: Server error

---

### 4. Update Service (Admin Only)
**PUT** `/api/services/:id`

#### Request
```json
{
  "title": "Web & Mobile Development",
  "description": "Updated description"
}
```

**Note**: Both fields are optional. Send only fields you want to update.

#### Response (200)
```json
{
  "message": "Service updated successfully",
  "service": {
    "id": "uuid-string",
    "title": "Web & Mobile Development",
    "description": "Updated description",
    "projects": [...]
  }
}
```

#### Error Responses
- `400`: Invalid or missing ID, no fields to update
- `403`: Unauthorized (not admin)
- `404`: Service not found
- `500`: Server error

---

### 5. Delete Service (Admin Only)
**DELETE** `/api/services/:id`

#### Response (200)
```json
{
  "message": "Service deleted successfully",
  "service": {
    "id": "uuid-string",
    "title": "Web Development",
    "description": "..."
  }
}
```

#### Error Responses
- `400`: Invalid or missing ID
- `403`: Unauthorized (not admin)
- `404`: Service not found
- `500`: Service has associated projects (cannot delete)

---

## Usage Examples

### JavaScript/TypeScript
```typescript
// Create service
const response = await fetch('/api/services/create', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    title: 'SEO Optimization',
    description: 'Search engine optimization services'
  })
});

// Update service
const response = await fetch('/api/services/123e4567-e89b-12d3-a456-426614174000', {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    title: 'Advanced SEO Optimization'
  })
});

// Delete service
const response = await fetch('/api/services/123e4567-e89b-12d3-a456-426614174000', {
  method: 'DELETE'
});
```

### cURL
```bash
# Create
curl -X POST http://localhost:3000/api/services/create \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Web Development",
    "description": "Professional web development"
  }'

# Get all
curl http://localhost:3000/api/services

# Get single
curl http://localhost:3000/api/services/service-id

# Update
curl -X PUT http://localhost:3000/api/services/service-id \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Updated Title"
  }'

# Delete
curl -X DELETE http://localhost:3000/api/services/service-id
```

---

## Error Handling

All error responses follow this format:
```json
{
  "error": "Error message describing what went wrong"
}
```

Common error messages:
- `"Title is required"` - Missing title field
- `"Description is required"` - Missing description field
- `"Unauthorized. Admin access required."` - User is not admin
- `"Service not found"` - Service ID doesn't exist
- `"Cannot delete service that has associated projects"` - Service has projects linked to it

---

## Admin Panel

Access the admin services management panel at:
```
/admin/services
```

Features:
- View all services in a table
- Create new services
- Edit existing services
- Delete services
- Real-time status messages

---

## Database Schema

```prisma
model Service {
  id          String    @id @default(uuid())
  title       String
  description String
  projects    Project[] @relation("ServiceProjects")
}
```

---

## Security Notes

1. **Admin Verification**: Every write operation verifies the user is admin
2. **Token Validation**: JWT token is verified using JWT_SECRET
3. **Input Sanitization**: All string inputs are trimmed
4. **Error Messages**: Generic error messages for unauthorized access
5. **HTTPS Only**: Cookies are secure in production
6. **SameSite Protection**: CSRF protection enabled

---

## Rate Limiting

Currently no rate limiting implemented. Consider adding:
- Per-IP rate limiting
- Per-user rate limiting
- Request throttling for production

---

## Future Enhancements

- [ ] Add service categories/tags
- [ ] Add service pricing
- [ ] Add service images/icons
- [ ] Add service ordering/sorting
- [ ] Add pagination for services list
- [ ] Add full-text search
- [ ] Add service statistics
- [ ] Add audit logging
