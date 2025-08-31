# Backend Setup Prompt for Chabad NF Campaign

## Context
I have a React frontend for a Chabad North Fulton campaign website (campexpansion.com) that needs a backend API to handle admin dashboard functionality. The frontend is currently trying to connect to a local backend server that's not deployed to production.

## Current Issue
- Frontend: React app deployed at campexpansion.com
- Backend: Express.js server running locally on localhost:3001
- Problem: Admin dashboard at campexpansion.com/admin can't reach the backend API
- Error: "Error updating campaign. Please try again."

## What I Need
Create a complete, production-ready backend API server that can be deployed to handle:

### API Endpoints Needed:
1. **POST /api/update-campaign** - Update campaign goal and raised amounts
   - Accepts: `{ goal: number, raised: number, lastUpdated: string }`
   - Returns: `{ message: string, data: object }`

2. **GET /api/campaign-data** - Get current campaign data
   - Returns: `{ goal: number, raised: number, lastUpdated: string }`

3. **GET /api/dedications** - Get all dedications
   - Returns: Array of dedication objects

4. **POST /api/update-dedication** - Update a specific dedication
   - Accepts: Dedication object with id, title, amount, status, phase
   - Returns: `{ message: string, data: object }`

5. **POST /api/add-dedication** - Add new dedication
   - Accepts: Dedication object
   - Returns: `{ message: string, data: object }`

### Data Storage:
- Store campaign data in `campaign-data.json`
- Store dedications in `dedications-data.json`
- Use file-based storage (JSON files) for simplicity

### Requirements:
1. **Express.js server** with proper error handling
2. **CORS enabled** for cross-origin requests from campexpansion.com
3. **Input validation** for all endpoints
4. **Production-ready** with proper logging and error responses
5. **Deployment-ready** with clear instructions
6. **Package.json** with all necessary dependencies
7. **README.md** with setup and deployment instructions

### Security Considerations:
- Add basic authentication for admin endpoints (optional)
- Input sanitization
- Rate limiting (optional)

### File Structure Needed:
```
backend/
├── package.json
├── server.js
├── public/
│   ├── campaign-data.json
│   └── dedications-data.json
├── README.md
└── .env (for environment variables)
```

### Sample Data:
**campaign-data.json:**
```json
{
  "goal": 1800000,
  "raised": 950000,
  "lastUpdated": "2025-01-31"
}
```

**dedications-data.json:**
```json
[
  { "id": 1, "title": "Campus Dedication", "amount": "$900,000", "status": "available" },
  { "id": 7, "title": "Playground", "amount": "$300,000", "status": "available" },
  { "id": 6, "title": "Soccer Field", "amount": "$300,000", "status": "sold" }
]
```

## Deployment Instructions Needed:
1. How to deploy to a cloud service (Vercel, Railway, Render, etc.)
2. How to set up environment variables
3. How to update the frontend to use the deployed backend URL
4. How to test the API endpoints

## Frontend Integration:
After deployment, I'll need to update the frontend AdminDashboard.js to use the new backend URL instead of localhost:3001.

Please create a complete, production-ready backend solution that I can deploy immediately and connect to my existing frontend.
