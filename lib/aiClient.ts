type GeminiPart = {
  text?: string;
};

type GeminiCandidate = {
  content?: {
    parts?: GeminiPart[];
  };
};

type GeminiErrorResponse = {
  error?: {
    message?: string;
    status?: string;
  };
};

type GeminiResponse = GeminiErrorResponse & {
  candidates?: GeminiCandidate[];
};

type ExplanationResult = {
  explanation: string;
  source: "gemini";
};

type ExplanationMode = "definition" | "process";

type TopicRequestAnalysis = {
  cleanedTopic: string;
  wantsExample: boolean;
  wantsStepByStep: boolean;
  mode: ExplanationMode;
};

const GEMINI_API_BASE = "https://generativelanguage.googleapis.com/v1beta/models";
const PLACEHOLDER_KEYS = new Set([
  "PASTE_YOUR_REAL_GEMINI_API_KEY_HERE",
  "your_actual_gemini_api_key_here",
  "your_gemini_api_key_here"
]);
const DEFAULT_MODELS = [
  "gemini-flash-latest",
  "gemini-flash-lite-latest",
  "gemini-2.5-flash",
  "gemini-2.0-flash-lite",
  "gemini-2.0-flash"
];

function topicRequestsExample(topic: string) {
  return /\b(with example|example|for example|give an example|show an example|sample)\b/i.test(topic);
}

function topicRequestsStepByStep(topic: string) {
  return /\b(how does|how do|how is|how are|how can|how .* work|how .* works|working of|process of|steps of|step by step|steps?|process)\b/i.test(
    topic
  );
}

function normalizeTopic(topic: string) {
  return topic
    .trim()
    .replace(/^what is\s+/i, "")
    .replace(/^who is\s+/i, "")
    .replace(/^what are\s+/i, "")
    .replace(/^explain\s+/i, "")
    .replace(/^tell me about\s+/i, "")
    .replace(/^define\s+/i, "")
    .replace(/\b(explain with example|with example|for example|give an example|show an example|sample)\b/gi, "")
    .replace(/[?.!]+$/g, "")
    .replace(/\s{2,}/g, " ")
    .trim();
}

function analyzeTopicRequest(topic: string): TopicRequestAnalysis {
  const cleanedTopic = normalizeTopic(topic) || topic.trim();
  const wantsExample = topicRequestsExample(topic);
  const wantsStepByStep = topicRequestsStepByStep(topic);

  return {
    cleanedTopic,
    wantsExample,
    wantsStepByStep,
    mode: wantsStepByStep ? "process" : "definition"
  };
}

function getTopicSpecificHint(cleanedTopic: string) {
  if (/\bb\.?\s*tech\b|\bbachelor of technology\b/i.test(cleanedTopic)) {
    return (
      "Mention that B.Tech is an undergraduate engineering or technology degree, it is usually studied after class 12, " +
      "admission often involves an entrance exam, it usually lasts 4 years, and students can choose different branches such as computer science, mechanical, civil, or electronics."
    );
  }

  if (/\bphotosynthesis\b/i.test(cleanedTopic)) {
    return (
      "If photosynthesis is asked, explain that green plants use sunlight, water, and carbon dioxide to make food in their leaves, and oxygen is released."
    );
  }

  return "If the topic is a course, degree, exam, or academic term, mention the study level, usual duration, or common use when relevant.";
}

function buildPrompt(topic: string) {
  const sharedInstructions = [
    "You are a highly accurate, very encouraging, and conversational student-friendly teacher.",
    `The student's request is: "${topic}"`,
    "Answer EXACTLY what is asked and nothing more. If they ask 'what is X', only define X. Do not add types, history, or extra details unless explicitly asked.",
    "Start your response with a friendly, conversational greeting acknowledging the topic (e.g., 'Hey, good question! Fractions...', 'Hi there! Ok, division cells...', etc.).",
    "Keep the core explanation extremely brief and concise, ideally 1 to 2 lines maximum.",
    "It must be easy to understand for a student doing a quick revision.",
    "Only provide an example if the student explicitly asks for one, or if a very short example is absolutely essential to understand the short definition.",
    "If the student asks for a code snippet, provide it briefly using markdown code blocks.",
    "Keep the facts accurate, use natural language, and avoid unnecessary jargon.",
    "Do not mention that you are an AI."
  ];

  return sharedInstructions.join(" ");
}

