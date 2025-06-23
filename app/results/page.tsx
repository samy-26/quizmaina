"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"

interface QuizResults {
  userName: string
  categoryName: string
  totalQuestions: number
  correctAnswers: number
  unansweredQuestions: number
  answers: Array<{
    questionId: string
    selectedOption: string
    isCorrect: boolean
    timeSpent: number
  }>
}

export default function ResultsPage() {
  const router = useRouter()
  const [results, setResults] = useState<QuizResults | null>(null)

  useEffect(() => {
    const savedResults = localStorage.getItem("quizResults")
    if (savedResults) {
      setResults(JSON.parse(savedResults))
    } else {
      router.push("/")
    }
  }, [router])

  if (!results) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Loading results...</h1>
        </div>
      </div>
    )
  }

  const scorePercentage = Math.round((results.correctAnswers / results.totalQuestions) * 100)
  const incorrectAnswers = results.totalQuestions - results.correctAnswers - results.unansweredQuestions
  const isSuccess = scorePercentage >= 60

  const getPerformanceMessage = () => {
    if (scorePercentage >= 80) return "Great job!"
    if (scorePercentage >= 60) return "Well done!"
    return "Keep practicing!"
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
          {/* User Avatar */}
          <div className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-full bg-gray-600 flex items-center justify-center text-white font-bold text-sm sm:h-10 sm:w-10">
              {results.userName.charAt(0).toUpperCase()}
            </div>
            <span className="text-gray-700 text-sm hidden sm:block sm:text-base">{results.userName}</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col items-center justify-center px-4 py-8 sm:px-6 sm:py-16">
        <div className="w-full max-w-2xl text-center">
          {/* Success/Failure Icon */}
          <div className="mb-6 flex justify-center sm:mb-8">
            {isSuccess ? (
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100 sm:h-20 sm:w-20">
                <Check className="h-8 w-8 text-green-600 sm:h-10 sm:w-10" />
              </div>
            ) : (
              <div className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-pink-400 sm:h-20 sm:w-20">
                <div className="text-2xl text-pink-400 sm:text-3xl">😞</div>
              </div>
            )}
          </div>

          {/* Main Message */}
          {isSuccess ? (
            <div className="mb-6 sm:mb-8">
              <h1 className="mb-2 text-2xl font-bold tracking-widest text-gray-800 sm:mb-4 sm:text-4xl">
                C O N G R A T U L A T I O N
              </h1>
              <p className="text-sm text-gray-600 sm:text-base">You successfully completed the Quiz and holds</p>
            </div>
          ) : (
            <div className="mb-6 sm:mb-8">
              <p className="mb-2 text-sm text-gray-600 sm:mb-4 sm:text-base">
                You successfully completed the Quiz but you need to
              </p>
              <h1 className="text-2xl font-bold tracking-widest text-gray-800 sm:text-4xl">
                K E E P<br />P R A C T I C I N G !
              </h1>
            </div>
          )}

          {/* Score Section */}
          <div className="mb-6 sm:mb-8">
            <h2 className="mb-4 text-lg font-medium text-gray-700 sm:text-xl">Your Score</h2>
            {isSuccess ? (
              <div className="text-6xl font-bold text-green-500 sm:text-8xl">{scorePercentage}%</div>
            ) : (
              <div className="mx-auto flex h-32 w-32 items-center justify-center rounded-full border-2 border-pink-400 sm:h-40 sm:w-40">
                <div className="text-4xl font-bold text-yellow-600 sm:text-5xl">{scorePercentage}%</div>
              </div>
            )}
            <div className="mt-4 text-xl font-bold text-gray-700 sm:text-2xl">{getPerformanceMessage()}</div>
          </div>

          {/* Results Breakdown */}
          <div className="mb-6 rounded-lg border border-gray-300 bg-white p-4 sm:mb-8 sm:p-6">
            <h3 className="mb-4 text-base font-medium text-gray-700 sm:text-lg">
              Out of {results.totalQuestions} question
            </h3>
            <div className="flex flex-col space-y-2 text-sm sm:flex-row sm:justify-center sm:space-x-8 sm:space-y-0 sm:text-base">
              <div>
                <span className="font-bold text-green-600">{results.correctAnswers}</span>
                <span className="text-gray-600"> Correct</span>
              </div>
              <div>
                <span className="font-bold text-red-600">{incorrectAnswers}</span>
                <span className="text-gray-600"> Incorrect</span>
              </div>
              <div>
                <span className="font-bold text-gray-600">{results.unansweredQuestions}</span>
                <span className="text-gray-600"> Not answered</span>
              </div>
            </div>
          </div>

          {/* Retake Quiz Button */}
          <Button
            onClick={() => {
              localStorage.removeItem("quizResults")
              router.push("/")
            }}
            className="h-12 w-full rounded-full border-2 border-pink-400 bg-transparent px-8 text-pink-600 hover:bg-pink-50 sm:h-14 sm:w-auto sm:px-12"
            variant="outline"
          >
            Retake Quiz
          </Button>
        </div>
      </div>
    </div>
  )
}
