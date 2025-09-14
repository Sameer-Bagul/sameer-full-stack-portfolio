import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { AlignLeft, ZoomIn, ZoomOut, Copy, Check, Clock, Calendar, BookOpen, Tag } from 'lucide-react';
import { APINote } from '@/services/notesApi';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '../ui/scroll-area';
import { useTheme } from '@/contexts/ThemeContext';

interface EnhancedMaterialContentProps {
	note: APINote;
	showSidebar: boolean;
	toggleSidebar: () => void;
	zoomLevel: number;
	onZoomIn: () => void;
	onZoomOut: () => void;
}

export function EnhancedMaterialContent({ note, showSidebar, toggleSidebar, zoomLevel, onZoomIn, onZoomOut }: EnhancedMaterialContentProps) {
	const [copied, setCopied] = useState(false);
	const { theme } = useTheme();
	const contentRef = useRef<HTMLDivElement>(null);

	// Preprocess note HTML to inject custom classes for styling
	function enhanceNoteHtml(html: string): string {
		if (!html) return '';
		const temp = document.createElement('div');
		temp.innerHTML = html;

		// Enhanced HTML element styling
		temp.querySelectorAll('p').forEach(p => {
			p.classList.add('book-paragraph');
		});

		temp.querySelectorAll('h1').forEach(h => h.classList.add('heading-1'));
		temp.querySelectorAll('h2').forEach(h => h.classList.add('heading-2'));
		temp.querySelectorAll('h3').forEach(h => h.classList.add('heading-3'));
		temp.querySelectorAll('h4').forEach(h => h.classList.add('heading-4'));
		temp.querySelectorAll('h5').forEach(h => h.classList.add('heading-5'));
		temp.querySelectorAll('h6').forEach(h => h.classList.add('heading-6'));

		temp.querySelectorAll('blockquote').forEach(bq => bq.classList.add('book-quote'));
		temp.querySelectorAll('pre').forEach(pre => {
			pre.classList.add('book-code-block');
		});

		temp.querySelectorAll('code').forEach(code => {
			if (!code.parentElement || code.parentElement.tagName !== 'PRE') {
				code.classList.add('inline-code');
			}
		});

		temp.querySelectorAll('ul').forEach(ul => ul.classList.add('book-list'));
		temp.querySelectorAll('ol').forEach(ol => ol.classList.add('book-ordered-list'));
		temp.querySelectorAll('li').forEach(li => li.classList.add('book-list-item'));

		// Handle tables
		temp.querySelectorAll('table').forEach(table => {
			table.classList.add('book-table');
		});

		// Handle links
		temp.querySelectorAll('a').forEach(link => {
			link.classList.add('book-link');
		});

		// Handle images
		temp.querySelectorAll('img').forEach(img => {
			img.classList.add('book-image');
		});

		// Handle strong/bold text
		temp.querySelectorAll('strong, b').forEach(strong => {
			strong.classList.add('book-strong');
		});

		// Handle emphasis/italic text
		temp.querySelectorAll('em, i').forEach(em => {
			em.classList.add('book-emphasis');
		});

		// Handle horizontal rules
		temp.querySelectorAll('hr').forEach(hr => {
			hr.classList.add('book-hr');
		});

		// Handle definition lists
		temp.querySelectorAll('dl').forEach(dl => {
			dl.classList.add('book-definition-list');
		});

		temp.querySelectorAll('dt').forEach(dt => {
			dt.classList.add('book-definition-term');
		});

		temp.querySelectorAll('dd').forEach(dd => {
			dd.classList.add('book-definition-description');
		});

		// Handle abbreviations
		temp.querySelectorAll('abbr').forEach(abbr => {
			abbr.classList.add('book-abbr');
		});

		// Handle citations
		temp.querySelectorAll('cite').forEach(cite => {
			cite.classList.add('book-cite');
		});

		// Handle mark/highlighted text
		temp.querySelectorAll('mark').forEach(mark => {
			mark.classList.add('book-mark');
		});

		// Handle superscript and subscript
		temp.querySelectorAll('sup').forEach(sup => {
			sup.classList.add('book-sup');
		});

		temp.querySelectorAll('sub').forEach(sub => {
			sub.classList.add('book-sub');
		});

		return temp.innerHTML;
	}


	// Handle copy content functionality
	const handleCopyContent = () => {
		if (note.content) {
			const temp = document.createElement('div');
			temp.innerHTML = note.content;
			const plainText = temp.textContent || temp.innerText || '';
			navigator.clipboard.writeText(plainText);
			setCopied(true);
			toast.success("Content copied to clipboard");
			setTimeout(() => setCopied(false), 2000);
		}
	};

	// Helper to handle MongoDB date format
	function formatDate(date: string | { $date: string } | undefined): string {
		if (!date) return '';
		if (typeof date === 'string') return new Date(date).toLocaleDateString();
		if (typeof date === 'object' && '$date' in date) return new Date(date.$date).toLocaleDateString();
		return '';
	}

	const renderMetadata = () => (
		<div className="material-meta">
			<div className="meta-item">
				<Calendar size={16} />
				<span>{formatDate(note.createdAt)}</span>
			</div>
			<div className="meta-item">
				<Clock size={16} />
				<span>Last edited: {formatDate(note.lastEditedAt)}</span>
			</div>
			<div className="meta-item">
				<BookOpen size={16} />
				<span>{Math.ceil(note.content.length / 1000)} KB</span>
			</div>
			<div className="ml-auto">
				<Button 
					variant="ghost" 
					size="sm"
					onClick={handleCopyContent}
					className="h-8 hover:bg-muted"
				>
					{copied ? <Check size={16} className="text-green-500 mr-2" /> : <Copy size={16} className="mr-2" />}
					{copied ? "Copied" : "Copy"}
				</Button>
			</div>
		</div>
	);

	const renderTags = () => (
		<div className="flex flex-wrap gap-2 mb-5">
			{note.tags.map(tag => (
				<Badge key={tag} variant="outline" className="py-1 font-normal">
					<Tag className="w-3 h-3 mr-1" />
					{tag}
				</Badge>
			))}
		</div>
	);

	const renderZoomControls = () => (
		<div className="flex items-center gap-1 mt-6 mb-4 justify-end">
			<Button 
				variant="outline" 
				size="icon" 
				onClick={onZoomOut} 
				className="h-8 w-8 rounded-full"
			>
				<ZoomOut size={15} />
			</Button>
			<span className="text-sm text-muted-foreground w-16 text-center">
				{Math.round(zoomLevel * 100)}%
			</span>
			<Button 
				variant="outline" 
				size="icon" 
				onClick={onZoomIn}
				className="h-8 w-8 rounded-full"
			>
				<ZoomIn size={15} />
			</Button>
		</div>
	);

	return (
		<motion.div
			initial={{ opacity: 0, x: 20, rotateY: -5 }}
			animate={{ opacity: 1, x: 0, rotateY: 0 }}
			transition={{ duration: 0.5, ease: "easeOut" }}
			className={`flex-1 ${showSidebar ? 'ml-6 md:ml-8' : ''} px-4 md:px-0 pb-32`}
		>
			{!showSidebar && (
				<Button
					variant="outline"
					size="sm"
					onClick={toggleSidebar}
					className="mb-6 flex items-center gap-1.5 shadow-sm"
				>
					<AlignLeft size={16} />
					<span>Show Contents</span>
				</Button>
			)}
			{renderZoomControls()}
			<div
				ref={contentRef}
				className={`notebook-paper enhanced-note-paper rounded-2xl shadow-2xl overflow-hidden border border-border/40 ${
					theme === 'dark' ? 'paper-lines-dark' : 'paper-lines-light'
				}`}
				style={{
					transform: `scale(${zoomLevel})`,
					transformOrigin: 'top left',
				}}
			>
				<article className="font-playfair">
					<div className="material-header px-8 pt-8 pb-2">
						<h1 className="material-title text-4xl md:text-5xl font-bold text-primary mb-2 tracking-tight leading-tight drop-shadow-sm">{note.title}</h1>
						{note.tags.length > 0 && renderTags()}
						{renderMetadata()}
					</div>
					<hr className="my-4 border-border/30" />
					<ScrollArea className="px-8 md:px-12 pb-14 book-content enhanced-note-content">
						<div 
							className="enhanced-note-content"
							dangerouslySetInnerHTML={{ __html: enhanceNoteHtml(note.content) }}
						/>
					</ScrollArea>
					<div className="page-fold"></div>
				</article>
			</div>
		</motion.div>
	);
}
