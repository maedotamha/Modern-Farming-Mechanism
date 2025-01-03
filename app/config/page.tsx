"use client";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useGlobalConfig, updateGlobalConfig } from "./globalConfig";

interface PumpConfig {
  idealMoistureA: number;
  idealMoistureB: number;
  cropNameA: string;
  cropNameB: string;
  location: string;
  soilTypeA: string;
  soilTypeB: string;
  altitudeA: number;
  cropTypeA: string;
  cropTypeB: string;
}

export default function ConfigPage() {
  const globalConfig = useGlobalConfig();
  const [config, setConfig] = useState<PumpConfig>({
    ...globalConfig,
  });

  const [warning, setWarning] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false); // Track if the configuration was successfully saved

  const validateConfig = (): boolean => {
    const {
      idealMoistureA,
      idealMoistureB,
      cropNameA,
      cropNameB,
      location,
      altitudeA,
    } = config;
    if (
      idealMoistureA < 0 ||
      idealMoistureA > 100 ||
      idealMoistureB < 0 ||
      idealMoistureB > 100
    ) {
      setWarning("Ideal moisture must be between 0 and 100.");
      setSuccess(false);
      return false;
    }
    if (!cropNameA || !cropNameB || !location || altitudeA < 0) {
      setWarning(
        "Please fill in all required fields and ensure altitude values are non-negative."
      );
      setSuccess(false);
      return false;
    }
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateConfig()) return;

    setWarning(null);
    setSuccess(true); // Indicate that the configuration has been successfully saved
    updateGlobalConfig(config); // Update global configuration state
    console.log("Config saved to global state:", config);
  };

  return (
    <div className="p-4 md:p-6 space-y-6">
      <h1 className="text-xl md:text-3xl font-bold">System Configuration</h1>

      {warning && (
        <div className="p-4 mb-4 text-red-700 bg-red-100 rounded-lg">
          <p>{warning}</p>
        </div>
      )}

      {success && (
        <div className="p-4 mb-4 text-green-700 bg-green-100 rounded-lg">
          <p>Configuration saved successfully!</p>
        </div>
      )}

      {success && (
        <Card className="p-4 mb-6 ">
          <h2 className="text-lg font-semibold">Current Configuration</h2>
          <pre className="text-sm md:text-base text-green-800 mt-4">
            {JSON.stringify(globalConfig, null, 2)}
          </pre>
        </Card>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Farm A Configuration */}
          <Card className="p-4 md:p-6">
            <h3 className="text-lg md:text-xl font-semibold">Farm A</h3>
            <div className="space-y-4">
              <div>
                <Label>Crop Name</Label>
                <Input
                  type="text"
                  value={config.cropNameA}
                  onChange={(e) =>
                    setConfig({ ...config, cropNameA: e.target.value })
                  }
                />
              </div>
              <div>
                <Label>Ideal Moisture (%)</Label>
                <Input
                  type="number"
                  value={config.idealMoistureA}
                  onChange={(e) =>
                    setConfig({
                      ...config,
                      idealMoistureA: parseInt(e.target.value),
                    })
                  }
                />
              </div>
              <div>
                <Label>Soil Type</Label>
                <Input
                  type="text"
                  value={config.soilTypeA}
                  onChange={(e) =>
                    setConfig({ ...config, soilTypeA: e.target.value })
                  }
                />
              </div>
              <div>
                <Label>Crop Type/Variety</Label>
                <Input
                  type="text"
                  value={config.cropTypeA}
                  onChange={(e) =>
                    setConfig({ ...config, cropTypeA: e.target.value })
                  }
                />
              </div>
            </div>
          </Card>

          {/* Farm B Configuration */}
          <Card className="p-4 md:p-6">
            <h3 className="text-lg md:text-xl font-semibold">Farm B</h3>
            <div className="space-y-4">
              <div>
                <Label>Crop Name</Label>
                <Input
                  type="text"
                  value={config.cropNameB}
                  onChange={(e) =>
                    setConfig({ ...config, cropNameB: e.target.value })
                  }
                />
              </div>
              <div>
                <Label>Ideal Moisture (%)</Label>
                <Input
                  type="number"
                  value={config.idealMoistureB}
                  onChange={(e) =>
                    setConfig({
                      ...config,
                      idealMoistureB: parseInt(e.target.value),
                    })
                  }
                />
              </div>
              <div>
                <Label>Soil Type</Label>
                <Input
                  type="text"
                  value={config.soilTypeB}
                  onChange={(e) =>
                    setConfig({ ...config, soilTypeB: e.target.value })
                  }
                />
              </div>
              <div>
                <Label>Crop Type/Variety</Label>
                <Input
                  type="text"
                  value={config.cropTypeB}
                  onChange={(e) =>
                    setConfig({ ...config, cropTypeB: e.target.value })
                  }
                />
              </div>
            </div>
          </Card>
        </div>

        <div>
          <Label>Location</Label>
          <Input
            type="text"
            value={config.location}
            onChange={(e) =>
              setConfig({ ...config, location: e.target.value })
            }
            placeholder="e.g., Addis Ababa"
          />
        </div>

        <div>
          <Label>Altitude (m)</Label>
          <Input
            type="number"
            value={config.altitudeA || ""}
            onChange={(e) =>
              setConfig({ ...config, altitudeA: parseInt(e.target.value) })
            }
          />
        </div>

        <Button
          type="submit"
          className="px-4 py-2 bg-green-600 hover:bg-green-700 text-sm md:text-base"
        >
          Save Configuration
        </Button>
      </form>
    </div>
  );
}
