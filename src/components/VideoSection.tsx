import React from 'react';

export function VideoSection() {
  return (
    <div className="box-border flex flex-wrap max-w-none w-full mx-auto px-[15px] md:max-w-[1140px]">
      <div className="relative box-border basis-0 grow max-w-full min-h-px w-full px-[15px]">
        <div className="box-border max-w-[950px] mx-auto">
          <video className="box-border max-w-[950px] w-full overflow-hidden my-20 rounded-[17px]"></video>
        </div>
        <h3 className="text-2xl font-bold box-border leading-9 max-w-[580px] text-center mb-[100px] mx-auto">
          Виджет уже помог <span className="bg-indigo-600 box-border text-nowrap mx-[5px] px-2.5 py-[3px] rounded-[100px]">3700+</span>
          бизнесам получить <span className="bg-indigo-600 box-border text-nowrap mx-[5px] px-2.5 py-[3px] rounded-[100px]">220 000+</span>
          бесплатных заявок на автопилоте без увеличения рекламного бюджета
        </h3>
      </div>
    </div>
  );
}
