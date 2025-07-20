import { motion } from "framer-motion";
import { Award, Target, Users, TrendingUp, Clock, Shield } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function About() {
  const stats = [
    { value: "50+", label: "Projects Delivered", icon: Award },
    { value: "98%", label: "Client Satisfaction", icon: Target },
    { value: "24/7", label: "Support Available", icon: Clock },
    { value: "5+", label: "Years Experience", icon: TrendingUp },
  ];

  const values = [
    {
      title: "Innovation First",
      description: "We stay at the forefront of AI and automation technology to deliver cutting-edge solutions.",
      icon: TrendingUp,
    },
    {
      title: "Client Success",
      description: "Your success is our mission. We partner with you every step of the transformation journey.",
      icon: Target,
    },
    {
      title: "Security & Trust",
      description: "Enterprise-grade security and transparent practices build lasting trust with our clients.",
      icon: Shield,
    },
  ];

  return (
    <section id="about" className="py-20 bg-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <Badge variant="secondary" className="mb-4 px-4 py-2 text-sm bg-primary/10 text-primary border-primary/20">
            About Synexian Labs
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-foreground">
            Pioneering the Future of Business Automation
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Founded by industry experts with decades of experience in AI, automation, and enterprise 
            technology solutions. We're on a mission to democratize advanced technology for businesses of all sizes.
          </p>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          {/* Company Story */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl font-semibold mb-6 text-foreground">Our Mission</h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                We empower businesses to harness the full potential of artificial intelligence and automation 
                technologies. Our team of experts works closely with organizations to identify opportunities, 
                implement solutions, and drive measurable results.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                From startups to Fortune 500 companies, we've helped organizations across industries 
                transform their operations, reduce costs, and accelerate growth through intelligent automation.
              </p>
            </div>

            {/* Values */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-foreground mb-4">Our Core Values</h4>
              {values.map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-start space-x-4 p-4 rounded-lg hover:bg-accent/5 transition-colors"
                >
                  <div className="w-10 h-10 bg-gradient-to-r from-primary-light to-accent rounded-lg flex items-center justify-center flex-shrink-0">
                    <value.icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h5 className="font-semibold text-foreground mb-1">{value.title}</h5>
                    <p className="text-sm text-muted-foreground">{value.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Team Image & Stats */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            {/* Team Image */}
            <div className="relative">
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
                className="relative overflow-hidden rounded-2xl shadow-2xl"
              >
                <img
                  src="https://images.unsplash.com/photo-1556761175-b413da4baf72?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
                  alt="Professional team discussing technology solutions in modern office environment"
                  className="w-full h-auto object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent" />
              </motion.div>

              {/* Floating Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                viewport={{ once: true }}
                className="absolute -bottom-6 -left-6 bg-card border border-border rounded-xl p-4 shadow-xl"
              >
                <div className="flex items-center space-x-2">
                  <Users className="w-5 h-5 text-primary" />
                  <div>
                    <div className="text-sm font-semibold text-foreground">Expert Team</div>
                    <div className="text-xs text-muted-foreground">15+ AI Specialists</div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-6">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="card-hover">
                    <CardContent className="p-6 text-center">
                      <div className="w-12 h-12 bg-gradient-to-r from-primary-light to-accent rounded-lg flex items-center justify-center mx-auto mb-4">
                        <stat.icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="text-3xl font-bold gradient-text mb-2">
                        {stat.value}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {stat.label}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Timeline/Milestones */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="relative"
        >
          <Card className="bg-gradient-to-r from-primary/5 via-accent/5 to-primary-gradient/5 border-accent-secondary/20">
            <CardContent className="p-12">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold mb-4 text-foreground">
                  Our Journey in Numbers
                </h3>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  From our founding to today, we've consistently delivered exceptional results 
                  and built lasting partnerships with our clients.
                </p>
              </div>

              <div className="grid md:grid-cols-4 gap-8 text-center">
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="text-4xl font-bold gradient-text mb-2">2019</div>
                  <div className="text-sm text-muted-foreground">Company Founded</div>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  <div className="text-4xl font-bold gradient-text mb-2">100+</div>
                  <div className="text-sm text-muted-foreground">Happy Clients</div>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  viewport={{ once: true }}
                >
                  <div className="text-4xl font-bold gradient-text mb-2">$5M+</div>
                  <div className="text-sm text-muted-foreground">Cost Savings Generated</div>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  viewport={{ once: true }}
                >
                  <div className="text-4xl font-bold gradient-text mb-2">15+</div>
                  <div className="text-sm text-muted-foreground">Industry Awards</div>
                </motion.div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
