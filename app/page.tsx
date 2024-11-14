'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  DollarSign,
  Shield,
  Clock,
  Globe,
  ChevronDown,
  Menu,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const BINANCE_API_URL =
  'https://api.binance.com/api/v3/ticker/price?symbol=USDTARS';

export default function LandingPage() {
  const [exchangeRate, setExchangeRate] = useState(0);
  const [loading, setLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeButton, setActiveButton] = useState('');

  useEffect(() => {
    const fetchExchangeRate = async () => {
      try {
        const response = await fetch(BINANCE_API_URL);
        const data = await response.json();
        setExchangeRate(parseFloat(data.price));
        setLoading(false);
      } catch (error) {
        console.error('Error fetching exchange rate:', error);
        setLoading(false);
      }
    };

    fetchExchangeRate();
    const interval = setInterval(fetchExchangeRate, 20000);
    return () => clearInterval(interval);
  }, []);

  const handleButtonHover = (buttonName: string) => {
    setActiveButton(buttonName);
  };

  const handleButtonLeave = () => {
    setActiveButton('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-zinc-900">
      <header className="p-5 bg-black/90 backdrop-blur-sm sticky top-0 z-50">
        <nav className="max-w-7xl mx-auto flex justify-between items-center">
          <Link href="/">
            <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-cyan-400 to-pink-500 hover:scale-105 transition-transform duration-300">
              Ecucondor
            </h1>
          </Link>
          <div className="hidden md:flex space-x-4 items-center">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="text-white hover:bg-white/10 transition-colors duration-300"
                >
                  Servicios <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>
                  Transferencias Internacionales
                </DropdownMenuItem>
                <DropdownMenuItem>Cambio de Divisas</DropdownMenuItem>
                <DropdownMenuItem>Asesoría Financiera</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Link href="/about">
              <Button
                variant="ghost"
                className="text-white hover:bg-white/10 transition-colors duration-300"
              >
                Sobre Nosotros
              </Button>
            </Link>
            <Link href="/contact">
              <Button
                variant="ghost"
                className="text-white hover:bg-white/10 transition-colors duration-300"
              >
                Contacto
              </Button>
            </Link>
            <Link href="/register">
              <Button
                className="bg-gradient-to-r from-yellow-400 via-cyan-400 to-pink-500 hover:opacity-90 text-black font-bold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
                onMouseEnter={() => handleButtonHover('register')}
                onMouseLeave={handleButtonLeave}
              >
                {activeButton === 'register' ? '¡Únete Ahora!' : 'Registrarse'}
              </Button>
            </Link>
          </div>
          <Button
            variant="ghost"
            className="md:hidden text-white"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <Menu />
          </Button>
        </nav>
        {menuOpen && (
          <div className="md:hidden mt-4 space-y-2">
            <Button variant="ghost" className="text-white w-full text-left">
              Servicios
            </Button>
            <Link href="/about">
              <Button variant="ghost" className="text-white w-full text-left">
                Sobre Nosotros
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="ghost" className="text-white w-full text-left">
                Contacto
              </Button>
            </Link>
            <Link href="/register">
              <Button className="bg-gradient-to-r from-yellow-400 via-cyan-400 to-pink-500 text-black font-bold w-full">
                Registrarse
              </Button>
            </Link>
          </div>
        )}
      </header>

      <main className="max-w-7xl mx-auto px-4 py-16">
        <section className="text-center mb-20">
          <h2 className="text-5xl font-bold mb-6 text-white text-shadow-lg animate-pulse">
            Transferencias Internacionales
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-cyan-400 to-pink-500">
              Rápidas y Seguras
            </span>
          </h2>
          <p className="text-xl text-white/80 max-w-2xl mx-auto mb-8">
            Conectamos Ecuador con el mundo a través de soluciones financieras
            innovadoras y confiables
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/register">
              <Button
                className="bg-gradient-to-r from-yellow-400 via-cyan-400 to-pink-500 text-black font-bold px-8 py-6 text-lg rounded-full hover:opacity-90 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1 duration-300"
                onMouseEnter={() => handleButtonHover('start')}
                onMouseLeave={handleButtonLeave}
              >
                {activeButton === 'start' ? '¡Empieza Ya!' : 'Comenzar Ahora'}{' '}
                <ArrowRight className="ml-2" />
              </Button>
            </Link>
            <Link href="/how-it-works">
              <Button
                variant="outline"
                className="text-white border-white hover:bg-white/10 px-8 py-6 text-lg rounded-full transition-all duration-300 hover:border-cyan-400"
                onMouseEnter={() => handleButtonHover('how')}
                onMouseLeave={handleButtonLeave}
              >
                {activeButton === 'how' ? 'Descubre Más' : 'Cómo Funciona'}
              </Button>
            </Link>
          </div>
        </section>

        <section className="grid md:grid-cols-3 gap-8 mb-20">
          <Card className="bg-black/50 backdrop-blur-sm border-cyan-400/20 transform hover:scale-105 transition-all duration-300 hover:shadow-xl hover:shadow-cyan-500/20">
            <CardContent className="p-6 text-center">
              <DollarSign className="w-12 h-12 mx-auto mb-4 text-yellow-400 animate-bounce" />
              <h3 className="text-xl font-bold text-white mb-2">
                Mejores Tasas
              </h3>
              <p className="text-white/80">
                {loading
                  ? 'Cargando...'
                  : `Cotización actual: ${exchangeRate.toFixed(2)} ARS/USDT`}
              </p>
            </CardContent>
          </Card>
          <Card className="bg-black/50 backdrop-blur-sm border-cyan-400/20 transform hover:scale-105 transition-all duration-300 hover:shadow-xl hover:shadow-pink-500/20">
            <CardContent className="p-6 text-center">
              <Shield className="w-12 h-12 mx-auto mb-4 text-cyan-400 animate-pulse" />
              <h3 className="text-xl font-bold text-white mb-2">100% Seguro</h3>
              <p className="text-white/80">
                Transacciones protegidas y verificadas
              </p>
            </CardContent>
          </Card>
          <Card className="bg-black/50 backdrop-blur-sm border-cyan-400/20 transform hover:scale-105 transition-all duration-300 hover:shadow-xl hover:shadow-yellow-500/20">
            <CardContent className="p-6 text-center">
              <Clock className="w-12 h-12 mx-auto mb-4 text-pink-500 animate-spin" />
              <h3 className="text-xl font-bold text-white mb-2">Rápido</h3>
              <p className="text-white/80">
                Transferencias procesadas en minutos
              </p>
            </CardContent>
          </Card>
        </section>

        <section className="text-center mb-20">
          <h2 className="text-4xl font-bold mb-6 text-white text-shadow-lg">
            Cobertura Global
          </h2>
          <p className="text-xl text-white/80 max-w-2xl mx-auto mb-8">
            Realizamos transferencias a más de 100 países en todo el mundo
          </p>
          <div className="flex justify-center">
            <Globe className="w-48 h-48 text-cyan-400 animate-spin-slow" />
          </div>
        </section>
      </main>

      <footer className="bg-black/90 backdrop-blur-sm text-white py-8">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Ecucondor</h3>
            <p className="text-white/80">
              Soluciones financieras innovadoras para un mundo conectado
            </p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Enlaces Rápidos</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/about"
                  className="text-white/80 hover:text-white transition-colors duration-300"
                >
                  Sobre Nosotros
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="text-white/80 hover:text-white transition-colors duration-300"
                >
                  Servicios
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-white/80 hover:text-white transition-colors duration-300"
                >
                  Contacto
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="text-white/80 hover:text-white transition-colors duration-300"
                >
                  Preguntas Frecuentes
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Contáctanos</h3>
            <p className="text-white/80">Email: info@ecucondor.com</p>
            <p className="text-white/80">Teléfono: +593 123 456 789</p>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 mt-8 pt-8 border-t border-white/20 text-center">
          <p className="text-white/80">
            &copy; 2024 Ecucondor. Todos los derechos reservados.
          </p>
        </div>
      </footer>
      <style jsx global>{`
        .text-shadow-lg {
          text-shadow: 0 4px 6px rgba(0, 0, 0, 0.5);
        }
        .animate-spin-slow {
          animation: spin 20s linear infinite;
        }
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}
