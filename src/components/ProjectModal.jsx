import React, { useEffect, useRef } from 'react';
import { useTheme } from '../contexts/ThemeContext';

const ProjectModal = ({ project, isOpen, onClose }) => {
  const { darkMode } = useTheme();
  const modalRef = useRef(null);
  const closeButtonRef = useRef(null);
  const titleId = 'project-modal-title';
  const openerRef = useRef(document.activeElement);
  
  // ESC tuşu ile kapatma
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    
    if (isOpen) {
      document.addEventListener('keydown', handleEsc);
    }
    
    return () => {
      document.removeEventListener('keydown', handleEsc);
    };
  }, [isOpen, onClose]);
  
  // Modal dışına tıklama ile kapatma
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        onClose();
      }
    };
    
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);
  
  // Scroll engelleme ve focus trap
  useEffect(() => {
    if (isOpen) {
      openerRef.current = document.activeElement;
      document.body.style.overflow = 'hidden';
      // İlk odağı kapat tuşuna ver
      setTimeout(() => closeButtonRef.current?.focus(), 0);
    } else {
      document.body.style.overflow = 'auto';
      // Odağı açan elemana geri ver
      openerRef.current && openerRef.current.focus?.();
    }
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  // Focus trap: Tab ile odağı modal içinde döndür
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key !== 'Tab') return;
      const focusable = modalRef.current?.querySelectorAll(
        'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
      );
      if (!focusable || focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);
  
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" role="dialog" aria-modal="true" aria-labelledby={titleId}>
      <div 
        ref={modalRef}
        className="bg-white dark:bg-dark-100 rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden animate-fade-in"
      >
        <div className="relative">
          <img 
            src={`/${project.imageLink}`}
            alt={project.projectTitle}
            className="w-full h-64 sm:h-80 object-cover"
          />
          
          {/* Kapatma butonu */}
          <button 
            onClick={onClose}
            ref={closeButtonRef}
            className="absolute top-4 right-4 w-10 h-10 bg-white/80 dark:bg-dark-200/80 rounded-full flex items-center justify-center text-gray-800 dark:text-gray-200 hover:bg-white dark:hover:bg-dark-200 transition-all duration-300 backdrop-blur-sm"
            aria-label="Close modal"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          
          {/* Teknoloji etiketleri */}
          <div className="absolute bottom-4 left-4 flex flex-wrap gap-2">
            {project.tech.map((tech, techIndex) => (
              <span
                key={techIndex}
                className="px-3 py-1 text-sm font-medium text-white bg-primary-600/80 dark:bg-secondary-500/80 backdrop-blur-sm rounded-full transform hover:scale-110 transition-all duration-300"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
        
        <div className="p-6 sm:p-8 overflow-y-auto max-h-[calc(90vh-20rem)]">
          <h2 id={titleId} className="text-3xl sm:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-700 to-secondary-600 dark:from-primary-400 dark:to-secondary-300 mb-4">
            {project.projectTitle}
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            {project.projectDesc}
          </p>
          <div className="flex flex-wrap gap-4 mt-8">
            <a
              href={project.repoLink}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center px-6 py-3 bg-primary-700 dark:bg-dark-200 text-white dark:text-gray-200 rounded-lg hover:bg-primary-600 dark:hover:bg-dark-300 transition-all duration-300"
            >
              <svg className="w-5 h-5 mr-2 transition-transform duration-300 group-hover:rotate-12" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              <span>{project.repo}</span>
            </a>
            {project.siteLink && (
              <a
                href={project.siteLink}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center px-6 py-3 border-2 border-primary-700 dark:border-secondary-400 text-primary-700 dark:text-secondary-300 rounded-lg hover:bg-primary-50 dark:hover:bg-dark-300/50 transition-all duration-300"
              >
                <svg className="w-5 h-5 mr-2 transition-transform duration-300 group-hover:rotate-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
                </svg>
                <span>{project.siteLabel}</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectModal; 