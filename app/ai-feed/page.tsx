"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Brain, Droplet, ThermometerSun } from "lucide-react";

export default function AIFeedPage() {
  const [suggestions] = useState([
    {
      id: 1,
      title: "Optimal Growing Conditions",
      description:
        "Based on current temperature and humidity levels, consider adjusting the cover schedule to maintain optimal growing conditions.",
      icon: ThermometerSun,
      type: "environment",
    },
    {
      id: 2,
      title: "Water Management",
      description: "Water levels are slightly below optimal. Consider increasing pump duration by 10 minutes.",
      icon: Droplet,
      type: "water",
    },
    {
      id: 3,
      title: "Plant Health",
      description: "Plant growth rate is within expected range. Continue current nutrient schedule.",
      icon: Droplet,
      type: "health",
    },
  ]);

  const [userInput, setUserInput] = useState("");
  const [aiResponse, setAIResponse] = useState("");

  const handleAIQuery = async () => {
    if (!userInput.trim()) return;

    try {
      const response = await fetch("/api/ai-query", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question: userInput }),
      });
      const data = await response.json();
      setAIResponse(data.answer || "No response from AI.");
    } catch (error) {
      console.error("AI Query Error:", error);
      setAIResponse("Error fetching AI response. Please try again later.");
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="relative h-48 rounded-xl overflow-hidden mb-8">
        <img
          src="https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?auto=format&fit=crop&q=80"
          alt="Hydroponic Farm"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-green-900/80 to-transparent flex items-center">
          <div className="p-8">
            <h1 className="text-3xl font-bold text-white mb-2">AI Insights</h1>
            <p className="text-green-50">Smart recommendations for optimal growing conditions</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {suggestions.map((suggestion) => (
          <Card key={suggestion.id} className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-start space-x-4">
              <div className="p-3 rounded-full bg-green-100 dark:bg-green-900/30">
                <suggestion.icon className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold mb-2">{suggestion.title}</h3>
                <p className="text-sm text-muted-foreground mb-4">{suggestion.description}</p>
                <Button variant="outline" size="sm" className="w-full">
                  Apply Suggestion
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Card className="p-6 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20">
        <div className="flex items-center space-x-4 mb-4">
          <div className="p-3 rounded-full bg-green-100 dark:bg-green-900/50">
            <Brain className="h-6 w-6 text-green-600 dark:text-green-400" />
          </div>
          <div>
            <h3 className="font-semibold">AI Assistant</h3>
            <p className="text-sm text-muted-foreground">Ask me anything about your Farm system</p>
          </div>
        </div>
        <div className="space-y-4">
          <div className="flex space-x-2">
            <input
              type="text"
              placeholder="Type your question here..."
              className="flex-1 rounded-lg border border-input bg-background px-3 py-2"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
            />
            <Button onClick={handleAIQuery}>Ask AI</Button>
          </div>
          {aiResponse && (
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
              <h4 className="font-semibold">AI Response:</h4>
              <p className="text-sm">{aiResponse}</p>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}
