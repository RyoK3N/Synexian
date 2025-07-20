import { motion } from "framer-motion";
import { Zap, Twitter, Linkedin, Github, Mail, Phone, MapPin, ArrowRight, ExternalLink } from "lucide-react";
import { Link } from "wouter";

export function Footer() {
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: "Services",
      links: [
        { label: "AI & Automation", href: "#services", isExternal: false },
        { label: "MLOps", href: "#services", isExternal: false },
        { label: "Strategic Consulting", href: "#services", isExternal: false },
        { label: "Integration Services", href: "#services", isExternal: false },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "Home", href: "/", isExternal: false },
        { label: "About Us", href: "#about", isExternal: false },
        { label: "Our Suites", href: "/suites", isExternal: false },
        { label: "Contact", href: "#contact", isExternal: false },
      ],
    },
    {
      title: "Admin",
      links: [
        { label: "Admin Login", href: "/admin", isExternal: false },
        { label: "Dashboard", href: "/admin/dashboard", isExternal: false },
        { label: "Analytics", href: "/admin/dashboard", isExternal: false },
        { label: "Support", href: "mailto:support@synexianlabs.com", isExternal: true },
      ],
    },
  ];

  const socialLinks = [
    { icon: Twitter, href: "https://twitter.com/synexianlabs", label: "Twitter" },
    { icon: Linkedin, href: "https://linkedin.com/company/synexian-labs", label: "LinkedIn" },
    { icon: Github, href: "https://github.com/synexian-labs", label: "GitHub" },
  ];

  const handleLinkClick = (href: string) => {
    if (href.startsWith('#')) {
      const element = document.getElementById(href.replace('#', ''));
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      window.location.href = href;
    }
  };

  return (
    <footer className="bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-indigo-600/20" />
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 via-purple-400 to-indigo-400" />
      </div>
      
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-blue-400/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.3, 0.8, 0.3],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-12 gap-12 mb-12">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="lg:col-span-5"
          >
            <Link href="/">
              <div className="flex items-center space-x-3 mb-6 cursor-pointer hover:opacity-80 transition-opacity">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-400 to-purple-500 rounded-xl flex items-center justify-center shadow-lg">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <span className="text-3xl font-bold bg-gradient-to-r from-blue-200 to-purple-200 bg-clip-text text-transparent">
                  Synexian Labs
                </span>
              </div>
            </Link>
            
            <p className="text-blue-100 mb-8 max-w-md text-lg leading-relaxed">
              Transforming businesses with cutting-edge AI solutions and automation. 
              Join thousands of companies that trust us to revolutionize their operations and drive unprecedented growth.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-4 mb-8">
              <motion.div 
                className="flex items-center space-x-3 text-blue-200 hover:text-white transition-colors group cursor-pointer"
                whileHover={{ x: 5 }}
              >
                <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center group-hover:bg-blue-500/30 transition-colors">
                  <Mail className="w-4 h-4" />
                </div>
                <a href="mailto:hello@synexianlabs.com" className="text-lg">
                  hello@synexianlabs.com
                </a>
              </motion.div>
              <motion.div 
                className="flex items-center space-x-3 text-blue-200 hover:text-white transition-colors group cursor-pointer"
                whileHover={{ x: 5 }}
              >
                <div className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center group-hover:bg-green-500/30 transition-colors">
                  <Phone className="w-4 h-4" />
                </div>
                <a href="tel:+1234567890" className="text-lg">
                  +1 (234) 567-8900
                </a>
              </motion.div>
              <motion.div 
                className="flex items-center space-x-3 text-blue-200 group"
                whileHover={{ x: 5 }}
              >
                <div className="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center group-hover:bg-purple-500/30 transition-colors">
                  <MapPin className="w-4 h-4" />
                </div>
                <span className="text-lg">San Francisco, CA</span>
              </motion.div>
            </div>

            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center hover:bg-blue-500/20 transition-all duration-200 text-blue-200 hover:text-white"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Navigation Links */}
          <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-3 gap-8">
            {footerSections.map((section, sectionIndex) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: sectionIndex * 0.1 }}
                viewport={{ once: true }}
                className="space-y-4"
              >
                <h3 className="text-xl font-bold text-white mb-6 relative">
                  {section.title}
                  <div className="absolute -bottom-2 left-0 w-8 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full" />
                </h3>
                <div className="space-y-3">
                  {section.links.map((link, linkIndex) => (
                    <motion.div 
                      key={link.label}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: linkIndex * 0.05 }}
                      viewport={{ once: true }}
                    >
                      {link.isExternal ? (
                        <a
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group flex items-center text-blue-200 hover:text-white transition-all duration-200 text-left"
                        >
                          <span className="group-hover:translate-x-1 transition-transform duration-200">
                            {link.label}
                          </span>
                          <ExternalLink className="w-3 h-3 ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                        </a>
                      ) : link.href.startsWith('/') ? (
                        <Link href={link.href}>
                          <button className="group flex items-center text-blue-200 hover:text-white transition-all duration-200 text-left">
                            <span className="group-hover:translate-x-1 transition-transform duration-200">
                              {link.label}
                            </span>
                            <ArrowRight className="w-3 h-3 ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                          </button>
                        </Link>
                      ) : (
                        <button
                          onClick={() => handleLinkClick(link.href)}
                          className="group flex items-center text-blue-200 hover:text-white transition-all duration-200 text-left"
                        >
                          <span className="group-hover:translate-x-1 transition-transform duration-200">
                            {link.label}
                          </span>
                          <ArrowRight className="w-3 h-3 ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                        </button>
                      )}
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="border-t border-blue-800/50 pt-8 flex flex-col md:flex-row justify-between items-center"
        >
          <div className="text-blue-200 text-sm mb-4 md:mb-0">
            © {currentYear} Synexian Labs Private Limited. All rights reserved.
          </div>
          
          <div className="flex space-x-6 text-blue-200 text-sm">
            <button
              className="hover:text-white transition-colors duration-200"
            >
              Privacy Policy
            </button>
            <button
              className="hover:text-white transition-colors duration-200"
            >
              Terms of Service
            </button>
            <button
              className="hover:text-white transition-colors duration-200"
            >
              Cookie Policy
            </button>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}