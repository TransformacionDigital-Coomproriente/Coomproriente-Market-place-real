import React from 'react';
import { MapPin, Mail, Phone } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-green-900 text-green-100 py-8 mt-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-4 text-white">Coomproriente</h3>
            <p className="mb-4">Cooperativa Multiactiva del Oriente Colombiano, dedicada a fortalecer la cadena agrícola y brindar mejores oportunidades a nuestros asociados.</p>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold mb-4 text-white">Contacto</h3>
            <ul className="space-y-2">
              <li className="flex items-center">
                <MapPin size={18} className="mr-2 text-green-300" />
                <span>Calle 16 #12-49, Duitama, Boyacá</span>
              </li>
              <li className="flex items-center">
                <Mail size={18} className="mr-2 text-green-300" />
                <span>info@coomproriente.co</span>
              </li>
              <li className="flex items-center">
                <Phone size={18} className="mr-2 text-green-300" />
                <span>(608) 763-5492</span>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold mb-4 text-white">Horarios</h3>
            <p className="mb-2">Lunes a Viernes: 8:00 AM - 5:00 PM</p>
            <p>Sábados: 8:00 AM - 1:00 PM</p>
            <p className="mt-4 text-sm text-green-300">© 2025 Coomproriente. Todos los derechos reservados.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;