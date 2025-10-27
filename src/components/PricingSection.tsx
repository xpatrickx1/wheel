import React, { useState } from "react";
import { motion } from "framer-motion";
import { Pricing } from '../components/Pricing';

export function PricingSection(theme: string) {
  return (
    <section className=" flex flex-col items-center py-16 px-4 pt-[6rem]">
      <h2 className="text-3xl text-black font-bold mb-3">Цены</h2>
      <Pricing theme="dark" />
    </section>
  );
}
