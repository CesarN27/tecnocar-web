'use client';

import { useState } from "react";
import Image from "next/image";
import { Wrench, Cpu, Music, GraduationCap, Zap, Users, Award, ShieldCheck, Settings, MessageCircle, Phone, MapPin, ArrowRight, Send, ArrowLeft } from "lucide-react";
import Link from "next/link";
import WhatsAppButton from "../components/WhatsAppButton";
import { db } from "../../lib/firebase"; // Asegúrate de que esta ruta apunte a tu archivo firebase.ts
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export default function Home() {
  
  // Función para hacer scroll suave
  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -20; 
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  // ESTADO PARA EL FORMULARIO
  const [formData, setFormData] = useState({
    nombre: "",
    rama: "",
    telefono: "",
    ubicacion: "",
    edad: "",
    sexo: "",
    horario: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // FUNCIÓN CORREGIDA DE FIREBASE (¡Aquí estaba el error!)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // <-- Súper importante: evita que la página recargue y la URL se ensucie
    setIsSubmitting(true);
    
    try {
      // Mandamos los datos a la colección "registros" en Firestore
      await addDoc(collection(db, "registros"), {
        nombre: formData.nombre,
        rama: formData.rama,
        telefono: formData.telefono,
        ubicacion: formData.ubicacion,
        edad: parseInt(formData.edad), // Lo convertimos a número
        sexo: formData.sexo,
        horario: formData.horario,
        fechaRegistro: serverTimestamp() // Guarda la fecha y hora de la base de datos
      });

      // Si todo sale bien, mostramos el mensaje de éxito
      setSubmitMessage("¡Gracias por tu interés! Tus datos han sido guardados y nos pondremos en contacto contigo pronto.");
      
      // Limpiamos los campos del formulario
      setFormData({ nombre: "", rama: "", telefono: "", ubicacion: "", edad: "", sexo: "", horario: "" });

    } catch (error) {
      console.error("Error al guardar en Firebase: ", error);
      setSubmitMessage("Hubo un problema al enviar tus datos. Verifica tu conexión e intenta de nuevo.");
    } finally {
      setIsSubmitting(false);
      // Ocultamos el mensaje de éxito después de 5 segundos
      setTimeout(() => setSubmitMessage(""), 5000);
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

      {/* 2. NAVEGACIÓN */}
      <nav className="sticky top-0 w-full z-50 bg-[#0d0d0d]/90 backdrop-blur-md border-y border-white/5 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="flex justify-between items-center h-16 md:h-20">
            
            {/* Botón Volver (Idéntico al del Taller) */}
            <Link href="/" className="flex items-center gap-1.5 text-gray-400 hover:text-white transition-colors text-sm font-medium z-10"> 
              <ArrowLeft size={16} /> Volver
            </Link>

            {/* Enlaces de navegación (Centrados a la fuerza para que no estorben) */}
            <div className="hidden md:flex space-x-8 text-sm font-medium text-gray-400 absolute left-1/2 transform -translate-x-1/2 z-0">
              <a href="#inicio" onClick={(e) => scrollToSection(e, 'inicio')} className="hover:text-[#f15a24] transition-colors">Inicio</a>
              <a href="#programas" onClick={(e) => scrollToSection(e, 'programas')} className="hover:text-[#f15a24] transition-colors">Programas</a>
              <a href="#ventajas" onClick={(e) => scrollToSection(e, 'ventajas')} className="hover:text-[#f15a24] transition-colors">Nosotros</a>
              <a href="#registro" onClick={(e) => scrollToSection(e, 'registro')} className="hover:text-[#f15a24] transition-colors text-[#f15a24]">Regístrate</a>
            </div>
            
            {/* Botón WhatsApp */}
            <a href="https://wa.me/521234567890" target="_blank" rel="noreferrer" className="bg-[#25D366] hover:bg-[#1ebd57] text-white px-5 py-2 rounded-full font-semibold flex items-center gap-2 transition-all transform hover:scale-105 z-10">
              <MessageCircle size={18} />
              <span className="hidden sm:inline">WhatsApp</span>
            </a>

          </div>
        </div>
      </nav>

      {/* CONTENEDOR PRINCIPAL DEL INICIO */}
      <div id="inicio" className="relative w-full pt-16 pb-12 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#2a1a14]/50 via-[#0d0d0d] to-[#0d0d0d]">
        <main className="relative text-center px-4 max-w-5xl mx-auto mt-8">
          <div className="inline-block mb-4 px-4 py-1.5 rounded-full bg-[#f15a24]/10 border border-[#f15a24]/20 text-[#f15a24] text-sm font-semibold tracking-wider uppercase">
            Tu futuro comienza aquí
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 leading-tight">
            Escuela de <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#f15a24] to-[#ff8c42] drop-shadow-sm">
              Autotrónica
            </span>
          </h1>
          <p className="mt-6 text-lg md:text-xl text-gray-400 max-w-3xl mx-auto font-light">
            Domina la <strong className="text-white font-medium">mecánica automotriz</strong> y la <strong className="text-white font-medium">electrónica vehicular</strong>. Fórmate como técnico especialista en la tecnología que mueve al mundo.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4 sm:gap-6">
            <button onClick={(e) => scrollToSection(e as unknown as React.MouseEvent<HTMLAnchorElement>, 'registro')} className="bg-[#f15a24] hover:bg-[#d14d1e] text-white px-8 py-4 rounded-xl font-bold flex justify-center items-center gap-2 transition-all hover:shadow-[0_0_20px_rgba(241,90,36,0.4)] hover:-translate-y-1">
              Regístrate Ahora
            </button>
            <button 
              onClick={(e) => scrollToSection(e as unknown as React.MouseEvent<HTMLAnchorElement>, 'programas')}
              className="bg-white/5 border border-white/10 hover:border-white/30 hover:bg-white/10 text-white px-8 py-4 rounded-xl font-bold transition-all hover:-translate-y-1"
            >
              Explorar Programas
            </button>
          </div>
        </main>
      </div>

      {/* ESTADÍSTICAS */}
      <section className="border-y border-white/5 bg-[#111] py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-[#f15a24]/5 blur-[100px] rounded-full w-1/2 left-1/4"></div>
        <div className="relative z-10 max-w-5xl mx-auto px-4 flex flex-col md:flex-row justify-around items-center gap-12 text-center">
          <div className="group">
            <div className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-500 mb-2 group-hover:scale-110 transition-transform">300+</div>
            <div className="text-sm text-[#f15a24] font-bold tracking-widest uppercase">Egresados</div>
          </div>
          <div className="group">
            <div className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-500 mb-2 group-hover:scale-110 transition-transform">3</div>
            <div className="text-sm text-[#f15a24] font-bold tracking-widest uppercase">Programas</div>
          </div>
          <div className="group">
            <div className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-500 mb-2 group-hover:scale-110 transition-transform">98%</div>
            <div className="text-sm text-[#f15a24] font-bold tracking-widest uppercase">Empleabilidad</div>
          </div>
        </div>
      </section>

      {/* PROGRAMAS */}
      <section id="programas" className="py-24 px-4 max-w-7xl mx-auto scroll-mt-20">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold">
            Nuestros <span className="text-[#f15a24]">Programas</span>
          </h2>
          <div className="w-24 h-1 bg-[#f15a24] mx-auto mt-6 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="bg-[#111111] border border-[#222] rounded-3xl p-8 hover:border-[#f15a24]/50 transition-colors duration-300 flex flex-col group">
            <div className="bg-[#24130a] w-14 h-14 rounded-2xl flex items-center justify-center mb-8">
              <Wrench className="text-[#f15a24]" size={28} />
            </div>
            <h3 className="text-2xl font-bold mb-2 text-white">Mecánica Automotriz</h3>
            <p className="text-[#f15a24] text-sm font-medium mb-6">Máquinas de Combustión Interna</p>
            <p className="text-gray-400 mb-8 text-sm leading-relaxed flex-grow">
              Aprende el funcionamiento completo de motores, sistemas de transmisión, suspensión y frenos.
            </p>
            <ul className="space-y-3 mb-10 text-sm text-gray-400">
              <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-[#f15a24]"></span>Motores a gasolina y diésel</li>
              <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-[#f15a24]"></span>Armado y desarmado de motores</li>
              <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-[#f15a24]"></span>Manual de motor completo</li>
              <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-[#f15a24]"></span>Teoria y práctica guiada</li>
            </ul>
          </div>

          <div className="bg-[#111111] border border-[#222] rounded-3xl p-8 hover:border-[#f15a24]/50 transition-colors duration-300 flex flex-col group">
            <div className="bg-[#24130a] w-14 h-14 rounded-2xl flex items-center justify-center mb-8">
              <Cpu className="text-[#f15a24]" size={28} />
            </div>
            <h3 className="text-2xl font-bold mb-2 text-white">Electrónica Automotriz</h3>
            <p className="text-[#f15a24] text-sm font-medium mb-6">Sistemas Electrónicos Vehiculares</p>
            <p className="text-gray-400 mb-8 text-sm leading-relaxed flex-grow">
              Domina sensores, actuadores, ECUs, redes CAN-Bus, inyección electrónica y OBD-II.
            </p>
            <ul className="space-y-3 mb-10 text-sm text-gray-400">
              <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-[#f15a24]"></span>Inyección electrónica</li>
              <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-[#f15a24]"></span>Redes CAN-Bus</li>
              <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-[#f15a24]"></span>Diagnóstico OBD-II</li>
              <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-[#f15a24]"></span>Sensores y actuadores</li>
            </ul>
          </div>

          <div className="bg-[#111111] border border-[#222] rounded-3xl p-8 relative overflow-hidden flex flex-col group opacity-80">
            <div className="absolute top-6 right-6 bg-[#24130a] text-[#f15a24] text-xs font-bold px-4 py-1.5 rounded-full">
              PRÓXIMAMENTE
            </div>
            <div className="bg-[#1a1a1a] w-14 h-14 rounded-2xl flex items-center justify-center mb-8 border border-white/5">
              <Music className="text-gray-500" size={28} />
            </div>
            <h3 className="text-2xl font-bold mb-2 text-white">Car Audio</h3>
            <p className="text-[#f15a24] text-sm font-medium mb-6">Próximamente</p>
            <p className="text-gray-500 mb-8 text-sm leading-relaxed flex-grow">
              Instalación profesional de sistemas de audio automotriz y acústica vehicular.
            </p>
            <ul className="space-y-3 mb-8 text-sm text-gray-500">
              <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-gray-600"></span>Amplificadores</li>
              <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-gray-600"></span>Subwoofers</li>
              <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-gray-600"></span>Acústica vehicular</li>
              <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-gray-600"></span>Instalación profesional</li>
            </ul>
          </div>
        </div>
      </section>

      {/* VENTAJAS */}
      <section id="ventajas" className="bg-[#111111] py-24 px-4 border-t border-white/5 scroll-mt-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold">
              ¿Por qué <span className="text-[#f15a24]">elegirnos</span>?
            </h2>
            <div className="w-24 h-1 bg-[#f15a24] mx-auto mt-6 rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-16 mt-16">
            {[
              { icon: GraduationCap, title: "Instructores Expertos", desc: "Profesionales activos en la industria automotriz." },
              { icon: Zap, title: "Práctica Real", desc: "Talleres equipados con tecnología de última generación." },
              { icon: Users, title: "Grupos Reducidos", desc: "Máximo 15 alumnos por grupo para atención personalizada." },
              { icon: Award, title: "Certificación Oficial", desc: "Reconocimiento válido al completar tu formación técnica." },
              { icon: ShieldCheck, title: "Bolsa de Trabajo", desc: "Conectamos a nuestros egresados con empresas del sector." },
              { icon: Settings, title: "Equipo Profesional", desc: "Escáneres OBD-II, osciloscopios y herramienta especializada." },
            ].map((item, index) => (
              <div key={index} className="flex gap-5 group items-start">
                <div className="bg-[#1e1008] w-14 h-14 shrink-0 rounded-2xl flex items-center justify-center transition-colors group-hover:bg-[#2a130a]">
                  <item.icon className="text-[#f15a24]" size={26} strokeWidth={1.5} />
                </div>
                <div>
                  <h4 className="text-lg font-bold mb-2 text-white">{item.title}</h4>
                  <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECCIÓN DE REGISTRO / FORMULARIO */}
      <section id="registro" className="py-24 px-4 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-[#2a1a14]/40 via-[#0d0d0d] to-[#0d0d0d] border-t border-white/5 scroll-mt-10 relative">
        <div className="max-w-4xl mx-auto bg-[#111111] border border-[#222] rounded-3xl p-8 md:p-12 shadow-[0_0_50px_rgba(0,0,0,0.5)]">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              ¿Interesado? <span className="text-[#f15a24]">Regístrate aquí</span>
            </h2>
            <p className="text-gray-400">Déjanos tus datos y un asesor académico se pondrá en contacto contigo.</p>
          </div>

          {submitMessage && (
            <div className={`mb-8 p-4 border rounded-xl text-center font-medium ${submitMessage.includes("problema") ? "bg-red-500/10 border-red-500/50 text-red-400" : "bg-green-500/10 border-green-500/50 text-green-400"}`}>
              {submitMessage}
            </div>
          )}

          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-400 mb-2">Nombre completo</label>
              <input required type="text" name="nombre" value={formData.nombre} onChange={handleInputChange} className="w-full bg-[#1a1a1a] border border-[#333] focus:border-[#f15a24] text-white rounded-xl px-4 py-3 outline-none transition-colors" placeholder="Ej. Juan Pérez" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Rama de interés</label>
              <select required name="rama" value={formData.rama} onChange={handleInputChange} className="w-full bg-[#1a1a1a] border border-[#333] focus:border-[#f15a24] text-white rounded-xl px-4 py-3 outline-none transition-colors appearance-none cursor-pointer">
                <option value="">Selecciona una opción</option>
                <option value="Mecánica Automotriz">Mecánica Automotriz</option>
                <option value="Electrónica Automotriz">Electrónica Automotriz</option>
                <option value="Car Audio">Car Audio</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Número telefónico</label>
              <input required type="tel" name="telefono" value={formData.telefono} onChange={handleInputChange} className="w-full bg-[#1a1a1a] border border-[#333] focus:border-[#f15a24] text-white rounded-xl px-4 py-3 outline-none transition-colors" placeholder="Ej. 442 123 4567" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Ubicación (Ciudad/Estado)</label>
              <input required type="text" name="ubicacion" value={formData.ubicacion} onChange={handleInputChange} className="w-full bg-[#1a1a1a] border border-[#333] focus:border-[#f15a24] text-white rounded-xl px-4 py-3 outline-none transition-colors" placeholder="Ej. Querétaro, Qro." />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Edad</label>
                <input required type="number" min="15" max="99" name="edad" value={formData.edad} onChange={handleInputChange} className="w-full bg-[#1a1a1a] border border-[#333] focus:border-[#f15a24] text-white rounded-xl px-4 py-3 outline-none transition-colors" placeholder="Años" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Sexo</label>
                <select required name="sexo" value={formData.sexo} onChange={handleInputChange} className="w-full bg-[#1a1a1a] border border-[#333] focus:border-[#f15a24] text-white rounded-xl px-4 py-3 outline-none transition-colors appearance-none cursor-pointer">
                  <option value="">Selecciona</option>
                  <option value="Masculino">Masculino</option>
                  <option value="Femenino">Femenino</option>
                  <option value="Otro">Otro</option>
                </select>
              </div>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-400 mb-2">Horario de preferencia (Prácticas)</label>
              <div className="flex gap-4">
                <label className="flex-1 cursor-pointer">
                  <input type="radio" name="horario" value="Sábado" onChange={handleInputChange} className="peer sr-only" required />
                  <div className="w-full text-center bg-[#1a1a1a] border border-[#333] peer-checked:border-[#f15a24] peer-checked:bg-[#f15a24]/10 text-gray-400 peer-checked:text-white rounded-xl px-4 py-3 transition-all">
                    Sábados
                  </div>
                </label>
                <label className="flex-1 cursor-pointer">
                  <input type="radio" name="horario" value="Domingo" onChange={handleInputChange} className="peer sr-only" required />
                  <div className="w-full text-center bg-[#1a1a1a] border border-[#333] peer-checked:border-[#f15a24] peer-checked:bg-[#f15a24]/10 text-gray-400 peer-checked:text-white rounded-xl px-4 py-3 transition-all">
                    Domingos
                  </div>
                </label>
              </div>
            </div>

            <div className="md:col-span-2 mt-4">
              <button disabled={isSubmitting} type="submit" className="w-full bg-[#f15a24] hover:bg-[#d14d1e] disabled:bg-gray-600 text-white px-8 py-4 rounded-xl font-bold flex justify-center items-center gap-2 transition-all">
                {isSubmitting ? "Enviando datos..." : <><Send size={20} /> Enviar Registro</>}
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* FOOTER & CONTACTO */}
      <footer id="contacto" className="bg-[#0a0a0a] border-t border-white/5 pt-20 pb-8 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          <div className="flex flex-col gap-4">
            <div className="text-2xl font-black text-white italic tracking-wider">
              TECNO<span className="text-[#f15a24]">CAR</span> PRO
            </div>
            <p className="text-gray-400 text-sm leading-relaxed max-w-sm mt-2">
              Formando a los técnicos automotrices del futuro con tecnología de vanguardia.
            </p>
          </div>
          <div>
            <h5 className="text-lg font-bold mb-6 text-white tracking-wide">Programas</h5>
            <ul className="space-y-4 text-gray-400 text-sm font-medium">
              <li><button onClick={(e) => scrollToSection(e as unknown as React.MouseEvent<HTMLAnchorElement>, 'programas')} className="hover:text-[#f15a24] transition-colors">Mecánica Automotriz</button></li>
              <li><button onClick={(e) => scrollToSection(e as unknown as React.MouseEvent<HTMLAnchorElement>, 'programas')} className="hover:text-[#f15a24] transition-colors">Electrónica Automotriz</button></li>
            </ul>
          </div>
          <div>
            <h5 className="text-lg font-bold mb-6 text-white tracking-wide">Contacto</h5>
            <ul className="space-y-4 text-gray-400 text-sm font-medium">
              <li><a href="https://wa.me/524681230368" target="_blank" rel="noreferrer" className="flex items-center gap-3 hover:text-[#25D366] transition-colors"><MessageCircle size={18} /> WhatsApp</a></li>
              <li className="flex items-center gap-3 hover:text-white transition-colors cursor-pointer"><Phone size={18} /> +52 (468) 123-0368</li>
              <li className="flex items-center gap-3 hover:text-white transition-colors cursor-pointer"><MapPin size={18} /> San Luis de la Paz, Gto., México</li>
            </ul>
          </div>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto text-center border-t border-white/10 pt-8 text-sm text-gray-500 font-medium">
          © {new Date().getFullYear()} TecnoCar Pro — Escuela de Autotrónica. Todos los derechos reservados.
        </div>
      </footer>

      <WhatsAppButton phoneNumber="524681230368" message="Hola, vengo de la página web y quiero información de la Escuela de Autotrónica." />
      
    </div>
  );
}