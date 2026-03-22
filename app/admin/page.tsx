'use client';

import { useState, useEffect } from "react";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "../../lib/firebase"; // Asegúrate de que apunte a tu firebase.ts
import { Lock, Download, Users, Clock, ShieldCheck, FileSpreadsheet } from "lucide-react";

// Definimos cómo se ve un "Lead" (Prospecto) en TypeScript
interface Lead {
  id: string;
  nombre: string;
  rama: string;
  telefono: string;
  ubicacion: string;
  edad: number;
  sexo: string;
  horario: string;
  fecha: string;
}

export default function AdminDashboard() {
  // Estados para el Login
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState(false);

  // Estados para los Datos
  const [leads, setLeads] = useState<Lead[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // La contraseña secreta (Puedes cambiarla aquí)
  const SECRET_PASSWORD = "Tecnocar2026";

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === SECRET_PASSWORD) {
      setIsAuthenticated(true);
      setLoginError(false);
      fetchLeads(); // Si entra, bajamos los datos de Firebase
    } else {
      setLoginError(true);
    }
  };

  const fetchLeads = async () => {
    setIsLoading(true);
    try {
      // Hacemos una consulta a Firestore, ordenando por los más recientes primero
      const q = query(collection(db, "registros"), orderBy("fechaRegistro", "desc"));
      const querySnapshot = await getDocs(q);
      
      const leadsData: Lead[] = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        
        // Formateamos la fecha de Firebase a algo legible
        let fechaFormateada = "Sin fecha";
        if (data.fechaRegistro && data.fechaRegistro.toDate) {
          fechaFormateada = data.fechaRegistro.toDate().toLocaleDateString('es-MX', {
            year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
          });
        }

        leadsData.push({
          id: doc.id,
          nombre: data.nombre || "-",
          rama: data.rama || "-",
          telefono: data.telefono || "-",
          ubicacion: data.ubicacion || "-",
          edad: data.edad || 0,
          sexo: data.sexo || "-",
          horario: data.horario || "-",
          fecha: fechaFormateada,
        });
      });

      setLeads(leadsData);
    } catch (error) {
      console.error("Error obteniendo los registros:", error);
      alert("Hubo un error al descargar los datos de Firebase.");
    } finally {
      setIsLoading(false);
    }
  };

  // Función estrella: Exportar a CSV (Excel)
  const exportToCSV = () => {
    // 1. Cabeceras del Excel
    const headers = ["Fecha", "Nombre", "Interés", "Teléfono", "Ubicación", "Edad", "Sexo", "Horario Preferido"];
    
    // 2. Mapeamos los datos
    const csvRows = leads.map(lead => [
      `"${lead.fecha}"`, 
      `"${lead.nombre}"`, 
      `"${lead.rama}"`, 
      `"${lead.telefono}"`, 
      `"${lead.ubicacion}"`, 
      lead.edad, 
      `"${lead.sexo}"`, 
      `"${lead.horario}"`
    ].join(",")); // Separados por comas

    // 3. Unimos todo
    const csvContent = [headers.join(","), ...csvRows].join("\n");

    // 4. Creamos el archivo descargable y forzamos la descarga
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `Prospectos_Tecnocar_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // ==========================================
  // PANTALLA DE LOGIN (Si no está autenticado)
  // ==========================================
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#0d0d0d] flex flex-col items-center justify-center p-4 selection:bg-[#f15a24] selection:text-white">
        <div className="bg-[#111111] border border-[#222] p-10 rounded-3xl w-full max-w-md shadow-[0_0_50px_rgba(0,0,0,0.5)]">
          <div className="bg-[#24130a] w-16 h-16 rounded-2xl flex items-center justify-center mb-6 mx-auto border border-[#f15a24]/20">
            <Lock className="text-[#f15a24]" size={32} />
          </div>
          <h1 className="text-2xl font-bold text-white text-center mb-2">Acceso Restringido</h1>
          <p className="text-gray-400 text-center mb-8 text-sm">Ingresa la contraseña para ver los prospectos.</p>
          
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full bg-[#1a1a1a] border ${loginError ? 'border-red-500' : 'border-[#333] focus:border-[#f15a24]'} text-white rounded-xl px-4 py-3 outline-none transition-colors text-center tracking-widest`}
                placeholder="••••••••"
                required
              />
              {loginError && <p className="text-red-500 text-xs text-center mt-2 font-medium">Contraseña incorrecta.</p>}
            </div>
            <button type="submit" className="w-full bg-[#f15a24] hover:bg-[#d14d1e] text-white px-4 py-3 rounded-xl font-bold transition-all">
              Entrar al Dashboard
            </button>
          </form>
        </div>
      </div>
    );
  }

  // ==========================================
  // PANTALLA DEL DASHBOARD (Si está autenticado)
  // ==========================================
  return (
    <div className="min-h-screen bg-[#0d0d0d] text-white p-4 md:p-8 font-sans selection:bg-[#f15a24] selection:text-white">
      <div className="max-w-7xl mx-auto">
        
        {/* HEADER DEL DASHBOARD */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10 bg-[#111111] border border-[#222] p-6 rounded-3xl shadow-lg">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <ShieldCheck className="text-[#f15a24]" size={28} />
              <h1 className="text-2xl md:text-3xl font-bold text-white">Dashboard de Prospectos</h1>
            </div>
            <p className="text-gray-400 text-sm ml-10">Administración general TECNOCAR PRO</p>
          </div>
          
          <div className="flex gap-4 w-full md:w-auto">
            <button onClick={fetchLeads} className="bg-[#1a1a1a] border border-[#333] hover:border-gray-500 text-white px-5 py-2.5 rounded-xl font-medium flex items-center gap-2 transition-all text-sm flex-1 md:flex-none justify-center">
              <Clock size={18} /> Actualizar
            </button>
            <button onClick={exportToCSV} disabled={leads.length === 0} className="bg-[#25D366] hover:bg-[#1ebd57] disabled:bg-gray-700 disabled:text-gray-400 text-white px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 transition-all text-sm shadow-[0_0_15px_rgba(37,211,102,0.2)] flex-1 md:flex-none justify-center">
              <FileSpreadsheet size={18} /> Exportar Excel
            </button>
          </div>
        </header>

        {/* CONTADORES RÁPIDOS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-[#111111] border border-[#222] p-6 rounded-3xl flex items-center gap-5">
            <div className="bg-[#24130a] p-4 rounded-2xl text-[#f15a24]"><Users size={28} /></div>
            <div>
              <p className="text-gray-500 text-sm font-bold uppercase tracking-wider mb-1">Total Registros</p>
              <p className="text-3xl font-black">{leads.length}</p>
            </div>
          </div>
          <div className="bg-[#111111] border border-[#222] p-6 rounded-3xl flex items-center gap-5">
            <div className="bg-[#24130a] p-4 rounded-2xl text-[#f15a24]"><Clock size={28} /></div>
            <div>
              <p className="text-gray-500 text-sm font-bold uppercase tracking-wider mb-1">Última actualización</p>
              <p className="text-lg font-medium text-gray-300">{new Date().toLocaleTimeString('es-MX', {hour: '2-digit', minute:'2-digit'})}</p>
            </div>
          </div>
        </div>

        {/* TABLA DE DATOS */}
        <div className="bg-[#111111] border border-[#222] rounded-3xl overflow-hidden shadow-lg">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#1a1a1a] border-b border-[#333]">
                  <th className="p-5 text-sm font-bold text-gray-400 uppercase tracking-wider">Fecha</th>
                  <th className="p-5 text-sm font-bold text-gray-400 uppercase tracking-wider">Prospecto</th>
                  <th className="p-5 text-sm font-bold text-gray-400 uppercase tracking-wider">Interés</th>
                  <th className="p-5 text-sm font-bold text-gray-400 uppercase tracking-wider">Contacto</th>
                  <th className="p-5 text-sm font-bold text-gray-400 uppercase tracking-wider">Ubicación</th>
                  <th className="p-5 text-sm font-bold text-gray-400 uppercase tracking-wider">Perfil</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#222]">
                {isLoading ? (
                  <tr>
                    <td colSpan={6} className="p-10 text-center text-gray-500">Cargando prospectos desde Firebase...</td>
                  </tr>
                ) : leads.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="p-10 text-center text-gray-500">Aún no hay registros en la base de datos.</td>
                  </tr>
                ) : (
                  leads.map((lead) => (
                    <tr key={lead.id} className="hover:bg-[#161616] transition-colors group">
                      <td className="p-5 text-sm text-gray-400 whitespace-nowrap">{lead.fecha}</td>
                      <td className="p-5 font-medium text-white whitespace-nowrap">{lead.nombre}</td>
                      <td className="p-5">
                        <span className={`px-3 py-1 text-xs font-bold rounded-full ${lead.rama.includes('Electrónica') ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' : lead.rama.includes('Mecánica') ? 'bg-orange-500/10 text-orange-400 border border-orange-500/20' : 'bg-gray-500/10 text-gray-400 border border-gray-500/20'}`}>
                          {lead.rama}
                        </span>
                      </td>
                      <td className="p-5 text-sm text-gray-300">
                        <a href={`https://wa.me/52${lead.telefono.replace(/\D/g,'')}`} target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-[#25D366] transition-colors">
                           {lead.telefono}
                        </a>
                      </td>
                      <td className="p-5 text-sm text-gray-400">{lead.ubicacion}</td>
                      <td className="p-5 text-sm text-gray-400 whitespace-nowrap">
                        {lead.edad} años • {lead.sexo.charAt(0)} • {lead.horario}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}