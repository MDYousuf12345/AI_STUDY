# 🎓 AI Study Topic Explainer

A premium, student-focused educational tool designed to simplify complex study topics instantly. Built with a modern tech stack, this application provides concise, conversational explanations with real-world examples to help students revise effectively.

---

## 🌟 Key Features

- **Instant AI Explanations**: Converts any complex topic into a student-friendly 1-2 line summary.
- **Rich Markdown Support**: Explanations include bold text, lists, and **syntax-highlighted code blocks** for high readability.
- **Premium User Interface**:
  - **Glassmorphism Design**: Elegant translucent cards with subtle blur effects.
  - **Fluid Animations**: Staggered reveal animations (`fadeInUp`) and interactive hover-scale effects.
  - **"Moist" UI**: High-contrast dark mode code blocks and custom professional scrollbars.
- **Full Responsiveness**: Optimized for Laptop, Mobile (iOS/Android), and Tablet views.
  - _Mobile Optimization_: Smart card reordering (Examples first) for better intuitive flow.
- **Conversational Tone**: AI acts as a patient teacher, providing direct answers with relevant examples.

---

## 🛠️ Technology Stack

- **Frontend/Backend**: [Next.js 15](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **AI Engine**: [Google Gemini API](https://ai.google.dev/) (Flash 2.0)
- **Markdown Processing**: `react-markdown` & `remark-gfm`
- **Typography**: `@tailwindcss/typography` (Customized for high contrast)
- **Deployment**: [Vercel](https://vercel.com/)

---

## 🤖 How the AI API is Managed

The application integrates the **Gemini API** using a secure server-side architecture to keep API keys protected:

1.  **Secure Prompt Engineering**: The `lib/aiClient.ts` constructs a specialized prompt that instructs the AI to be extremely concise (1-2 lines), conversational, and to answer _only_ what is asked while providing Markdown-formatted examples.
2.  **API Route Integration**: Requests flow through a Next.js API route (`/api/explain`), which acts as a bridge between the student and the Gemini servers.
3.  **Real-time Streaming Style**: The UI handles loading states via a custom spinner and skeleton pulse while the backend processes the generation.
4.  **Error Handling**: Robust validation ensures that empty queries or API limit issues are communicated gracefully to the student.

---

## 🚀 Setup & Installation

### 1. Prerequisites

- [Node.js 18+](https://nodejs.org/) installed on your machine.
- A Gemini API Key from [Google AI Studio](https://aistudio.google.com/).

### 2. Clone and Install

```bash
# Navigate to the project directory
cd "ai-study-topic-explainer"

# Install dependencies
npm install
```

### 3. Environment Configuration

Create a `.env.local` file in the root directory and add your credentials:

```env
GEMINI_API_KEY=YOUR_API_KEY_HERE
GEMINI_MODEL=gemini-2.0-flash
```

### 4. Run Development Server

```bash
npm run dev
```

Visit `http://localhost:3000` to see the application in action.

---

## 🌍 Deployment Guide

### Deploy to Vercel (Recommended)

1. Push your code to a **GitHub** repository.
2. Connect your repository to **Vercel**.
3. Add your Environment Variables (`GEMINI_API_KEY`, `GEMINI_MODEL`) in the Vercel dashboard.
4. Click **Deploy**. Your site will be live instantly!

---

## 👨‍💻 Developer Credits

- **St Martins Engineering College** (4th Year)
- **Roll Number**: 22K81A12G3
- **Name**: MOHAMMED YOUSUF

---

_This project was developed as a professional AI-powered educational tool for the 2026 Academic Year._
