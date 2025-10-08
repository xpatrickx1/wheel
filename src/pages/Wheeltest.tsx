import React, { useRef, useState, useEffect } from 'react';
import createWheel from '../lib/wheelee-test';

export function Wheeltest() {

  
  useEffect(() => {
    createWheel("root", {
      bonuses: [
        { text: "Бонус #1"},
        { text: "Бонус #2"},
        { text: "Бонус #3"},
        { text: "Бонус #4"},
        { text: "Бонус #5"},
        { text: "Бонус #6"},
        { text: "Бонус #7"},
        { text: "Бонус #8"},
      ],
      color: "#4A61DA",
      title: "Виграй приз!",
      subtitle: "Введи email, щоб крутити колесо",
      buttonText: "Крутити",
      privacyUrl: "/privacy",
      successMessage: "Вітаємо! Ви виграли 🎉",
      collectData: "tel"
    });

  
  }, []);
  
  // useEffect(() => {
  //   async function load() {
  //     const { data, error } = await supabase
  //       .from('widgets')
  //       .select('settings')
  //       .eq('id', widgetId)
  //       .single();
  //     if (!error) setSettings(data.settings);
  //   }
  //   load();
  // }, [widgetId]);
  
  
   
  return (
    <div>
      {/* <div className="flex items-center relative min-h-screen w-full overflow-hidden bg-[#262635] max-w-[1000px] mx-auto"> */}

         
      {/* </div> */}
    </div>
  );
}