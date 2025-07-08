import React, { useEffect, useRef } from 'react';

const SmoothScroll = ({ children }) => {
  // Smooth scroll container referansı
  const scrollContainerRef = useRef(null);
  // Gerçek scroll pozisyonu
  const actualScrollRef = useRef(0);
  // Hedef scroll pozisyonu
  const targetScrollRef = useRef(0);
  // Animasyon frame referansı
  const rafRef = useRef(null);
  // Yumuşatma faktörü - daha büyük değer daha yavaş animasyon
  const smoothFactor = 0.1;
  
  useEffect(() => {
    // Scroll container'ı oluştur
    const scrollContainer = scrollContainerRef.current;
    const body = document.body;
    
    // Body'nin orijinal stilini sakla
    const originalOverflow = body.style.overflow;
    const originalHeight = body.style.height;
    
    // Body'yi sabit yap
    body.style.overflow = 'hidden';
    body.style.height = '100vh';
    
    // Scroll container'ın yüksekliğini ayarla
    const setBodyHeight = () => {
      if (scrollContainer) {
        const scrollHeight = scrollContainer.scrollHeight;
        body.style.height = `${scrollHeight}px`;
      }
    };
    
    // Scroll işleyicisi
    const handleScroll = () => {
      targetScrollRef.current = window.scrollY;
    };
    
    // Animasyon fonksiyonu
    const smoothScroll = () => {
      // Mevcut ve hedef scroll pozisyonu arasındaki fark
      const diff = targetScrollRef.current - actualScrollRef.current;
      
      // Yumuşatılmış scroll pozisyonu
      actualScrollRef.current += diff * smoothFactor;
      
      // Scroll container'ı güncelle
      if (scrollContainer) {
        scrollContainer.style.transform = `translateY(-${actualScrollRef.current}px)`;
      }
      
      // Animasyonu devam ettir
      rafRef.current = requestAnimationFrame(smoothScroll);
    };
    
    // Resize işleyicisi
    const handleResize = () => {
      setBodyHeight();
    };
    
    // Event listener'ları ekle
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
    
    // İlk yüksekliği ayarla
    setBodyHeight();
    
    // Animasyonu başlat
    rafRef.current = requestAnimationFrame(smoothScroll);
    
    // Temizleme fonksiyonu
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      
      // Body stilini geri yükle
      body.style.overflow = originalOverflow;
      body.style.height = originalHeight;
    };
  }, []);
  
  return (
    <div 
      ref={scrollContainerRef} 
      className="fixed top-0 left-0 w-full will-change-transform"
      style={{ 
        backfaceVisibility: 'hidden',
        transformStyle: 'preserve-3d'
      }}
    >
      {children}
    </div>
  );
};

export default SmoothScroll; 