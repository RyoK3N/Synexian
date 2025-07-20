import { motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { Link } from "wouter";
import { 
  Zap, 
  ArrowRight, 
  ExternalLink, 
  Code, 
  Layers, 
  Smartphone, 
  Briefcase, 
  TrendingUp,
  Shield,
  Globe,
  Users,
  PieChart,
  MessageSquare,
  Calendar,
  CreditCard,
  Home
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

// Mock data for the suites - in production, this would come from an API
const suites = [
  {
    id: 1,
    title: "SmartFlow Analytics",
    description: "Advanced business intelligence platform with real-time data visualization and predictive analytics.",
    category: "Analytics",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop&crop=center",
    tags: ["Analytics", "BI", "Real-time"],
    features: ["Real-time dashboards", "Predictive modeling", "Custom reports"],
    status: "Live",
    url: "https://analytics.synexianlabs.com",
    icon: PieChart,
    color: "from-blue-600 to-indigo-600"
  },
  {
    id: 2,
    title: "AutoCRM Pro",
    description: "AI-powered customer relationship management system that automates lead scoring and follow-ups.",
    category: "CRM",
    image: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=600&h=400&fit=crop&crop=center",
    tags: ["CRM", "AI", "Automation"],
    features: ["AI lead scoring", "Automated workflows", "360° customer view"],
    status: "Live",
    url: "https://crm.synexianlabs.com",
    icon: Users,
    color: "from-green-600 to-emerald-600"
  },
  {
    id: 3,
    title: "SecureVault",
    description: "Enterprise-grade security platform with zero-trust architecture and compliance automation.",
    category: "Security",
    image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=600&h=400&fit=crop&crop=center",
    tags: ["Security", "Compliance", "Zero-trust"],
    features: ["Zero-trust security", "Compliance automation", "Threat detection"],
    status: "Beta",
    url: "https://security.synexianlabs.com",
    icon: Shield,
    color: "from-red-600 to-rose-600"
  },
  {
    id: 4,
    title: "CloudScale",
    description: "Multi-cloud management platform that optimizes costs and performance across providers.",
    category: "Cloud",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&h=400&fit=crop&crop=center",
    tags: ["Cloud", "Multi-cloud", "Cost optimization"],
    features: ["Multi-cloud support", "Cost optimization", "Performance monitoring"],
    status: "Coming Soon",
    url: "#",
    icon: Globe,
    color: "from-purple-600 to-violet-600"
  },
  {
    id: 5,
    title: "ChatBot Studio",
    description: "No-code conversational AI platform for building sophisticated chatbots and virtual assistants.",
    category: "AI/ML",
    image: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=600&h=400&fit=crop&crop=center",
    tags: ["AI", "Chatbot", "No-code"],
    features: ["No-code builder", "Multi-channel deployment", "Advanced NLP"],
    status: "Live",
    url: "https://chatbot.synexianlabs.com",
    icon: MessageSquare,
    color: "from-orange-600 to-amber-600"
  },
  {
    id: 6,
    title: "EconoMetrics",
    description: "Financial planning and analysis platform with advanced forecasting and budget management.",
    category: "Finance",
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=600&h=400&fit=crop&crop=center",
    tags: ["Finance", "Forecasting", "Budgeting"],
    features: ["Financial forecasting", "Budget tracking", "ROI analysis"],
    status: "Live",
    url: "https://finance.synexianlabs.com",
    icon: TrendingUp,
    color: "from-teal-600 to-cyan-600"
  }
];

const categories = ["All", "Analytics", "CRM", "Security", "Cloud", "AI/ML", "Finance"];

export default function Suites() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const constraintsRef = useRef(null);

  // Track page view
  useEffect(() => {
    const trackPageView = async () => {
      try {
        await fetch("/api/track/pageview", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ page: "suites" }),
        });
      } catch (error) {
        console.error("Failed to track page view:", error);
      }
    };

    trackPageView();
  }, []);

  const filteredSuites = selectedCategory === "All" 
    ? suites 
    : suites.filter(suite => suite.category === selectedCategory);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Live": return "bg-green-100 text-green-800";
      case "Beta": return "bg-yellow-100 text-yellow-800";
      case "Coming Soon": return "bg-gray-100 text-gray-800";
      default: return "bg-blue-100 text-blue-800";
    }
  };

  const handleSuiteClick = (url: string) => {
    if (url !== "#") {
      window.open(url, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/50 to-indigo-50/50">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/90 backdrop-blur-md border-b border-gray-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/">
              <div className="flex items-center space-x-3 cursor-pointer hover:opacity-80 transition-opacity">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <Zap className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-blue-900 to-purple-600 bg-clip-text text-transparent">
                  Synexian Labs
                </span>
              </div>
            </Link>
            
            <Link href="/">
              <button className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-full transition-all duration-200 shadow-lg hover:scale-105">
                <Home className="w-4 h-4" />
                <span>Back to Home</span>
              </button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-20 pb-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <div className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-md rounded-full px-4 py-2 border border-blue-200/50 mb-6">
              <Layers className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-medium text-blue-900">Product Suites</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-900 via-purple-600 to-blue-900 bg-clip-text text-transparent">
              Synexian Suites
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-4xl mx-auto leading-relaxed">
              Explore our comprehensive collection of AI-powered business solutions,
              each designed to revolutionize how you work and scale your operations.
            </p>
          </motion.div>

          {/* Category Filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-wrap justify-center gap-3 mb-12"
          >
            {categories.map((category, index) => (
              <motion.button
                key={category}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  selectedCategory === category
                    ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-600/25"
                    : "bg-white/80 text-gray-700 hover:bg-white hover:shadow-md border border-gray-200"
                }`}
              >
                {category}
              </motion.button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Suites Grid */}
      <section className="px-4 pb-20">
        <div className="max-w-7xl mx-auto">
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredSuites.map((suite, index) => {
              const IconComponent = suite.icon;
              return (
                <motion.div
                  key={suite.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  onHoverStart={() => setHoveredCard(suite.id)}
                  onHoverEnd={() => setHoveredCard(null)}
                  className="group cursor-pointer"
                  onClick={() => handleSuiteClick(suite.url)}
                >
                  <Card className="h-full overflow-hidden border-0 shadow-xl shadow-gray-200/50 bg-white/90 backdrop-blur-md hover:shadow-2xl hover:shadow-gray-300/50 transition-all duration-500">
                    {/* Image Section */}
                    <div className="relative overflow-hidden h-48">
                      <motion.img
                        src={suite.image}
                        alt={suite.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className={`absolute inset-0 bg-gradient-to-t ${suite.color} opacity-80`} />
                      
                      {/* Status Badge */}
                      <div className="absolute top-4 left-4">
                        <Badge className={getStatusColor(suite.status)}>
                          {suite.status}
                        </Badge>
                      </div>

                      {/* Icon */}
                      <div className="absolute top-4 right-4">
                        <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center">
                          <IconComponent className="w-6 h-6 text-white" />
                        </div>
                      </div>

                      {/* Hover Overlay */}
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: hoveredCard === suite.id ? 1 : 0 }}
                        className="absolute inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center"
                      >
                        <div className="flex items-center space-x-2 text-white">
                          <ExternalLink className="w-5 h-5" />
                          <span className="font-medium">View Application</span>
                        </div>
                      </motion.div>
                    </div>

                    <CardContent className="p-6">
                      <div className="mb-4">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                            {suite.title}
                          </h3>
                          <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
                        </div>
                        <p className="text-gray-600 text-sm leading-relaxed">
                          {suite.description}
                        </p>
                      </div>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {suite.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-600 rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Features */}
                      <div className="space-y-2">
                        {suite.features.map((feature, idx) => (
                          <div key={idx} className="flex items-center text-sm text-gray-600">
                            <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mr-3 flex-shrink-0" />
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="px-4 pb-20">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-12 text-white"
          >
            <Zap className="w-16 h-16 mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Transform Your Business?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Discover how our AI-powered suites can revolutionize your operations and drive unprecedented growth.
            </p>
            <Button
              size="lg"
              className="bg-white text-blue-600 hover:bg-gray-100 font-semibold px-8 py-4 text-lg"
            >
              Contact Our Team
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Floating Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-blue-400/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>
    </div>
  );
}