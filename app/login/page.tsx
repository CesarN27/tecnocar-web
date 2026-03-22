'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock } from "lucide-react";

export default function LoginPage() {
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState(false);
  const router = useRouter();

  // Ocultamos la contraseña en el código. ¡Puedes ponerla en tu .env.local después!
  const NEXT_PUBLIC_SECRET_PASSWORD = process.env.NEXT_PUBLIC_SECRET_PASSWORD;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === NEXT_PUBLIC_SECRET_PASSWORD) {
      // 1. Creamos el "Pase VIP" (Una cookie válida por 1 día)
      document.cookie = "admin_token=true; path=/; max-age=86400";
      
      // 2. Lo mandamos al panel de administrador
      router.push("/admin");
    } else {
      setLoginError(true);
    }
  };

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