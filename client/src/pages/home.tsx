import { useEffect } from "react";
import { motion } from "framer-motion";
import { Navigation } from "@/components/layout/navigation";
import { Footer } from "@/components/layout/footer";
import { Hero } from "@/components/sections/hero";
import { Services } from "@/components/sections/services";
import { Features } from "@/components/sections/features";
import { About } from "@/components/sections/about";
import { Contact } from "@/components/sections/contact";
import { CalendlyModal } from "@/components/modals/calendly-modal";
import { apiRequest } from "@/lib/queryClient";

export default function Home() {
  // Track page view
  useEffect(() => {
    const trackPageView = async () => {
      try {
        await apiRequest("POST", "/api/track/pageview", { page: "home" });
      } catch (error) {
        console.error("Failed to track page view:", error);
      }
    };

    trackPageView();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen"
    >
      <Navigation />
      
      <main className="pt-16">
        <Hero />
        <Services />
        <Features />
        <About />
        <Contact />
      </main>
      
      <Footer />
      <CalendlyModal />
    </motion.div>
  );
}
