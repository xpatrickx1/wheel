import React from 'react';
import { useTranslation, Trans } from 'react-i18next';
import vid from "../assets/vid.mp4";

export function VideoSection() {
  const { t } = useTranslation();
  return (
    <div className=" box-border flex flex-wrap max-w-none w-full mx-auto px-[15px] md:max-w-[1140px]">
      <div className="relative box-border basis-0 grow max-w-full min-h-px w-full px-[15px]">
        <div className="relative  box-border max-w-[790px] mx-auto">
          <video className="box-border relative z-10 max-w-[800px] w-full overflow-hidden my-20 rounded-[17px]" autoPlay loop muted width="100%">
            <source src={vid} type="video/mp4" />
          </video>
          <div className="absolute inset-0 z-0 -top-[24px] left-[24px] bottom-[66px] -right-[24px] rounded-2xl pointer-events-none
            [border:1px_solid_transparent]
            [background:linear-gradient(112.2deg,#005EFF_22.2%,#0C91D3_105.31%)_border-box]
            [mask:linear-gradient(#fff_0_0)_padding-box,linear-gradient(#fff_0_0)]
            [mask-composite:exclude] before:absolute before:inset-0 before:rounded-2xl before:p-[1px] before:bg-white before:-z-10
          "></div>
        </div>
        <h3 className="text-[27px]  font-bold box-border leading-12 max-w-[800px] text-center mb-[100px] mx-auto">
          <Trans
            i18nKey="videoSection"
            components={{
              highlight1: <span className="bg-indigo-600 bg-[linear-gradient(112.2deg,_#005EFF_22.2%,_#0C91D3_105.31%)] box-border text-nowrap text-white mx-[5px] px-2.5 py-[7px] rounded-[12px]" />,
            }}
          />
        </h3>
      </div>

    </div>
  );
}
