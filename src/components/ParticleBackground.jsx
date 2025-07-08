import React, { useEffect, useRef } from 'react';
import { useTheme } from '../contexts/ThemeContext';

const ParticleBackground = () => {
  const canvasRef = useRef(null);
  const { darkMode } = useTheme();
  
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let particles = [];
    
    // Canvas boyutunu ayarla
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    window.addEventListener('resize', handleResize);
    handleResize();
    
    // Parçacık sınıfı
    class Particle {
      constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 3 + 1;
        this.speedX = Math.random() * 1 - 0.5;
        this.speedY = Math.random() * 1 - 0.5;
        this.color = darkMode === 'dark' 
          ? `rgba(${148 + Math.random() * 50}, ${116 + Math.random() * 50}, ${255 * Math.random()}, ${0.2 + Math.random() * 0.3})` 
          : `rgba(${59 + Math.random() * 50}, ${130 + Math.random() * 50}, ${246 * Math.random()}, ${0.2 + Math.random() * 0.3})`;
      }
      
      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        
        // Sınırları kontrol et
        if (this.x > canvas.width || this.x < 0) {
          this.speedX = -this.speedX;
        }
        
        if (this.y > canvas.height || this.y < 0) {
          this.speedY = -this.speedY;
        }
      }
      
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
      }
    }
    
    // Parçacıkları oluştur
    const createParticles = () => {
      const particleCount = Math.min(window.innerWidth / 10, 100); // Ekran genişliğine göre parçacık sayısı
      particles = [];
      
      for (let i = 0; i < particleCount; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        particles.push(new Particle(x, y));
      }
    };
    
    // Parçacıklar arasında çizgiler çiz
    const connectParticles = () => {
      const maxDistance = 150;
      
      for (let i = 0; i < particles.length; i++) {
        for (let j = i; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < maxDistance) {
            const opacity = 1 - distance / maxDistance;
            ctx.beginPath();
            ctx.strokeStyle = darkMode === 'dark' 
              ? `rgba(148, 116, 255, ${opacity * 0.15})` 
              : `rgba(59, 130, 246, ${opacity * 0.15})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
    };
    
    // Animasyon döngüsü
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      for (const particle of particles) {
        particle.update();
        particle.draw();
      }
      
      connectParticles();
      animationFrameId = requestAnimationFrame(animate);
    };
    
    createParticles();
    animate();
    
    // Temizleme
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [darkMode]);
  
  return (
    <canvas 
      ref={canvasRef} 
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-0"
      style={{ opacity: 0.6 }}
    />
  );
};

export default ParticleBackground; 