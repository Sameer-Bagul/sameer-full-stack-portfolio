'use server';

import { connectToDB } from './db';

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
    
    // Save to database
    const msg = new Message(messageData);
    await msg.save();
    
    // Send Email using Nodemailer
    try {
        const nodemailer = require('nodemailer');
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.GMAIL_USER,
                pass: process.env.GMAIL_APP_PASSWORD,
            },
        });

        const mailOptions = {
            from: `"${messageData.name}" <${process.env.GMAIL_USER}>`,
            to: process.env.RECEIVER_EMAIL || process.env.GMAIL_USER,
            replyTo: messageData.email,
            subject: `[Portfolio] ${messageData.subject || 'New Message'} from ${messageData.name}`,
            text: `Name: ${messageData.name}\nEmail: ${messageData.email}\nCategory: ${messageData.subject || 'General Inquiry'}\n\nMessage:\n${messageData.message}`,
            html: `
                <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px; background-color: #f8fafc;">
                    <div style="background: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);">
                        
                        <!-- Header -->
                        <div style="background: linear-gradient(135deg, #18181b 0%, #27272a 100%); padding: 30px 40px; text-align: center;">
                            <h2 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: 800; letter-spacing: -0.025em;">New Portfolio Inquiry</h2>
                            <p style="color: #a1a1aa; margin: 8px 0 0 0; font-size: 14px; text-transform: uppercase; letter-spacing: 0.05em; font-weight: 600;">Via sameerbagul.com</p>
                        </div>

                        <!-- Content -->
                        <div style="padding: 40px;">
                            <div style="display: flex; flex-direction: column; gap: 20px;">
                                
                                <!-- Meta Details -->
                                <div style="display: grid; grid-template-columns: 1fr; gap: 16px; margin-bottom: 30px;">
                                    <div style="background: #f4f4f5; padding: 16px; border-radius: 12px;">
                                        <p style="margin: 0; font-size: 12px; font-weight: 700; color: #71717a; text-transform: uppercase; letter-spacing: 0.05em;">From</p>
                                        <p style="margin: 4px 0 0 0; font-size: 16px; color: #18181b; font-weight: 500;">${messageData.name} <span style="color: #a1a1aa; font-weight: 400; font-size: 14px;">(${messageData.email})</span></p>
                                    </div>
                                    <div style="background: #f4f4f5; padding: 16px; border-radius: 12px;">
                                        <p style="margin: 0; font-size: 12px; font-weight: 700; color: #71717a; text-transform: uppercase; letter-spacing: 0.05em;">Inquiry Type</p>
                                        <p style="margin: 4px 0 0 0; font-size: 16px; color: #18181b; font-weight: 500;">${messageData.subject || 'General Inquiry'}</p>
                                    </div>
                                </div>

                                <!-- Message Body -->
                                <div>
                                    <p style="margin: 0 0 12px 0; font-size: 12px; font-weight: 700; color: #71717a; text-transform: uppercase; letter-spacing: 0.05em;">Message</p>
                                    <div style="background: #ffffff; border: 1px solid #e4e4e7; padding: 24px; border-radius: 12px; color: #3f3f46; font-size: 16px; line-height: 1.6; white-space: pre-wrap;">${messageData.message}</div>
                                </div>
                                
                            </div>
                        </div>

                        <!-- Footer -->
                        <div style="background: #f8fafc; border-top: 1px solid #f1f5f9; padding: 20px; text-align: center;">
                            <p style="margin: 0; font-size: 12px; color: #94a3b8;">This email was sent automatically from your Next.js portfolio.</p>
                            <a href="mailto:${messageData.email}" style="display: inline-block; margin-top: 12px; color: #3b82f6; text-decoration: none; font-size: 14px; font-weight: 600;">Reply directly to ${messageData.name} &rarr;</a>
                        </div>
                    </div>
                </div>
            `,
        };

        await transporter.sendMail(mailOptions);
    } catch (error) {
        console.error('Failed to send SMTP email:', error);
        // We still return success for the DB save even if email fails
    }

    return parseDocument<any>(msg);
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
