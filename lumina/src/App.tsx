import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { 
  Cpu, 
  Code, 
  Zap, 
  Lightbulb, 
  Rocket, 
  TrendingUp, 
  Layout, 
  RefreshCcw,
  Eye,
  Target,
  ArrowRight,
  Mail,
  Globe,
  Sparkles
} from "lucide-react";

// --- Components ---

const ServiceCard = ({ icon: Icon, title, description, delay = 0 }: any) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.5, delay }}
    className="glass-card p-8 flex flex-col items-start gap-5 hover:bg-slate-800/50 transition-all border-violet-500/20 hover:border-cyan-400/50 group"
  >
    <div className="p-4 rounded-2xl bg-gradient-brand shadow-lg group-hover:scale-110 transition-transform">
      <Icon size={28} className="text-white" />
    </div>
    <h3 className="text-2xl font-bold text-white">{title}</h3>
    <p className="text-slate-400 leading-relaxed text-lg">{description}</p>
  </motion.div>
);

const ValueCard = ({ icon: Icon, title, description, delay = 0 }: any) => (
  <motion.div 
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.5, delay }}
    className="flex gap-5 items-start p-6 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors"
  >
    <div className="p-3 rounded-xl bg-cyan-500/10 text-cyan-400 flex-shrink-0">
      <Icon size={24} />
    </div>
    <div>
      <h4 className="text-xl font-semibold text-white mb-2">{title}</h4>
      <p className="text-slate-400 leading-relaxed">{description}</p>
    </div>
  </motion.div>
);

const TechBadge = ({ name }: { name: string }) => (
  <div className="px-6 py-3 rounded-full glass-card border-violet-500/30 text-white font-medium shadow-[0_0_15px_rgba(139,92,246,0.1)] hover:shadow-[0_0_25px_rgba(6,182,212,0.3)] hover:border-cyan-400/50 transition-all cursor-default">
    {name}
  </div>
);

const ScrubRevealText = ({ text, className }: { text: string; className?: string }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 85%", "start 40%"]
  });
  
  const words = text.split(" ");
  return (
    <p ref={ref} className={`flex flex-wrap ${className}`}>
      {words.map((word, i) => {
        const start = i / words.length;
        const end = start + (1 / words.length);
        const opacity = useTransform(scrollYProgress, [start, end], [0.2, 1]);
        const filter = useTransform(scrollYProgress, [start, end], ["blur(4px)", "blur(0px)"]);
        return (
          <motion.span key={i} style={{ opacity, filter }} className="mr-[0.25em]">
            {word}
          </motion.span>
        );
      })}
    </p>
  );
};

const StaggerRevealTitle = ({ title, highlight, highlightColor = "text-cyan-400", className }: { title: string, highlight?: string, highlightColor?: string, className?: string }) => {
  return (
    <motion.h2 
      initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
      className={className}
    >
      {title} {highlight && <><br/><span className={highlightColor}>{highlight}</span></>}
    </motion.h2>
  );
};

// --- Main App ---

