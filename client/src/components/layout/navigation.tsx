import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Zap, Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const openCalendlyPopup = () => {
    // This will be handled by the CalendlyModal component
    const event = new CustomEvent('openCalendly');
    window.dispatchEvent(event);
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMobileMenuOpen(false);
    }
  };

  const navItems = [
    { id: "home", label: "Home", action: () => scrollToSection("home") },
    { 
      id: "services", 
      label: "Services", 
      action: () => scrollToSection("services"),
      dropdown: [
        { label: "AI & Automation", action: () => scrollToSection("services") },
        { label: "MLOps", action: () => scrollToSection("services") },
        { label: "Strategic Consulting", action: () => scrollToSection("services") },
      ]
    },
    { id: "suites", label: "Suites", action: () => window.location.href = "/suites" },
    { id: "about", label: "About", action: () => scrollToSection("about") },
    { id: "contact", label: "Contact", action: () => scrollToSection("contact") },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          isScrolled 
            ? "glass-nav shadow-lg border-b border-primary/20" 
            : "bg-background/95 backdrop-blur-sm"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center space-x-3 cursor-pointer"
              onClick={() => scrollToSection("home")}
            >
              <div className="w-8 h-8 bg-gradient-to-r from-primary-light to-accent rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold gradient-text">Synexian Labs</span>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <div key={item.id} className="relative group">
                  <button
                    onClick={item.action}
                    className="text-foreground hover:text-primary transition-colors duration-200 flex items-center space-x-1"
                  >
                    <span>{item.label}</span>
                    {item.dropdown && <ChevronDown className="w-4 h-4 group-hover:rotate-180 transition-transform duration-200" />}
                  </button>
                  
                  {item.dropdown && (
                    <div className="absolute top-full left-0 mt-2 w-56 bg-card border border-border rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
                      <div className="p-2">
                        {item.dropdown.map((dropdownItem) => (
                          <button
                            key={dropdownItem.label}
                            onClick={dropdownItem.action}
                            className="block w-full text-left px-4 py-3 text-foreground hover:bg-accent hover:text-accent-foreground rounded-lg transition-colors"
                          >
                            {dropdownItem.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Admin Link & CTA Button */}
            <div className="hidden md:flex items-center space-x-4">
              <button
                onClick={() => window.open('/admin', '_blank')}
                className="text-neutral hover:text-primary transition-colors duration-200 text-sm"
              >
                Admin
              </button>
              <Button
                onClick={openCalendlyPopup}
                className="cta-gradient hover:scale-105 transition-all duration-200 focus-ring"
              >
                Book a Call
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6 text-foreground" />
              ) : (
                <Menu className="w-6 h-6 text-foreground" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-card border-t border-border"
            >
              <div className="px-4 py-6 space-y-4">
                {navItems.map((item) => (
                  <div key={item.id}>
                    <button
                      onClick={item.action}
                      className="block w-full text-left text-foreground hover:text-primary transition-colors py-2"
                    >
                      {item.label}
                    </button>
                    {item.dropdown && (
                      <div className="ml-4 mt-2 space-y-2">
                        {item.dropdown.map((dropdownItem) => (
                          <button
                            key={dropdownItem.label}
                            onClick={dropdownItem.action}
                            className="block w-full text-left text-muted-foreground hover:text-primary transition-colors py-1 text-sm"
                          >
                            {dropdownItem.label}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
                
                <div className="pt-4 border-t border-border space-y-3">
                  <button
                    onClick={() => window.open('/admin', '_blank')}
                    className="block text-neutral hover:text-primary transition-colors text-sm"
                  >
                    Admin Portal
                  </button>
                  <Button
                    onClick={openCalendlyPopup}
                    className="w-full cta-gradient hover:scale-105 transition-all duration-200"
                  >
                    Book a Call
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Progress Line Animation */}
      <div className="fixed top-16 left-0 w-full h-0.5 bg-accent-secondary/20 z-40">
        <motion.div
          className="h-full bg-gradient-to-r from-primary-light via-accent to-primary-gradient"
          style={{
            scaleX: isScrolled ? 1 : 0,
            transformOrigin: "left",
          }}
          transition={{ duration: 0.3 }}
        />
      </div>
    </>
  );
}
