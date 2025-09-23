import React from 'react';
import { footerLinks } from '../data/footer';

export function Footer() {
  return (
    <div className="box-border text-center mt-[100px]">
      {footerLinks.map((link) => (
        <React.Fragment key={link.id}>
          <a href={link.href} className="text-sm box-border leading-[21px] opacity-50 mx-2.5">{link.text}</a>
          {link.addBreak && <br className="box-border" />}
        </React.Fragment>
      ))}
      <div className="text-sm box-border leading-[21px] opacity-50 mt-5 mb-[60px]">
        ИП Горенинов Алексей Константинович
        <br className="box-border" />
        ОГРНИП 315784700085618
        <br className="box-border" />
        ИНН 783901747925
      </div>
    </div>
  );
}
