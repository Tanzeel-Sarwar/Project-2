"use client"

import { useState, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { showNotification } from "@/lib/notifications"

export default function Calculator() {
  const [display, setDisplay] = useState("")
  const [result, setResult] = useState("")
  const [history, setHistory] = useState<string[]>([])

  const calculate = useCallback(() => {
    try {
      // Replace all visual operators with their JavaScript equivalents
      const expression = display.replace(/×/g, "*").replace(/÷/g, "/")
      // Use Function instead of eval for better security
      const calculatedResult = new Function("return " + expression)()
      const formattedResult = Number.isInteger(calculatedResult)
        ? calculatedResult.toString()
        : Number(calculatedResult).toFixed(4)
      setResult(formattedResult)
      setHistory((prev) => [`${display} = ${formattedResult}`, ...prev.slice(0, 4)])
      showNotification("Calculation Complete", {
        body: `${display} = ${formattedResult}`,
        icon: "/favicon.ico",
      })
      setDisplay("")
    } catch (error) {
      console.error("Calculation error:", error) // Log the error
      setResult("Error")
      setDisplay("")
      showNotification("Calculation Error", {
        body: "Invalid expression",
        icon: "/favicon.ico",
      })
    }
  }, [display])

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      const key = e.key
      if (key.match(/[0-9+\-*/.()]/)) {
        e.preventDefault()
        setDisplay((prev) => prev + key)
      } else if (key === "Enter") {
        e.preventDefault()
        calculate()
      } else if (key === "Backspace") {
        e.preventDefault()
        setDisplay((prev) => prev.slice(0, -1))
      } else if (key === "Escape") {
        e.preventDefault()
        setDisplay("")
        setResult("")
      }
    }

    window.addEventListener("keydown", handleKeyPress)
    return () => window.removeEventListener("keydown", handleKeyPress)
  }, [calculate]) // Add `calculate` to the dependency array

  const handleClick = (value: string) => {
    if (value === "C") {
      setDisplay("")
      setResult("")
    } else if (value === "=") {
      calculate()
    } else if (value === "⌫") {
      setDisplay((prev) => prev.slice(0, -1))
    } else {
      setDisplay((prev) => prev + value)
    }
  }

  const buttons = ["C", "(", ")", "÷", "7", "8", "9", "×", "4", "5", "6", "-", "1", "2", "3", "+", "0", ".", "⌫", "="]

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="relative py-12 md:py-20 text-center">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-b-[100px]" />
        <div className="relative">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Calculator</h1>
          <p className="text-gray-600">Perform quick calculations</p>
        </div>
      </section>

      <div className="max-w-sm mx-auto p-4 animate-fade-in">
        <Card className="p-4 shadow-lg bg-white transform hover:scale-[1.02] transition-all duration-300">
          <div className="bg-gray-100 border rounded-lg p-4 mb-4 text-right text-2xl h-16 flex items-center justify-end overflow-hidden">
            <div className="w-full truncate">{result || display || "0"}</div>
          </div>
          <div className="grid grid-cols-4 gap-1.5">
            {buttons.map((btn) => (
              <Button
                key={btn}
                onClick={() => handleClick(btn)}
                variant={
                  btn === "C" || btn === "⌫"
                    ? "destructive"
                    : ["=", "+", "-", "×", "÷"].includes(btn)
                      ? "default"
                      : ["(", ")"].includes(btn)
                        ? "outline"
                        : "secondary"
                }
                className="text-lg h-12 rounded-lg font-semibold transition-all duration-200 hover:scale-105 active:scale-95"
              >
                {btn}
              </Button>
            ))}
          </div>
          <div className="mt-4 p-2 bg-gray-100 rounded-lg max-h-24 overflow-y-auto">
            <h3 className="text-sm font-semibold mb-2">History:</h3>
            {history.map((item, index) => (
              <div key={index} className="text-sm text-gray-600 mb-1 animate-fade-in">
                {item}
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}