import React, { useState, useEffect, useRef } from 'react';


import { Header } from '../components/Header';
import { HeroSection } from '../components/HeroSection';
import { VideoSection } from '../components/VideoSection';
import { HelpSetupBanner } from '../components/HelpSetupBanner'
import { HowItWorks } from '../components/HowItWorks';
import { Statistic } from '../components/Statistic';
import { BrandShowcase } from '../components/BrandShowcase';
import { CallToAction } from '../components/CallToAction';
import { PricingSection } from '../components/PricingSection';
import { Footer } from '../components/Footer';
// import { Wheel } from '../components/Wheel';

function Home() {
  const [isWheelOpen, setIsWheelOpen] = useState(false);

  function handleOpenWheel() {
    setIsWheelOpen(true);
  }

  function handleCloseWheel() {
    setIsWheelOpen(false);
    // if (theWheel) {
    //   theWheel.stopAnimation(false); // Зупиняємо анімацію при закритті
    //   theWheel.draw(); // Перемальовуємо колесо в початковому стані
    // }
  }

  return (
    <div className="text-black text-base not-italic normal-nums font-light accent-auto bg-white bg-no-repeat bg-size-[100%] box-border block tracking-[normal] leading-6 list-outside list-disc text-left indent-[0px] normal-case visible bg-[position:50%_top] border-separate font-raleway">
      <Header />
      <HeroSection />
      <VideoSection />
      <HelpSetupBanner />
      <HowItWorks />
      <Statistic />


      <BrandShowcase />
      <CallToAction />
      <PricingSection />
      <Footer />
      

      {/* Панель з колесом фортуни */}
      <div
        className={`fixed top-0 left-0 h-full bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${
          isWheelOpen ? '-translate-x-0' : '-translate-x-full'
        } w-96 z-20`}
      >
        <div className="p-4">
          {/* Кнопка закриття */}
          <button
            onClick={handleCloseWheel}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          >
            <span className="text-2xl">&times;</span>
          </button>

          {/* <Wheel /> */}
        </div>
      </div>

      {/* Накладка для закриття при кліку поза панеллю (опціонально) */}
      {isWheelOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-10"
          onClick={handleCloseWheel}
        ></div>
      )}

      
      {/* Fixed elements */}
      
      
      <a onClick={handleOpenWheel} className="pointer fixed  bg-no-repeat bg-contain bottom-[-30px] box-border h-[100px] rotate-[-2.0217276999269016deg] origin-[100%_100%] w-[100px] z-[999997] bg-center left-2.5 md:rotate-[-0.3380583823752766deg]"></a>
    </div>
  );
}

export default Home;
