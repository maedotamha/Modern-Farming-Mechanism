"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Download, Link } from "lucide-react";

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
        resources: [
          {
            title: "Research on Crop Rotation Benefits",
            link: "https://example.com/research-crop-rotation",
          },
          {
            title: "Soil Health through Rotation",
            link: "https://example.com/soil-health",
          },
        ],
      },
      {
        title: "Organic Fertilizers",
        details: "Using compost and manure enhances soil nutrients naturally.",
        resources: [
          {
            title: "Organic Fertilizer Impact Study",
            link: "https://example.com/organic-fertilizer",
          },
          {
            title: "Natural Fertilizers for Growth",
            link: "https://example.com/natural-growth",
          },
        ],
      },
      {
        title: "Drip Irrigation",
        details: "Efficient water usage that targets the root zone of crops.",
        resources: [
          {
            title: "Drip Irrigation Systems Guide",
            link: "https://example.com/drip-irrigation",
          },
          {
            title: "Precision Watering Techniques",
            link: "https://example.com/precision-watering",
          },
        ],
      },
    ],
  },
  // Add more data objects here for additional sections
];

const downloadableContent = (data: (typeof allData)[number]) => `
Farming Information
====================

Title: ${data.title}

Description: ${data.description}

Recommended Practices:

${data.practices
  .map(
    (practice, index) =>
      `${index + 1}. ${practice.title} - ${practice.details}\nResources:\n${practice.resources
        .map((resource, resIndex) => `   ${resIndex + 1}. ${resource.title} (${resource.link})`)
        .join("\n")}`
  )
  .join("\n\n")}
`;

export default function InformationPage() {
  const [content] = useState(allData[0]); // Always display the first item for now

  const handleDownload = () => {
    const blob = new Blob([downloadableContent(content)], {
      type: "text/plain",
    });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `${content.title.replace(/\s+/g, "_").toLowerCase()}.txt`;
    link.click();
  };

  return (
    <div className="p-6 space-y-6 ">
      <h1 className="text-4xl font-bold text-green-800 text-center mb-4">
        {content.title}
      </h1>
      <p className="text-lg text-green-800 text-center mb-6">
        {content.description}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {content.practices.map((practice, index) => (
          <Card
            key={index}
            className="p-6 border border-green-300 rounded-lg shadow-lg"
          >
            <h2 className="text-2xl font-semibold text-green-800 mb-4">
              {practice.title}
            </h2>
            <p className="text-base text-green-800 mb-4">{practice.details}</p>
            <div>
              <h3 className="text-lg font-bold text-green-800 mb-2">
                Additional Resources:
              </h3>
              <ul className="list-disc pl-4">
                {practice.resources.map((resource, resIndex) => (
                  <li key={resIndex}>
                    <a
                      href={resource.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-green-800 hover:underline"
                    >
                      {resource.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </Card>
        ))}
      </div>

      <Card className="p-6 flex justify-center items-center border border-green-300 rounded-lg">
        <button
          onClick={handleDownload}
          className="flex items-center space-x-2 text-green-600 font-bold hover:text-green-800 transition-colors"
        >
          <Download className="h-6 w-6 text-green-500" />
          <span>Download Full Information</span>
        </button>
      </Card>
    </div>
  );
}
