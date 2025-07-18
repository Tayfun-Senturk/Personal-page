import React, { useEffect, useRef, useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';

const ParticleBackground = () => {
  const canvasRef = useRef(null);
  const { darkMode } = useTheme();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let particles = [];
    let mouse = { x: 0, y: 0, radius: 150 };
    
    // Mouse movement tracking
    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    // Canvas boyutunu ayarla
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    window.addEventListener('resize', handleResize);
    handleResize();
    
    // Enhanced Particle class
    class Particle {
      constructor(x, y) {
        this.x = x;
        this.y = y;
        this.originalX = x;
        this.originalY = y;
        this.size = Math.random() * 3 + 1;
        this.speedX = (Math.random() - 0.5) * 1.5;
        this.speedY = (Math.random() - 0.5) * 1.5;
        this.color = darkMode === 'dark' 
          ? `rgba(${148 + Math.random() * 50}, ${116 + Math.random() * 50}, ${255 * Math.random()}, ${0.3 + Math.random() * 0.4})` 
          : `rgba(${59 + Math.random() * 50}, ${130 + Math.random() * 50}, ${246 * Math.random()}, ${0.3 + Math.random() * 0.4})`;
        this.pulsePhase = Math.random() * Math.PI * 2;
        this.pulseSpeed = 0.02 + Math.random() * 0.02;
        this.magnetism = 0.3 + Math.random() * 0.7;
      }
      
      update() {
        // Mouse interaction
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < mouse.radius) {
          const force = (mouse.radius - distance) / mouse.radius;
          const angle = Math.atan2(dy, dx);
          this.x -= Math.cos(angle) * force * this.magnetism * 2;
          this.y -= Math.sin(angle) * force * this.magnetism * 2;
        } else {
          // Return to original position gradually
          this.x += (this.originalX - this.x) * 0.01;
          this.y += (this.originalY - this.y) * 0.01;
        }
        
        // Natural movement
        this.x += this.speedX;
        this.y += this.speedY;
        
        // Bounce off edges
        if (this.x > canvas.width || this.x < 0) {
          this.speedX = -this.speedX;
        }
        
        if (this.y > canvas.height || this.y < 0) {
          this.speedY = -this.speedY;
        }
        
        // Update pulse phase
        this.pulsePhase += this.pulseSpeed;
      }
      
      draw() {
        // Pulsating effect
        const pulse = Math.sin(this.pulsePhase) * 0.5 + 1;
        const currentSize = this.size * pulse;
        
        // Distance-based opacity for mouse interaction
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const opacity = distance < mouse.radius ? 
          (1 - distance / mouse.radius) * 0.8 + 0.2 : 0.4;
        
        // Draw particle with glow effect
        ctx.save();
        ctx.globalAlpha = opacity;
        
        // Outer glow
        ctx.beginPath();
        ctx.arc(this.x, this.y, currentSize * 2, 0, Math.PI * 2);
        ctx.fillStyle = this.color.replace(/[\d\.]+\)$/g, '0.1)');
        ctx.fill();
        
        // Inner particle
        ctx.beginPath();
        ctx.arc(this.x, this.y, currentSize, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        
        ctx.restore();
      }
    }
    
    // Enhanced connection system
    class Connection {
      constructor(p1, p2, distance) {
        this.p1 = p1;
        this.p2 = p2;
        this.distance = distance;
        this.maxDistance = 180;
        this.pulsePhase = Math.random() * Math.PI * 2;
        this.pulseSpeed = 0.01 + Math.random() * 0.01;
      }
      
      update() {
        const dx = this.p1.x - this.p2.x;
        const dy = this.p1.y - this.p2.y;
        this.distance = Math.sqrt(dx * dx + dy * dy);
        this.pulsePhase += this.pulseSpeed;
      }
      
      draw() {
        if (this.distance < this.maxDistance) {
          const opacity = (1 - this.distance / this.maxDistance) * 0.4;
          const pulse = Math.sin(this.pulsePhase) * 0.3 + 0.7;
          
          // Gradient line
          const gradient = ctx.createLinearGradient(
            this.p1.x, this.p1.y, this.p2.x, this.p2.y
          );
          
          if (darkMode === 'dark') {
            gradient.addColorStop(0, `rgba(148, 116, 255, ${opacity * pulse})`);
            gradient.addColorStop(0.5, `rgba(236, 72, 153, ${opacity * pulse * 0.8})`);
            gradient.addColorStop(1, `rgba(59, 130, 246, ${opacity * pulse * 0.6})`);
          } else {
            gradient.addColorStop(0, `rgba(59, 130, 246, ${opacity * pulse})`);
            gradient.addColorStop(0.5, `rgba(147, 51, 234, ${opacity * pulse * 0.8})`);
            gradient.addColorStop(1, `rgba(236, 72, 153, ${opacity * pulse * 0.6})`);
          }
          
          ctx.beginPath();
          ctx.strokeStyle = gradient;
          ctx.lineWidth = 0.8 * pulse;
          ctx.moveTo(this.p1.x, this.p1.y);
          ctx.lineTo(this.p2.x, this.p2.y);
          ctx.stroke();
        }
      }
    }
    
    let connections = [];
    
    // Create particles with enhanced distribution
    const createParticles = () => {
      const particleCount = Math.min(Math.floor(window.innerWidth / 15), 80);
      particles = [];
      
      for (let i = 0; i < particleCount; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        particles.push(new Particle(x, y));
      }
      
      // Create connections
      connections = [];
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 180) {
            connections.push(new Connection(particles[i], particles[j], distance));
          }
        }
      }
    };
    
    // Enhanced animation loop
    const animate = () => {
      // Clear with subtle fade effect
      ctx.fillStyle = darkMode === 'dark' 
        ? 'rgba(26, 26, 31, 0.05)' 
        : 'rgba(255, 255, 255, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Update and draw connections
      connections.forEach(connection => {
        connection.update();
        connection.draw();
      });
      
      // Update and draw particles
      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });
      
      // Mouse interaction indicator
      if (mouse.x && mouse.y) {
        ctx.save();
        ctx.globalAlpha = 0.1;
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, mouse.radius, 0, Math.PI * 2);
        ctx.fillStyle = darkMode === 'dark' 
          ? 'rgba(148, 116, 255, 0.1)' 
          : 'rgba(59, 130, 246, 0.1)';
        ctx.fill();
        ctx.restore();
      }
      
      animationFrameId = requestAnimationFrame(animate);
    };
    
    createParticles();
    animate();
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [darkMode]);
  
  return (
    <canvas 
      ref={canvasRef} 
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-0"
      style={{ opacity: 0.7 }}
    />
  );
};

export default ParticleBackground; 