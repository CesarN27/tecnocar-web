'use client';

import Image from "next/image";
import Link from "next/link";
import { GraduationCap, Wrench, ArrowRight } from "lucide-react";
import WhatsAppButton from "./components/WhatsAppButton";

export default function EntryPage() {
  return (
    // Usamos flex flex-col y min-h-screen para obligar a que ocupe exactamente el 100% de la pantalla
    <div className="min-h-screen flex flex-col bg-[#0d0d0d] text-white font-sans selection:bg-[#f15a24] selection:text-white relative overflow-hidden">
      
      {/* Fondo con overlay sutil */}
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
        <Image 
          src="/tecnocar-banner.jpg.jpg" 
          alt="Tecnocar Pro Background" 
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Header (shrink-0 evita que se aplaste si la pantalla es muy pequeña) */}
      <header className="relative z-10 w-full pt-8 pb-6 text-center border-b border-white/5 bg-[#0d0d0d]/80 backdrop-blur-sm shrink-0">
        <div className="text-4xl md:text-5xl font-black text-white italic tracking-wider drop-shadow-md">
          TECNO<span className="text-[#f15a24]">CAR</span> PRO
        </div>
        <p className="text-gray-500 mt-2 text-sm tracking-widest uppercase font-bold">Líderes en Tecnología Automotriz</p>
      </header>

      {/* Contenedor Principal (flex-1 le dice "toma todo el espacio sobrante") */}
      <main className="relative z-10 flex-1 flex flex-col md:flex-row items-center justify-center gap-6 md:gap-10 p-4 md:p-8">
        
        {/* Lado Izquierdo: ESCUELA */}
        <div className="flex-1 w-full max-w-md lg:max-w-lg bg-[#111111] border border-[#222] rounded-3xl p-8 flex flex-col items-center text-center shadow-[0_0_60px_rgba(0,0,0,0.5)] hover:border-[#f15a24]/30 transition-all duration-300 transform hover:-translate-y-2 group">
          <div className="bg-[#24130a] w-20 h-20 rounded-full flex items-center justify-center mb-6 border-2 border-[#f15a24]/20 group-hover:border-[#f15a24] transition-colors shrink-0">
            <GraduationCap className="text-[#f15a24]" size={40} strokeWidth={1.5} />
          </div>
          <h2 className="text-xs text-[#f15a24] font-bold tracking-widest uppercase mb-3">FORMACIÓN TÉCNICA</h2>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight mb-4 leading-tight text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[#f15a24] group-hover:to-[#ff8c42]">
            Escuela de <br /> Autotrónica
          </h1>
          <p className="text-gray-400 mb-8 text-sm md:text-base leading-relaxed max-w-sm flex-grow">
            Domina la mecánica y electrónica vehicular con tecnología de vanguardia e instructores expertos.
          </p>
          <Link href="/escuela" className="w-full bg-white/5 border border-white/10 hover:border-white/30 hover:bg-white/10 text-white px-6 py-4 rounded-2xl font-bold transition-all text-base md:text-lg flex items-center justify-center gap-3 shrink-0">
             Entrar a la Escuela <ArrowRight size={20} />
          </Link>
        </div>

        {/* Lado Derecho: TALLER */}
        <div className="flex-1 w-full max-w-md lg:max-w-lg bg-[#111111] border border-[#222] rounded-3xl p-8 flex flex-col items-center text-center shadow-[0_0_60px_rgba(0,0,0,0.5)] hover:border-[#f15a24]/30 transition-all duration-300 transform hover:-translate-y-2 group">
          <div className="bg-[#24130a] w-20 h-20 rounded-full flex items-center justify-center mb-6 border-2 border-[#f15a24]/20 group-hover:border-[#f15a24] transition-colors shrink-0">
            <Wrench className="text-[#f15a24]" size={40} strokeWidth={1.5} />
          </div>
          <h2 className="text-xs text-[#f15a24] font-bold tracking-widest uppercase mb-3">SERVICIO ESPECIALIZADO</h2>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight mb-4 leading-tight text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[#f15a24] group-hover:to-[#ff8c42]">
            Taller <br /> Automotriz
          </h1>
          <p className="text-gray-400 mb-8 text-sm md:text-base leading-relaxed max-w-sm flex-grow">
            Alineación, balanceo, frenos, suspensión y mecánica general con equipo profesional de última generación.
          </p>
          <Link href="/taller" className="w-full bg-[#f15a24] hover:bg-[#d14d1e] text-white px-6 py-4 rounded-2xl font-bold transition-all text-base md:text-lg flex items-center justify-center gap-3 hover:shadow-[0_0_20px_rgba(241,90,36,0.4)] shrink-0">
             Entrar al Taller <ArrowRight size={20} />
          </Link>
        </div>

      </main>

      <WhatsAppButton phoneNumber="4423656200" message="Hola, quiero información sobre la Escuela de Autotrónica o el Taller Automotriz de Tecnocar Pro." />
      
    </div>
  );
}