import React, { useState, useEffect } from 'react';

import { Header } from '../components/Header';
import { HeroSection } from '../components/HeroSection';
import { VideoSection } from '../components/VideoSection';
import { HelpSetupBanner } from '../components/HelpSetupBanner';
import { HowItWorks } from '../components/HowItWorks';
import { Brands } from '../components/Brands';
import { Integration } from '../components/Integration';
import { Statistic } from '../components/Statistic';
import { PricingSection } from '../components/PricingSection';
import { BannerTry } from '../components/BannerTry';
import { Footer } from '../components/Footer';

import WheelWidget from '../components/WheelWidget';
import { defaultWidgetSettings } from '../lib/defaultSettings';

function Home() {
  const [widgetSettings, setWidgetSettings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const defaultOptions = defaultWidgetSettings

  useEffect(() => {
    const loadWidgetSettings = async () => {
      try {
        setLoading(true);
        setWidgetSettings(defaultOptions);
      } catch (err) {
        setError(err.message);
        setWidgetSettings(defaultOptions); 
      } finally {
        setLoading(false);
      }
    };

    loadWidgetSettings();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    console.error('Widget loading error:', error);
  }

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
      <PricingSection />
      <BannerTry />
      <Footer />

      {widgetSettings && (
        <WheelWidget 
          options={widgetSettings}
          containerId="main-wheel-widget"
        />
      )}
    </div>
  );
}

export default Home;