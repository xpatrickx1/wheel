import React from "react";

export const IntegrationSection = (): JSX.Element => {
  return (
    <section className="w-full flex items-center justify-center py-12">
      <h2 className="max-w-[803px] [font-family:'Nunito_Sans',Helvetica] font-bold text-[31px] text-center tracking-[0.62px] leading-[47.0px] translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:200ms]">
        <span className="text-black tracking-[0.19px]">
          Наш виджет используют
        </span>
        <span className="text-[#046ef1] tracking-[0.19px]">
          {" "}
          крупные бренды
        </span>
      </h2>
    </section>
  );
};
