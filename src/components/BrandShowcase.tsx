import React from 'react';
import { brandCases } from '../data/brands';

export function BrandShowcase() {
  return (
    <div className="box-border flex flex-wrap max-w-none w-full mx-auto px-[15px] md:max-w-[1140px]">
      <div className="relative box-border basis-full shrink-0 max-w-full min-h-px w-full px-[15px]">
        <h3 className="text-2xl font-bold box-border leading-9 text-center mb-10">Наш виджет используют крупные бренды</h3>
      </div>
      {brandCases.map((row, rowIndex) => (
        <div key={rowIndex} className="relative box-border basis-full shrink-0 max-w-full min-h-px w-full px-[15px] md:basis-6/12 md:max-w-[50%]">
          {row.map((brand) => (
            <div key={brand.id} className="box-border text-center mb-[30px] px-5 py-[50px] rounded-[17px] border-2 border-solid border-white/0">
              {brand.image && (
                <img src={brand.image} className={brand.imageClass} />
              )}
              <p className="box-border opacity-70">{brand.description}</p>
              <div className="box-border"></div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
