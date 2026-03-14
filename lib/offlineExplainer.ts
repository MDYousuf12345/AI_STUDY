const TOPIC_LIBRARY: Array<{ patterns: string[]; explanation: string }> = [
  {
    patterns: ["photosynthesis"],
    explanation:
      "Photosynthesis is the process plants use to make their own food. They take sunlight, water, and carbon dioxide and turn them into glucose, which gives them energy to grow. A simple way to remember it is that plants use sunlight like a power source to prepare food inside their leaves."
  },
  {
    patterns: ["newton", "newton's laws", "newtons laws"],
    explanation:
      "Newton's Laws of Motion explain how objects move. The first law says things stay still or keep moving unless a force changes that. The second law says stronger forces cause bigger changes in motion. The third law says every action has an equal and opposite reaction, like pushing the ground when you jump."
  },
  {
    patterns: ["binary search"],
    explanation:
      "Binary search is a fast way to find an item in a sorted list. Instead of checking every value one by one, it looks at the middle item first and then keeps cutting the search area in half. This makes it much quicker than a normal search, especially when the list is large."
  },
  {
    patterns: ["world war ii", "world war 2", "wwii", "second world war"],
    explanation:
      "World War II was a major global war fought from 1939 to 1945. It involved many countries and was mainly between the Allies and the Axis powers. Students usually study it to understand its causes, important events, and how it changed world politics, borders, and everyday life after the war ended."
  },
  {
    patterns: ["cell division", "mitosis"],
    explanation:
      "Cell division is the process by which one cell splits to form new cells. In mitosis, the cell copies its genetic material and divides into two nearly identical cells. This is how living things grow, repair damage, and replace old cells."
  },
  {
    patterns: ["fractions"],
    explanation:
      "Fractions show parts of a whole. The top number tells how many parts are being used, and the bottom number tells how many equal parts the whole is divided into. For example, 3/4 means three out of four equal parts."
  },
  {
    patterns: ["water cycle"],
    explanation:
      "The water cycle is the continuous movement of water through nature. Water evaporates into the air, forms clouds through condensation, and then falls back to Earth as precipitation like rain. This cycle keeps repeating and helps supply water to plants, animals, and people."
  }
];

function detectSubject(normalizedTopic: string) {
  if (/(war|revolution|empire|history|treaty|independence|civilization)/.test(normalizedTopic)) {
    return "history";
  }

  if (/(algorithm|search|array|binary|database|recursion|computer|programming|coding)/.test(normalizedTopic)) {
    return "computer science";
  }

  if (/(equation|algebra|geometry|fraction|probability|calculus|math|mathematics)/.test(normalizedTopic)) {
    return "mathematics";
  }

  if (/(cell|atom|force|energy|photosynthesis|biology|physics|chemistry|science|ecosystem)/.test(normalizedTopic)) {
    return "science";
  }

  return "general";
}

function buildGenericExplanation(topic: string, subject: string) {
  const safeTopic = topic.trim();

  if (subject === "history") {
    return `${safeTopic} is a history topic that helps students understand what happened in the past, why it happened, and what effects it had on people and countries. A good way to study it is to focus on the main causes, the important events, and the results that followed.`;
  }

  if (subject === "computer science") {
    return `${safeTopic} is a computer science topic about how a system, program, or algorithm works. In simple terms, students learn the step-by-step logic behind it, why it is useful, and how it helps solve a problem more efficiently.`;
  }

  if (subject === "mathematics") {
    return `${safeTopic} is a mathematics topic that is easier to understand when you break it into clear steps. In simple terms, the goal is to see what is given, identify the rule or formula that applies, and follow the process carefully to reach the answer.`;
  }

  if (subject === "science") {
    return `${safeTopic} is a science topic that helps explain how something works in nature or in the physical world. In simple terms, students usually study the main idea, what causes it, what happens during the process, and why it matters in real life.`;
  }

  return `${safeTopic} is an important study topic. In simple terms, it means understanding the main idea, how it works, and why it matters. A good way to learn it is to focus on the definition, the key steps or features, and one simple real-life example.`;
}

export function generateOfflineExplanation(topic: string) {
  const normalizedTopic = topic.trim().toLowerCase();

  const knownTopic = TOPIC_LIBRARY.find((entry) => entry.patterns.some((pattern) => normalizedTopic.includes(pattern)));

  if (knownTopic) {
    return knownTopic.explanation;
  }

  return buildGenericExplanation(topic, detectSubject(normalizedTopic));
}