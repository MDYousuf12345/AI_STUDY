"use client";

import { useState } from "react";
import ExplanationCard from "@/components/ExplanationCard";

type TopicInputProps = {
  suggestions: string[];
};

type ExplainResponse = {
  topic: string;
  explanation: string;
};

export default function TopicInput({ suggestions }: TopicInputProps) {
  const [topic, setTopic] = useState("");
  const [currentTopic, setCurrentTopic] = useState("");
  const [explanation, setExplanation] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const explainTopic = async (nextTopic?: string) => {
    const topicToExplain = (nextTopic ?? topic).trim();

    if (!topicToExplain) {
      setError("Please enter a concept to decode.");
      setExplanation("");
      setCurrentTopic("");
      return;
    }

    setIsLoading(true);
    setError("");
    setCurrentTopic(topicToExplain);
    setExplanation("");

    try {
      const response = await fetch("/api/explain", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ topic: topicToExplain })
      });

      const data = (await response.json()) as Partial<ExplainResponse> & { error?: string };

      if (!response.ok) {
        throw new Error(data.error || "Neural link disrupted. Please try again.");
      }

      if (!data.explanation) {
        throw new Error("Received an empty synthesis. Please try again.");
      }

      setExplanation(data.explanation);
      setTopic(topicToExplain);
    } catch (requestError) {
      setExplanation("");
      setError(requestError instanceof Error ? requestError.message : "System failure. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full flex flex-col gap-8 animate-fadeInUp" style={{ animationDelay: "150ms" }}>
      {/* Central Input Area */}
      <div className="dark-card p-2 group w-full relative">
        <div className="absolute -inset-[1px] rounded-[24px] bg-gradient-to-r from-primary via-accent to-neon opacity-20 group-hover:opacity-100 transition-opacity duration-500 blur-md pointer-events-none" />
        <form
          className="relative flex flex-col sm:flex-row items-center bg-mist rounded-[22px] p-2 pr-2 border border-cardborder overflow-hidden focus-within:ring-2 focus-within:ring-accent/50 focus-within:border-transparent transition-all"
          onSubmit={(event) => {
            event.preventDefault();
            void explainTopic();
          }}
        >
          <div className="hidden sm:block pl-4 pr-2 text-slate-500">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
          </div>
          <input
            id="topic"
            value={topic}
            onChange={(event) => setTopic(event.target.value)}
            placeholder="Initialize synthesis (e.g., Photosynthesis, Binary Search)..."
            className="w-full bg-transparent p-4 sm:py-4 text-base sm:text-lg text-white placeholder:text-slate-500 outline-none"
            autoComplete="off"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading}
            className="mt-2 sm:mt-0 w-full sm:w-auto flex items-center justify-center rounded-xl bg-white text-ink font-semibold px-6 py-3 transition-all hover:bg-slate-200 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:hover:scale-100 shadow-[0_0_20px_rgba(255,255,255,0.3)] min-w-[140px]"
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-ink animate-pulse" />
                <span className="w-2 h-2 rounded-full bg-ink animate-pulse" style={{ animationDelay: "150ms" }} />
                <span className="w-2 h-2 rounded-full bg-ink animate-pulse" style={{ animationDelay: "300ms" }} />
              </span>
            ) : "Synthesize"}
          </button>
        </form>
      </div>

      {/* Suggestion Pills */}
      <div className="flex flex-wrap justify-center gap-3">
        {suggestions.map((suggestion) => (
          <button
            key={suggestion}
            type="button"
            onClick={() => {
              setTopic(suggestion);
              void explainTopic(suggestion);
            }}
            className="pill"
          >
            {suggestion}
          </button>
        ))}
      </div>

      {/* Explanation Area */}
      <div className="w-full mt-4">
        <ExplanationCard topic={currentTopic} explanation={explanation} error={error} isLoading={isLoading} />
      </div>
    </div>
  );
}
