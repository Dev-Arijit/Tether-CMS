import { Link } from 'react-router-dom';
import { Sun, Layers, Sparkles, RefreshCw, ArrowRight, ChevronRight } from 'lucide-react';

export default function Landing() {
  return (
    <div className="min-h-screen bg-sahara-50">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-sahara-50/80 backdrop-blur-md border-b border-sahara-300/40">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-sienna-600 flex items-center justify-center">
              <Sun size={17} className="text-white" />
            </div>
            <span className="font-heading text-lg font-semibold text-sahara-950">Sahara CMS</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm text-sahara-900 hover:text-sienna-600 transition-colors">Features</a>
            <a href="#how-it-works" className="text-sm text-sahara-900 hover:text-sienna-600 transition-colors">How it Works</a>
            <a href="#about" className="text-sm text-sahara-900 hover:text-sienna-600 transition-colors">About</a>
          </div>
          <div className="flex items-center gap-3">
            <Link
              to="/login"
              className="px-5 py-2 text-sm font-medium text-sahara-950 border border-sahara-600 rounded-lg hover:bg-sahara-200 transition-colors"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="px-5 py-2 text-sm font-medium text-white bg-sienna-600 rounded-lg hover:bg-sienna-700 transition-colors"
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-7xl mx-auto px-6 pt-24 pb-32">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sienna-600/10 text-sienna-600 text-xs font-medium mb-8 border border-sienna-600/20">
            <Sparkles size={14} />
            <span>Warm Minimalism for your Network</span>
          </div>
          <h1 className="font-heading text-6xl md:text-7xl text-sahara-950 mb-6 leading-[1.05]">
            Cultivate Your<br />
            <span className="text-sienna-600">Network</span>
          </h1>
          <p className="text-lg text-sahara-900 mb-10 max-w-xl mx-auto leading-relaxed">
            A sophisticated sanctuary for professional growth. Experience relationship management through the lens of sun-baked simplicity.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Link
              to="/register"
              className="group inline-flex items-center gap-2 px-7 py-3.5 bg-sienna-600 text-white rounded-lg font-medium hover:bg-sienna-700 transition-all shadow-sahara-md hover:shadow-sahara-lg"
            >
              Get Started
              <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <Link
              to="/login"
              className="px-7 py-3.5 text-sahara-950 border border-sahara-600 rounded-lg font-medium hover:bg-sahara-200 transition-colors"
            >
              Login
            </Link>
          </div>
        </div>

        {/* Decorative element */}
        <div className="mt-20 max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-sahara-lg border border-sahara-300/40 p-8 md:p-12">
            <p className="text-center font-heading text-2xl text-sahara-900 italic">
              "Designed for Depth"
            </p>
            <p className="text-center text-sahara-800 mt-3 text-sm max-w-lg mx-auto">
              Stripping away the noise to let your professional relationships breathe and flourish.
            </p>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="bg-white border-y border-sahara-300/40 py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-sm text-sienna-600 font-medium uppercase tracking-wider mb-3">Features</p>
            <h2 className="font-heading text-4xl text-sahara-950">Built for Clarity</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="group p-8 rounded-xl bg-sahara-50 border border-sahara-300/50 hover:shadow-sahara-md hover:border-sienna-600/20 transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-sienna-600/10 flex items-center justify-center text-sienna-600 mb-5 group-hover:bg-sienna-600 group-hover:text-white transition-colors duration-300">
                <Layers size={22} />
              </div>
              <h3 className="font-heading text-xl mb-3 text-sahara-950">Intuitive Organization</h3>
              <p className="text-sahara-800 text-sm leading-relaxed">
                Seamlessly categorize your contacts with a fluid, tag-based system that adapts to your mental model of networking.
              </p>
            </div>

            <div className="group p-8 rounded-xl bg-sahara-50 border border-sahara-300/50 hover:shadow-sahara-md hover:border-sienna-600/20 transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-sienna-600/10 flex items-center justify-center text-sienna-600 mb-5 group-hover:bg-sienna-600 group-hover:text-white transition-colors duration-300">
                <Sparkles size={22} />
              </div>
              <h3 className="font-heading text-xl mb-3 text-sahara-950">Smart Insights</h3>
              <p className="text-sahara-800 text-sm leading-relaxed">
                Intelligent relationship tracking that helps you identify which contacts need your attention most this week.
              </p>
            </div>

            <div className="group p-8 rounded-xl bg-sahara-50 border border-sahara-300/50 hover:shadow-sahara-md hover:border-sienna-600/20 transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-sienna-600/10 flex items-center justify-center text-sienna-600 mb-5 group-hover:bg-sienna-600 group-hover:text-white transition-colors duration-300">
                <RefreshCw size={22} />
              </div>
              <h3 className="font-heading text-xl mb-3 text-sahara-950">Seamless Sync</h3>
              <p className="text-sahara-800 text-sm leading-relaxed">
                Universal data synchronization across all your platforms with zero friction. Your contacts, everywhere.
              </p>
            </div>
          </div>

          {/* Pull quote */}
          <div className="max-w-2xl mx-auto text-center py-8 border-t border-b border-sahara-300/40">
            <blockquote className="font-heading text-2xl italic text-sahara-950 mb-2">
              "Management redefined as an art form."
            </blockquote>
            <p className="text-sm text-sienna-600 uppercase tracking-wider font-medium">The Sahara Manifesto</p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-sm text-sienna-600 font-medium uppercase tracking-wider mb-3">Process</p>
            <h2 className="font-heading text-4xl text-sahara-950">The Path to Clarity</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-12 max-w-4xl mx-auto">
            {[
              {
                step: '01',
                title: 'Connect',
                desc: 'Create your account and start adding your professional contacts with our streamlined entry forms.'
              },
              {
                step: '02',
                title: 'Categorize',
                desc: 'Organize your network with tags, groups, and intelligent sorting into meaningful circles.'
              },
              {
                step: '03',
                title: 'Cultivate',
                desc: 'Focus on the human element while Sahara handles the logistical complexities of growth.'
              }
            ].map(({ step, title, desc }) => (
              <div key={step} className="text-center">
                <div className="font-heading text-5xl text-sienna-600/20 mb-3">{step}</div>
                <h3 className="font-heading text-xl text-sahara-950 mb-3">{title}</h3>
                <p className="text-sahara-800 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>

          {/* Tech badges */}
          <div className="mt-20 text-center">
            <p className="text-xs text-sahara-800 uppercase tracking-wider mb-4 font-medium">Built with Modern Precision</p>
            <div className="flex items-center justify-center gap-3 flex-wrap">
              {['React', 'Vite', 'Tailwind CSS', 'Node.js', 'Express', 'MongoDB', 'JWT'].map(tech => (
                <span
                  key={tech}
                  className="px-4 py-1.5 rounded-full bg-white border border-sahara-300/60 text-xs font-medium text-sahara-900"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="bg-sahara-950 py-24">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <div className="w-12 h-12 rounded-xl bg-sienna-600 flex items-center justify-center mx-auto mb-6">
            <Sun size={22} className="text-white" />
          </div>
          <h2 className="font-heading text-4xl text-white mb-6">Sun-Baked Simplicity</h2>
          <p className="text-sahara-600 leading-relaxed mb-4">
            Sahara CMS was born from a desire to escape the cluttered, aggressive interfaces of modern SaaS. We believe professional contact management doesn't have to be clinical or cold.
          </p>
          <p className="text-sahara-600 leading-relaxed">
            Our vision is a digital workspace that feels like a physical sanctuary — warm, expansive, and thoughtfully curated. We prioritize the essential and discard the distractions, allowing your most valuable asset — your network — to truly flourish.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-sahara-300/40 py-10">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Sun size={16} className="text-sienna-600" />
            <span className="text-sm text-sahara-800">© 2026 Sahara CMS. Haldia Institute of Technology.</span>
          </div>
          <div className="flex items-center gap-6">
            <a href="#" className="text-xs text-sahara-800 hover:text-sienna-600 transition-colors">Privacy</a>
            <a href="#" className="text-xs text-sahara-800 hover:text-sienna-600 transition-colors">Terms</a>
            <a href="#" className="text-xs text-sahara-800 hover:text-sienna-600 transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
