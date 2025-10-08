import { useTranslation } from 'react-i18next';

export interface NavigationLink {
  readonly id: string;
  readonly text: string;
  readonly href: string;
}

export function useGuestLinks(): NavigationLink[] {
  const { t } = useTranslation();

  return [
    { id: 'signin', text: t('nav.signin'), href: 'sign-in' },
    { id: 'signup', text: t('nav.signup'), href: 'sign-up' },
  ];
}

export function useUserLinks(): NavigationLink[] {
  const { t } = useTranslation();

  return [
    { id: 'dashboard', text: t('nav.dashboard'), href: 'dashboard' },
    { id: 'pay', text: t('nav.pay'), href: 'pay' },
    { id: 'partner', text: t('nav.partner'), href: 'partner' },
    { id: 'logout', text: t('nav.logout'), href: 'logout' },
  ];
}