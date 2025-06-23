"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { X } from "lucide-react"
import { quizData } from "@/lib/quiz-data"

export default function HomePage() {
  const [fullName, setFullName] = useState("")
  const [selectedTopic, setSelectedTopic] = useState("")
  const [showRules, setShowRules] = useState(false)

  const handleStartQuiz = () => {
    if (selectedTopic && fullName.trim()) {
      localStorage.setItem("quizUserName", fullName)
      window.location.href = `/quiz/${selectedTopic}`
    }
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
          {/* User Avatar Placeholder */}
          <div className="hidden sm:flex items-center space-x-2">
            <div className="h-10 w-10 rounded-full bg-gray-600 flex items-center justify-center text-white font-bold">
              R
            </div>
            <span className="text-gray-700 hidden md:block">Richard Joe Freds</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col items-center justify-center px-4 py-8 sm:px-6 sm:py-16">
        <div className="w-full max-w-2xl text-center">
          {/* Welcome Title */}
          <h1 className="mb-6 text-3xl font-bold text-gray-800 sm:mb-8 sm:text-4xl lg:text-5xl">
            Welcome to <span className="text-pink-600">QUIZ</span>
            <span className="text-pink-600">Mania</span>
          </h1>

          {/* Rules Section */}
          <div className="mb-6 rounded-lg bg-gray-100 p-4 sm:mb-8 sm:p-6">
            <p className="mb-2 text-sm text-gray-600 sm:text-base">
              Please read all the rules about this quiz before you start.
            </p>
            <button
              onClick={() => setShowRules(true)}
              className="text-pink-600 underline hover:text-pink-700 text-sm sm:text-base"
            >
              Quiz rules
            </button>
          </div>

          {/* Full Name Input */}
          <div className="mb-6 text-left sm:mb-8">
            <label className="mb-2 block text-sm font-medium text-gray-700">Full name</label>
            <Input
              type="text"
              placeholder="Full name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="h-12 rounded-lg border-gray-300 bg-white text-gray-500 placeholder:text-gray-400 sm:h-14"
            />
          </div>

          {/* Topic Selection */}
          <div className="mb-6 text-left sm:mb-8">
            <label className="mb-4 block text-sm font-medium text-gray-700">Please select topic to continue</label>
            <div className="space-y-3 sm:space-y-4">
              {quizData.categories.map((category) => (
                <label
                  key={category.id}
                  className="flex cursor-pointer items-center rounded-lg border border-gray-300 bg-white p-3 hover:bg-gray-50 sm:p-4"
                >
                  <input
                    type="radio"
                    name="topic"
                    value={category.id}
                    checked={selectedTopic === category.id}
                    onChange={(e) => setSelectedTopic(e.target.value)}
                    className="mr-3 h-4 w-4 text-pink-600"
                  />
                  <span className="text-gray-700 text-sm sm:text-base">{category.name}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Start Quiz Button */}
          <Button
            onClick={handleStartQuiz}
            disabled={!selectedTopic || !fullName.trim()}
            className="h-12 w-full rounded-full bg-pink-400 px-8 text-white hover:bg-pink-500 disabled:bg-gray-300 sm:h-14 sm:w-auto sm:px-12"
          >
            Start Quiz
          </Button>
        </div>
      </div>

      {/* Quiz Rules Modal */}
      <Dialog open={showRules} onOpenChange={setShowRules}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader className="flex flex-row items-center justify-between">
            <DialogTitle className="text-xl font-bold text-gray-800 sm:text-2xl">Quiz rules</DialogTitle>
            <button onClick={() => setShowRules(false)} className="rounded-full p-1 hover:bg-gray-100">
              <X className="h-6 w-6" />
            </button>
          </DialogHeader>

          <div className="space-y-4 sm:space-y-6">
            {/* 10-Second Timer */}
            <div className="rounded-lg bg-yellow-50 p-3 sm:p-4">
              <h3 className="mb-2 font-bold text-gray-800 sm:mb-3">10-Second Timer</h3>
              <ul className="space-y-1 text-xs text-gray-700 sm:space-y-2 sm:text-sm">
                <li>• Each question comes with a 10-second timer.</li>
                <li>
                  • If you don't answer within the time limit, the app will automatically move to the next question.
                </li>
              </ul>
            </div>

            {/* Manual Navigation */}
            <div className="rounded-lg bg-yellow-50 p-3 sm:p-4">
              <h3 className="mb-2 font-bold text-gray-800 sm:mb-3">Manual Navigation</h3>
              <ul className="space-y-1 text-xs text-gray-700 sm:space-y-2 sm:text-sm">
                <li>• You can navigate to the next question manually before the timer expires.</li>
                <li>• Use the "Next" button to move ahead if you're ready before the timer runs out.</li>
              </ul>
            </div>

            {/* Final Score */}
            <div className="rounded-lg bg-yellow-50 p-3 sm:p-4">
              <h3 className="mb-2 font-bold text-gray-800 sm:mb-3">Final Score and Performance Message</h3>
              <ul className="space-y-1 text-xs text-gray-700 sm:space-y-2 sm:text-sm">
                <li>• After all questions are answered, your final score will be displayed.</li>
                <li>• Based on your performance, you will receive a personalized message:</li>
                <li className="ml-4">
                  • Great job! If you score <strong>above 80%</strong>.
                </li>
                <li className="ml-4">
                  • Well done! If you score <strong>between 60% and 80%</strong>.
                </li>
                <li className="ml-4">
                  • Keep practicing! If you score <strong>below 60%</strong>.
                </li>
              </ul>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
