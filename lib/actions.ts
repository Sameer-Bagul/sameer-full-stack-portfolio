'use server';

import { connectToDB } from './db';
import axios from 'axios';
import Blog from './models/Blog';
import Project from './models/Project';
import Skill from './models/Skill';
import Experience from './models/Experience';
import Testimonial from './models/Testimonial';
import Achievement from './models/Achievement';
import Message from './models/Message';
import Folder from './models/Folder';
import Note from './models/Note';
import Pin from './models/Pin';
import Board from './models/Board';
import CodingProfile from './models/CodingProfile';
import type { 
    Blog as BlogType, 
    Project as ProjectType, 
    Skill as SkillType, 
    Experience as ExperienceType, 
    Testimonial as TestimonialType, 
    Achievement as AchievementType, 
    Pin as PinType, 
    Board as BoardType, 
    CodingPlatform as CodingPlatformType, 
    NoteFolder as NoteFolderType, 
    Note as NoteType,
    PortfolioData
} from './types';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://sameeradminapi.azurewebsites.net/api';

// Helper to sanitize Mongoose objects so they can be passed from Server to Client
const parseDocument = <T>(doc: any): T => JSON.parse(JSON.stringify(doc)) as T;
const parseDocuments = <T>(docs: any[]): T[] => JSON.parse(JSON.stringify(docs)) as T[];

export const getBlogs = async (): Promise<BlogType[]> => {
    await connectToDB();
    const blogs = await Blog.find({ isPublished: true }).sort({ publishedAt: -1 }).lean();
    return parseDocuments<BlogType>(blogs);
};

export const getProjects = async (): Promise<ProjectType[]> => {
    await connectToDB();
    const projects = await Project.find({}).sort({ sequence: 1 }).lean();
    return parseDocuments<ProjectType>(projects);
};

export const getProjectBySlug = async (slug: string): Promise<ProjectType | null> => {
    await connectToDB();
    const project = await Project.findOne({ slug }).lean();
    return project ? parseDocument<ProjectType>(project) : null;
};

export const getProjectById = async (id: string): Promise<ProjectType | null> => {
    await connectToDB();
    const project = await Project.findById(id).lean();
    return project ? parseDocument<ProjectType>(project) : null;
};

export const getSkills = async (): Promise<SkillType[]> => {
    await connectToDB();
    const skills = await Skill.find({}).sort({ row: 1 }).lean();
    return parseDocuments<SkillType>(skills);
};

export const getExperience = async (): Promise<ExperienceType[]> => {
    await connectToDB();
    const experience = await Experience.find({}).sort({ startDate: -1 }).lean();
    return parseDocuments<ExperienceType>(experience);
};

export const getTestimonials = async (): Promise<TestimonialType[]> => {
    await connectToDB();
    const testimonials = await Testimonial.find({}).lean();
    return parseDocuments<TestimonialType>(testimonials);
};

export const getAchievements = async (): Promise<AchievementType[]> => {
    await connectToDB();
    const achievements = await Achievement.find({}).sort({ date: -1 }).lean();
    return parseDocuments<AchievementType>(achievements);
};

export const getAllPortfolioData = async (): Promise<PortfolioData> => {
    const [experience, projects, blogs, skills, testimonials, achievements] = await Promise.all([
        getExperience(),
        getProjects(),
        getBlogs(),
        getSkills(),
        getTestimonials(),
        getAchievements()
    ]);
    return { experience, projects, blogs, skills, testimonials, achievements };
};

export const sendMessage = async (messageData: any) => {
    await connectToDB();
    const msg = new Message(messageData);
    await msg.save();
    return parseDocument<any>(msg);
};

// Github endpoints interact with complex external APIs, we keep Axios here
export const getGithubProfile = async () => {
    const response = await axios.get(`${API_URL}/github/profile`);
    return response.data;
};

export const getGithubRepos = async () => {
    const response = await axios.get(`${API_URL}/github/repos`);
    return response.data;
};

export const getPins = async (): Promise<PinType[]> => {
    await connectToDB();
    const pins = await Pin.find({}).lean();
    return parseDocuments<PinType>(pins);
};

export const getBoards = async (): Promise<BoardType[]> => {
    await connectToDB();
    const boards = await Board.find({}).lean();
    return parseDocuments<BoardType>(boards);
};

export const getCodingPlatforms = async (): Promise<CodingPlatformType[]> => {
    await connectToDB();
    const platforms = await CodingProfile.find({}).lean();
    return parseDocuments<CodingPlatformType>(platforms);
};

export const getPublicFolders = async (username?: string) => {
    await connectToDB();
    const folders = await Folder.find({ isDeployed: true }).sort({ createdAt: -1 }).lean();
    
    const foldersWithCount = await Promise.all(
        folders.map(async (folder: any) => {
          const noteCount = await Note.countDocuments({
            folderId: folder._id,
            isArchived: false
          });
          return { ...folder, noteCount };
        })
    );
    
    return { success: true, data: { folders: parseDocuments<NoteFolderType>(foldersWithCount) } };
};

export const getPublicFolderBySlug = async (slug: string, username?: string) => {
    await connectToDB();
    const folder = await Folder.findOne({ slug, isDeployed: true }).lean();
    if (!folder) return { success: false, data: { folder: null, notes: [] } };
    
    const notes = await Note.find({ folderId: folder._id, isArchived: false }).sort({ order: 1 }).lean();
    return { success: true, data: { folder: parseDocument<NoteFolderType>(folder), notes: parseDocuments<NoteType>(notes) } };
};

export const getPublicNoteBySlug = async (slug: string, username?: string) => {
    await connectToDB();
    const note = await Note.findOne({ slug, isArchived: false }).populate('folderId').lean();
    
    if (!note || !note.folderId || !(note.folderId as any).isDeployed) {
        return { success: false, data: { note: null } };
    }
    return { success: true, data: { note: parseDocument<NoteType>(note) } };
};
