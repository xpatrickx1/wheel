export interface NavigationLink {
  readonly id: string;
  readonly text: string;
  readonly href: string;
}

export const guestLinks: NavigationLink[] = [
  { id: "signin", text: "Войти", href: "sign-in" },
  { id: "signup", text: "Регистрация", href: "sign-up" },
] as const;

export const userLinks: NavigationLink[] = [
  { id: "dashboard", text: "Віджети", href: "dashboard" },
  { id: "payments", text: "Оплата", href: "payments" },
  { id: "partners", text: "Партнерство", href: "partners" },
  { id: "logout", text: "Вийти", href: "logout" },
] as const;
