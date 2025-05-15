import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Index from './pages/Index'
import NotFound from './pages/NotFound'
import Resume from './pages/Resume'
import Achievements from './pages/Achievements'
import Projects from './pages/Projects'
import Blog from './pages/Blog'
import { Footer } from './components/layout/Footer'
import { ScrollAwareHeader } from './components/layout/ScrollAwareHeader'
import CollabPermisson from './pages/CollabPermisson'
import { Toaster } from 'sonner'
import StudyRoutes from './pages/study'
import { ThemeProvider } from './contexts/ThemeContext'
import { TooltipProvider } from './components/ui/tooltip'
import StarBackground from './components/ui-components/StarBackground'

function App() {
  return (
    <ThemeProvider>
      <TooltipProvider>
        <BrowserRouter>
          <div className="relative min-h-screen w-full overflow-x-hidden">
            {/* Star Background for the entire app */}
            <StarBackground />
            
            <ScrollAwareHeader />
            <main className="relative z-10">
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/resume" element={<Resume />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/study/*" element={<StudyRoutes />} />
                <Route path="/permission" element={<CollabPermisson />} />
                <Route path="/achievements" element={<Achievements />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <Footer />
            <Toaster />
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  )
}

export default App
