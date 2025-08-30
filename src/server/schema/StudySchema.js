
/**
 * MongoDB Schema for Study Module
 * 
 * This file defines the schema structure for MongoDB collections
 * related to study materials and folders.
 */

const FolderSchema = {
  name: "String, required",
  description: "String, optional",
  color: "String, optional (for UI display)",
  parentId: "ObjectId, optional, reference to another Folder",
  createdAt: "Date, default to current date",
  updatedAt: "Date, default to current date, updated on change",
  icon: "String, optional (icon name)"
};

const MaterialSchema = {
  title: "String, required",
  description: "String, optional",
  content: "String, optional (markdown content)",
  folderId: "ObjectId, required, reference to Folder",
  category: "String, enum: ['notes', 'cheatsheet', 'lecture', 'textbook', ...]",
  tags: "Array of Strings",
  date: "String, date of creation/publish",
  readTime: "Number, estimated read time in minutes",
  author: "ObjectId, reference to User (future)",
  views: "Number, default 0",
  starred: "Boolean, default false",
  createdAt: "Date, default to current date",
  updatedAt: "Date, default to current date, updated on change"
};

/**
 * Example MongoDB Schema Implementation:
 * 
 * const mongoose = require('mongoose');
 * const Schema = mongoose.Schema;
 * 
 * const folderSchema = new Schema({
 *   name: { type: String, required: true },
 *   description: String,
 *   color: String,
 *   parentId: { type: Schema.Types.ObjectId, ref: 'Folder', default: null },
 *   createdAt: { type: Date, default: Date.now },
 *   updatedAt: { type: Date, default: Date.now },
 *   icon: String
 * });
 * 
 * const materialSchema = new Schema({
 *   title: { type: String, required: true },
 *   description: String,
 *   content: String,
 *   folderId: { type: Schema.Types.ObjectId, ref: 'Folder', required: true },
 *   category: { 
 *     type: String,
 *     enum: ['notes', 'cheatsheet', 'lecture', 'textbook'],
 *     default: 'notes'
 *   },
 *   tags: [String],
 *   date: String,
 *   readTime: Number,
 *   author: { type: Schema.Types.ObjectId, ref: 'User' },
 *   views: { type: Number, default: 0 },
 *   starred: { type: Boolean, default: false },
 *   createdAt: { type: Date, default: Date.now },
 *   updatedAt: { type: Date, default: Date.now }
 * });
 * 
 * // Middleware to update the updatedAt field on save
 * folderSchema.pre('save', function(next) {
 *   this.updatedAt = Date.now();
 *   next();
 * });
 * 
 * materialSchema.pre('save', function(next) {
 *   this.updatedAt = Date.now();
 *   next();
 * });
 * 
 * const Folder = mongoose.model('Folder', folderSchema);
 * const Material = mongoose.model('Material', materialSchema);
 * 
 * module.exports = { Folder, Material };
 */

/**
 * API Endpoints Structure
 * 
 * GET    /api/folders                - Get all folders
 * GET    /api/folders/:id            - Get a specific folder
 * POST   /api/folders                - Create a new folder
 * PUT    /api/folders/:id            - Update a folder
 * DELETE /api/folders/:id            - Delete a folder
 * 
 * GET    /api/materials              - Get all materials
 * GET    /api/materials/:id          - Get a specific material
 * POST   /api/materials              - Create a new material
 * PUT    /api/materials/:id          - Update a material
 * DELETE /api/materials/:id          - Delete a material
 * 
 * GET    /api/folders/:id/materials  - Get all materials in a folder
 * GET    /api/search?q=query         - Search materials
 */