export default function App() {
  const { scrollY } = useScroll();
  
  // Parallax transforms based on window scroll position
  const heroY = useTransform(scrollY, [0, 800], [0, 250]);
  const heroOpacity = useTransform(scrollY, [0, 500], [1, 0]);
  
  const blob1Y = useTransform(scrollY, [0, 2000], [0, 400]);
  const blob2Y = useTransform(scrollY, [0, 3000], [0, -300]);

  return (
    <div className="min-h-screen font-sans overflow-x-hidden text-slate-50">
      {/* Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="fixed inset-0 w-full h-full object-cover z-[0]"
        src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260506_031045_0e1165dd-ab48-46e3-ad3d-5fe77f217647.mp4"
      />
      {/* Dark Overlay for readability */}
      <div className="fixed inset-0 bg-slate-950/70 z-[1] pointer-events-none" />

      {/* Main Content Wrapper */}
      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Navbar */}
        <nav className="fixed top-0 inset-x-0 z-50 glass-panel border-b-0 border-white/5 py-5 px-6 md:px-12 transition-all">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-brand rounded-lg">
                <Cpu className="text-white" size={24} />
              </div>
              <span className="text-2xl font-extrabold tracking-tight text-white">Mayan<span className="text-cyan-400">Labs</span></span>
            </div>
            <div className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-300">
              <a href="#about" className="hover:text-white transition-colors">About</a>
              <a href="#services" className="hover:text-white transition-colors">What We Build</a>
              <a href="#vision" className="hover:text-white transition-colors">Vision</a>
              <a href="#contact" className="hover:text-white transition-colors">Contact</a>
              <button className="bg-white/10 hover:bg-white/20 px-6 py-2.5 rounded-full text-white transition-all border border-white/10 shadow-lg hover:shadow-cyan-500/20">
                Get Started
              </button>
            </div>
          </div>
        </nav>

        <main className="flex-grow pt-40 pb-20 px-6 md:px-12 max-w-7xl mx-auto flex flex-col gap-40 w-full">
          
          {/* 1. Hero Section */}
          <motion.section 
            style={{ y: heroY, opacity: heroOpacity }}
            className="flex flex-col items-start md:items-center text-left md:text-center mt-10 z-10"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card border-violet-500/30 text-violet-300 text-sm font-medium mb-8"
            >
              <Sparkles size={16} />
              <span className="tracking-wide uppercase text-xs font-bold">Empowering ideas. Engineering possibilities.</span>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight mb-8 max-w-5xl leading-tight"
            >
              Building the Future with <br className="hidden md:block"/>
              <span className="text-gradient">AI and Software</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl md:text-2xl text-slate-300 max-w-3xl mb-12 leading-relaxed"
            >
              MayanLabs is a technology startup creating intelligent solutions that help businesses automate, innovate, and grow in the digital era.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center gap-5 w-full sm:w-auto"
            >
              <button className="w-full sm:w-auto px-10 py-5 rounded-full bg-gradient-brand text-white font-bold text-lg shadow-[0_0_30px_rgba(139,92,246,0.3)] hover:shadow-[0_0_40px_rgba(6,182,212,0.5)] hover:scale-105 transition-all flex items-center justify-center gap-2">
                Get Started
                <ArrowRight size={20} />
              </button>
              <button className="w-full sm:w-auto px-10 py-5 rounded-full glass-card hover:bg-white/10 text-white font-bold text-lg transition-all flex items-center justify-center gap-2 border-white/20">
                Contact Us
              </button>
            </motion.div>
          </motion.section>

          {/* 2. About MayanLabs */}
          <section id="about" className="scroll-mt-40 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <StaggerRevealTitle 
                title="Turning Ideas into" 
                highlight="Reality." 
                className="text-3xl md:text-5xl font-bold mb-8 text-white leading-tight" 
              />
              <ScrubRevealText 
                text="MayanLabs is a startup driven by a passion for technology and innovation. We focus on developing AI-powered products, modern software solutions, and digital experiences that solve real-world problems." 
                className="text-xl text-slate-300 leading-relaxed mb-8" 
              />
              <div className="p-6 border-l-4 border-violet-500 bg-violet-500/10 rounded-r-2xl">
                <h4 className="text-lg font-semibold text-white mb-2 uppercase tracking-widest text-violet-300">Our Mission</h4>
                <p className="text-2xl font-light text-white italic">
                  "Create technology that makes life and business smarter."
                </p>
              </div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative aspect-square md:aspect-video lg:aspect-square w-full max-w-md mx-auto"
            >
              <motion.div style={{ y: blob1Y }} className="absolute inset-0 bg-gradient-to-tr from-violet-600/40 to-cyan-400/40 rounded-full blur-[100px] pointer-events-none" />
              <div className="relative h-full w-full glass-card border-white/20 overflow-hidden flex items-center justify-center p-8">
                <div className="grid grid-cols-2 gap-4 w-full h-full opacity-80">
                  <div className="bg-white/5 rounded-xl animate-pulse delay-75" />
                  <div className="bg-cyan-500/20 rounded-xl" />
                  <div className="bg-violet-500/20 rounded-xl" />
                  <div className="bg-white/5 rounded-xl animate-pulse delay-300" />
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                   <Cpu size={120} className="text-white drop-shadow-[0_0_30px_rgba(255,255,255,0.5)]" />
                </div>
              </div>
            </motion.div>
          </section>

          {/* 3. What We're Building */}
          <section id="services" className="scroll-mt-40">
            <div className="text-center mb-20 flex flex-col items-center">
              <StaggerRevealTitle 
                title="What We're Building" 
                className="text-4xl md:text-5xl font-bold mb-6 text-white" 
              />
              <ScrubRevealText 
                text="Delivering comprehensive solutions across the digital landscape." 
                className="text-xl text-slate-400 max-w-2xl justify-center" 
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <ServiceCard 
                icon={Cpu} 
                title="Artificial Intelligence" 
                description="Developing intelligent applications that enhance productivity and decision-making."
                delay={0.1}
              />
              <ServiceCard 
                icon={Code} 
                title="Software Products" 
                description="Building scalable web and mobile solutions designed for modern businesses."
                delay={0.2}
              />
              <ServiceCard 
                icon={Zap} 
                title="Automation" 
                description="Helping organizations save time through smart workflows and efficient systems."
                delay={0.3}
              />
              <ServiceCard 
                icon={Lightbulb} 
                title="Digital Innovation" 
                description="Transforming ideas into products that deliver meaningful impact."
                delay={0.4}
              />
            </div>
          </section>

          {/* 4. Why MayanLabs? */}
          <section className="relative">
            <motion.div 
              style={{ y: blob2Y }}
              className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-screen max-w-5xl bg-cyan-500/5 blur-[120px] rounded-[100%] -z-10 pointer-events-none" 
            />
            <div className="text-center mb-16">
              <StaggerRevealTitle 
                title="Why MayanLabs?" 
                className="text-4xl md:text-5xl font-bold text-white" 
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto">
              <ValueCard 
                icon={Rocket} 
                title="Innovation Driven" 
                description="We embrace emerging technologies to create future-ready solutions."
                delay={0.1}
              />
              <ValueCard 
                icon={TrendingUp} 
                title="Built for Growth" 
                description="Our products are designed to scale with evolving business needs."
                delay={0.2}
              />
              <ValueCard 
                icon={Layout} 
                title="User-Centered Design" 
                description="Technology should be powerful, simple, and enjoyable to use."
                delay={0.3}
              />
              <ValueCard 
                icon={RefreshCcw} 
                title="Continuous Improvement" 
                description="We believe innovation is an ongoing journey, constantly refining our approach."
                delay={0.4}
              />
            </div>
          </section>

          {/* 5. Vision & Mission */}
          <section id="vision" className="scroll-mt-40 grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="glass-card p-12 relative overflow-hidden border-cyan-500/30 glow-effect"
            >
              <div className="absolute top-0 right-0 p-8 opacity-10">
                <Eye size={160} />
              </div>
              <Eye className="text-cyan-400 mb-6" size={48} />
              <h3 className="text-3xl font-bold text-white mb-6">Our Vision</h3>
              <ScrubRevealText 
                text="To become a trusted technology partner that empowers businesses and individuals through intelligent software and AI-driven innovation."
                className="text-xl text-slate-300 leading-relaxed relative z-10"
              />
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="glass-card p-12 relative overflow-hidden border-violet-500/30 shadow-[0_0_40px_-10px_rgba(139,92,246,0.3)]"
            >
              <div className="absolute top-0 right-0 p-8 opacity-10">
                <Target size={160} />
              </div>
              <Target className="text-violet-400 mb-6" size={48} />
              <h3 className="text-3xl font-bold text-white mb-6">Our Mission</h3>
              <ScrubRevealText 
                text="To build impactful digital products that simplify complexity and create opportunities for growth."
                className="text-xl text-slate-300 leading-relaxed relative z-10"
              />
            </motion.div>
          </section>

          {/* 6. Technologies We Love */}
          <section className="text-center">
            <StaggerRevealTitle 
              title="Technologies We Love" 
              className="text-3xl font-bold mb-10 text-white" 
            />
            <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
              {[
                "Artificial Intelligence", 
                "Python", 
                "React", 
                "Next.js", 
                "Node.js", 
                "TypeScript", 
                "Cloud Computing", 
                "APIs & Automation"
              ].map((tech, i) => (
                <TechBadge key={i} name={tech} />
              ))}
            </div>
          </section>

          {/* 7. Join Us on the Journey (CTA) */}
          <section className="glass-card p-12 md:p-20 text-center relative overflow-hidden flex flex-col items-center">
            <div className="absolute inset-0 bg-gradient-to-br from-violet-600/20 to-cyan-500/20 z-0" />
            <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center">
              <StaggerRevealTitle 
                title="Join Us on the Journey" 
                className="text-4xl md:text-5xl font-bold text-white mb-8" 
              />
              <ScrubRevealText 
                text="We're just getting started, and we're excited about the future. Whether you're a startup, business owner, or innovator with a great idea, we'd love to collaborate and build something meaningful together."
                className="text-xl text-slate-300 mb-12 justify-center text-center"
              />
              <div className="inline-block p-[2px] rounded-full bg-gradient-brand shadow-[0_0_30px_rgba(6,182,212,0.5)] hover:scale-105 transition-transform cursor-pointer">
                <div className="bg-slate-950 rounded-full px-10 py-5">
                  <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-violet-300 to-cyan-300">
                    Let's create the future, together.
                  </span>
                </div>
              </div>
            </div>
          </section>

        </main>

        {/* 8. Footer (Contact) */}
        <footer id="contact" className="border-t border-white/10 bg-slate-950/80 backdrop-blur-xl pt-16 pb-8">
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <div className="flex flex-col md:flex-row justify-between items-center gap-10 mb-12">
              <div className="text-center md:text-left">
                <div className="flex items-center justify-center md:justify-start gap-3 mb-4">
                  <div className="p-2 bg-gradient-brand rounded-lg">
                    <Cpu className="text-white" size={24} />
                  </div>
                  <span className="text-3xl font-extrabold tracking-tight text-white">Mayan<span className="text-cyan-400">Labs</span></span>
                </div>
                <p className="text-xl text-slate-400 font-light">Innovating Through Technology</p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-6 md:gap-12">
                <a href="mailto:hello@mayanlabs.com" className="flex items-center gap-3 text-lg text-slate-300 hover:text-white transition-colors glass-card px-6 py-4">
                  <Mail className="text-violet-400" />
                  hello@mayanlabs.com
                </a>
                <a href="https://www.mayanlabs.com" target="_blank" rel="noreferrer" className="flex items-center gap-3 text-lg text-slate-300 hover:text-white transition-colors glass-card px-6 py-4">
                  <Globe className="text-cyan-400" />
                  www.mayanlabs.com
                </a>
              </div>
            </div>
            
            <div className="pt-8 border-t border-white/10 flex flex-col items-center text-slate-500">
              <p>© 2026 MayanLabs. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
