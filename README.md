# Quiz Master Application

A modern, responsive quiz application built with Next.js and React that allows users to test their knowledge across different categories with timed questions.

## Features

- **Category Selection**: Choose from multiple quiz categories (JavaScript Basics, React Basics, Web Development)
- **Timed Questions**: Each question has a 10-second countdown timer
- **Interactive UI**: Clean, modern interface with visual feedback
- **Score Calculation**: Comprehensive scoring with detailed results
- **Responsive Design**: Works seamlessly across desktop, tablet, and mobile devices
- **Progress Tracking**: Visual progress indicator throughout the quiz
- **Answer Feedback**: Immediate visual feedback showing correct/incorrect answers

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
\`\`\`bash
git clone <repository-url>
cd quiz-master
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install
\`\`\`

3. Run the development server:
\`\`\`bash
npm run dev
\`\`\`

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Problem Statement

Create a Quiz Application where users can:
- Select a quiz category
- Answer multiple-choice questions with a 10-second timer per question
- Receive a final score based on correct answers
- View detailed results with performance feedback

## Completed Features

✅ **Category Selection Page**
- Interactive category cards with descriptions
- Visual selection feedback
- Question count and timing information

✅ **Quiz Interface**
- One question at a time display
- Four multiple-choice options per question
- 10-second countdown timer with visual indicators
- Automatic progression when timer expires
- Manual "Next" button for early progression
- Progress bar showing quiz completion

✅ **Timer Implementation**
- 10-second countdown for each question
- Visual warning when time is running low (red color at ≤3 seconds)
- Automatic question progression on timeout

✅ **Answer Selection & Feedback**
- Click to select answers
- Visual highlighting of selected options
- Color-coded feedback (green for correct, red for incorrect)
- Brief feedback display before moving to next question

✅ **Score Calculation & Results**
- Comprehensive scoring system
- Results page with percentage score
- Breakdown of correct, incorrect, and unanswered questions
- Performance-based feedback messages
- Visual score presentation with color coding

✅ **Responsive Design**
- Mobile-first approach
- Optimized for desktop, tablet, and mobile
- Consistent experience across all screen sizes

✅ **Additional Features**
- Clean, maintainable code structure
- TypeScript for type safety
- Local storage for result persistence
- Smooth transitions and animations
- Accessibility considerations

## Technology Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Icons**: Lucide React
- **State Management**: React Hooks (useState, useEffect)

## Project Structure

\`\`\`
├── app/
│   ├── page.tsx                 # Home/Category selection page
│   ├── quiz/[category]/page.tsx # Quiz interface
│   ├── results/page.tsx         # Results page
│   └── layout.tsx              # Root layout
├── components/ui/              # Reusable UI components
├── lib/
│   └── quiz-data.ts           # Quiz questions and categories
└── README.md
\`\`\`

## Quiz Data Structure

The application uses a structured JSON format for quiz data:

\`\`\`typescript
{
  categories: [
    {
      id: string,
      name: string,
      description: string,
      questions: [
        {
          id: string,
          question: string,
          options: string[],
          correctAnswer: string,
          timeLimit: number
        }
      ]
    }
  ]
}
\`\`\`

## Performance Optimizations

- Client-side routing for smooth navigation
- Efficient state management with React hooks
- Minimal re-renders through proper dependency arrays
- Optimized timer implementation with cleanup

## Future Enhancements

- Question difficulty levels
- User authentication and progress tracking
- Leaderboards and social features
- More quiz categories
- Custom quiz creation
- Audio/visual question types

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the MIT License.
