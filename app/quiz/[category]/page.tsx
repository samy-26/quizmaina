"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { quizData } from "@/lib/quiz-data"

interface Answer {
  questionId: string
  selectedOption: string
  isCorrect: boolean
  timeSpent: number
}

export default function QuizPage() {
  const params = useParams()
  const router = useRouter()
  const categoryId = params.category as string

  const category = quizData.categories.find((cat) => cat.id === categoryId)
  const userName = typeof window !== "undefined" ? localStorage.getItem("quizUserName") : ""

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedOption, setSelectedOption] = useState<string>("")
  const [timeLeft, setTimeLeft] = useState(10)
  const [answers, setAnswers] = useState<Answer[]>([])

  const currentQuestion = category?.questions[currentQuestionIndex]
  const totalQuestions = category?.questions.length || 0

  // Timer effect
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
      return () => clearTimeout(timer)
    } else if (timeLeft === 0) {
      handleNextQuestion()
    }
  }, [timeLeft])

  // Reset timer when question changes
  useEffect(() => {
    setTimeLeft(10)
    setSelectedOption("")
  }, [currentQuestionIndex])

  if (!category || !currentQuestion) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Category not found</h1>
          <Button onClick={() => router.push("/")}>Go Back</Button>
        </div>
      </div>
    )
  }

  const handleNextQuestion = () => {
    // Record the answer
    const answer: Answer = {
      questionId: currentQuestion.id,
      selectedOption: selectedOption,
      isCorrect: selectedOption === currentQuestion.correctAnswer,
      timeSpent: 10 - timeLeft,
    }

    const newAnswers = [...answers, answer]
    setAnswers(newAnswers)

    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    } else {
      // Quiz completed, navigate to results
      const results = {
        userName: userName || "Anonymous",
        categoryName: category.name,
        totalQuestions,
        correctAnswers: newAnswers.filter((a) => a.isCorrect).length,
        unansweredQuestions: newAnswers.filter((a) => a.selectedOption === "").length,
        answers: newAnswers,
      }

      localStorage.setItem("quizResults", JSON.stringify(results))
      router.push("/results")
    }
  }

  const handleSkipQuestion = () => {
    setSelectedOption("")
    handleNextQuestion()
  }

  return (
    <div className="min-h-screen bg-[#f5f3f0]">
      {/* Header */}
      <div className="border-b border-gray-200 bg-white px-4 py-4 sm:px-6">
        <div className="flex items-center justify-between">
          <div className="text-xl font-bold sm:text-2xl">
            <span className="text-gray-800">QUIZ</span>
            <span className="text-pink-600">Mania</span>
          </div>
          <Button
            variant="outline"
            onClick={() => router.push("/")}
            className="rounded-full border-pink-400 text-pink-600 hover:bg-pink-50 text-sm sm:text-base"
          >
            Exit Quiz
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto max-w-4xl px-4 py-6 sm:px-6 sm:py-8">
        {/* Progress and Timer */}
        <div className="mb-6 flex flex-col space-y-4 sm:mb-8 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
          <div className="flex items-center">
            <span className="text-2xl font-bold text-pink-600 sm:text-3xl">{currentQuestionIndex + 1}</span>
            <span className="text-xl text-gray-400 sm:text-2xl">/{totalQuestions}</span>
            <div className="ml-3 h-2 w-24 rounded-full bg-gray-200 sm:ml-4 sm:w-32">
              <div
                className="h-2 rounded-full bg-pink-600 transition-all duration-300"
                style={{
                  width: `${((currentQuestionIndex + 1) / totalQuestions) * 100}%`,
                }}
              />
            </div>
          </div>
          <div className="text-xl font-bold text-gray-800 sm:text-2xl">0:{timeLeft.toString().padStart(2, "0")}</div>
        </div>

        {/* Question */}
        <div className="mb-6 sm:mb-8">
          <h2 className="mb-6 text-lg font-medium text-gray-800 sm:mb-8 sm:text-xl lg:text-2xl">
            {currentQuestionIndex + 1}. {currentQuestion.question}
          </h2>

          {/* Options */}
          <div className="space-y-3 sm:space-y-4">
            {currentQuestion.options.map((option, index) => (
              <label
                key={index}
                className="flex cursor-pointer items-start rounded-lg border border-gray-300 bg-white p-3 hover:bg-gray-50 sm:p-4"
              >
                <input
                  type="radio"
                  name="answer"
                  value={option}
                  checked={selectedOption === option}
                  onChange={(e) => setSelectedOption(e.target.value)}
                  className="mr-3 mt-1 h-4 w-4 flex-shrink-0 text-pink-600 sm:mr-4"
                />
                <span className="text-sm text-gray-700 sm:text-base">{option}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
          <Button
            onClick={handleNextQuestion}
            disabled={!selectedOption}
            className="w-full rounded-full bg-pink-400 px-6 py-3 text-white hover:bg-pink-500 disabled:bg-gray-300 sm:w-auto sm:px-8"
          >
            Next
          </Button>
          <button
            onClick={handleSkipQuestion}
            className="text-center text-sm text-gray-600 underline hover:text-gray-800 sm:text-base"
          >
            Skip this question
          </button>
        </div>
      </div>
    </div>
  )
}
