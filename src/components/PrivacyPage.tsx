import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Globe, Shield, Lock, Eye, Database, Users, Bell } from 'lucide-react';
import enTranslations from '../translations/en.json';
import esTranslations from '../translations/es.json';

// Extend translations with privacy page content
const privacyTranslations = {
  en: {
    ...enTranslations,
    privacy: {
      title: "Privacy Policy",
      subtitle: "How we protect and handle your data",
      backToHome: "Back to Home",
      lastUpdated: "Last Updated: October 2025",
      sections: [
        {
          icon: "shield",
          title: "Our Commitment",
          content: [
            "At Mazunte Connect, we believe your privacy is fundamental. We're committed to being transparent about what data we collect and how we use it.",
            "This policy explains our practices regarding your personal information when you use our app and services."
          ]
        },
        {
          icon: "database",
          title: "Information We Collect",
          content: [
            "Email Address: When you join our waitlist or create an account, we collect your email address to communicate with you about Mazunte Connect.",
            "Usage Data: We collect anonymous usage data to improve the app, such as which features you use and how you navigate the app.",
            "Location Data: With your permission, we use your location to show you nearby events and places in Mazunte. This data is never shared with third parties."
          ]
        },
        {
          icon: "lock",
          title: "How We Use Your Information",
          content: [
            "To provide and improve our services",
            "To send you updates about events and features (you can unsubscribe anytime)",
            "To personalize your experience in the app",
            "To ensure the security and integrity of our platform",
            "We never sell your personal data to third parties"
          ]
        },
        {
          icon: "eye",
          title: "Data Sharing",
          content: [
            "We do not sell, rent, or share your personal information with third parties for their marketing purposes.",
            "We may share anonymized, aggregated data with event organizers and businesses to help them understand their audience.",
            "We use trusted service providers (like email services) who are bound by confidentiality agreements."
          ]
        },
        {
          icon: "users",
          title: "Your Rights",
          content: [
            "Access: You can request a copy of your personal data at any time",
            "Correction: You can update or correct your information through the app",
            "Deletion: You can request deletion of your account and data",
            "Opt-out: You can unsubscribe from marketing emails at any time",
            "Contact us at hello@mazunteconnect.com to exercise these rights"
          ]
        },
        {
          icon: "bell",
          title: "Cookies and Tracking",
          content: [
            "We use essential cookies to make the app function properly.",
            "We use analytics to understand how people use Mazunte Connect so we can make it better.",
            "You can disable cookies in your browser settings, though some features may not work properly."
          ]
        },
        {
          icon: "shield",
          title: "Security",
          content: [
            "We use industry-standard security measures to protect your data.",
            "Your data is encrypted in transit and at rest.",
            "We regularly review and update our security practices.",
            "However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security."
          ]
        }
      ],
      contact: {
        title: "Questions?",
        description: "If you have any questions about this Privacy Policy, please contact us at:",
        email: "hello@mazunteconnect.com"
      }
    }
  },
  es: {
    ...esTranslations,
    privacy: {
      title: "Política de Privacidad",
      subtitle: "Cómo protegemos y manejamos tus datos",
      backToHome: "Volver al Inicio",
      lastUpdated: "Última Actualización: Octubre 2025",
      sections: [
        {
          icon: "shield",
          title: "Nuestro Compromiso",
          content: [
            "En Mazunte Connect, creemos que tu privacidad es fundamental. Nos comprometemos a ser transparentes sobre qué datos recopilamos y cómo los usamos.",
            "Esta política explica nuestras prácticas con respecto a tu información personal cuando usas nuestra app y servicios."
          ]
        },
        {
          icon: "database",
          title: "Información que Recopilamos",
          content: [
            "Correo Electrónico: Cuando te unes a nuestra lista de espera o creas una cuenta, recopilamos tu dirección de correo electrónico para comunicarnos contigo sobre Mazunte Connect.",
            "Datos de Uso: Recopilamos datos de uso anónimos para mejorar la app, como qué funciones usas y cómo navegas por la app.",
            "Datos de Ubicación: Con tu permiso, usamos tu ubicación para mostrarte eventos y lugares cercanos en Mazunte. Estos datos nunca se comparten con terceros."
          ]
        },
        {
          icon: "lock",
          title: "Cómo Usamos tu Información",
          content: [
            "Para proporcionar y mejorar nuestros servicios",
            "Para enviarte actualizaciones sobre eventos y funciones (puedes cancelar la suscripción en cualquier momento)",
            "Para personalizar tu experiencia en la app",
            "Para garantizar la seguridad e integridad de nuestra plataforma",
            "Nunca vendemos tus datos personales a terceros"
          ]
        },
        {
          icon: "eye",
          title: "Compartir Datos",
          content: [
            "No vendemos, alquilamos ni compartimos tu información personal con terceros para sus fines de marketing.",
            "Podemos compartir datos anónimos y agregados con organizadores de eventos y negocios para ayudarles a entender a su audiencia.",
            "Usamos proveedores de servicios confiables (como servicios de correo electrónico) que están sujetos a acuerdos de confidencialidad."
          ]
        },
        {
          icon: "users",
          title: "Tus Derechos",
          content: [
            "Acceso: Puedes solicitar una copia de tus datos personales en cualquier momento",
            "Corrección: Puedes actualizar o corregir tu información a través de la app",
            "Eliminación: Puedes solicitar la eliminación de tu cuenta y datos",
            "Cancelación: Puedes cancelar la suscripción a correos de marketing en cualquier momento",
            "Contáctanos en hello@mazunteconnect.com para ejercer estos derechos"
          ]
        },
        {
          icon: "bell",
          title: "Cookies y Seguimiento",
          content: [
            "Usamos cookies esenciales para que la app funcione correctamente.",
            "Usamos análisis para entender cómo las personas usan Mazunte Connect para poder mejorarlo.",
            "Puedes deshabilitar las cookies en la configuración de tu navegador, aunque algunas funciones pueden no funcionar correctamente."
          ]
        },
        {
          icon: "shield",
          title: "Seguridad",
          content: [
            "Usamos medidas de seguridad estándar de la industria para proteger tus datos.",
            "Tus datos están encriptados en tránsito y en reposo.",
            "Revisamos y actualizamos regularmente nuestras prácticas de seguridad.",
            "Sin embargo, ningún método de transmisión por internet es 100% seguro, y no podemos garantizar seguridad absoluta."
          ]
        }
      ],
      contact: {
        title: "¿Preguntas?",
        description: "Si tienes alguna pregunta sobre esta Política de Privacidad, contáctanos en:",
        email: "hello@mazunteconnect.com"
      }
    }
  }
};

