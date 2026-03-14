import TopicInput from "@/components/TopicInput";

const suggestionTopics = ["Photosynthesis", "Newton's Laws", "Binary Search", "World War II", "Quantum Mechanics", "Machine Learning"];

const featureCards = [
  {
    title: "Neural Simplification",
    description: "Complex topics are broken down by our AI into easily digestible, intuitive concepts.",
    icon: "🧠"
  },
  {
    title: "Dynamic Examples",
    description: "Context-aware examples generated on the fly to solidify your fundamental understanding.",
    icon: "⚡"
  },
  {
    title: "Instant Clarity",
    description: "Bypass the noise of search engines. Get pure, focused knowledge in seconds.",
    icon: "🎯"
  }
];

export default function HomePage() {
  return (
    <main className="relative min-h-screen overflow-hidden px-4 py-6 sm:px-6 lg:px-10 lg:py-12 flex flex-col items-center">
      {/* Subtle Background Glow entirely CSS driven */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-accent/20 blur-[120px] rounded-full pointer-events-none" />

      <header className="w-full max-w-7xl mb-16 animate-fadeInUp">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 group cursor-pointer">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-[1px] group-hover:scale-105 transition-transform duration-300">
              <div className="flex h-full w-full items-center justify-center rounded-2xl bg-ink/90 backdrop-blur-sm">
                <span className="font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 text-lg">AI</span>
              </div>
            </div>
            <span className="font-display text-2xl font-bold tracking-tight text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">Explainer.</span>
          </div>
          <div className="hidden sm:flex items-center gap-8">
            <span className="text-sm border border-cardborder bg-darkglass px-4 py-2 rounded-full font-medium text-slate-300 hover:text-white hover:border-accent/50 hover:shadow-glow cursor-pointer transition-all">Explore</span>
            <span className="text-sm font-medium text-slate-300 hover:text-white cursor-pointer transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-primary hover:after:w-full after:transition-all">Documentation</span>
          </div>
        </div>
      </header>

      <div className="w-full max-w-5xl flex flex-col gap-12 z-10 w-full">
        <section className="text-center animate-fadeInUp flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-accent/30 bg-accent/10 mb-6 drop-shadow-[0_0_10px_rgba(139,92,246,0.2)]">
            <span className="w-2 h-2 rounded-full bg-neon animate-pulseGlow" />
            <span className="text-xs font-semibold uppercase tracking-widest text-accent">System Online</span>
          </div>
          <h1 className="font-display text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60 sm:text-6xl lg:text-7xl pb-4">
            Decode the <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-accent to-pink-500 drop-shadow-[0_0_20px_rgba(139,92,246,0.3)]">Complex.</span>
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-slate-400 sm:text-xl">
            Input any concept, theory, or historical event. Our neural engine will synthesize a pristine, student-friendly explanation in milliseconds.
          </p>
        </section>

        <TopicInput suggestions={suggestionTopics} />

        <section className="grid gap-6 md:grid-cols-3 mt-8">
          {featureCards.map((card, index) => (
            <div key={card.title} className="dark-card p-8 group flex flex-col items-start" style={{ animationDelay: `${300 + index * 100}ms` }}>
              <div className="h-12 w-12 rounded-xl bg-white/[0.05] border border-white/[0.1] flex items-center justify-center text-2xl mb-5 group-hover:scale-110 group-hover:bg-accent/20 group-hover:border-accent/40 transition-all duration-300">
                {card.icon}
              </div>
              <p className="font-display text-xl font-bold text-white mb-2">{card.title}</p>
              <p className="text-sm leading-relaxed text-slate-400 group-hover:text-slate-300 transition-colors">{card.description}</p>
            </div>
          ))}
        </section>

        <footer className="mt-20 border-t border-cardborder pt-8 pb-12 text-center animate-fadeInUp">
          <p className="text-slate-500 text-sm font-medium">Developed by student <span className="text-slate-300">MOHAMMED YOUSUF</span> | Roll: <span className="text-slate-300">22K81A12G3</span></p>
        </footer>
      </div>
    </main>
  );
}