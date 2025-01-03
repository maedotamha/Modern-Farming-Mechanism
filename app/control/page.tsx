"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Download } from "lucide-react";

// Dummy data for the page
const allData = [
  {
    title: "Farming Information 1",
    description:
      "Discover key insights for improving soil health and farm productivity. Learn about recommended practices for various soil types, crop suggestions, and irrigation methods.",
    practices: [
      {
        title: "Crop Rotation",
        details:
          "Rotating crops helps in maintaining soil fertility and reducing pests.",
      },
      {
        title: "Organic Fertilizers",
        details: "Using compost and manure enhances soil nutrients naturally.",
      },
      {
        title: "Drip Irrigation",
        details: "Efficient water usage that targets the root zone of crops.",
      },
    ],
  },
  {
    title: "Farming Information 2",
    description:
      "Learn how to enhance soil quality and improve farm yield with effective techniques and resources.",
    practices: [
      {
        title: "Conservation Tillage",
        details: "Minimizing tillage to preserve soil structure and moisture.",
      },
      {
        title: "Agroforestry",
        details:
          "Integrating trees with crops to improve biodiversity and soil health.",
      },
      {
        title: "Integrated Pest Management",
        details:
          "Controlling pests using a variety of techniques without harming crops.",
      },
    ],
  },
  {
    title: "Farming Information 3",
    description:
      "Implement sustainable farming practices to achieve long-term productivity and environmental balance.",
    practices: [
      {
        title: "Water Conservation",
        details: "Implementing systems to reduce water usage for crops.",
      },
      {
        title: "No-Till Farming",
        details: "A method to maintain soil structure and reduce erosion.",
      },
      {
        title: "Biological Pest Control",
        details: "Using natural predators to control pests in the field.",
      },
    ],
  },
  {
    title: "Farming Information 4",
    description:
      "Effective strategies to increase soil fertility and optimize farm productivity.",
    practices: [
      {
        title: "Soil Testing",
        details: "Regular soil testing to understand nutrient requirements.",
      },
      {
        title: "Legume Planting",
        details: "Growing legumes to fix nitrogen in the soil naturally.",
      },
      {
        title: "Cover Crops",
        details:
          "Planting crops to protect and enrich soil during off-seasons.",
      },
    ],
  },
  {
    title: "Farming Information 5",
    description:
      "Innovative techniques for improving soil health and boosting agricultural output.",
    practices: [
      {
        title: "Composting",
        details: "Turning organic waste into rich compost for healthier soil.",
      },
      {
        title: "Green Manure",
        details:
          "Using plants to improve soil fertility through decomposition.",
      },
      {
        title: "Agroecology",
        details: "Applying ecological principles to farm management.",
      },
    ],
  },
  {
    title: "Farming Information 6",
    description:
      "Sustainable farming practices that are good for both the land and the crops.",
    practices: [
      {
        title: "Water Harvesting",
        details:
          "Collecting rainwater for irrigation to reduce dependency on wells.",
      },
      {
        title: "Crop Diversification",
        details:
          "Growing different crops to reduce risk and improve soil health.",
      },
      {
        title: "Biofertilizers",
        details: "Using microorganisms to naturally enhance soil nutrients.",
      },
    ],
  },
  {
    title: "Farming Information 7",
    description:
      "Boost your farm’s productivity and resilience through innovative soil management techniques.",
    practices: [
      {
        title: "Soil Erosion Control",
        details:
          "Preventing soil erosion through proper land management techniques.",
      },
      {
        title: "Vermiculture",
        details: "Using worms to improve soil structure and fertility.",
      },
      {
        title: "No-Chemical Farming",
        details:
          "Farming without the use of harmful pesticides and fertilizers.",
      },
    ],
  },
  {
    title: "Farming Information 8",
    description:
      "Maximize your farm’s potential with scientifically proven practices for sustainable agriculture.",
    practices: [
      {
        title: "Crop-Specific Fertilization",
        details:
          "Tailoring fertilization methods to specific crops for better yield.",
      },
      {
        title: "Windbreaks",
        details: "Planting trees to reduce wind erosion and protect crops.",
      },
      {
        title: "Intercropping",
        details:
          "Growing different crops together to maximize space and nutrients.",
      },
    ],
  },
  {
    title: "Farming Information 9",
    description:
      "Make informed decisions about your farm’s future with the latest research-backed soil management techniques.",
    practices: [
      {
        title: "Greenhouse Farming",
        details:
          "Growing crops in a controlled environment to extend growing seasons.",
      },
      {
        title: "Hydroponics",
        details: "Growing plants without soil using mineral solutions.",
      },
      {
        title: "Aquaponics",
        details:
          "Integrating fish farming with plant farming to create a sustainable ecosystem.",
      },
    ],
  },
  {
    title: "Farming Information 10",
    description:
      "Empower your farming journey with practices designed to improve both soil and crop health.",
    practices: [
      {
        title: "Hydraulic Erosion Control",
        details: "Using water management techniques to prevent soil erosion.",
      },
      {
        title: "Agrochemicals",
        details:
          "Using fertilizers and pesticides to boost crop yields and prevent diseases.",
      },
      {
        title: "Sustainable Irrigation",
        details: "Efficient irrigation practices that reduce water waste.",
      },
    ],
  },
];

const downloadableContent = (data: (typeof allData)[number]) => `
Farming Information
====================

Title: ${data.title}

Description: ${data.description}

Recommended Practices:

${data.practices
  .map(
    (practice, index) => `${index + 1}. ${practice.title} - ${practice.details}`
  )
  .join("\n")}`;

export default function InformationPage() {
  const [content, setContent] = useState(allData[0]);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Change the content every 2 minutes
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        const nextIndex = (prevIndex + 1) % allData.length;
        setContent(allData[nextIndex]);
        return nextIndex;
      });
    }, 120000); // 2 minutes in milliseconds

    return () => clearInterval(interval); // Cleanup the interval on component unmount
  }, []);

  const handleDownload = () => {
    const blob = new Blob([downloadableContent(content)], {
      type: "text/plain",
    });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "farming_information.txt";
    link.click();
  };

  return (
    <div className="p-6 space-y-6 bg-gradient-to-br from-gray-100 to-gray-300 dark:from-gray-900 dark:to-gray-700">
      <h1 className="text-3xl font-bold text-green-700 dark:text-green-300">
        {content.title}
      </h1>
      <p className="text-lg text-gray-800 dark:text-gray-200">
        {content.description}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {content.practices.map((practice, index) => (
          <Card
            key={index}
            className="p-4 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg"
          >
            <h2 className="text-xl font-semibold text-green-600 dark:text-green-400">
              {practice.title}
            </h2>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              {practice.details}
            </p>
          </Card>
        ))}
      </div>

      <Card className="p-4 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg flex justify-center items-center">
        <button
          onClick={handleDownload}
          className="flex items-center space-x-2 text-green-600 dark:text-green-400 font-bold hover:text-green-800 dark:hover:text-green-200 transition-colors"
        >
          <Download className="h-6 w-6 text-green-500 dark:text-green-300" />
          <span>Download Information</span>
        </button>
      </Card>
    </div>
  );
}
