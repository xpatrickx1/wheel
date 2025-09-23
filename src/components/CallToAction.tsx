import React from 'react';

export function CallToAction() {
  return (
    <div className="box-border flex flex-wrap max-w-none text-center w-full mx-auto px-[15px] md:max-w-[1140px]">
      <div className="relative box-border basis-0 grow max-w-full min-h-px w-full px-[15px]">
        <h3 className="text-2xl font-bold box-border leading-9 mt-[100px] mb-[30px]">
          Вы в хорошей компании! Присоединяйтесь к <span className="bg-indigo-600 box-border text-nowrap mx-[5px] px-2.5 py-[3px] rounded-[100px]">3700+</span>
          <br className="box-border" />
          человек и начните получать бесплатные
          <br className="box-border" />
          тёплые заявки с вашего сайта
        </h3>
        <a href="sign-up" className="text-blue-600 box-border">
          <div className="relative text-white bg-indigo-600 bg-[linear-gradient(rgb(87,46,253)_0%,rgb(51,57,255)_100%)] shadow-[rgba(43,62,229,0.15)_0px_15px_18px_0px,rgba(93,225,151,0.004)_0px_2px_0px_0px_inset] box-border inline-block overflow-hidden px-[35px] py-5 rounded-[17px]">Попробовать бесплатно</div>
        </a>
      </div>
    </div>
  );
}
