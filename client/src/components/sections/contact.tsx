import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Mail, Phone, MapPin, Send, CheckCircle, Calendar, Clock } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

const contactSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Please enter a valid email address"),
  company: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactForm = z.infer<typeof contactSchema>;

export function Contact() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<ContactForm>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      company: "",
      message: "",
    },
  });

  const onSubmit = async (data: ContactForm) => {
    setIsSubmitting(true);

    try {
      await apiRequest("POST", "/api/contact", data);
      
      toast({
        title: "Message Sent Successfully!",
        description: "Thank you for your interest. We'll get back to you within 24 hours.",
      });

      form.reset();
    } catch (error: any) {
      toast({
        title: "Failed to Send Message",
        description: error.message || "Please try again later or contact us directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const openCalendlyPopup = () => {
    const event = new CustomEvent('openCalendly');
    window.dispatchEvent(event);
  };

  const contactInfo = [
    {
      icon: Mail,
      title: "Email",
      value: "hello@synexianlabs.com",
      description: "Send us an email anytime",
      gradient: "from-primary-light to-accent",
    },
    {
      icon: Phone,
      title: "Phone",
      value: "+1 (555) 123-4567",
      description: "Mon-Fri from 8am to 6pm",
      gradient: "from-accent to-primary-gradient",
    },
    {
      icon: MapPin,
      title: "Location",
      value: "San Francisco, CA",
      description: "Come say hello at our office",
      gradient: "from-cta-orange to-accent",
    },
  ];

  return (
    <section id="contact" className="py-20 bg-gradient-to-br from-primary/5 via-accent/5 to-primary-gradient/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-foreground">
            Get In Touch
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Ready to transform your business? Let's discuss how our AI and automation 
            solutions can drive your success. We're here to help you every step of the way.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Card className="shadow-xl border-accent-secondary/20 backdrop-blur-sm bg-card/95">
              <CardHeader className="space-y-2">
                <CardTitle className="text-2xl font-semibold text-foreground flex items-center space-x-2">
                  <Send className="w-6 h-6 text-primary" />
                  <span>Send us a message</span>
                </CardTitle>
                <CardDescription className="text-muted-foreground">
                  Fill out the form below and we'll get back to you as soon as possible.
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="firstName" className="text-foreground font-medium">
                        First Name *
                      </Label>
                      <Input
                        id="firstName"
                        {...form.register("firstName")}
                        className="focus:ring-accent focus:border-accent transition-all duration-200"
                        placeholder="Enter your first name"
                      />
                      {form.formState.errors.firstName && (
                        <p className="text-sm text-destructive">
                          {form.formState.errors.firstName.message}
                        </p>
                      )}
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="lastName" className="text-foreground font-medium">
                        Last Name *
                      </Label>
                      <Input
                        id="lastName"
                        {...form.register("lastName")}
                        className="focus:ring-accent focus:border-accent transition-all duration-200"
                        placeholder="Enter your last name"
                      />
                      {form.formState.errors.lastName && (
                        <p className="text-sm text-destructive">
                          {form.formState.errors.lastName.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-foreground font-medium">
                      Email Address *
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      {...form.register("email")}
                      className="focus:ring-accent focus:border-accent transition-all duration-200"
                      placeholder="Enter your email address"
                    />
                    {form.formState.errors.email && (
                      <p className="text-sm text-destructive">
                        {form.formState.errors.email.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="company" className="text-foreground font-medium">
                      Company
                    </Label>
                    <Input
                      id="company"
                      {...form.register("company")}
                      className="focus:ring-accent focus:border-accent transition-all duration-200"
                      placeholder="Enter your company name (optional)"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-foreground font-medium">
                      Message *
                    </Label>
                    <Textarea
                      id="message"
                      rows={4}
                      {...form.register("message")}
                      className="focus:ring-accent focus:border-accent transition-all duration-200 resize-none"
                      placeholder="Tell us about your project, challenges, or questions..."
                    />
                    {form.formState.errors.message && (
                      <p className="text-sm text-destructive">
                        {form.formState.errors.message.message}
                      </p>
                    )}
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full cta-gradient hover:scale-105 transition-all duration-200 focus-ring"
                    size="lg"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Sending Message...</span>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-2">
                        <Send className="w-4 h-4" />
                        <span>Send Message</span>
                      </div>
                    )}
                  </Button>

                  <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
                    <CheckCircle className="w-4 h-4 text-success" />
                    <span>We respond within 24 hours</span>
                  </div>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          {/* Contact Info & CTA */}
          <div className="space-y-8">
            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Card className="shadow-xl border-accent-secondary/20 backdrop-blur-sm bg-card/95">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold text-foreground">
                    Contact Information
                  </CardTitle>
                  <CardDescription>
                    Get in touch through any of these channels
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="space-y-6">
                  {contactInfo.map((info, index) => (
                    <motion.div
                      key={info.title}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                      viewport={{ once: true }}
                      className="flex items-center space-x-4 p-4 rounded-lg hover:bg-accent/5 transition-colors"
                    >
                      <div className={`w-12 h-12 bg-gradient-to-r ${info.gradient} rounded-lg flex items-center justify-center`}>
                        <info.icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <div className="font-semibold text-foreground">{info.title}</div>
                        <div className="text-foreground font-medium">{info.value}</div>
                        <div className="text-sm text-muted-foreground">{info.description}</div>
                      </div>
                    </motion.div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>

            {/* Schedule Consultation CTA */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <Card className="bg-gradient-to-br from-primary to-primary-gradient text-white shadow-xl border-0">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Calendar className="w-8 h-8 text-white" />
                  </div>
                  
                  <h3 className="text-2xl font-semibold mb-4">
                    Schedule a Free Consultation
                  </h3>
                  
                  <p className="text-white/90 mb-6 leading-relaxed">
                    Book a free 30-minute consultation to discuss your business needs 
                    and explore how we can help you achieve your goals.
                  </p>

                  <div className="flex items-center justify-center space-x-4 text-sm text-white/80 mb-6">
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4" />
                      <span>30 minutes</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4" />
                      <span>No commitment</span>
                    </div>
                  </div>

                  <Button
                    onClick={openCalendlyPopup}
                    className="bg-white text-primary hover:bg-accent-secondary/20 hover:text-white transition-all duration-200 px-8 py-3 font-semibold"
                    size="lg"
                  >
                    <Calendar className="mr-2 w-5 h-5" />
                    Book Now
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            {/* Quick Response Promise */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              viewport={{ once: true }}
              className="bg-success/10 border border-success/20 rounded-xl p-6 text-center"
            >
              <CheckCircle className="w-8 h-8 text-success mx-auto mb-3" />
              <h4 className="font-semibold text-foreground mb-2">Quick Response Guarantee</h4>
              <p className="text-sm text-muted-foreground">
                We typically respond to all inquiries within 2-4 hours during business hours. 
                For urgent matters, please call us directly.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
