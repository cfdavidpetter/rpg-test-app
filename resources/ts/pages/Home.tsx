import { useState } from "react";
import TabOne from "./Session/TabOne";
import TabTwo from "./Session/TabTwo";

export default function Home() {
  const [currentTab, setCurrentTab] = useState(1);

  const handleNext = () => {
    if (currentTab < 2) {
      setCurrentTab(currentTab + 1);
    }
  };

  const handleBack = () => {
    if (currentTab > 1) {
      setCurrentTab(currentTab - 1);
    }
  };
  
  return (
      <>
        <div className="mb-8 lg:mb-16 max-w-3xl mx-auto  w-full">
          <h2 className="mb-5 text-4xl leading-[44px] md:text-center  font-semibold text-gray-900 dark:text-white">
            Sessão
          </h2>
        </div>
        <div className="flex justify-center">
          <div className="relative h-full w-full rounded bg-white shadow">
            <div className="flex flex-col md:flex-row md:items-center justify-between m-3 space-y-2 md:space-y-0 md:space-x-2">
                <div className="w-full mx-auto">
                  <div className="mt-6">
                    {currentTab === 1 && <TabOne currentTab={currentTab} handleBack={handleBack} handleNext={handleNext} />}
                    {currentTab === 2 && <TabTwo currentTab={currentTab} handleBack={handleBack} handleNext={handleNext} />}
                  </div>
                </div>
            </div>
          </div>
        </div>
      </>
  );
}
