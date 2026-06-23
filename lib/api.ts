import * as types from './types';
import * as actions from './actions';

export type Blog = types.Blog;
export type Project = types.Project;
export type Skill = types.Skill;
export type Experience = types.Experience;
export type Testimonial = types.Testimonial;
export type Achievement = types.Achievement;
export type NoteFolder = types.NoteFolder;
export type Note = types.Note;

export const getBlogs = actions.getBlogs;
export const getProjects = actions.getProjects;
export const getProjectBySlug = actions.getProjectBySlug;
export const getProjectById = actions.getProjectById;
export const getSkills = actions.getSkills;
export const getExperience = actions.getExperience;
export const getTestimonials = actions.getTestimonials;
export const getAchievements = actions.getAchievements;
export const getAllPortfolioData = actions.getAllPortfolioData;
export const sendMessage = actions.sendMessage;

export const getPins = actions.getPins;
export const getBoards = actions.getBoards;
export const getCodingPlatforms = actions.getCodingPlatforms;
export const getPublicFolders = actions.getPublicFolders;
export const getPublicFolderBySlug = actions.getPublicFolderBySlug;
export const getPublicNoteBySlug = actions.getPublicNoteBySlug;

export default {
  getBlogs,
  getProjects,
  getProjectBySlug,
  getProjectById,
  getSkills,
  getExperience,
  getTestimonials,
  getAchievements,
  getAllPortfolioData,
  sendMessage,

  getPins,
  getBoards,
  getCodingPlatforms,
  getPublicFolders,
  getPublicFolderBySlug,
  getPublicNoteBySlug
};
