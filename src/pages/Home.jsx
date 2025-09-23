import React, { useState, useEffect, useRef } from 'react';


import { Header } from '../components/Header';
import { HeroSection } from '../components/HeroSection';
import { VideoSection } from '../components/VideoSection';
import { WidgetTypes } from '../components/WidgetTypes';
import { HowItWorks } from '../components/HowItWorks';
import { BrandShowcase } from '../components/BrandShowcase';
import { CallToAction } from '../components/CallToAction';
import { PricingSection } from '../components/PricingSection';
import { Footer } from '../components/Footer';
import { Wheel } from '../components/Wheel';

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
    <div className="text-white text-base not-italic normal-nums font-light accent-auto bg-zinc-900 bg-no-repeat bg-size-[100%] box-border block tracking-[normal] leading-6 list-outside list-disc text-left indent-[0px] normal-case visible bg-[position:50%_top] border-separate font-raleway">
      <Header />
      <HeroSection />
      <VideoSection />
      <WidgetTypes />
      <HowItWorks />
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

          <Wheel />
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
      <div className="fixed box-border h-[50px] w-[85px] z-[10000] mb-5 right-5 bottom-0">
        <iframe name="fXD69514" className="box-border h-[50px] w-[85px]"></iframe>
      </div>
      <div className="fixed bg-gray-800 box-border max-w-[720px] visible w-full z-[999999] left-0 inset-y-0 md:left-[-720px] md:invisible">
        <iframe src="https://lp9.ru/page/vetyfy34&w&u=aHR0cHM6Ly9scDkucnUv" className="absolute box-border h-full visible w-full z-[1] inset-0 md:invisible"></iframe>
        <div className="absolute bg-[url('https://lp9.ru/img/cross.svg')] bg-no-repeat bg-size-[14px] box-border h-[30px] opacity-30 visible w-[30px] z-[5] bg-center right-5 top-5 md:invisible"></div>
      </div>
      <div className="fixed bg-black/50 box-border opacity-100 visible z-[999998] inset-0 md:opacity-0 md:invisible"></div>
      <a onClick={handleOpenWheel} className="pointer fixed bg-[url('https://lp9.ru/img/gift.png')] bg-no-repeat bg-contain bottom-[-30px] box-border h-[100px] rotate-[-2.0217276999269016deg] origin-[100%_100%] w-[100px] z-[999997] bg-center left-2.5 md:rotate-[-0.3380583823752766deg]"></a>
    </div>
  );
}

export default Home;
