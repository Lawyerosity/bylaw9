import { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { PartDetailPage } from './pages/PartDetailPage';
import { SectionDetailPage } from './pages/SectionDetailPage';
import { AboutPage } from './pages/AboutPage';
import { FAQPage } from './pages/FAQPage';
import { ContactPage } from './pages/ContactPage';
import { VideoLibraryPage } from './pages/VideoLibraryPage';
import { FormsPage } from './pages/FormsPage';
import { SearchResultsPage } from './pages/SearchResultsPage';
import { BookkeepersPage } from './pages/BookkeepersPage';
import { BookkeeperApplicationPage } from './pages/BookkeeperApplicationPage';
import { ClioPage } from './pages/ClioPage';
import { supabase, type Part, type Section } from './lib/supabase';

type View =
  | { type: 'home' }
  | { type: 'part'; part: Part }
  | { type: 'section'; section: Section; part: Part }
  | { type: 'about' }
  | { type: 'faq' }
  | { type: 'contact' }
  | { type: 'videos'; defaultCategory?: string }
  | { type: 'forms' }
  | { type: 'bookkeepers' }
  | { type: 'bookkeeper-application' }
  | { type: 'clio' }
  | { type: 'search'; query: string };

function App() {
  const [view, setView] = useState<View>({ type: 'home' });

  // Check for navigation from another tab on initial load
  useEffect(() => {
    const checkForNavigation = async () => {
      const hash = window.location.hash.slice(1);
      if (hash && hash.startsWith('nav_')) {
        const sectionNumber = localStorage.getItem(hash);
        if (sectionNumber) {
          localStorage.removeItem(hash);

          try {
            const { data: sectionData, error: sectionError } = await supabase
              .from('sections')
              .select(`
                *,
                parts (
                  *
                )
              `)
              .eq('section_number', sectionNumber)
              .maybeSingle();

            if (sectionError || !sectionData) {
              console.error('Error loading section:', sectionError);
              return;
            }

            const part: Part = {
              id: sectionData.parts.id,
              part_number: sectionData.parts.part_number,
              title: sectionData.parts.title,
              description: sectionData.parts.description,
              color: sectionData.parts.color,
              icon: sectionData.parts.icon,
              order_index: sectionData.parts.order_index,
              created_at: sectionData.parts.created_at
            };

            const section: Section = {
              id: sectionData.id,
              part_id: sectionData.part_id,
              section_number: sectionData.section_number,
              title: sectionData.title,
              content: sectionData.content,
              content_html: sectionData.content_html,
              summary: sectionData.summary,
              summary_html: sectionData.summary_html,
              order_index: sectionData.order_index,
              created_at: sectionData.created_at
            };

            setView({ type: 'section', section, part });
            window.history.replaceState(null, '', window.location.pathname);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          } catch (error) {
            console.error('Error navigating to section:', error);
          }
        }
      }
    };

    checkForNavigation();
  }, []);

  useEffect(() => {
    const handleNavigateToSection = (event: any) => {
      const { section, part } = event.detail;
      setView({ type: 'section', section, part });
    };

    const handleNavigateToSectionFromNumber = async (event: any) => {
      const { sectionNumber } = event.detail;
      try {
        const { data: sectionData, error: sectionError } = await supabase
          .from('sections')
          .select(`
            *,
            parts (
              *
            )
          `)
          .eq('section_number', sectionNumber)
          .maybeSingle();

        if (sectionError || !sectionData) {
          console.error('Error loading section:', sectionError);
          return;
        }

        const part: Part = {
          id: sectionData.parts.id,
          part_number: sectionData.parts.part_number,
          title: sectionData.parts.title,
          description: sectionData.parts.description,
          color: sectionData.parts.color,
          icon: sectionData.parts.icon,
          order_index: sectionData.parts.order_index,
          created_at: sectionData.parts.created_at
        };

        const section: Section = {
          id: sectionData.id,
          part_id: sectionData.part_id,
          section_number: sectionData.section_number,
          title: sectionData.title,
          content: sectionData.content,
          content_html: sectionData.content_html,
          summary: sectionData.summary,
          summary_html: sectionData.summary_html,
          order_index: sectionData.order_index,
          created_at: sectionData.created_at
        };

        setView({ type: 'section', section, part });
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } catch (error) {
        console.error('Error navigating to section:', error);
      }
    };

    window.addEventListener('navigateToSection', handleNavigateToSection);
    window.addEventListener('navigateToSectionFromNumber', handleNavigateToSectionFromNumber);

    return () => {
      window.removeEventListener('navigateToSection', handleNavigateToSection);
      window.removeEventListener('navigateToSectionFromNumber', handleNavigateToSectionFromNumber);
    };
  }, []);

  const handlePartSelect = (part: Part) => {
    setView({ type: 'part', part });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePartSelectByNumber = async (partNumber: number) => {
    try {
      const { data: partData, error: partError } = await supabase
        .from('parts')
        .select('*')
        .eq('part_number', partNumber)
        .maybeSingle();

      if (partError || !partData) {
        console.error('Error loading part:', partError);
        return;
      }

      setView({ type: 'part', part: partData });
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
      console.error('Error navigating to part:', error);
    }
  };

  const handleSectionSelect = (section: Section, part: Part) => {
    setView({ type: 'section', section, part });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleHome = () => {
    setView({ type: 'home' });
  };

  const handleBackToPart = (part: Part) => {
    setView({ type: 'part', part });
  };

  const handleAbout = () => {
    setView({ type: 'about' });
  };

  const handleFAQ = () => {
    setView({ type: 'faq' });
  };

  const handleContact = () => {
    setView({ type: 'contact' });
  };

  const handleVideoLibrary = (defaultCategory?: string) => {
    setView({ type: 'videos', defaultCategory });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleForms = () => {
    setView({ type: 'forms' });
  };

  const handleBookkeepers = () => {
    setView({ type: 'bookkeepers' });
  };

  const handleBookkeeperApplication = () => {
    setView({ type: 'bookkeeper-application' });
  };

  const handleClio = () => {
    setView({ type: 'clio' });
  };

  const handleSearch = (query: string) => {
    setView({ type: 'search', query });
  };

  const handleNavigateToSection = async (partNumber: number, sectionNumber: string) => {
    try {
      const { data: partData, error: partError } = await supabase
        .from('parts')
        .select('*')
        .eq('part_number', partNumber)
        .maybeSingle();

      if (partError || !partData) {
        console.error('Error loading part:', partError);
        return;
      }

      const { data: sectionData, error: sectionError } = await supabase
        .from('sections')
        .select('*')
        .eq('part_id', partData.id)
        .eq('section_number', sectionNumber)
        .maybeSingle();

      if (sectionError || !sectionData) {
        console.error('Error loading section:', sectionError);
        return;
      }

      setView({ type: 'section', section: sectionData, part: partData });
    } catch (error) {
      console.error('Error navigating to section:', error);
    }
  };

  const handleSectionClickFromNumber = async (sectionNumber: string) => {
    try {
      const { data: sectionData, error: sectionError } = await supabase
        .from('sections')
        .select(`
          *,
          parts (
            *
          )
        `)
        .eq('section_number', sectionNumber)
        .maybeSingle();

      if (sectionError || !sectionData) {
        console.error('Error loading section:', sectionError);
        return;
      }

      const part: Part = {
        id: sectionData.parts.id,
        part_number: sectionData.parts.part_number,
        title: sectionData.parts.title,
        description: sectionData.parts.description,
        color: sectionData.parts.color,
        icon: sectionData.parts.icon,
        order_index: sectionData.parts.order_index,
        created_at: sectionData.parts.created_at
      };

      const section: Section = {
        id: sectionData.id,
        part_id: sectionData.part_id,
        section_number: sectionData.section_number,
        title: sectionData.title,
        content: sectionData.content,
        content_html: sectionData.content_html,
        summary: sectionData.summary,
        summary_html: sectionData.summary_html,
        order_index: sectionData.order_index,
        created_at: sectionData.created_at
      };

      setView({ type: 'section', section, part });
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
      console.error('Error navigating to section:', error);
    }
  };

  return (
    <div className="min-h-screen">
      <Header
        onHomeClick={handleHome}
        onAboutClick={handleAbout}
        onFAQClick={handleFAQ}
        onContactClick={handleContact}
        onVideoLibraryClick={handleVideoLibrary}
        onFormsClick={handleForms}
        onBookkeepersClick={handleBookkeepers}
        onClioClick={handleClio}
        onSearch={handleSearch}
        showHome={view.type !== 'home'}
      />

      {view.type === 'home' && (
        <HomePage onPartSelect={handlePartSelect} />
      )}

      {view.type === 'part' && (
        <PartDetailPage
          part={view.part}
          onBack={handleHome}
          onSectionSelect={(section) => handleSectionSelect(section, view.part)}
          onVideoLibraryClick={() => handleVideoLibrary(view.part.part_number === 3 ? 'Cash Transactions' : undefined)}
        />
      )}

      {view.type === 'section' && (
        <SectionDetailPage
          section={view.section}
          part={view.part}
          onBack={() => handleBackToPart(view.part)}
          onSectionClick={handleSectionClickFromNumber}
          onPartClick={handlePartSelectByNumber}
        />
      )}

      {view.type === 'about' && (
        <AboutPage onBack={handleHome} />
      )}

      {view.type === 'faq' && (
        <FAQPage onBack={handleHome} onNavigateToSection={handleNavigateToSection} />
      )}

      {view.type === 'contact' && (
        <ContactPage onBack={handleHome} />
      )}

      {view.type === 'videos' && (
        <VideoLibraryPage onBack={handleHome} defaultCategory={view.defaultCategory} />
      )}

      {view.type === 'forms' && (
        <FormsPage onBack={handleHome} onSectionClick={handleSectionClickFromNumber} />
      )}

      {view.type === 'bookkeepers' && (
        <BookkeepersPage onBack={handleHome} onApplyClick={handleBookkeeperApplication} />
      )}

      {view.type === 'bookkeeper-application' && (
        <BookkeeperApplicationPage onBack={handleBookkeepers} />
      )}

      {view.type === 'clio' && (
        <ClioPage onBack={handleHome} />
      )}

      {view.type === 'search' && (
        <SearchResultsPage
          query={view.query}
          onBack={handleHome}
          onSectionSelect={(section, part) => handleSectionSelect(section, part)}
          onPartSelect={handlePartSelect}
        />
      )}

      <Footer
        onHomeClick={handleHome}
        onAboutClick={handleAbout}
        onFAQClick={handleFAQ}
        onContactClick={handleContact}
        onVideoLibraryClick={handleVideoLibrary}
        onFormsClick={handleForms}
        onBookkeepersClick={handleBookkeepers}
        onClioClick={handleClio}
      />
    </div>
  );
}

export default App;
