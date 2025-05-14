
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
import StudyPage from './pages/StudyPage'
import { ThemeProvider } from './contexts/ThemeContext'
import { TooltipProvider } from './components/ui/tooltip'
import StarBackground from './components/ui-components/StarBackground'

function App() {
  return (
    <ThemeProvider>
      <TooltipProvider>
        <BrowserRouter>
          {/* Star Background for the entire app */}
          <StarBackground />
          
          <ScrollAwareHeader />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/resume" element={<Resume />} />
            {/* <Route path="/achievements" element={<Achievements />} /> */}
            <Route path="/projects" element={<Projects />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/study" element={<StudyPage />} />
            <Route path="/permission" element={<CollabPermisson />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Footer />
          <Toaster />
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  )
}

export default App
