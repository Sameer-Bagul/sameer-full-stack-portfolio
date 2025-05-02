
# Backend Structure for MongoDB Integration

This directory is prepared for future Node.js and MongoDB integration.

## Planned Structure

```
server/
├── config/             # Configuration files
│   ├── db.js           # MongoDB connection setup
│   └── config.js       # Environment variables and app config
├── controllers/        # Route controllers
│   ├── studyController.js
│   └── achievementController.js
├── models/             # MongoDB models
│   ├── Folder.js
│   ├── StudyMaterial.js
│   └── Achievement.js
├── routes/             # API routes
│   ├── studyRoutes.js
│   └── achievementRoutes.js
├── middleware/         # Custom middleware
│   ├── auth.js         # Authentication middleware
│   └── errorHandler.js # Error handling middleware
├── utils/              # Utility functions
│   └── apiResponse.js  # Standardized API responses
└── server.js           # Main entry point
```

## Integration Steps

1. Set up MongoDB Atlas account or local MongoDB server
2. Install required packages:
   - express
   - mongoose
   - cors
   - dotenv
3. Create MongoDB connection
4. Define Mongoose schemas and models
5. Implement API routes
6. Connect frontend services to the backend API

## Expected Models

### Folder Model
```javascript
const folderSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  color: { type: String },
  parent: { type: mongoose.Schema.Types.ObjectId, ref: 'Folder', default: null },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});
```

### StudyMaterial Model
```javascript
const studyMaterialSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  content: { type: String },
  folder: { type: mongoose.Schema.Types.ObjectId, ref: 'Folder', required: true },
  category: { type: String },
  tags: [{ type: String }],
  readTime: { type: Number },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});
```

### Achievement Model
```javascript
const achievementSchema = new mongoose.Schema({
  title: { type: String, required: true },
  organization: { type: String },
  date: { type: String },
  description: { type: String },
  details: { type: String },
  type: { type: String, enum: ['award', 'certificate'] },
  color: { type: String },
  image: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});
```
