"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useState } from "react";

const ImageTabs = () => {
    
    const [activeImageTab, setActiveImageTab] = useState("organize"); //organize, hire, manage

  return (
    <section className="border-t bg-white py-16">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-6xl text-center">
              <div className="flex gap-2 justify-center mb-8">
                <Button
                  onClick={() => setActiveImageTab("organize")}
                  className={`rounded-b-md px-6 py-3 text-sm font-medium transition-colors ${
                    activeImageTab === "organize"
                      ? "bg-primary text-white"
                      : "bg-gray-100 text-black hover:bg-gray-300"
                  }`}
                >
                  Organize Applications
                </Button>
                <Button onClick={() => setActiveImageTab("hire")}
                className={`rounded-b-md px-6 py-3 text-sm font-medium transition-colors ${
                  activeImageTab === "hire"
                    ? "bg-primary text-white"
                    : "bg-gray-100 text-black hover:bg-gray-300"
                }`}
              >
                  Get Hired
                </Button>
                <Button onClick={() => setActiveImageTab("manage")}
                className={`rounded-b-md px-6 py-3 text-sm font-medium transition-colors ${
                  activeImageTab === "manage"
                    ? "bg-primary text-white"
                    : "bg-gray-100 text-black hover:bg-gray-300"
                }`}
              >
                  Manage Boards
                </Button>
              </div>
              <div className="relative mx-auto max-w-5xl overflow-hidden rounded-lg border border-gray-200 shadow-xl">
                {activeImageTab == "organize" && (
                  <Image
                    src="/hero-images/hero1.png"
                    alt="Organize Applications"
                    width={1200}
                    height={800}
                  />
                )}

                {activeImageTab == "hire" && (
                  <Image
                    src="/hero-images/hero2.png"
                    alt="Get Hired"
                    width={1200}
                    height={800}
                  />
                )}

                {activeImageTab == "manage" && (
                  <Image
                    src="/hero-images/hero3.png"
                    alt="Manage Boards"
                    width={1200}
                    height={800}
                  />
                )}
              </div>
            </div>
          </div>
        </section>
  )
}

export default ImageTabs
