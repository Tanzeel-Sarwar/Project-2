import { Calculator, ListTodo, StickyNote, BarChart3 } from "lucide-react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function Home() {
  const tools = [
    {
      icon: <Calculator className="w-8 h-8 text-blue-500" />,
      title: "Calculator",
      description: "Perform quick calculations",
      href: "/tools/calculator",
    },
    {
      icon: <ListTodo className="w-8 h-8 text-blue-500" />,
      title: "To-Do List",
      description: "Manage your tasks efficiently",
      href: "/tools/todo",
    },
    {
      icon: <StickyNote className="w-8 h-8 text-blue-500" />,
      title: "Notes",
      description: "Take and save quick notes",
      href: "/tools/notes",
    },
    {
      icon: <BarChart3 className="w-8 h-8 text-blue-500" />,
      title: "Polling System",
      description: "Create and participate in real-time polls",
      href: "/tools/polls",
    },
  ]

  return (
    <div className="min-h-screen page-transition">
      <section className="relative py-12 md:py-20 text-center px-4">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-b-[100px]" />
        <div className="relative max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 animate-fade-in">
            Welcome to Smart Tools Hub
          </h1>
          <p className="text-gray-600 text-lg md:text-xl mb-8 animate-fade-in">
            Your one-stop solution for everyday tasks
          </p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {tools.map((tool, index) => (
            <Link key={tool.title} href={tool.href}>
              <Card className="h-full card-hover animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
                <CardHeader className="text-center pb-2">
                  <div className="mx-auto mb-4 transform transition-transform group-hover:scale-110">{tool.icon}</div>
                  <CardTitle className="text-xl text-blue-600">{tool.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-center text-gray-600">
                  <p>{tool.description}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}

