"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { ScrollArea } from "@/components/ui/scroll-area"

export default function Calculator() {
  const [display, setDisplay] = useState("")
  const [expression, setExpression] = useState("")
  const [history, setHistory] = useState<string[]>([])
  const { toast } = useToast()

  // Load history from localStorage
  useEffect(() => {
    const savedHistory = localStorage.getItem("calculatorHistory")
    if (savedHistory) {
      setHistory(JSON.parse(savedHistory))
    }
  }, [])

  // Save history to localStorage
  useEffect(() => {
    localStorage.setItem("calculatorHistory", JSON.stringify(history))
  }, [history])

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      // Handle numeric keys (both main keyboard and numpad)
      if (e.key.match(/[0-9]/) || e.key === ".") {
        e.preventDefault()
        handleInput(e.key)
      }
      // Handle operators
      else if (e.key.match(/[+\-*/%]/) || e.key === "Enter" || e.key === "=" || e.key === "(" || e.key === ")") {
        e.preventDefault()
        if (e.key === "Enter" || e.key === "=") {
          calculate()
        } else {
          handleInput(e.key === "*" ? "×" : e.key === "/" ? "÷" : e.key)
        }
      }
      // Handle backspace and delete
      else if (e.key === "Backspace" || e.key === "Delete") {
        e.preventDefault()
        handleDelete()
      }
      // Handle escape
      else if (e.key === "Escape") {
        e.preventDefault()
        handleClear()
      }
    }

    window.addEventListener("keydown", handleKeyPress)
    return () => window.removeEventListener("keydown", handleKeyPress)
  }, [])

  const handleInput = (value: string) => {
    setDisplay((prev) => prev + value)
  }

  const handleDelete = () => {
    setDisplay((prev) => prev.slice(0, -1))
    setExpression("")
  }

  const handleClear = () => {
    setDisplay("")
    setExpression("")
  }

  const calculate = () => {
    try {
      if (!display) return

      const calculationExpression = display.replace(/×/g, "*").replace(/÷/g, "/")
      const result = new Function("return " + calculationExpression)()
      const formattedResult = Number.isInteger(result) ? result.toString() : Number(result).toFixed(4)

      const calculationString = `${display} = ${formattedResult}`
      setExpression(calculationString)
      setDisplay(formattedResult)
      setHistory((prev) => [calculationString, ...prev.slice(0, 19)])

      toast({
        title: "Calculation Complete",
        description: calculationString,
      })
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Calculation Error",
        description: "Invalid expression",
      })
      setDisplay("")
      setExpression("")
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

      <div className="max-w-md mx-auto p-4 animate-fade-in">
        <Card className="p-6 shadow-lg bg-white">
          <div className="space-y-2 mb-4">
            {expression && <div className="text-sm text-gray-500 text-right h-6">{expression}</div>}
            <div className="bg-gradient-to-r from-gray-50 to-gray-100 border rounded-lg p-4 text-right text-2xl h-16 flex items-center justify-end overflow-hidden shadow-inner">
              <div className="w-full truncate font-mono">{display || "0"}</div>
            </div>
          </div>
          <div className="grid grid-cols-4 gap-2">
            {buttons.map((btn) => (
              <Button
                key={btn}
                onClick={() => {
                  if (btn === "C") handleClear()
                  else if (btn === "=") calculate()
                  else if (btn === "⌫") handleDelete()
                  else handleInput(btn)
                }}
                variant={
                  btn === "C" || btn === "⌫"
                    ? "destructive"
                    : ["=", "+", "-", "×", "÷"].includes(btn)
                      ? "default"
                      : ["(", ")"].includes(btn)
                        ? "outline"
                        : "secondary"
                }
                className="text-lg h-12 rounded-lg font-semibold transition-all duration-200 hover:scale-105 active:scale-95
                         shadow-[0.1rem_0.1rem_0.3rem_rgba(0,0,0,0.1),
                                 inset_0.2rem_0.2rem_0.3rem_rgba(255,255,255,0.5),
                                 inset_-0.1rem_-0.1rem_0.2rem_rgba(0,0,0,0.05)]"
              >
                {btn}
              </Button>
            ))}
          </div>
        </Card>

        <Card className="mt-4 p-4">
          <h3 className="text-lg font-semibold mb-4">History</h3>
          <ScrollArea className="h-[200px]">
            <div className="space-y-2">
              {history.map((item, index) => (
                <div
                  key={index}
                  className="p-2 rounded bg-gray-50 text-sm text-gray-600 animate-fade-in hover:bg-gray-100 transition-colors"
                >
                  {item}
                </div>
              ))}
            </div>
          </ScrollArea>
        </Card>
      </div>
    </div>
  )
}

