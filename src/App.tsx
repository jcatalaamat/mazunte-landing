import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useParams, Link } from 'react-router-dom';
import { CheckCircle, Sparkles, Calendar, MapPin, Leaf, ArrowRight, Zap, Users, Bell, Waves, Globe, Apple, Smartphone } from 'lucide-react';
import enTranslations from './translations/en.json';
import esTranslations from './translations/es.json';
import EventPreview from './components/EventPreview';
import PlacePreview from './components/PlacePreview';
import SupportPage from './components/SupportPage';
import PrivacyPage from './components/PrivacyPage';

// Main Landing Page Component
function LandingPage() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);
  const [count, setCount] = useState(0);
  const [language, setLanguage] = useState('en');
  
  const t = language === 'es' ? esTranslations : enTranslations;

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    if (count < 100) {
      const timer = setTimeout(() => setCount(count + 3), 30);
      return () => clearTimeout(timer);
    }
  }, [count]);

  const handleSubmit = async () => {
    if (!email || !email.includes('@')) return;
    setLoading(true);
    
    try {
      // ConvertKit API integration
      const convertKitApiKey = (import.meta as any).env.VITE_CONVERTKIT_API_KEY || 'WL4dvqOgWKNB2eq6RLOflQ';
      const convertKitFormId = (import.meta as any).env.VITE_CONVERTKIT_FORM_ID || '8630317';
      
      if (convertKitApiKey && convertKitFormId) {
        console.log('Sending to ConvertKit:', { apiKey: convertKitApiKey, formId: convertKitFormId, email });
        
        const response = await fetch(`https://api.convertkit.com/v3/forms/${convertKitFormId}/subscribe`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            api_key: convertKitApiKey,
            email: email,
            tags: ['mazunte-android-beta']
          })
        });

        console.log('ConvertKit response:', response.status, response.statusText);
        
        if (response.ok) {
          const data = await response.json();
          console.log('ConvertKit success:', data);
          setSubmitted(true);
          setEmail('');
          setLoading(false);
          return;
        } else {
          const errorData = await response.json();
          console.error('ConvertKit error:', errorData);
          throw new Error('Failed to subscribe');
        }
      }

      // Fallback: No email service configured
      throw new Error('No email service configured');
      
    } catch (error) {
      console.error('Subscription error:', error);
      // For now, still show success for demo purposes
      // In production, you might want to show an error message
      setSubmitted(true);
      setEmail('');
    }
    
    setLoading(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSubmit();
  };

  const spotlightStyle = {
    background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(20, 184, 166, 0.12), transparent 40%)`
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100 text-amber-950 overflow-hidden relative">
      {/* Animated mesh background */}
      <div className="fixed inset-0 opacity-20">
        <div className="absolute top-0 -left-4 w-96 h-96 bg-orange-400 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" style={{animationDuration: '7s'}}></div>
        <div className="absolute top-0 -right-4 w-96 h-96 bg-teal-400 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" style={{animationDuration: '9s', animationDelay: '2s'}}></div>
        <div className="absolute -bottom-8 left-20 w-96 h-96 bg-amber-300 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" style={{animationDuration: '11s', animationDelay: '4s'}}></div>
      </div>

      {/* Mouse spotlight effect */}
      <div className="fixed inset-0 pointer-events-none" style={spotlightStyle}></div>

      {/* Grid overlay */}
      <div className="fixed inset-0 opacity-5" style={{
        backgroundImage: 'linear-gradient(rgba(120,53,15,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(120,53,15,0.1) 1px, transparent 1px)',
        backgroundSize: '50px 50px'
      }}></div>

      <div className="relative z-10">

        {/* Hero Section */}
        <div className="container mx-auto px-4 pt-20 pb-16 md:pt-32 md:pb-24">
          <div className="max-w-6xl mx-auto text-center">
            
            {/* Logo */}
            <div className="inline-flex items-center justify-center gap-3 mb-8">
              <div className="relative">
                <img src="/icon.png" alt="Mazunte Connect" className="w-16 h-16 relative z-10 rounded-2xl shadow-lg" />
                <div className="absolute inset-0 bg-orange-400 blur-xl opacity-30"></div>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-orange-600 via-teal-600 to-amber-700 bg-clip-text text-transparent">
                Mazunte Connect
              </h1>
            </div>

            {/* Floating badge and Language Switcher */}
            <div className="flex flex-col items-center gap-4 mb-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/30 backdrop-blur-xl border border-green-500/50 shadow-md">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span className="text-sm text-green-700 font-semibold">{t.hero.launching}</span>
              </div>

              {/* Language Switcher */}
              <div className="inline-flex items-center gap-2 p-1 rounded-full bg-white/80 backdrop-blur-xl border border-amber-900/20 shadow-md">
                <button
                  onClick={() => setLanguage('en')}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    language === 'en'
                      ? 'bg-gradient-to-r from-orange-500 to-teal-500 text-white shadow-lg'
                      : 'text-amber-800 hover:bg-amber-50'
                  }`}
                >
                  English
                </button>
                <button
                  onClick={() => setLanguage('es')}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    language === 'es'
                      ? 'bg-gradient-to-r from-orange-500 to-teal-500 text-white shadow-lg'
                      : 'text-amber-800 hover:bg-amber-50'
                  }`}
                >
                  Español
                </button>
              </div>
            </div>

            {/* Animated headline */}
            <h2 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
              <span className="inline-block animate-fadeIn" style={{
                background: 'linear-gradient(to right, #f59e0b, #14b8a6, #b45309)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundSize: '200% auto',
                animation: 'gradient 3s linear infinite'
              }}>
                {t.hero.title}
              </span>
            </h2>

            <p className="text-xl md:text-2xl text-amber-800 mb-6 max-w-3xl mx-auto leading-relaxed" style={{opacity: Math.min(1, scrollY / 100)}}>
              {t.hero.subtitle}
            </p>

            {/* Social proof stats */}
            <p className="text-sm md:text-base text-amber-700 mb-12 flex items-center justify-center gap-2">
              <Sparkles className="w-4 h-4 text-orange-500" />
              {t.hero.stats}
            </p>

            {/* Download CTAs */}
            <div className="max-w-2xl mx-auto mb-16 space-y-6">
              {/* iOS Download - Primary CTA */}
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-orange-500 via-teal-500 to-amber-600 rounded-2xl blur-lg opacity-50 group-hover:opacity-75 transition duration-1000"></div>
                <a
                  href="https://apps.apple.com/es/app/mazunte-connect/id6753561445"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative block bg-gradient-to-r from-orange-500 via-teal-500 to-amber-600 text-white rounded-2xl overflow-hidden shadow-xl"
                >
                  <div className="px-8 py-5 flex items-center justify-center gap-4 relative overflow-hidden group-hover:scale-105 transition-transform">
                    <Apple className="w-8 h-8" />
                    <div className="text-left">
                      <div className="text-xs font-medium opacity-90">{t.platform.availableNow}</div>
                      <div className="text-xl font-bold">{t.hero.cta}</div>
                    </div>
                    <ArrowRight className="w-6 h-6 ml-auto group-hover:translate-x-1 transition-transform" />
                  </div>
                </a>
              </div>

              {/* Android Beta - Secondary CTA */}
              {!submitted ? (
                <div className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-orange-500/30 to-teal-500/30 rounded-2xl blur opacity-30 group-hover:opacity-50 transition"></div>
                  <div className="relative bg-white/80 backdrop-blur-2xl p-6 rounded-2xl border border-amber-900/20 space-y-3 shadow-lg">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Smartphone className="w-5 h-5 text-amber-800" />
                        <span className="font-semibold text-amber-950">{t.hero.androidCta}</span>
                      </div>
                      <span className="text-xs text-amber-700 bg-amber-100 px-2 py-1 rounded-full">
                        {t.hero.androidBetaNote}
                      </span>
                    </div>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder={t.platform.emailPlaceholder}
                      className="w-full px-4 py-3 rounded-xl bg-white border border-amber-900/20 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20 text-sm text-amber-950 placeholder-amber-600 transition-all"
                    />
                    <button
                      onClick={handleSubmit}
                      disabled={loading || !email}
                      className="w-full px-6 py-3 bg-gradient-to-r from-orange-500 to-teal-500 text-white rounded-xl font-semibold hover:shadow-xl transform hover:scale-105 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                      {loading ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                          <span className="text-sm">Joining...</span>
                        </>
                      ) : (
                        <>
                          <span className="text-sm">{t.hero.androidCta}</span>
                          <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </button>
                    <p className="text-xs text-amber-700 text-center">
                      {t.hero.betaSpots.replace('{count}', '12')}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="relative group animate-fadeIn">
                  <div className="absolute -inset-1 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl blur opacity-40"></div>
                  <div className="relative p-8 bg-white/90 backdrop-blur-2xl rounded-2xl border border-green-500/30 shadow-xl">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full mb-4">
                      <CheckCircle className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold mb-2 text-amber-950">{t.success.title}</h3>
                    <p className="text-amber-800 mb-3">{t.success.message}</p>
                    <div className="bg-teal-500/10 border border-teal-500/30 rounded-xl p-3">
                      <p className="text-teal-700 text-xs">
                        {t.success.email}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

          </div>
        </div>

        {/* Platform Availability - Simplified */}
        <div className="container mx-auto px-4 pt-8 pb-32">
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 gap-6">
              {/* iOS - Available Now */}
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-orange-400 via-teal-400 to-amber-400 rounded-3xl blur-xl opacity-30 group-hover:opacity-50 transition duration-500"></div>
                <a
                  href="https://apps.apple.com/es/app/mazunte-connect/id6753561445"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative block bg-white/90 backdrop-blur-xl rounded-3xl border border-amber-900/20 p-10 hover:border-orange-400/50 transition-all transform hover:scale-105 shadow-lg"
                >
                  <div className="flex items-center gap-4 mb-6">
                    <div className="relative">
                      <Apple className="w-16 h-16 text-orange-600 relative z-10" />
                      <div className="absolute inset-0 bg-orange-400 blur-xl opacity-30"></div>
                    </div>
                    <div>
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/20 border border-green-500/30 mb-2">
                        <CheckCircle className="w-3 h-3 text-green-600" />
                        <span className="text-xs text-green-700 font-semibold">{t.platform.availableNow}</span>
                      </div>
                      <h3 className="text-3xl font-bold text-amber-950">iOS</h3>
                    </div>
                  </div>
                  <p className="text-amber-800 mb-4">{t.platform.subtitle}</p>
                  <div className="flex items-center gap-2 text-orange-600 font-semibold">
                    <span>Download Now</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </a>
              </div>

              {/* Android - Beta Testing */}
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-orange-400 to-teal-400 rounded-3xl blur-xl opacity-20 group-hover:opacity-30 transition duration-500"></div>
                <div className="relative bg-white/90 backdrop-blur-xl rounded-3xl border border-amber-900/20 p-10 shadow-lg">
                  <div className="flex items-center gap-4 mb-6">
                    <Smartphone className="w-16 h-16 text-teal-600" />
                    <div>
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/20 border border-orange-500/30 mb-2">
                        <Sparkles className="w-3 h-3 text-orange-600" />
                        <span className="text-xs text-orange-700 font-semibold">{t.platform.comingSoon}</span>
                      </div>
                      <h3 className="text-3xl font-bold text-amber-950">Android</h3>
                    </div>
                  </div>
                  <p className="text-amber-800 mb-4">{t.platform.androidBetaSubtitle}</p>
                  <div className="text-sm text-amber-700">
                    Limited to 100 beta testers • Sign up above
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bento Grid Features */}
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 text-amber-950">
                {t.features.title}
              </h2>
              <p className="text-xl text-amber-800">
                {t.features.subtitle}
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Large card */}
              <div className="md:col-span-2 group relative">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-500 to-teal-500 rounded-3xl blur opacity-20 group-hover:opacity-40 transition duration-500"></div>
                <div className="relative h-full bg-white/80 backdrop-blur-xl rounded-3xl border border-amber-900/20 p-10 hover:border-orange-400/30 transition-all overflow-hidden shadow-lg">
                  <Calendar className="w-12 h-12 text-orange-600 mb-6" />
                  <h3 className="text-3xl font-bold mb-4 text-amber-950">{t.features.events.title}</h3>
                  <p className="text-amber-800 text-lg mb-6">{t.features.events.description}</p>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 text-sm text-amber-700">
                      <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                      <span>{t.features.events.features[0]}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-amber-700">
                      <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
                      <span>{t.features.events.features[1]}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-amber-700">
                      <div className="w-2 h-2 bg-amber-600 rounded-full"></div>
                      <span>{t.features.events.features[2]}</span>
                    </div>
                  </div>
                  <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-gradient-to-br from-orange-500/10 to-transparent rounded-full blur-3xl"></div>
                </div>
              </div>

              {/* Tall card */}
              <div className="md:row-span-2 group relative">
                <div className="absolute -inset-0.5 bg-gradient-to-b from-teal-500 to-orange-500 rounded-3xl blur opacity-20 group-hover:opacity-40 transition duration-500"></div>
                <div className="relative h-full bg-white/80 backdrop-blur-xl rounded-3xl border border-amber-900/20 p-10 hover:border-teal-400/30 transition-all shadow-lg">
                  <MapPin className="w-12 h-12 text-teal-600 mb-6" />
                  <h3 className="text-2xl font-bold mb-4 text-amber-950">{t.features.discover.title}</h3>
                  <p className="text-amber-800 mb-8">{t.features.discover.description}</p>
                  <div className="relative h-48 bg-amber-100/50 rounded-2xl overflow-hidden border border-amber-900/20">
                    <div className="absolute inset-0 bg-gradient-to-br from-teal-500/20 to-transparent"></div>
                    <div className="absolute top-4 left-4 w-3 h-3 bg-teal-500 rounded-full animate-ping"></div>
                    <div className="absolute top-12 right-8 w-3 h-3 bg-orange-500 rounded-full animate-ping" style={{animationDelay: '1s'}}></div>
                    <div className="absolute bottom-8 left-12 w-3 h-3 bg-amber-600 rounded-full animate-ping" style={{animationDelay: '2s'}}></div>
                  </div>
                </div>
              </div>

              {/* Wide card */}
              <div className="md:col-span-2 group relative">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-green-500 to-emerald-500 rounded-3xl blur opacity-20 group-hover:opacity-40 transition duration-500"></div>
                <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl border border-amber-900/20 p-10 hover:border-green-400/30 transition-all shadow-lg">
                  <div className="flex items-start gap-8">
                    <div className="flex-shrink-0">
                      <Leaf className="w-12 h-12 text-green-600" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold mb-3 text-amber-950">{t.features.conscious.title}</h3>
                      <p className="text-amber-800">{t.features.conscious.description}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Square cards - More features */}
              <div className="group relative">
                <div className="absolute -inset-0.5 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-3xl blur opacity-20 group-hover:opacity-40 transition duration-500"></div>
                <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl border border-amber-900/20 p-8 hover:border-teal-400/30 transition-all h-full shadow-lg">
                  <Bell className="w-10 h-10 text-teal-600 mb-4" />
                  <h3 className="text-xl font-bold mb-2 text-amber-950">{t.features.reminders.title}</h3>
                  <p className="text-amber-800 text-sm">{t.features.reminders.description}</p>
                </div>
              </div>

              <div className="group relative">
                <div className="absolute -inset-0.5 bg-gradient-to-br from-amber-500 to-orange-500 rounded-3xl blur opacity-20 group-hover:opacity-40 transition duration-500"></div>
                <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl border border-amber-900/20 p-8 hover:border-orange-400/30 transition-all h-full shadow-lg">
                  <Zap className="w-10 h-10 text-orange-600 mb-4" />
                  <h3 className="text-xl font-bold mb-2 text-amber-950">{t.features.fresh.title}</h3>
                  <p className="text-amber-800 text-sm">{t.features.fresh.description}</p>
                </div>
              </div>

              <div className="group relative">
                <div className="absolute -inset-0.5 bg-gradient-to-br from-orange-500 to-teal-500 rounded-3xl blur opacity-20 group-hover:opacity-40 transition duration-500"></div>
                <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl border border-amber-900/20 p-8 hover:border-amber-400/30 transition-all h-full shadow-lg">
                  <Users className="w-10 h-10 text-amber-700 mb-4" />
                  <h3 className="text-xl font-bold mb-2 text-amber-950">{t.features.community.title}</h3>
                  <p className="text-amber-800 text-sm">{t.features.community.description}</p>
                </div>
              </div>
            </div>

            {/* Additional feature row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div className="group relative">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-teal-500 to-orange-500 rounded-3xl blur opacity-20 group-hover:opacity-40 transition duration-500"></div>
                <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl border border-amber-900/20 p-8 hover:border-teal-400/30 transition-all shadow-lg">
                  <div className="flex items-start gap-6">
                    <div className="flex-shrink-0">
                      <Bell className="w-10 h-10 text-teal-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2 text-amber-950">{t.features.messaging.title}</h3>
                      <p className="text-amber-800 text-sm">{t.features.messaging.description}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="group relative">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-amber-500 to-orange-500 rounded-3xl blur opacity-20 group-hover:opacity-40 transition duration-500"></div>
                <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl border border-amber-900/20 p-8 hover:border-orange-400/30 transition-all shadow-lg">
                  <div className="flex items-start gap-6">
                    <div className="flex-shrink-0">
                      <Leaf className="w-10 h-10 text-orange-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2 text-amber-950">{t.features.bookmarks.title}</h3>
                      <p className="text-amber-800 text-sm">{t.features.bookmarks.description}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Problem/Solution section */}
        <div className="container mx-auto px-4 py-32">
          <div className="max-w-5xl mx-auto">
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-red-500/20 via-orange-500/20 to-green-500/20 rounded-3xl blur-2xl"></div>
              <div className="relative bg-white/80 backdrop-blur-2xl rounded-3xl border border-amber-900/20 p-12 md:p-16 shadow-xl">
                <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-amber-950">
                  {t.problem.title}
                </h2>

                <div className="grid md:grid-cols-2 gap-12">
                  <div className="space-y-6">
                    <div className="flex items-start gap-4 p-5 rounded-2xl bg-red-50 border border-red-200">
                      <span className="text-red-600 font-bold text-2xl">✗</span>
                      <div>
                        <p className="text-amber-900">{t.problem.problems[0]}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4 p-5 rounded-2xl bg-red-50 border border-red-200">
                      <span className="text-red-600 font-bold text-2xl">✗</span>
                      <div>
                        <p className="text-amber-900">{t.problem.problems[1]}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4 p-5 rounded-2xl bg-red-50 border border-red-200">
                      <span className="text-red-600 font-bold text-2xl">✗</span>
                      <div>
                        <p className="text-amber-900">{t.problem.problems[2]}</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="flex items-start gap-4 p-5 rounded-2xl bg-green-50 border border-green-200">
                      <span className="text-green-600 font-bold text-2xl">✓</span>
                      <div>
                        <p className="text-amber-900">{t.problem.solutions[0]}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4 p-5 rounded-2xl bg-green-50 border border-green-200">
                      <span className="text-green-600 font-bold text-2xl">✓</span>
                      <div>
                        <p className="text-amber-900">{t.problem.solutions[1]}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4 p-5 rounded-2xl bg-green-50 border border-green-200">
                      <span className="text-green-600 font-bold text-2xl">✓</span>
                      <div>
                        <p className="text-amber-900">{t.problem.solutions[2]}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Final CTA */}
        <div className="container mx-auto px-4 py-32">
          <div className="max-w-4xl mx-auto text-center">
            <div className="relative">
              <div className="absolute -inset-8 bg-gradient-to-r from-orange-500 via-teal-500 to-amber-500 rounded-3xl blur-3xl opacity-30"></div>
              <div className="relative bg-white/80 backdrop-blur-2xl rounded-3xl border border-amber-900/20 p-12 md:p-16 shadow-xl">
                <h2 className="text-4xl md:text-5xl font-bold mb-6 text-amber-950">
                  {t.cta.title}
                </h2>
                <p className="text-xl text-amber-800 mb-12 max-w-2xl mx-auto">
                  {t.cta.subtitle}
                </p>

                {/* Dual CTAs */}
                <div className="max-w-lg mx-auto space-y-4">
                  {/* iOS Download Button */}
                  <a
                    href="https://apps.apple.com/es/app/mazunte-connect/id6753561445"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block relative"
                  >
                    <div className="absolute -inset-1 bg-gradient-to-r from-orange-500 to-teal-500 rounded-2xl blur opacity-50 group-hover:opacity-75 transition"></div>
                    <div className="relative px-8 py-5 bg-gradient-to-r from-orange-500 to-teal-500 text-white rounded-2xl flex items-center justify-center gap-3 transform group-hover:scale-105 transition-all shadow-lg">
                      <Apple className="w-6 h-6" />
                      <span className="text-lg font-bold">{t.cta.button}</span>
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </a>

                  {/* Android Beta Text Link */}
                  <div className="text-amber-800">
                    <span className="text-sm">Android user? </span>
                    <button
                      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                      className="text-sm text-orange-600 hover:text-orange-700 underline underline-offset-2 font-medium"
                    >
                      {t.cta.androidButton}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="container mx-auto px-4 py-16 border-t border-amber-900/20">
          <div className="max-w-6xl mx-auto">
            <div className="text-center space-y-4 mb-8">
              <p className="text-amber-700">
                {t.footer.made}
              </p>
              <p className="text-sm text-amber-600">
                <span className="text-orange-600 font-medium">{t.footer.email}</span>
              </p>
            </div>
            <div className="flex items-center justify-center gap-6 text-sm">
              <Link to="/support" className="text-amber-700 hover:text-orange-600 transition-colors">
                Support
              </Link>
              <span className="text-amber-400">•</span>
              <Link to="/privacy" className="text-amber-700 hover:text-orange-600 transition-colors">
                Privacy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Event Route Component
function EventRoute() {
  const { id } = useParams<{ id: string }>();
  const [language] = useState<'en' | 'es'>('en');
  
  return <EventPreview eventId={id || ''} language={language} />;
}

// Place Route Component  
function PlaceRoute() {
  const { id } = useParams<{ id: string }>();
  const [language] = useState<'en' | 'es'>('en');
  
  return <PlacePreview placeId={id || ''} language={language} />;
}

// Main App with Routing
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/event/:id" element={<EventRoute />} />
        <Route path="/place/:id" element={<PlaceRoute />} />
        <Route path="/support" element={<SupportPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        {/* Catch all other routes and redirect to home */}
        <Route path="*" element={<LandingPage />} />
      </Routes>
    </Router>
  );
}

export default App;