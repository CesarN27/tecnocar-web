'use client';

import { MessageCircle } from "lucide-react";

interface WhatsAppButtonProps {
  phoneNumber: string;
  message?: string;
  className?: string; // Para permitir estilos adicionales si se necesita
}

export default function WhatsAppButton({ phoneNumber, message = "Hola, me interesa obtener más información sobre los programas.", className = "" }: WhatsAppButtonProps) {
  
  // Limpiar el número de teléfono (quitar espacios, +, etc. si los hubiera)
  const cleanPhone = phoneNumber.replace(/\D/g, '');
  const encodedMessage = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodedMessage}`;

  return (
    <a 
      href={whatsappUrl} 
      target="_blank" 
      rel="noreferrer" 
      className={`fixed bottom-6 right-6 bg-[#25D366] hover:bg-[#1ebd57] text-white p-4 rounded-full shadow-[0_10px_25px_rgba(37,211,102,0.5)] transition-all transform hover:scale-110 hover:-translate-y-2 z-50 flex items-center justify-center ${className}`}
      aria-label="Contactar por WhatsApp"
    >
      <MessageCircle size={32} />
    </a>
  );
}