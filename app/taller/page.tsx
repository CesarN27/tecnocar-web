'use client';

import Image from "next/image";
import Link from "next/link";
import { Wrench, Settings, Target, ShieldCheck, Zap, Users, MessageCircle, Phone, MapPin, ArrowLeft, Cpu, Activity, Clock, CheckCircle2, BookOpen, ShoppingCart } from "lucide-react";import WhatsAppButton from "../components/WhatsAppButton";

export default function TallerPage() {
  
  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -20; 
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#0d0d0d] text-white font-sans selection:bg-[#f15a24] selection:text-white overflow-x-hidden">
      
      {/* 1. BANNER EDGE-TO-EDGE */}
      <header className="relative w-full h-[180px] sm:h-[40vh] lg:h-[50vh] bg-black">
        <Image 
          src="/tecnocar-banner.png" 
          alt="Tecnocar Pro" 
          fill
          // El secreto está aquí: object-contain en móvil, object-cover en PC
          className="object-contain sm:object-cover object-center opacity-90"
          priority
        />
        <div className="absolute inset-x-0 bottom-0 h-16 sm:h-24 bg-gradient-to-t from-[#0d0d0d] to-transparent pointer-events-none"></div>
      </header>

      {/* NAVEGACIÓN MODIFICADA */}
      <nav className="sticky top-0 w-full z-50 bg-[#0d0d0d]/90 backdrop-blur-md border-y border-white/5 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="flex justify-between items-center h-16 md:h-20">
            
            {/* Botón Volver (Izquierda) */}
            <div className="flex-1 flex items-center justify-start z-10">
              <Link href="/" className="group flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm font-semibold"> 
                <div className="bg-white/5 p-1.5 rounded-md border border-white/10 group-hover:bg-white/10 group-hover:border-white/30 transition-all">
                  <ArrowLeft size={16} />
                </div>
                <span className="hidden sm:inline">Volver</span>
              </Link>
            </div>

            {/* Enlaces Internos (Centro) */}
            <div className="hidden md:flex space-x-8 text-sm font-medium text-gray-400 absolute left-1/2 transform -translate-x-1/2 z-20">
              <a href="#inicio" onClick={(e) => scrollToSection(e, 'inicio')} className="hover:text-[#f15a24] transition-colors">Inicio</a>
              <a href="#servicios" onClick={(e) => scrollToSection(e, 'servicios')} className="hover:text-[#f15a24] transition-colors">Servicios</a>
              <a href="#elegirnos" onClick={(e) => scrollToSection(e, 'elegirnos')} className="hover:text-[#f15a24] transition-colors">¿Por qué elegirnos?</a>
              <a href="#contacto" onClick={(e) => scrollToSection(e, 'contacto')} className="hover:text-[#f15a24] transition-colors">Contacto</a>
            </div>
            
            {/* Espaciador invisible para mantener el centro exacto (Derecha) */}
            <div className="flex-1 flex justify-end z-10">
              {/* Dejamos este espacio vacío para que el flexbox mantenga el menú centrado */}
            </div>

          </div>
        </div>
      </nav>

      {/* HERO SECTION (Se agregó id="inicio") */}
      <div id="inicio" className="relative w-full pt-16 pb-12 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#2a1a14]/50 via-[#0d0d0d] to-[#0d0d0d] scroll-mt-20">
        <main className="relative text-center px-4 max-w-5xl mx-auto mt-8 relative z-20">
          <div className="inline-block mb-4 px-4 py-1.5 rounded-full bg-[#f15a24]/10 border border-[#f15a24]/20 text-[#f15a24] text-sm font-semibold tracking-wider uppercase">
             Especialistas en electrónica automotriz
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 leading-tight">
            Reparación de <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#f15a24] to-[#ff8c42] drop-shadow-sm">Computadoras</span> <br />
            y Módulos Automotrices
          </h1>
          <p className="mt-6 text-lg md:text-xl text-gray-400 max-w-3xl mx-auto font-light leading-relaxed">
            Diagnóstico y reparación experta de ECU, módulos electrónicos y transmisiones automáticas con tecnología de punta.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4 sm:gap-6 relative z-20">
            <a href="https://wa.me/524423656200" target="_blank" rel="noreferrer" className="bg-[#f15a24] hover:bg-[#d14d1e] text-white px-8 py-4 rounded-xl font-bold flex justify-center items-center gap-2 transition-all hover:shadow-[0_0_20px_rgba(241,90,36,0.4)] hover:-translate-y-1">
              AGENDA TU CITA
            </a>
            <a href="#servicios" onClick={(e) => scrollToSection(e, 'servicios')} className="bg-white/5 border border-white/10 hover:border-white/30 hover:bg-white/10 text-white px-8 py-4 rounded-xl font-bold transition-all hover:-translate-y-1">
              VER SERVICIOS
            </a>
          </div>
        </main>
      </div>

      {/* NUESTROS SERVICIOS */}
      <section id="servicios" className="py-24 px-4 max-w-7xl mx-auto scroll-mt-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold">
             Nuestros <span className="text-[#f15a24]">Servicios</span>
          </h2>
          <div className="w-24 h-1 bg-[#f15a24] mx-auto mt-6 rounded-full"></div>
          <p className="text-gray-400 mt-6 text-lg max-w-2xl mx-auto">Soluciones Especializadas y Venta de Equipo</p>
        </div>

        {/* Modificamos el grid para que en desktop sean 3 columnas (lg:grid-cols-3) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="bg-[#111111] border border-[#222] rounded-3xl p-8 hover:border-[#f15a24]/50 transition-colors duration-300 flex flex-col group">
            <div className="bg-[#24130a] w-14 h-14 rounded-2xl flex items-center justify-center mb-6 border border-[#f15a24]/20 group-hover:border-[#f15a24]">
              <Zap className="text-[#f15a24]" size={28} />
            </div>
            <h3 className="text-2xl font-bold mb-3 text-white">Electrónica Automotriz</h3>
            <p className="text-gray-400 text-base leading-relaxed">
              Diagnóstico y reparación de sistemas electrónicos, sensores, actuadores y cableado completo del vehículo.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-[#111111] border border-[#222] rounded-3xl p-8 hover:border-[#f15a24]/50 transition-colors duration-300 flex flex-col group">
            <div className="bg-[#24130a] w-14 h-14 rounded-2xl flex items-center justify-center mb-6 border border-[#f15a24]/20 group-hover:border-[#f15a24]">
              <Cpu className="text-[#f15a24]" size={28} />
            </div>
            <h3 className="text-2xl font-bold mb-3 text-white">Computadoras y Módulos</h3>
            <p className="text-gray-400 text-base leading-relaxed">
              Reparación y reprogramación de ECU, BCM, TCM y todo tipo de módulos electrónicos automotrices.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-[#111111] border border-[#222] rounded-3xl p-8 hover:border-[#f15a24]/50 transition-colors duration-300 flex flex-col group">
            <div className="bg-[#24130a] w-14 h-14 rounded-2xl flex items-center justify-center mb-6 border border-[#f15a24]/20 group-hover:border-[#f15a24]">
              <Settings className="text-[#f15a24]" size={28} />
            </div>
            <h3 className="text-2xl font-bold mb-3 text-white">Transmisiones Automáticas</h3>
            <p className="text-gray-400 text-base leading-relaxed">
              Diagnóstico especializado de transmisiones automáticas de todas las marcas.
            </p>
          </div>

          {/* Card 4 */}
          <div className="bg-[#111111] border border-[#222] rounded-3xl p-8 hover:border-[#f15a24]/50 transition-colors duration-300 flex flex-col group">
            <div className="bg-[#24130a] w-14 h-14 rounded-2xl flex items-center justify-center mb-6 border border-[#f15a24]/20 group-hover:border-[#f15a24]">
              <Activity className="text-[#f15a24]" size={28} />
            </div>
            <h3 className="text-2xl font-bold mb-3 text-white">Diagnóstico Avanzado</h3>
            <p className="text-gray-400 text-base leading-relaxed">
              Escáner profesional de última generación para localizar fallas con precisión y rapidez.
            </p>
          </div>

          {/* NUEVA: Card 5 */}
          <div className="bg-[#111111] border border-[#222] rounded-3xl p-8 hover:border-[#f15a24]/50 transition-colors duration-300 flex flex-col group">
            <div className="bg-[#24130a] w-14 h-14 rounded-2xl flex items-center justify-center mb-6 border border-[#f15a24]/20 group-hover:border-[#f15a24]">
              <BookOpen className="text-[#f15a24]" size={28} />
            </div>
            <h3 className="text-2xl font-bold mb-3 text-white">Venta de Diagramas Automotrices</h3>
            <p className="text-gray-400 text-base leading-relaxed">
              Amplio catálogo de diagramas eléctricos, pinouts y manuales de reparación de fábrica para múltiples marcas.
            </p>
          </div>

          {/* NUEVA: Card 6 */}
          <div className="bg-[#111111] border border-[#222] rounded-3xl p-8 hover:border-[#f15a24]/50 transition-colors duration-300 flex flex-col group">
            <div className="bg-[#24130a] w-14 h-14 rounded-2xl flex items-center justify-center mb-6 border border-[#f15a24]/20 group-hover:border-[#f15a24]">
              <ShoppingCart className="text-[#f15a24]" size={28} />
            </div>
            <h3 className="text-2xl font-bold mb-3 text-white">Venta de Equipo Especializado</h3>
            <p className="text-gray-400 text-base leading-relaxed">
              Surtimos computadoras (ECU), módulos, sensores, actuadores y equipo de diagnóstico de alta calidad.
            </p>
          </div>
        </div>
      </section>

      {/* POR QUÉ ELEGIRNOS & ESTADÍSTICAS (Se agregó id="elegirnos") */}
      <section id="elegirnos" className="bg-[#0a0a0a] py-24 px-4 border-y border-white/5 scroll-mt-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold">
               ¿Por qué <span className="text-[#f15a24]">elegirnos?</span>
            </h2>
            <div className="w-24 h-1 bg-[#f15a24] mx-auto mt-6 rounded-full"></div>
            <h3 className="text-xl md:text-2xl font-semibold mt-8 text-white">Experiencia y Tecnología al Servicio de tu Vehículo</h3>
            <p className="text-gray-400 mt-4 text-lg max-w-4xl mx-auto leading-relaxed">
              Contamos con años de experiencia en electrónica automotriz, equipo de diagnóstico de última generación y técnicos altamente capacitados. Nos especializamos en lo que otros talleres no pueden resolver.
            </p>
          </div>

          {/* Estadísticas */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-12 border-b border-white/5 mb-12">
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-b from-[#f15a24] to-[#ff8c42]">15+</div>
              <div className="text-sm text-gray-400 mt-2 font-bold uppercase tracking-wide">Años de experiencia</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-b from-[#f15a24] to-[#ff8c42]">5000+</div>
              <div className="text-sm text-gray-400 mt-2 font-bold uppercase tracking-wide">Vehículos reparados</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-b from-[#f15a24] to-[#ff8c42]">100%</div>
              <div className="text-sm text-gray-400 mt-2 font-bold uppercase tracking-wide">Garantía en trabajos</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-b from-[#f15a24] to-[#ff8c42]">24h</div>
              <div className="text-sm text-gray-400 mt-2 font-bold uppercase tracking-wide">Diagnóstico rápido</div>
            </div>
          </div>

          {/* Puntos Extra */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <div className="flex items-center gap-4 bg-[#111] p-5 rounded-2xl border border-white/5">
              <CheckCircle2 className="text-[#f15a24] shrink-0" size={24} />
              <span className="text-gray-300 font-medium">Escáner profesional multimarca</span>
            </div>
            <div className="flex items-center gap-4 bg-[#111] p-5 rounded-2xl border border-white/5">
              <CheckCircle2 className="text-[#f15a24] shrink-0" size={24} />
              <span className="text-gray-300 font-medium">Reprogramación y clonación de ECU</span>
            </div>
            <div className="flex items-center gap-4 bg-[#111] p-5 rounded-2xl border border-white/5">
              <CheckCircle2 className="text-[#f15a24] shrink-0" size={24} />
              <span className="text-gray-300 font-medium">Reparación de circuitos y soldadura SMD</span>
            </div>
            <div className="flex items-center gap-4 bg-[#111] p-5 rounded-2xl border border-white/5">
              <CheckCircle2 className="text-[#f15a24] shrink-0" size={24} />
              <span className="text-gray-300 font-medium">Reparación de transmisiones automáticas</span>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER & CONTACTO (El id="contacto" ya estaba) */}
      <footer id="contacto" className="bg-[#111111] pt-20 pb-8 px-4 relative overflow-hidden">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md h-1/2 bg-[#f15a24]/10 blur-[120px] rounded-full pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 mb-16 relative z-10">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Contáctanos</h2>
            <h3 className="text-xl text-[#f15a24] mb-6">¿Tienes una falla eléctrica?</h3>
            <p className="text-gray-400 mb-8 max-w-md">No dejes tu vehículo en manos de cualquiera. Contáctanos hoy mismo y recibe el diagnóstico experto que necesitas.</p>
            <a href="https://wa.me/524423656200" target="_blank" rel="noreferrer" className="inline-flex bg-[#25D366] hover:bg-[#1ebd57] text-white px-8 py-4 rounded-xl font-bold items-center gap-2 transition-all">
              <MessageCircle size={22} /> CONTACTAR POR WHATSAPP
            </a>
          </div>
          
          <div className="bg-[#0a0a0a] p-8 rounded-3xl border border-white/5">
            <ul className="space-y-6 text-gray-300">
              <li className="flex items-start gap-4">
                <div className="bg-[#24130a] p-3 rounded-xl text-[#f15a24]"><Phone size={24} /></div>
                <div>
                  <p className="text-sm text-gray-500 font-bold uppercase tracking-wider mb-1">Teléfono</p>
                  <p className="text-lg">(442) 365-6200</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="bg-[#24130a] p-3 rounded-xl text-[#f15a24]"><MapPin size={24} /></div>
                <div>
                  <p className="text-sm text-gray-500 font-bold uppercase tracking-wider mb-1">Dirección</p>
                  <p className="text-lg">37906, Buenos Aires, 37906 San Luis de la Paz, Gto.</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="bg-[#24130a] p-3 rounded-xl text-[#f15a24]"><Clock size={24} /></div>
                <div>
                  <p className="text-sm text-gray-500 font-bold uppercase tracking-wider mb-1">Horario</p>
                  <p className="text-lg">Lun - Vie 9:00 - 18:00</p>
                  <p className="text-lg">Sáb 9:00 - 14:00</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center border-t border-white/10 pt-8 gap-4">
          <div className="font-black italic text-xl tracking-wider text-white">
            AUTOTRÓNICA
          </div>
          <div className="text-sm text-gray-500 font-medium">
            © 2026 AutoTrónica. Todos los derechos reservados.
          </div>
        </div>
      </footer>

      <WhatsAppButton phoneNumber="4423656200" message="Hola, necesito información sobre reparación electrónica automotriz." />
      
    </div>
  );
}