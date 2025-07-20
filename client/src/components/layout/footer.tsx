import { motion } from "framer-motion";
import { Zap, Twitter, Linkedin, Github, Mail, Phone, MapPin } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: "Services",
      links: [
        { label: "AI & Automation", href: "#services" },
        { label: "MLOps", href: "#services" },
        { label: "Strategic Consulting", href: "#services" },
        { label: "Integration Services", href: "#services" },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "About Us", href: "#about" },
        { label: "Our Suites", href: "/suites" },
        { label: "Contact", href: "#contact" },
        { label: "Careers", href: "#" },
      ],
    },
    {
      title: "Resources",
      links: [
        { label: "Documentation", href: "#" },
        { label: "Case Studies", href: "#" },
        { label: "White Papers", href: "#" },
        { label: "Support", href: "#" },
      ],
    },
  ];

  const socialLinks = [
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Github, href: "#", label: "GitHub" },
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
    <footer className="bg-neutral-dark text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-accent/10 to-primary-gradient/10" />
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary-light via-accent to-primary-gradient" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 mb-12">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="lg:col-span-1"
          >
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-8 h-8 bg-gradient-to-r from-primary-light to-accent rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <span className="text-2xl font-bold">Synexian Labs</span>
            </div>
            
            <p className="text-gray-300 mb-8 max-w-md text-lg leading-relaxed">
              Transforming businesses through intelligent automation and AI-powered solutions. 
              Your trusted partner in digital transformation and innovation.
            </p>

            {/* Contact Info */}
            <div className="space-y-4 mb-8">
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-accent" />
                <span className="text-gray-300">hello@synexianlabs.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-accent" />
                <span className="text-gray-300">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-accent" />
                <span className="text-gray-300">San Francisco, CA</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-lg flex items-center justify-center hover:bg-accent/20 transition-all duration-200"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Links Grid */}
          <div className="grid md:grid-cols-3 gap-8">
            {footerSections.map((section, index) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * (index + 1) }}
                viewport={{ once: true }}
              >
                <h3 className="text-lg font-semibold mb-6 text-white">{section.title}</h3>
                <ul className="space-y-3">
                  {section.links.map((link) => (
                    <li key={link.label}>
                      <button
                        onClick={() => scrollToSection(link.href)}
                        className="text-gray-300 hover:text-accent transition-colors duration-200 text-left"
                      >
                        {link.label}
                      </button>
                    </li>
                  ))}
                </ul>
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
          className="border-t border-gray-700 pt-8 flex flex-col md:flex-row justify-between items-center"
        >
          <div className="text-gray-400 text-sm mb-4 md:mb-0">
            © {currentYear} Synexian Labs Private Limited. All rights reserved.
          </div>
          
          <div className="flex space-x-6 text-gray-400 text-sm">
            <button
              onClick={() => scrollToSection("#")}
              className="hover:text-accent transition-colors duration-200"
            >
              Privacy Policy
            </button>
            <button
              onClick={() => scrollToSection("#")}
              className="hover:text-accent transition-colors duration-200"
            >
              Terms of Service
            </button>
            <button
              onClick={() => scrollToSection("#")}
              className="hover:text-accent transition-colors duration-200"
            >
              Cookie Policy
            </button>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
