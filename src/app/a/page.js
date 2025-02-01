"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Camera, User, MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function Dashboard() {
  const router = useRouter()
  const [activeSection, setActiveSection] = useState("none")
  const [formData, setFormData] = useState({
    age: "",
    gender: "",
    purpose: "",
    language: "",
    location: "",
    severity: "",
    symptoms: "",
    allergies: "",
    medical_history: "",
    emergency_contact: "",
  })
  const [output, setOutput] = useState("")
  const [chatMessages, setChatMessages] = useState([{ text: "Hello! How can I help you today?", isBot: true }])
  const [messageInput, setMessageInput] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()
    // Simulate API call
    setTimeout(() => {
      setOutput(
        "Based on your symptoms, we recommend consulting with a healthcare professional. Your information has been recorded.",
      )
      window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" })
    }, 1000)
  }

  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0]
    if (file) {
      // Simulate image processing
      setTimeout(() => {
        setOutput("Image analysis complete. Results suggest normal tissue composition.")
        window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" })
      }, 1000)
    }
  }

  const handleSendMessage = () => {
    if (!messageInput.trim()) return

    setChatMessages([...chatMessages, { text: messageInput, isBot: false }])
    setMessageInput("")

    // Simulate bot response
    setTimeout(() => {
      setChatMessages((prev) => [
        ...prev,
        { text: "I understand your concern. How can I assist you further?", isBot: true },
      ])
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-[#0a192f] p-4">
      <div className="flex justify-between items-center mb-8">
        <Button variant="ghost" className="rounded-full p-2">
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
            <span className="text-[#0a192f] font-bold">LOGO</span>
          </div>
        </Button>
        <Button variant="ghost" className="rounded-full p-2">
          <User className="w-6 h-6 text-white" />
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card
          className={`p-6 cursor-pointer transition-all duration-300 ${
            activeSection === "symptoms" ? "h-[90vh]" : "h-80"
          }`}
          onClick={() => setActiveSection((prev) => (prev === "symptoms" ? "none" : "symptoms"))}
        >
          <h2 className="text-2xl font-bold mb-4">Symptoms</h2>
          {activeSection === "symptoms" && (
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                placeholder="Age"
                type="number"
                onChange={(e) => setFormData({ ...formData, age: e.target.value })}
              />
              <Select onValueChange={(value) => setFormData({ ...formData, gender: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
              <Input placeholder="Purpose" onChange={(e) => setFormData({ ...formData, purpose: e.target.value })} />
              <Input placeholder="Language" onChange={(e) => setFormData({ ...formData, language: e.target.value })} />
              <Input placeholder="Location" onChange={(e) => setFormData({ ...formData, location: e.target.value })} />
              <Select onValueChange={(value) => setFormData({ ...formData, severity: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Severity" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="mild">Mild</SelectItem>
                  <SelectItem value="moderate">Moderate</SelectItem>
                  <SelectItem value="severe">Severe</SelectItem>
                </SelectContent>
              </Select>
              <Textarea
                placeholder="Symptoms"
                onChange={(e) => setFormData({ ...formData, symptoms: e.target.value })}
              />
              <Textarea
                placeholder="Allergies"
                onChange={(e) => setFormData({ ...formData, allergies: e.target.value })}
              />
              <Textarea
                placeholder="Medical History"
                onChange={(e) => setFormData({ ...formData, medical_history: e.target.value })}
              />
              <Input
                placeholder="Emergency Contact"
                onChange={(e) => setFormData({ ...formData, emergency_contact: e.target.value })}
              />
              <Button type="submit" className="w-full">
                Submit
              </Button>
              {output && <div className="mt-4 p-4 bg-secondary rounded-lg">{output}</div>}
            </form>
          )}
        </Card>

        <Card
          className={`p-6 cursor-pointer transition-all duration-300 ${
            activeSection === "camera" ? "h-[90vh]" : "h-80"
          }`}
          onClick={() => setActiveSection((prev) => (prev === "camera" ? "none" : "camera"))}
        >
          <h2 className="text-2xl font-bold mb-4">Camera</h2>
          {activeSection === "camera" && (
            <div className="space-y-4">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <Camera className="mx-auto w-12 h-12 mb-4" />
                <Input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" id="file-upload" />
                <label htmlFor="file-upload" className="cursor-pointer">
                  <Button>Upload Image</Button>
                </label>
              </div>
              {output && <div className="mt-4 p-4 bg-secondary rounded-lg">{output}</div>}
            </div>
          )}
        </Card>

        <Card
          className={`p-6 cursor-pointer transition-all duration-300 ${
            activeSection === "general" ? "h-[90vh]" : "h-80"
          }`}
          onClick={() => setActiveSection((prev) => (prev === "general" ? "none" : "general"))}
        >
          <h2 className="text-2xl font-bold mb-4">General</h2>
          {activeSection === "general" && (
            <div className="h-full flex flex-col">
              <div className="flex-1 overflow-y-auto p-4 bg-secondary rounded-lg mb-4">
                <div className="space-y-4">
                  {chatMessages.map((message, index) => (
                    <div
                      key={index}
                      className={`p-3 rounded-lg ${
                        message.isBot ? "bg-primary-foreground" : "bg-blue-500 text-white ml-auto"
                      }`}
                      style={{ maxWidth: "80%" }}
                    >
                      {message.text}
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex gap-2">
                <Input
                  placeholder="Type your message..."
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                />
                <Button onClick={handleSendMessage}>
                  <MessageSquare className="w-4 h-4" />
                </Button>
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  )
}

