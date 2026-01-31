// src/components/HowItWorks.tsx
import React from "react";
import { useTranslation, Trans } from 'react-i18next';
import brand1 from "../assets/img/brand1.png"; 
import brand2 from "../assets/img/brand2.png"; 
import brand3 from "../assets/img/brand3.png"; 
import brand4 from "../assets/img/brand4.png"; 
import brand5 from "../assets/img/brand5.png"; 
import brand6 from "../assets/img/brand6.png"; 
import brand7 from "../assets/img/brand7.png"; 
import brand8 from "../assets/img/brand8.png"; 
import brand9 from "../assets/img/brand9.png"; 

const BrandsImages = [brand1, brand2, brand3, brand4, brand5, brand6, brand7, brand8, brand9];

export function Brands() {
  
    const { t } = useTranslation();
  
    return (
      <section className="py-18">
        <div className="max-w-[1582px] mx-auto px-4">
          <h2 className="text-center text-2xl md:text-3xl font-semibold mb-15">
            <Trans
              i18nKey="brandsTitle"
              components={{
                highlight1: <span className="text-[#046EF1]" />,
              }}
            />
          </h2>
  
          <div className="flex flex-wrap gap-x-26 gap-y-14 items-center justify-around">
            {BrandsImages.map((step, index) => (
              <div
                key={index}
                className=""
              >
                  <img 
                    src={BrandsImages[index]}
                    alt={`${index + 1}`}
                    className=""
                  />
              </div>
            ))}
  
          </div>
        </div>
      </section>
    );
  }
  