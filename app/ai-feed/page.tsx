"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Brain, Droplet, ThermometerSun, Leaf } from "lucide-react";
import { useGlobalConfig } from "@/app/config/globalConfig";
import Image from "next/image";

interface Suggestion {
  id: number;
  title: string;
  description: string;
  icon: React.ElementType;
}

export default function FarmWiseAIPage() {
  const { cropNameA, cropNameB, location } = useGlobalConfig();

  const plantSuggestions: Record<string, string> = {
    Tomato:
      "Tomatoes need consistent watering and minimal sunlight during early growth stages. Mulching can help retain soil moisture.",
    Carrot:
      "Carrots grow best in loose, well-drained soil. Avoid overwatering to prevent root rot.",
    Potato:
      "Potatoes need moderate sunlight and moist soil. Ensure proper drainage to avoid waterlogging.",
    Onion:
      "Onions thrive in full sunlight and require light, loamy soil for optimal growth.",
    Wheat:
      "Wheat prefers a temperate climate with well-drained soil. Overwatering can affect yield.",
    Coffee:
      "Coffee plants require partial shade and moist, well-drained soil for ideal growth.",
    Cabbage:
      "Cabbage requires cool weather, frequent watering, and nitrogen-rich soil.",
    Corn: "Corn thrives in sunny conditions and needs regular watering during the tasseling stage.",
    Spinach:
      "Spinach grows well in cool temperatures and needs consistent watering for tender leaves.",
    Sorghum:
      "Sorghum is drought-tolerant and grows well in dry, sunny conditions.",
  };

  const locationSuggestions: Record<string, string> = {
    "Addis Ababa":
      "Addis Ababa has a mild climate. Frequent watering is essential during dry months.",
    Amhara:
      "Amhara is experiencing a dry season. Regular irrigation is recommended for optimal growth.",
    Hawassa:
      "Hawassa has a moderate climate. Ensure proper soil drainage during the rainy season.",
    Nazareth:
      "Nazareth is hot and dry. Mulching and regular watering are crucial.",
    Tigray:
      "Tigray faces arid conditions. Drought-resistant crops are recommended.",
    Oromia:
      "Oromia has a temperate climate. Keep an eye on soil moisture levels.",
    Gambella:
      "Gambella experiences heavy rainfall. Proper drainage is vital to avoid waterlogging.",
    "Bahir Dar":
      "Bahir Dar has a humid climate. Monitor pest activity in wetter months.",
    "Dire Dawa":
      "Dire Dawa is dry and hot. Choose crops that require minimal water.",
    Harar:
      "Harar has a warm climate. Consider intercropping to maximize soil productivity.",
  };

  const staticSuggestions: Suggestion[] = [
    {
      id: 1,
      title: "General Plant Health",
      description:
        "Ensure consistent watering and monitor for pests. Healthy soil and balanced nutrients are key to sustained growth.",
      icon: Brain,
    },
  ];

  const variableSuggestions: Suggestion[] = [
    cropNameA &&
      plantSuggestions[cropNameA] && {
        id: 2,
        title: `${cropNameA} Growing Advice`,
        description: plantSuggestions[cropNameA],
        icon: Droplet,
      },
    cropNameB &&
      plantSuggestions[cropNameB] && {
        id: 3,
        title: `${cropNameB} Growing Advice`,
        description: plantSuggestions[cropNameB],
        icon: Droplet,
      },
    location &&
      locationSuggestions[location] && {
        id: 4,
        title: `${location} Weather Advisory`,
        description: locationSuggestions[location],
        icon: ThermometerSun,
      },
    {
      id: 5,
      title: "Soil Health Check",
      description:
        "Maintain soil quality by adding organic matter and monitoring pH levels regularly to ensure healthy plant growth.",
      icon: Leaf,
    },
  ].filter(Boolean) as Suggestion[];

  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const shuffledVariableSuggestions = variableSuggestions.sort(
      () => Math.random() - 0.5
    );
    setSuggestions([...staticSuggestions, ...shuffledVariableSuggestions]);
    setLoading(false);
  }, [cropNameA, cropNameB, location]);

  useEffect(() => {
    // Only load the chatbot script for this page
    if (window.location.pathname === "/ai-feed") {
      const botpressScript1 = document.createElement("script");
      botpressScript1.src = "https://cdn.botpress.cloud/webchat/v2.2/inject.js"; // Ensure this link works
      botpressScript1.async = true;

      const botpressScript2 = document.createElement("script");
      botpressScript2.src =
        "https://files.bpcontent.cloud/2024/12/26/11/20241226112806-0TQJK2YL.js"; // Ensure this link is valid
      botpressScript2.async = true;

      document.body.appendChild(botpressScript1);
      document.body.appendChild(botpressScript2);

      return () => {
        // Clean up scripts when the component unmounts
        document.body.removeChild(botpressScript1);
        document.body.removeChild(botpressScript2);
      };
    }
  }, []);

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
            <h1 className="text-3xl font-bold text-white mb-2">
              FarmWiseAI Insights
            </h1>
            <p className="text-green-50">
              Smart recommendations for optimal farming conditions
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <p className="text-center text-gray-500">Loading suggestions...</p>
        ) : (
          suggestions.map((suggestion) => (
            <Card
              key={suggestion.id}
              className="p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-start space-x-4">
                <div className="p-3 rounded-full bg-green-100 dark:bg-green-900/30">
                  <suggestion.icon className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold mb-2">{suggestion.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {suggestion.description}
                  </p>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
