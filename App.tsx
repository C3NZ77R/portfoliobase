import { useState, useEffect, useCallback } from 'react';
import { flushSync } from 'react-dom';
import ErrorBoundary from './components/ErrorBoundary';
import { BentoCard } from './components/BentoCard';
import { DetailView } from './components/DetailView';
import { AnimatePresence, motion } from 'framer-motion';

// Import extracted components
import { MapContent } from './components/Globe';
import {
  IntroContent,
  SocialsContent,
  TechStackContent,
  AboutContent,
  EducationContent,
  ContactContent,
  ProjectsTriggerContent,
} from './components/CardContents';
import { LanguageSwitcher } from './components/LanguageSwitcher';

import { LanguageTransition, LanguageContentWrapper } from './components/LanguageTransition';

// Import i18n
import { LanguageProvider, useLanguage } from './i18n/LanguageContext';

// Import types
import type { BentoItem } from './types';

type DocumentWithViewTransition = Document & {
  startViewTransition?: (update: () => void) => { finished: Promise<void> };
};

// ----- MAIN APP CONTENT -----

function AppContent() {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [copiedText, setCopiedText] = useState<string | null>(null);

  const [isLanguageChanging, setIsLanguageChanging] = useState(false);

  const { t, language } = useLanguage();

  /**
   * Handles the language change animation by setting the changing state
   * and resetting it after the animation duration.
   */
  const handleLanguageChange = () => {
    setIsLanguageChanging(true);
    setTimeout(() => {
      setIsLanguageChanging(false);
    }, 700);
  };

  // Theme initialization - site is now permanently dark
  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  // When opening a section, scroll page to top so the section is in frame (fixes mobile when user had scrolled down)
  useEffect(() => {
    if (activeSection) {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }
  }, [activeSection]);


  /**
   * Copies the provided text to the clipboard and shows a temporary success message.
   * @param text - The text to copy
   * @param label - The label for the copied text (for display purposes)
   */
  const copyToClipboard = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedText(label);
      setTimeout(() => setCopiedText(null), 2000);
    } catch (error) {
      console.error('Failed to copy to clipboard:', error);
      // Fallback: could show an alert or toast
      alert('Failed to copy to clipboard. Please try again.');
    }
  };

  const runViewTransition = useCallback((update: () => void) => {
    const doc = document as DocumentWithViewTransition;
    if (typeof doc.startViewTransition === 'function') {
      doc.startViewTransition(() => {
        flushSync(update);
      });
      return;
    }
    update();
  }, []);

  const closeSection = useCallback(() => {
    runViewTransition(() => setActiveSection(null));
  }, [runViewTransition]);

  const openSection = useCallback((sectionType: string) => {
    runViewTransition(() => setActiveSection(sectionType));
  }, [runViewTransition]);

  // Static items configuration
  const items: BentoItem[] = [
    { id: 'intro', colSpan: 'col-span-2 sm:col-span-2' },
    { id: 'photo', colSpan: 'col-span-1', bgImage: "/profile.png" },
    { id: 'socials', colSpan: 'col-span-1' },
    { id: 'about', colSpan: 'col-span-1', hasArrow: true, onClickModal: 'about' },
    { id: 'stack', colSpan: 'col-span-3 sm:col-span-3', hasArrow: true, onClickModal: 'stack' },
    { id: 'education', colSpan: 'col-span-1', hasArrow: true, onClickModal: 'education' },
    { id: 'projects', colSpan: 'col-span-2 sm:col-span-2', hasArrow: true, onClickModal: 'projects' },
    { id: 'map', colSpan: 'col-span-1', noPadding: true },
  ];


  /**
   * Renders the appropriate content component based on the card item ID.
   * @param itemId - The unique identifier for the card item
   * @returns The React component to render for the card
   */
  const renderCardContent = (itemId: string) => {
    switch (itemId) {
      case 'intro':
        return <IntroContent />;
      case 'socials':
        return <SocialsContent />;
      case 'stack':
        return <TechStackContent />;
      case 'about':
        return <AboutContent />;
      case 'education':
        return <EducationContent />;
      case 'projects':
        return <ProjectsTriggerContent />;
      case 'contact':
        return <ContactContent copyToClipboard={copyToClipboard} copiedText={copiedText} />;

      case 'map':
        return <MapContent theme="dark" />;
      default:
        return null;
    }
  };

  /**
   * Gets the translated title for a card based on its ID.
   * @param itemId - The unique identifier for the card item
   * @returns The translated title string or undefined if no title
   */
  const getCardTitle = (itemId: string) => {
    switch (itemId) {
      case 'stack':
        return t('techStackTitle');
      case 'about':
        return t('aboutTitle');
      case 'experience':
        return t('experienceTitle');
      case 'education':
        return t('educationTitle');
      case 'projects':
        return t('projectsTriggerTitle');
      default:
        return undefined;

    }
  };

  return (
    <div
      className={`min-h-screen text-text-main p-4 pt-8 md:p-6 md:pt-12 font-sans selection:bg-primary selection:text-primary-fg transition-colors duration-500 overflow-x-hidden flex flex-col items-center ${activeSection ? 'overflow-y-hidden' : ''}`}
    >
      {/* Language Transition Effect */}
      <LanguageTransition isActive={isLanguageChanging} language={language} />

      {/* Language Switcher */}
      <LanguageSwitcher onLanguageChange={handleLanguageChange} />


      <LanguageContentWrapper isChanging={isLanguageChanging}>
        <div className={`w-full max-w-[1320px] mx-auto pb-24 sm:pb-6 ${activeSection ? 'flex-1 flex flex-col min-h-0' : ''}`}>

          <AnimatePresence mode="wait" initial={false}>
            {activeSection ? (
              <motion.div
                key={`section-${activeSection}`}
                initial={{ opacity: 0.01, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 6 }}
                transition={{ duration: 0.16, ease: 'easeOut' }}
                className="flex-1 flex flex-col min-h-0 w-full pb-24 sm:pb-0"
                style={{ viewTransitionName: 'expanded-section' }}
              >
                <DetailView onClose={closeSection} type={activeSection} />
              </motion.div>
            ) : (
              <motion.div
                key="grid"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.22 }}
                className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5 auto-rows-[152px] sm:auto-rows-[190px] md:auto-rows-[237px] grid-flow-row-dense"
                style={{ viewTransitionName: 'bento-grid' }}
              >
                {items.map((item, index) => (
                  <BentoCard
                    key={item.id}
                    dataId={item.id}
                    index={index}
                    className={`${item.colSpan} ${item.rowSpan || ''} h-full`}
                    title={getCardTitle(item.id)}
                    backgroundImage={item.bgImage}
                    hasArrow={item.hasArrow}
                    onClick={
                      item.onClickModal
                        ? () => openSection(item.onClickModal!)
                        : undefined
                    }
                    noPadding={item.noPadding}
                  >
                    {renderCardContent(item.id)}
                  </BentoCard>
                ))}
              </motion.div>
            )}
          </AnimatePresence>


          {/* Footer */}
          {!activeSection && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 0.5, y: 0 }}
              transition={{ duration: 0.6, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="mt-12 flex flex-col md:flex-row justify-center items-center text-text-muted text-xs font-medium uppercase tracking-wider gap-4 md:gap-8"
            >
              <p>{t('copyright').replace('{year}', String(new Date().getFullYear()))}</p>
              <div className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse"></div>
                <p>{t('role')}</p>
              </div>
            </motion.div>
          )}
        </div>
      </LanguageContentWrapper>
    </div>
  );
}

// ----- MAIN APP WITH PROVIDER -----

function App() {
  return (
    <ErrorBoundary>
      <LanguageProvider>
        <AppContent />
      </LanguageProvider>
    </ErrorBoundary>
  );
}

export default App;