function sanitizeExplanation(text: string) {
  return text.trim();
}

function needsRevision(explanation: string, analysis: TopicRequestAnalysis) {
  return false;
}

function buildRevisionPrompt(topic: string, currentDraft: string) {
  return currentDraft; // Unused now
}

function formatExplanationForDisplay(text: string, analysis: TopicRequestAnalysis) {
  return text.trim();
}

function extractExplanation(data: GeminiResponse) {
  return sanitizeExplanation(
    data.candidates
      ?.flatMap((candidate) => candidate.content?.parts ?? [])
      .map((part) => part.text?.trim() ?? "")
      .filter(Boolean)
      .join("\n\n") ?? ""
  );
}

function unwrapEnvValue(value: string | undefined) {
  const trimmed = value?.trim();

  if (!trimmed) {
    return null;
  }

  if (
    (trimmed.startsWith('"') && trimmed.endsWith('"')) ||
    (trimmed.startsWith("'") && trimmed.endsWith("'"))
  ) {
    return trimmed.slice(1, -1).trim();
  }

  return trimmed;
}

function getGeminiKey() {
  const rawKey =
    unwrapEnvValue(process.env.GEMINI_API_KEY) ||
    unwrapEnvValue(process.env.GOOGLE_API_KEY) ||
    unwrapEnvValue(process.env.GOOGLE_GENERATIVE_AI_API_KEY);

  if (!rawKey || PLACEHOLDER_KEYS.has(rawKey)) {
    return null;
  }

  return rawKey;
}

function getModelCandidates() {
  const configuredModel = unwrapEnvValue(process.env.GEMINI_MODEL);
  return Array.from(new Set([configuredModel, ...DEFAULT_MODELS].filter(Boolean))) as string[];
}

async function requestGeneratedText(prompt: string, apiKey: string, model: string) {
  const response = await fetch(`${GEMINI_API_BASE}/${model}:generateContent?key=${apiKey}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      contents: [
        {
          role: "user",
          parts: [{ text: prompt }]
        }
      ],
      generationConfig: {
        temperature: 0.25,
        maxOutputTokens: 2048
      }
    }),
    cache: "no-store"
  });

  const data = (await response.json().catch(() => null)) as GeminiResponse | null;

  if (!response.ok) {
    throw new Error(data?.error?.message || `Gemini request failed for model ${model}.`);
  }

  const explanation = data ? extractExplanation(data) : "";

  if (!explanation) {
    throw new Error(`Gemini returned an empty explanation for model ${model}.`);
  }

  return explanation;
}

async function requestExplanation(topic: string, apiKey: string, model: string) {
  const analysis = analyzeTopicRequest(topic);
  const firstDraft = await requestGeneratedText(buildPrompt(topic), apiKey, model);

  let explanation = firstDraft;

  if (needsRevision(firstDraft, analysis)) {
    try {
      explanation = await requestGeneratedText(buildRevisionPrompt(topic, firstDraft), apiKey, model);
    } catch {
      explanation = firstDraft;
    }
  }

  return formatExplanationForDisplay(explanation, analysis);
}

export async function generateTopicExplanation(topic: string): Promise<ExplanationResult> {
  const apiKey = getGeminiKey();

  if (!apiKey) {
    throw new Error("Missing Gemini API key.");
  }

  let lastError: Error | null = null;

  for (const model of getModelCandidates()) {
    try {
      const explanation = await requestExplanation(topic, apiKey, model);

      return {
        explanation,
        source: "gemini"
      };
    } catch (error) {
      lastError = error instanceof Error ? error : new Error("Gemini request failed.");
    }
  }

  throw lastError ?? new Error("Gemini request failed.");
}
