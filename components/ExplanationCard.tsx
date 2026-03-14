import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

type ExplanationCardProps = {
  topic?: string;
  explanation?: string;
  error?: string;
  isLoading?: boolean;
};

const placeholderExamples = ["Photosynthesis", "The water cycle", "How binary search works"];

export default function ExplanationCard({
  topic = "",
  explanation = "",
  error = "",
  isLoading = false
}: ExplanationCardProps) {
  
  if (!topic && !explanation && !isLoading && !error) return null;

  return (
    <section className="dark-card p-6 sm:p-10 min-h-[200px] flex flex-col justify-center animate-fadeInUp" style={{ animationDelay: "100ms" }}>
      
      {isLoading ? (
        <div className="flex flex-col items-center justify-center space-y-6 py-8">
          <div className="relative flex h-16 w-16 items-center justify-center">
            <div className="absolute inset-0 rounded-full border-t-2 border-accent animate-spin" />
            <div className="absolute inset-2 rounded-full border-r-2 border-neon animate-spin" style={{ animationDirection: "reverse", animationDuration: "1.5s" }} />
            <span className="text-2xl">✨</span>
          </div>
          <p className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-neon font-medium animate-pulse">
            Neural synthesis in progress...
          </p>
        </div>
      ) : null}

      {!isLoading && error ? (
        <div className="rounded-2xl border border-red-500/20 bg-red-500/10 p-6 text-red-400 flex items-start gap-4">
          <div className="mt-1">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
          </div>
          <div>
            <p className="text-lg font-semibold text-red-300">Synthesis Failed</p>
            <p className="mt-1 text-sm">{error}</p>
          </div>
        </div>
      ) : null}

      {!isLoading && !error && explanation ? (
        <div className="flex flex-col">
          <div className="flex items-center justify-between mb-8 border-b border-cardborder pb-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-accent/20 border border-accent/30 text-accent">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
              </div>
              <p className="section-eyebrow border-none bg-transparent px-0 !text-slate-300">Topic: <span className="text-white ml-2">{topic}</span></p>
            </div>
          </div>
          
          <div className="prose prose-invert prose-slate max-w-none text-slate-300 prose-headings:text-white prose-a:text-neon hover:prose-a:text-accent prose-strong:text-white prose-code:text-accent prose-code:bg-accent/10 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md prose-code:before:content-none prose-code:after:content-none prose-pre:bg-mist prose-pre:border prose-pre:border-cardborder">
            <ReactMarkdown 
              remarkPlugins={[remarkGfm]}
              components={{
                h1: ({node, ...props}: any) => <h1 className="font-display font-bold mt-6 mb-4" {...props} />,
                h2: ({node, ...props}: any) => <h2 className="font-display font-semibold mt-5 mb-3" {...props} />,
                p: ({node, ...props}: any) => <p className="leading-relaxed mb-4 text-[1.05rem]" {...props} />,
                li: ({node, ...props}: any) => <li className="leading-relaxed" {...props} />,
                code({ inline, className, children, ...props }: any) {
                  return (
                    <code
                      className={`${className} ${
                        inline 
                          ? "" 
                          : "block p-4 rounded-2xl my-4 overflow-x-auto shadow-inner"
                      }`}
                      {...props}
                    >
                      {children}
                    </code>
                  );
                },
                pre({ children }: any) {
                  return <pre className="bg-[#0a0a0a] p-0 m-0 rounded-2xl border border-white/10">{children}</pre>;
                }
              }}
            >
              {explanation}
            </ReactMarkdown>
          </div>
        </div>
      ) : null}
    </section>
  );
}
