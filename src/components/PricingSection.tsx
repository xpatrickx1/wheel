import React from 'react';
import { pricingPlans } from '../data/pricing';

export function PricingSection() {
  return (
    <div className="box-border">
      <div className="box-border flex flex-wrap max-w-none w-full mx-auto px-[15px] md:max-w-[1140px]">
        <div className="relative box-border basis-full shrink-0 max-w-full min-h-px w-full px-[15px]">
          <h3 className="text-2xl font-bold box-border leading-9 text-center mt-[100px] mb-[30px]">Цены</h3>
          <div className="items-center box-border flex justify-center mb-10">
            <span className="text-sm box-border block leading-[21px] opacity-50 mb-2 mx-2.5">на месяц</span>
            <label className="items-center box-border flex mb-2">
              <span className="relative bg-indigo-600 box-border block h-[25px] min-w-10 w-[50px] rounded-2xl before:accent-auto before:bg-slate-200 before:box-border before:text-white before:block before:text-base before:not-italic before:normal-nums before:font-light before:h-[18px] before:tracking-[normal] before:leading-6 before:list-outside before:list-disc before:absolute before:text-left before:indent-[0px] before:normal-case before:visible before:w-[18px] before:rounded-[14px] before:border-separate before:left-7 before:top-1 before:font-raleway"></span>
            </label>
            <span className="text-sm box-border block leading-[21px] opacity-50 mb-2 mx-2.5">на год</span>
          </div>
        </div>
      </div>
      <div className="box-border flex flex-wrap max-w-none w-full mx-auto px-[15px] md:max-w-[1140px]">
        {pricingPlans.map((plan) => (
          <div key={plan.id} className="relative box-border basis-full shrink-0 max-w-full min-h-px w-full px-[15px] md:basis-[33.3333%] md:max-w-[33.3333%]">
            <div className="bg-neutral-800 box-border mb-[30px] pt-[30px] pb-[50px] px-10 rounded-[17px]">
              <div className="text-[40px] font-black box-border leading-[60px]">
                {plan.strikePrice && (
                  <div className="box-border inline-block">{plan.strikePrice}</div>
                )}
                {plan.price} <span className="text-3xl box-border leading-[45px] opacity-50">₽<span className="text-lg font-normal box-border leading-[27px]">/мес</span></span>
              </div>
              <div className="box-border opacity-50">{plan.name}</div>
              <div className="box-border max-w-[150px] my-5 border-t-white/10 border-b-white border-x-white border-t"></div>
              <div className="box-border">
                {plan.features.map((feature, index) => (
                  <React.Fragment key={index}>
                    {feature}
                    {index < plan.features.length - 1 && <br className="box-border" />}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="box-border flex flex-wrap max-w-none w-full mx-auto px-[15px] md:max-w-[1140px]">
        <div className="relative box-border basis-0 grow max-w-full min-h-px w-full px-[15px]">
          <div className="items-center bg-indigo-600 bg-[linear-gradient(rgb(87,46,253)_0%,rgb(51,57,255)_100%)] box-border block justify-between mt-10 p-10 rounded-[17px] md:flex">
            <span className="text-2xl font-black box-border block leading-9 min-h-0 min-w-0 mb-5 md:min-h-[auto] md:min-w-[auto] md:mb-0">Попробуйте бесплатно сейчас</span>
            <a href="sign-up" className="text-blue-600 box-border inline-block min-h-0 min-w-0 md:block md:min-h-[auto] md:min-w-[auto]">
              <div className="relative text-black bg-white shadow-[rgba(43,62,229,0.15)_0px_15px_18px_0px,rgba(93,225,151,0.004)_0px_2px_0px_0px_inset] box-border inline-block text-center overflow-hidden px-[35px] py-5 rounded-[17px]">Попробовать бесплатно</div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
