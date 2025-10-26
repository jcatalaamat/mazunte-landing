import React, { useState, useEffect } from 'react';
import { MapPin, Star, Clock, Users, Smartphone, Waves, Globe, Apple, Home, ArrowRight, CheckCircle } from 'lucide-react';

interface PlacePreviewProps {
  placeId: string;
  language: 'en' | 'es';
}

const PlacePreview: React.FC<PlacePreviewProps> = ({ language: initialLanguage }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [language, setLanguage] = useState<'en' | 'es'>(initialLanguage);
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const t = language === 'es' ? {
    title: "Descubre este lugar en Mazunte Connect",
    subtitle: "La app que te conecta con todos los espacios conscientes en Mazunte",
    platform: {
      title: "Disponible en iOS",
      subtitle: "Tu guía de bolsillo a Mazunte, donde sea que estés",
      availableOn: "Disponible en",
      availableNow: "Disponible Ahora",
      comingSoon: "Próximamente"
    },
    features: {
      title: "Con la app podrás:",
      items: [
        "Ver todos los detalles del lugar",
        "Leer reseñas de la comunidad",
        "Guardar en favoritos",
        "Ver horarios y contacto"
      ]
    },
    comingSoon: "Próximamente disponible",
    goHome: "Volver al inicio",
    placeDetails: {
      rating: "Favorito de la comunidad",
      hours: "Horarios disponibles",
      type: "Espacio comunitario consciente"
    },
    waitlist: {
      title: "Únete a la lista de espera",
      subtitle: "Sé el primero en saber cuando esté disponible",
      cta: "Obtener Acceso Temprano",
      success: {
        title: "¡Te has unido!",
        message: "Te notificaremos cuando la app esté disponible"
      }
    }
  } : {
    title: "Discover this place in Mazunte Connect",
    subtitle: "The app that connects you with all conscious spaces in Mazunte",
    platform: {
      title: "Available on iOS",
      subtitle: "Your pocket guide to Mazunte, wherever you are",
      availableOn: "Available on",
      availableNow: "Available Now",
      comingSoon: "Coming Soon"
    },
    features: {
      title: "With the app you can:",
      items: [
        "See all place details",
        "Read community reviews",
        "Save to favorites",
        "View hours and contact info"
      ]
    },
    comingSoon: "Coming Soon",
    goHome: "Go Back Home",
    placeDetails: {
      rating: "Community favorite",
      hours: "Open hours available",
      type: "Conscious community space"
    },
    waitlist: {
      title: "Join the waitlist",
      subtitle: "Be the first to know when it's available",
      cta: "Get Early Access",
      success: {
        title: "You're in!",
        message: "We'll notify you when the app is available"
      }
    }
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const spotlightStyle = {
    background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(251, 146, 60, 0.15), transparent 40%)`
  };

  const handleSubmit = async () => {
    if (!email || !email.includes('@')) return;
    setLoading(true);
    
    try {
      const convertKitApiKey = (import.meta as any).env.VITE_CONVERTKIT_API_KEY || 'WL4dvqOgWKNB2eq6RLOflQ';
      const convertKitFormId = (import.meta as any).env.VITE_CONVERTKIT_FORM_ID || '8630317';
      
      if (convertKitApiKey && convertKitFormId) {
        const response = await fetch(`https://api.convertkit.com/v3/forms/${convertKitFormId}/subscribe`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            api_key: convertKitApiKey,
            email: email,
            tags: ['mazunte-waitlist']
          })
        });

        if (response.ok) {
          setSubmitted(true);
          setEmail('');
          setLoading(false);
          return;
        } else {
          throw new Error('Failed to subscribe');
        }
      }

      throw new Error('No email service configured');
      
    } catch (error) {
      console.error('Subscription error:', error);
      setSubmitted(true);
      setEmail('');
    }
    
    setLoading(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSubmit();
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden relative">
      {/* Animated mesh background */}
      <div className="fixed inset-0 opacity-30">
        <div className="absolute top-0 -left-4 w-96 h-96 bg-orange-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" style={{animationDuration: '7s'}}></div>
        <div className="absolute top-0 -right-4 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" style={{animationDuration: '9s', animationDelay: '2s'}}></div>
        <div className="absolute -bottom-8 left-20 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" style={{animationDuration: '11s', animationDelay: '4s'}}></div>
      </div>

      {/* Mouse spotlight effect */}
      <div className="fixed inset-0 pointer-events-none" style={spotlightStyle}></div>

      {/* Grid overlay */}
      <div className="fixed inset-0 opacity-5" style={{
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
        backgroundSize: '50px 50px'
      }}></div>

      <div className="relative z-10">
        {/* Navigation */}
        <div className="fixed top-4 left-4 right-4 z-50 flex justify-between">
          <button
            onClick={() => window.location.href = '/'}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 hover:bg-white/20 transition-all"
          >
            <Home className="w-4 h-4" />
            <span className="text-sm font-medium">{t.goHome}</span>
          </button>
          <button
            onClick={() => setLanguage(language === 'en' ? 'es' : 'en')}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 hover:bg-white/20 transition-all"
          >
            <Globe className="w-4 h-4" />
            <span className="text-sm font-medium">{language === 'en' ? 'EN' : 'ES'}</span>
          </button>
        </div>

        {/* Hero Section */}
        <div className="container mx-auto px-4 pt-20 pb-16 md:pt-32 md:pb-24">
          <div className="max-w-6xl mx-auto text-center">
            
            {/* Logo */}
            <div className="inline-flex items-center justify-center gap-3 mb-8">
              <div className="relative">
                <Waves className="w-12 h-12 text-orange-400 relative z-10" />
                <div className="absolute inset-0 bg-orange-400 blur-xl opacity-50"></div>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-orange-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
                Mazunte Connect
              </h1>
            </div>

            {/* Place Preview Card */}
            <div className="relative group mb-12">
              <div className="absolute -inset-1 bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500 rounded-3xl blur-xl opacity-50 group-hover:opacity-75 transition duration-1000"></div>
              <div className="relative bg-zinc-900/90 backdrop-blur-2xl p-8 md:p-12 rounded-3xl border border-white/10">
                <div className="flex items-center justify-center gap-3 mb-6">
                  <MapPin className="w-8 h-8 text-orange-400" />
                  <h2 className="text-2xl md:text-3xl font-bold">{t.title}</h2>
                </div>
                
                {/* Mock place details */}
                <div className="space-y-4 mb-8">
                  <div className="flex items-center justify-center gap-2 text-gray-300">
                    <Star className="w-4 h-4 text-yellow-400" />
                    <span>{t.placeDetails.rating}</span>
                  </div>
                  <div className="flex items-center justify-center gap-2 text-gray-300">
                    <Clock className="w-4 h-4" />
                    <span>{t.placeDetails.hours}</span>
                  </div>
                  <div className="flex items-center justify-center gap-2 text-gray-300">
                    <Users className="w-4 h-4" />
                    <span>{t.placeDetails.type}</span>
                  </div>
                </div>

                <p className="text-gray-400 text-lg mb-6">{t.subtitle}</p>
              </div>
            </div>

            {/* Platform Availability */}
            <div className="container mx-auto px-4 pt-8 pb-40">
              <div className="max-w-4xl mx-auto">
                <div className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-3xl blur-xl opacity-20 group-hover:opacity-30 transition duration-500"></div>
                  <div className="relative bg-zinc-900/80 backdrop-blur-xl rounded-3xl border border-white/10 p-8 md:p-12">
                    <div className="text-center mb-8">
                      <h3 className="text-2xl md:text-3xl font-bold mb-3">{t.platform.title}</h3>
                      <p className="text-gray-400 text-lg">{t.platform.subtitle}</p>
                    </div>
                    <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6">
                      <a
                        href="https://apps.apple.com/es/app/mazunte-connect/id6753561445"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group/badge relative block"
                      >
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-400 to-blue-600 rounded-2xl blur opacity-40 group-hover/badge:opacity-60 transition"></div>
                        <div className="relative flex items-center gap-3 px-6 py-4 bg-zinc-800/90 backdrop-blur-xl rounded-2xl border border-blue-500/30 hover:border-blue-400/50 transition-all transform hover:scale-105">
                          <Apple className="w-8 h-8 text-blue-400" />
                          <div className="text-left">
                            <div className="text-xs text-blue-400 font-medium">{t.platform.availableNow}</div>
                            <div className="text-lg font-semibold text-white">iOS</div>
                          </div>
                        </div>
                      </a>
                      <div className="group/badge relative opacity-60">
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-gray-400 to-gray-600 rounded-2xl blur opacity-20"></div>
                        <div className="relative flex items-center gap-3 px-6 py-4 bg-zinc-800/90 backdrop-blur-xl rounded-2xl border border-white/10">
                          <Smartphone className="w-8 h-8 text-gray-500" />
                          <div className="text-left">
                            <div className="text-xs text-gray-500">{t.platform.comingSoon}</div>
                            <div className="text-lg font-semibold text-gray-400">Android</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Enhanced Features Section */}
            <div className="container mx-auto px-4 py-16">
              <div className="max-w-6xl mx-auto">
                <div className="text-center mb-16">
                  <h2 className="text-4xl md:text-5xl font-bold mb-4">
                    {t.features.title}
                  </h2>
                  <p className="text-xl text-gray-400">
                    {language === 'es' ? 'Descubre todos los espacios conscientes de Mazunte' : 'Discover all conscious spaces in Mazunte'}
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {t.features.items.map((item, index) => {
                    const icons = [MapPin, Star, Clock, Users];
                    const colors = ['from-orange-500 to-pink-500', 'from-pink-500 to-purple-500', 'from-purple-500 to-blue-500', 'from-blue-500 to-cyan-500'];
                    const Icon = icons[index];
                    const colorClass = colors[index];
                    
                    return (
                      <div key={index} className="group relative">
                        <div className={`absolute -inset-0.5 bg-gradient-to-r ${colorClass} rounded-3xl blur opacity-20 group-hover:opacity-40 transition duration-500`}></div>
                        <div className="relative bg-zinc-900/90 backdrop-blur-xl rounded-3xl border border-white/5 p-8 hover:border-white/10 transition-all h-full">
                          <div className={`inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r ${colorClass} rounded-2xl mb-6`}>
                            <Icon className="w-6 h-6 text-white" />
                          </div>
                          <h3 className="text-lg font-semibold mb-3 text-white">{item}</h3>
                          <p className="text-gray-400 text-sm">
                            {language === 'es' 
                              ? ['Información completa del lugar', 'Lee reseñas auténticas', 'Horarios actualizados', 'Conecta con la comunidad'][index]
                              : ['Complete place information', 'Read authentic reviews', 'Updated hours', 'Connect with community'][index]
                            }
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Waitlist Section */}
            <div className="container mx-auto px-4 py-32">
              <div className="max-w-4xl mx-auto text-center">
                <div className="relative">
                  <div className="absolute -inset-8 bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500 rounded-3xl blur-3xl opacity-30"></div>
                  <div className="relative bg-zinc-900/80 backdrop-blur-2xl rounded-3xl border border-white/10 p-16">
                    <h2 className="text-4xl md:text-5xl font-bold mb-6">
                      {t.waitlist.title}
                    </h2>
                    <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto">
                      {t.waitlist.subtitle}
                    </p>
                    
                    {!submitted && (
                      <div className="max-w-md mx-auto">
                        <div className="relative group">
                          <div className="absolute -inset-1 bg-gradient-to-r from-orange-500 to-purple-500 rounded-2xl blur opacity-50 group-hover:opacity-75 transition"></div>
                          <div className="relative bg-black/50 backdrop-blur-xl p-4 rounded-2xl border border-white/10 space-y-3">
                            <input
                              type="email"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              onKeyPress={handleKeyPress}
                              placeholder="your@email.com"
                              className="w-full px-6 py-4 rounded-xl bg-zinc-900/50 border border-white/10 focus:border-orange-500/50 focus:outline-none text-white placeholder-gray-600"
                            />
                            <button
                              onClick={handleSubmit}
                              disabled={loading || !email}
                              className="w-full px-8 py-4 bg-gradient-to-r from-orange-500 to-pink-500 text-white rounded-xl font-semibold hover:shadow-2xl transform hover:scale-105 transition-all disabled:opacity-50 flex items-center justify-center gap-3"
                            >
                              {loading ? 'Joining...' : t.waitlist.cta}
                              {!loading && <ArrowRight className="w-5 h-5" />}
                            </button>
                          </div>
                        </div>
                      </div>
                    )}

                    {submitted && (
                      <div className="max-w-md mx-auto animate-fadeIn">
                        <div className="relative group">
                          <div className="absolute -inset-1 bg-gradient-to-r from-green-500 to-emerald-500 rounded-3xl blur-xl opacity-50"></div>
                          <div className="relative p-12 bg-zinc-900/95 backdrop-blur-2xl rounded-3xl border border-green-500/20">
                            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full mb-6 animate-bounce">
                              <CheckCircle className="w-10 h-10 text-white" />
                            </div>
                            <h3 className="text-3xl font-bold mb-3">{t.waitlist.success.title}</h3>
                            <p className="text-gray-400 text-lg mb-4">{t.waitlist.success.message}</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlacePreview;
