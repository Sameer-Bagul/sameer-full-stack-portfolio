
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { Footer } from "@/components/layout/Footer";
import StarBackground from "@/components/ui-components/StarBackground";
import { EnhancedHeader } from "@/components/layout/EnhancedHeader";
import WidgetUI from "@/components/ui-components/widgetUi";
import "./index.css"

// Pages
import Index from "./pages/Index";
import Projects from "./pages/Projects";
import Achievements from "./pages/Achievements";
import Blog from "./pages/Blog";
import Study from "./pages/Study";
import Resume from "./pages/Resume";
import NotFound from "./pages/NotFound";
import CollabPermisson from "./pages/CollabPermisson";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <TooltipProvider>
        <div className="relative min-h-screen flex flex-col transition-colors duration-300">
          <StarBackground />
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <EnhancedHeader />
            <main className="flex-grow relative z-10">
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/achievements" element={<Achievements />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/study" element={<Study />} />
                <Route path="/resume" element={<Resume />} />
                <Route path="/collab" element={<CollabPermisson />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <Footer />
            <WidgetUI />
          </BrowserRouter>
        </div>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
