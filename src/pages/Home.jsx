import React, { useState, useEffect, useRef } from 'react';


import { Header } from '../components/Header';
import { HeroSection } from '../components/HeroSection';
import { VideoSection } from '../components/VideoSection';
import { HelpSetupBanner } from '../components/HelpSetupBanner'
import { HowItWorks } from '../components/HowItWorks';
import { Integration } from '../components/Integration';
import { Statistic } from '../components/Statistic';
import { PricingSection } from '../components/PricingSection';
import { BannerTry } from '../components/BannerTry';
import { Footer } from '../components/Footer';
// import { Wheel } from '../components/Wheel';
import createWheel from '../lib/wheelee-home';
import { defaultWidgetSettings } from '../lib/defaultSettings';

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
  // createWheel("wheelee-container", defaultWidgetSettings)
  return (
    <div className="text-black text-base not-italic normal-nums font-light accent-auto bg-white bg-no-repeat bg-size-[100%] box-border block tracking-[normal] leading-6 list-outside list-disc text-left indent-[0px] normal-case visible bg-[position:50%_top] border-separate font-raleway">
      <Header />
      <HeroSection />
      <VideoSection />
      <HelpSetupBanner />
      <HowItWorks />
      <Integration />
      <Statistic />
      <PricingSection/>
      <BannerTry />
<iframe src="https://ptulighepuqttsocdovp.supabase.co/storage/v1/object/public/wheelee/wheelee-min.js" width="100%" height="600" frameborder="0"></iframe>
      {/* <div className="widget-wheel-wrapper _hidden">

      </div> */}




      <Footer />
      
    </div>
  );
}

export default Home;
