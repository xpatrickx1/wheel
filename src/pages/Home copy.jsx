import React, { useState } from 'react';

import { Header } from '../components/Header';
import { HeroSection } from '../components/HeroSection';
import { VideoSection } from '../components/VideoSection';
import { HelpSetupBanner } from '../components/HelpSetupBanner'
import { HowItWorks } from '../components/HowItWorks';
import { Brands } from '../components/Brands';
import { Integration } from '../components/Integration';
import { Statistic } from '../components/Statistic';
import { PricingSection } from '../components/PricingSection';
import { BannerTry } from '../components/BannerTry';
import { Footer } from '../components/Footer';
import { defaultWidgetSettings } from '../lib/defaultSettings';

import { useWheel } from "@/wheel/react/useWheel";

function Home() {

  return (
    <div className="text-black text-base not-italic normal-nums font-light accent-auto bg-white bg-no-repeat bg-size-[100%] box-border block tracking-[normal] leading-6 list-outside list-disc text-left indent-[0px] normal-case visible bg-[position:50%_top] border-separate font-raleway">
      <Header />
      <HeroSection />
      <VideoSection />
      <HelpSetupBanner />
      <HowItWorks />
      <Brands />
      <Integration />
      <Statistic />
      <PricingSection/>
      <BannerTry />

      <Footer />
      
    </div>
  );
}

export default Home;
