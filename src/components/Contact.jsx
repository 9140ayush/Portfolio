import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from './ui/Button'
import { Mail, FileText, MapPin, Phone, Send, CheckCircle } from 'lucide-react'
import { GithubIcon, LinkedinIcon, LeetcodeIcon } from './ui/Icons'
import emailjs from '@emailjs/browser'

export function Contact() {
  const currentYear = new Date().getFullYear()
  const [formData, setFormData] = useState({ 
    name: '', 
    email: '', 
    phone: '', 
    company: '', 
    subject: '', 
    message: '' 
  })
  const [status, setStatus] = useState('idle')

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // Trim values
    const name = formData.name.trim()
    const email = formData.email.trim()
    const phone = formData.phone.trim()
    const company = formData.company.trim()
    const subject = formData.subject.trim()
    const message = formData.message.trim()

    if (!name || !email || !subject || !message) {
      console.warn('Contact form: Missing required fields.')
      return
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      console.warn('Contact form: Invalid email address.')
      return
    }

    setStatus('sending')

    const templateParams = {
      from_name: name,
      from_email: email,
      phone: phone || 'Not provided',
      company: company || 'Not provided',
      subject: subject,
      message: message,
    }

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID
    const contactTemplateId = import.meta.env.VITE_EMAILJS_CONTACT_TEMPLATE_ID
    const autoReplyTemplateId = import.meta.env.VITE_EMAILJS_AUTOREPLY_TEMPLATE_ID
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

    try {
      // Email 1: Send the Contact Template
      await emailjs.send(serviceId, contactTemplateId, templateParams, publicKey)
      
      try {
        // Email 2: Send the Auto Reply Template
        await emailjs.send(serviceId, autoReplyTemplateId, templateParams, publicKey)
        setStatus('success')
      } catch (err2) {
        console.error('EmailJS Auto-Reply send failure:', err2)
        setStatus('error-autoreply')
      }

      // Reset form upon inquiry success
      setFormData({ name: '', email: '', phone: '', company: '', subject: '', message: '' })
    } catch (err1) {
      console.error('EmailJS Contact Inquiry send failure:', err1)
      setStatus('error-inquiry')
    }
  }

  return (
    <section id="contact" className="py-24 bg-base border-t border-border-muted relative">
      <div className="max-w-7xl mx-auto px-6 flex flex-col justify-between min-h-[70vh]">
        
        {/* Core Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-16">
          
          {/* Left Column: CTA & Details */}
          <div className="lg:col-span-6 text-left flex flex-col justify-between h-full">
            <div>
              <span className="font-mono text-xs text-teal-accent font-semibold tracking-wider block mb-3">
                // NEXT STEP
              </span>
              <h2 className="text-4xl md:text-6xl font-extrabold text-primary mb-6 tracking-tight">
                Let's build systems.
              </h2>
              <p className="text-base md:text-lg text-secondary leading-relaxed mb-10">
                I am always open to discussing full-stack development, Next.js / React engineering, LLM integrations, or freelance collaboration opportunities. Feel free to reach out.
              </p>

              <div className="space-y-4 mb-10">
                <div className="flex items-center gap-3 text-secondary text-sm">
                  <Mail size={16} className="text-teal-accent shrink-0" />
                  <a href="mailto:ayushlohiya722@gmail.com" className="hover:text-primary transition-colors">ayushlohiya722@gmail.com</a>
                </div>
                <div className="flex items-center gap-3 text-secondary text-sm">
                  <Phone size={16} className="text-teal-accent shrink-0" />
                  <a href="tel:+919140719396" className="hover:text-primary transition-colors">+91 9140719396</a>
                </div>
                <div className="flex items-center gap-3 text-secondary text-sm">
                  <MapPin size={16} className="text-teal-accent shrink-0" />
                  <span>Mathura, India</span>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-3 items-center">
              <Button 
                href="https://www.linkedin.com/in/ayushlohiya/" 
                target="_blank"
                rel="noopener noreferrer"
                variant="secondary"
                className="gap-2"
              >
                <LinkedinIcon size={16} /> LinkedIn
              </Button>
              <Button 
                href="https://github.com/9140ayush" 
                target="_blank"
                rel="noopener noreferrer"
                variant="secondary"
                className="gap-2"
              >
                <GithubIcon size={16} /> GitHub
              </Button>
              <Button 
                href="https://leetcode.com/u/ayush_lohiya_/" 
                target="_blank"
                rel="noopener noreferrer"
                variant="secondary"
                className="gap-2"
              >
                <LeetcodeIcon size={16} /> LeetCode
              </Button>
              <Button 
                href="/AyushLohiya_CSE_GLAU.pdf"
                download="AyushLohiya_CSE_GLAU.pdf"
                variant="secondary"
                className="gap-2"
              >
                <FileText size={16} /> CV / Resume
              </Button>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-6 w-full text-left">
            <div className="bg-surface border border-border-muted rounded-xl p-6 md:p-8 shadow-xl">
              <span className="font-mono text-[10px] text-muted tracking-widest uppercase block mb-4">
                // Send Message
              </span>
              
              <AnimatePresence mode="wait">
                {status === 'success' ? (
                  <motion.div 
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="flex flex-col items-center justify-center py-12 text-center"
                  >
                    <div className="w-12 h-12 rounded-full bg-teal-accent/10 border border-teal-accent/30 flex items-center justify-center text-teal-accent mb-4">
                      <CheckCircle size={24} />
                    </div>
                    <h3 className="text-lg font-bold text-primary mb-2">✅ Message sent successfully!</h3>
                    <p className="text-sm text-secondary max-w-xs leading-relaxed">
                      Thank you for contacting me.
                    </p>
                  </motion.div>
                ) : (
                  <motion.form 
                    key="form"
                    onSubmit={handleSubmit}
                    className="space-y-4"
                  >
                    {status.startsWith('error') && (
                      <div className="text-xs font-mono p-3 rounded-lg border border-red-500/20 bg-red-500/5 text-red-500 flex gap-2 items-center">
                        <span>
                          {status === 'error-autoreply' 
                            ? '❌ Inquiry received, but failed to send confirmation auto-reply.' 
                            : '❌ Failed to send message. Please try again later.'}
                        </span>
                      </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="name" className="block font-mono text-[9px] text-muted tracking-wider uppercase mb-1.5">Name *</label>
                        <input
                          id="name"
                          type="text"
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="Your name"
                          className="w-full bg-base border border-border-muted focus:border-teal-accent text-primary rounded-lg px-4 py-2.5 text-sm focus:outline-none transition-colors"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block font-mono text-[9px] text-muted tracking-wider uppercase mb-1.5">Email *</label>
                        <input
                          id="email"
                          type="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="your.email@example.com"
                          className="w-full bg-base border border-border-muted focus:border-teal-accent text-primary rounded-lg px-4 py-2.5 text-sm focus:outline-none transition-colors"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="phone" className="block font-mono text-[9px] text-muted tracking-wider uppercase mb-1.5">Phone (optional)</label>
                        <input
                          id="phone"
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="Your phone number"
                          className="w-full bg-base border border-border-muted focus:border-teal-accent text-primary rounded-lg px-4 py-2.5 text-sm focus:outline-none transition-colors"
                        />
                      </div>
                      <div>
                        <label htmlFor="company" className="block font-mono text-[9px] text-muted tracking-wider uppercase mb-1.5">Company (optional)</label>
                        <input
                          id="company"
                          type="text"
                          name="company"
                          value={formData.company}
                          onChange={handleChange}
                          placeholder="Your company name"
                          className="w-full bg-base border border-border-muted focus:border-teal-accent text-primary rounded-lg px-4 py-2.5 text-sm focus:outline-none transition-colors"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="subject" className="block font-mono text-[9px] text-muted tracking-wider uppercase mb-1.5">Subject *</label>
                      <input
                        id="subject"
                        type="text"
                        name="subject"
                        required
                        value={formData.subject}
                        onChange={handleChange}
                        placeholder="Inquiry / Collaboration"
                        className="w-full bg-base border border-border-muted focus:border-teal-accent text-primary rounded-lg px-4 py-2.5 text-sm focus:outline-none transition-colors"
                      />
                    </div>

                    <div>
                      <label htmlFor="message" className="block font-mono text-[9px] text-muted tracking-wider uppercase mb-1.5">Message *</label>
                      <textarea
                        id="message"
                        name="message"
                        required
                        rows="4"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Your message details..."
                        className="w-full bg-base border border-border-muted focus:border-teal-accent text-primary rounded-lg px-4 py-2.5 text-sm focus:outline-none transition-colors resize-none"
                      />
                    </div>

                    <Button 
                      type="submit" 
                      variant="primary" 
                      disabled={status === 'sending'} 
                      className="w-full justify-center gap-2 mt-2"
                    >
                      {status === 'sending' ? (
                        <span>Sending...</span>
                      ) : (
                        <>
                          Send Message <Send size={14} />
                        </>
                      )}
                    </Button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </div>

        </div>

        {/* Footer Area */}
        <div className="border-t border-border-muted/50 pt-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 text-left">
          <div className="flex flex-col gap-1.5">
            <span className="font-mono text-xs text-primary font-semibold">Ayush Lohiya</span>
            <span className="text-xs text-muted">Full Stack Developer</span>
          </div>

          <div className="flex items-center gap-4 text-xs text-secondary font-mono flex-wrap">
            <div className="flex items-center gap-2">
              <MapPin size={14} className="text-teal-accent" />
              <span>Mathura, India</span>
            </div>
            <span>•</span>
            <a href="mailto:ayushlohiya722@gmail.com" className="hover:text-primary transition-colors">ayushlohiya722@gmail.com</a>
            <span>•</span>
            <a href="https://github.com/9140ayush" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">GitHub</a>
            <span>•</span>
            <a href="https://www.linkedin.com/in/ayushlohiya/" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">LinkedIn</a>
            <span>•</span>
            <a href="https://leetcode.com/u/ayush_lohiya_/" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">LeetCode</a>
          </div>

          <div className="text-xs text-muted font-mono flex flex-col md:items-end gap-1">
            <span>© {currentYear} Ayush Lohiya. All rights reserved.</span>
            <span>Crafted with React, Tailwind v4 & Framer Motion</span>
          </div>
        </div>

      </div>
    </section>
  )
}
