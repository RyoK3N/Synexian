import { motion } from "framer-motion";
import { TrendingUp, Zap, Shield, Users, CheckCircle, Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function Features() {
  const features = [
    {
      title: "AI-Powered Analytics",
      description: "Transform raw data into actionable insights with our advanced AI engine. Get real-time predictions, trend analysis, and automated reporting that helps you make informed decisions faster than ever before.",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      alt: "Business professionals analyzing data on multiple screens with AI-powered analytics",
      highlights: [
        { icon: TrendingUp, title: "Predictive Insights", description: "Forecast trends and outcomes with 95% accuracy" },
        { icon: Zap, title: "Real-time Processing", description: "Instant analysis of streaming data sources" },
      ],
      stats: [
        { value: "95%", label: "Accuracy" },
        { value: "10x", label: "Faster" },
        { value: "24/7", label: "Processing" },
      ]
    },
    {
      title: "Enterprise Security",
      description: "Bank-grade encryption, SOC 2 compliance, and advanced threat protection. Your data stays secure with our multi-layered security architecture trusted by Fortune 500 companies.",
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      alt: "Professional team collaborating on secure technology solutions in modern office",
      highlights: [
        { icon: Shield, title: "Advanced Protection", description: "Multi-layered security with threat detection" },
        { icon: CheckCircle, title: "Compliance Ready", description: "SOC 2, GDPR, and industry standards" },
      ],
      stats: [
        { value: "256-bit", label: "Encryption" },
        { value: "SOC 2", label: "Compliant" },
        { value: "24/7", label: "Monitoring" },
      ]
    },
    {
      title: "Seamless Integration",
      description: "Connect with 1000+ popular tools and services. Our platform integrates effortlessly with your existing workflow, ensuring zero disruption to your current operations.",
      image: "https://images.unsplash.com/photo-1518186233392-c232efbf2373?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      alt: "Advanced automation and AI visualization dashboard showing seamless integrations",
      highlights: [
        { icon: Users, title: "Team Collaboration", description: "Built-in tools for seamless teamwork" },
        { icon: Zap, title: "Quick Setup", description: "Deploy in minutes, not months" },
      ],
      stats: [
        { value: "1000+", label: "Integrations" },
        { value: "99.9%", label: "Uptime" },
        { value: "5 min", label: "Setup" },
      ]
    },
  ];

  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <Badge variant="secondary" className="mb-4 px-4 py-2 text-sm bg-accent/10 text-accent border-accent/20">
            Advanced Features
          </Badge>
          <h2 className="gradient-text mb-4">
            Built for Modern Enterprises
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Discover the powerful features that make our platform the preferred choice 
            for businesses looking to scale with AI and automation.
          </p>
        </motion.div>

        {/* Features */}
        <div className="space-y-20">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className={`grid lg:grid-cols-2 gap-12 items-center ${
                index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
              }`}
            >
              {/* Content */}
              <div className={`space-y-8 ${index % 2 === 1 ? 'lg:col-start-2' : ''}`}>
                <div>
                  <h3 className="text-3xl font-bold mb-6 text-foreground">
                    {feature.title}
                  </h3>
                  <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                    {feature.description}
                  </p>
                </div>

                {/* Highlights */}
                <div className="space-y-4">
                  {feature.highlights.map((highlight) => (
                    <motion.div
                      key={highlight.title}
                      whileHover={{ x: 10 }}
                      transition={{ type: "spring", stiffness: 300 }}
                      className="flex items-start space-x-4 p-4 rounded-lg hover:bg-accent/5 transition-colors"
                    >
                      <div className="w-10 h-10 bg-gradient-to-r from-primary-light to-accent rounded-lg flex items-center justify-center flex-shrink-0">
                        <highlight.icon className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground mb-1">
                          {highlight.title}
                        </h4>
                        <p className="text-muted-foreground text-sm">
                          {highlight.description}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Stats */}
                <div className="flex flex-wrap gap-6 pt-4">
                  {feature.stats.map((stat, statIndex) => (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, scale: 0.5 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: 0.4 + statIndex * 0.1 }}
                      viewport={{ once: true }}
                      className="text-center"
                    >
                      <div className="text-2xl font-bold gradient-text">
                        {stat.value}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {stat.label}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Image */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
                className={`relative ${index % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : ''}`}
              >
                <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                  <img
                    src={feature.image}
                    alt={feature.alt}
                    className="w-full h-auto object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/10 to-transparent" />
                </div>

                {/* Floating Badge */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  viewport={{ once: true }}
                  className="absolute -bottom-6 -right-6 bg-card border border-border rounded-xl p-4 shadow-xl"
                >
                  <div className="flex items-center space-x-2">
                    <Star className="w-5 h-5 text-yellow-500 fill-current" />
                    <div>
                      <div className="text-sm font-semibold text-foreground">Enterprise Ready</div>
                      <div className="text-xs text-muted-foreground">Trusted by 500+ companies</div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-20"
        >
          <Card className="bg-gradient-to-r from-primary/5 via-accent/5 to-primary-gradient/5 border-accent-secondary/20">
            <CardContent className="p-12 text-center">
              <h3 className="text-2xl font-bold mb-4 text-foreground">
                Experience the Difference
              </h3>
              <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
                Join thousands of businesses that have transformed their operations with our 
                cutting-edge AI and automation solutions. See the impact in just 24 hours.
              </p>
              <div className="flex flex-wrap justify-center items-center gap-8 text-sm text-muted-foreground">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-success" />
                  <span>Free 30-day trial</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-success" />
                  <span>No setup fees</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-success" />
                  <span>Cancel anytime</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
