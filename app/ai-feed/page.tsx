"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Brain, Droplet, ThermometerSun, Leaf } from "lucide-react";
import { exportedValues } from "@/app/config/page"; // Assuming this contains `name` and `location`

export default function AIFeedPage() {
  const { name, location } = exportedValues;

  // Plant-specific suggestions
  const plantSuggestions = {
    Tomato: "Tomatoes need consistent watering and minimal sunlight during early growth stages. Mulching can help retain soil moisture.",
    Carrot: "Carrots grow best in loose, well-drained soil. Avoid overwatering to prevent root rot.",
    Potato: "Potatoes need moderate sunlight and moist soil. Ensure proper drainage to avoid waterlogging.",
    Onion: "Onions thrive in full sunlight and require light, loamy soil for optimal growth.",
    Wheat: "Wheat prefers a temperate climate with well-drained soil. Overwatering can affect yield.",
    Coffee: "Coffee plants require partial shade and moist, well-drained soil for ideal growth.",
    Cabbage: "Cabbage requires cool weather, frequent watering, and nitrogen-rich soil.",
    Corn: "Corn thrives in sunny conditions and needs regular watering during the tasseling stage.",
    Spinach: "Spinach grows well in cool temperatures and needs consistent watering for tender leaves.",
    Sorghum: "Sorghum is drought-tolerant and grows well in dry, sunny conditions.",
  };

  // Location-specific suggestions
  const locationSuggestions = {
    AddisAbaba: "Addis Ababa has a mild climate. Frequent watering is essential during dry months.",
    Amhara: "Amhara is experiencing a dry season. Regular irrigation is recommended for optimal growth.",
    Hawassa: "Hawassa has a moderate climate. Ensure proper soil drainage during the rainy season.",
    Nazareth: "Nazareth is hot and dry. Mulching and regular watering are crucial.",
    Tigray: "Tigray faces arid conditions. Drought-resistant crops are recommended.",
    Oromia: "Oromia has a temperate climate. Keep an eye on soil moisture levels.",
    Gambella: "Gambella experiences heavy rainfall. Proper drainage is vital to avoid waterlogging.",
    BahirDar: "Bahir Dar has a humid climate. Monitor pest activity in wetter months.",
    DireDawa: "Dire Dawa is dry and hot. Choose crops that require minimal water.",
    Harar: "Harar has a warm climate. Consider intercropping to maximize soil productivity.",
  };

  const staticSuggestions = [
    {
      id: 1,
      title: "General Plant Health",
      description:
        "Ensure consistent watering and monitor for pests. Healthy soil and balanced nutrients are key to sustained growth.",
      icon: Brain,
    },
  ];

  const variableSuggestions = [
    name &&
      plantSuggestions[name] && {
        id: 2,
        title: `${name} Growing Advice`,
        description: plantSuggestions[name],
        icon: Droplet,
      },
    location &&
      locationSuggestions[location] && {
        id: 3,
        title: `${location} Weather Advisory`,
        description: locationSuggestions[location],
        icon: ThermometerSun,
      },
    {
      id: 4,
      title: "Soil Health Check",
      description:
        "Maintain soil quality by adding organic matter and monitoring pH levels regularly to ensure healthy plant growth.",
      icon: Leaf,
    },
  ].filter(Boolean); // Removes null values if `name` or `location` is missing

  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userInput, setUserInput] = useState("");
  const [aiResponse, setAIResponse] = useState("");

  useEffect(() => {
    // Shuffle variable suggestions only once on load
    const shuffledVariableSuggestions = variableSuggestions.sort(() => Math.random() - 0.5);
    setSuggestions([...staticSuggestions, ...shuffledVariableSuggestions]);
    setLoading(false);
  }, [name, location]); // Reload suggestions if variables change

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
      {/* Banner */}
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

      {/* AI Suggestions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <p className="text-center text-gray-500">Loading suggestions...</p>
        ) : (
          suggestions.map((suggestion) => (
            <Card key={suggestion.id} className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start space-x-4">
                <div className="p-3 rounded-full bg-green-100 dark:bg-green-900/30">
                  <suggestion.icon className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold mb-2">{suggestion.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{suggestion.description}</p>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>

      {/* AI Query Section */}
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
