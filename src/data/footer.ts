export interface FooterLink {
    readonly id: string;
    readonly text: string;
    readonly href: string;
    readonly addBreak?: boolean;
  }
  
  export const footerLinks: FooterLink[] = [
    { id: 'consent', text: 'Согласие на обработку персональных данных', href: 'rules/consent', addBreak: true },
    { id: 'policy', text: 'Политика обработки персональных данных', href: 'rules/politika', addBreak: true },
    { id: 'offer', text: 'Договор-оферта', href: 'rules/oferta' },
    { id: 'email', text: 'info@wheelee.com', href: 'mailto://info@wheelee.com' }
  ] as const;
  