const iconMap = {
  shield: Shield,
  lock: Lock,
  eye: Eye,
  database: Database,
  users: Users,
  bell: Bell
};

export default function PrivacyPage() {
  const [language, setLanguage] = useState<'en' | 'es'>('en');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const t = privacyTranslations[language];

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

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
        {/* Back Button */}
        <div className="fixed top-4 left-4 z-50">
          <Link
            to="/"
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 backdrop-blur-xl border border-amber-900/20 hover:bg-white/80 transition-all shadow-md"
          >
            <ArrowLeft className="w-4 h-4 text-amber-900" />
            <span className="text-sm font-medium text-amber-900">{t.privacy.backToHome}</span>
          </Link>
        </div>

        {/* Language Toggle */}
        <div className="fixed top-4 right-4 z-50">
          <button
            onClick={() => setLanguage(language === 'en' ? 'es' : 'en')}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 backdrop-blur-xl border border-amber-900/20 hover:bg-white/80 transition-all shadow-md"
          >
            <Globe className="w-4 h-4 text-amber-900" />
            <span className="text-sm font-medium text-amber-900">{language === 'en' ? 'EN' : 'ES'}</span>
          </button>
        </div>

        {/* Hero Section */}
        <div className="container mx-auto px-4 pt-16 pb-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-orange-600 via-teal-600 to-amber-700 bg-clip-text text-transparent">
              {t.privacy.title}
            </h1>
            <p className="text-xl text-amber-800 mb-4">
              {t.privacy.subtitle}
            </p>
            <p className="text-sm text-amber-700">
              {t.privacy.lastUpdated}
            </p>
          </div>
        </div>

        {/* Content Sections */}
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto space-y-8">
            {t.privacy.sections.map((section, index) => {
              const IconComponent = iconMap[section.icon as keyof typeof iconMap] || Shield;
              const gradients = [
                'from-orange-500 to-teal-500',
                'from-teal-500 to-amber-500',
                'from-amber-500 to-orange-500',
                'from-orange-600 to-teal-600',
                'from-teal-500 to-orange-500',
                'from-green-500 to-emerald-500',
                'from-orange-500 to-amber-600'
              ];
              const gradient = gradients[index % gradients.length];

              return (
                <div key={index} className="group relative">
                  <div className={`absolute -inset-0.5 bg-gradient-to-r ${gradient} rounded-3xl blur opacity-20 group-hover:opacity-40 transition duration-500`}></div>
                  <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl border border-amber-900/20 p-8 hover:border-orange-400/30 transition-all shadow-lg">
                    <div className="flex items-start gap-6">
                      <div className="flex-shrink-0">
                        <div className={`w-14 h-14 bg-gradient-to-br ${gradient} rounded-2xl flex items-center justify-center`}>
                          <IconComponent className="w-7 h-7 text-white" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold mb-4 text-amber-950">{section.title}</h3>
                        <div className="space-y-3">
                          {section.content.map((paragraph, pIndex) => (
                            <p key={pIndex} className="text-amber-800 leading-relaxed">
                              {paragraph}
                            </p>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Contact Section */}
            <div className="group relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-500 via-teal-500 to-amber-500 rounded-3xl blur opacity-30 group-hover:opacity-50 transition duration-500"></div>
              <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl border border-amber-900/20 p-8 text-center shadow-lg">
                <h3 className="text-2xl font-bold mb-4 text-amber-950">{t.privacy.contact.title}</h3>
                <p className="text-amber-800 mb-4">{t.privacy.contact.description}</p>
                <a
                  href={`mailto:${t.privacy.contact.email}`}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-teal-500 text-white rounded-xl font-semibold hover:shadow-2xl hover:shadow-orange-500/30 transform hover:scale-105 transition-all"
                >
                  {t.privacy.contact.email}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-amber-700">
              {t.footer.made}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
