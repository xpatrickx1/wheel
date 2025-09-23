export interface WidgetType {
    readonly id: string;
    readonly title: string;
    readonly description: string;
    readonly titleClass: string;
    readonly containerClass: string;
    readonly badge?: string;
  }
  
  export const widgetTypes: WidgetType[] = [
    {
      id: 'fortune-wheel',
      title: 'Колесо фортуны',
      description: 'Проверенная механика, которая уже принесла больше ста тысяч заявок в самых разных нишах',
      titleClass: "text-2xl font-bold bg-clip-text bg-[linear-gradient(rgb(253,160,133)_0%,rgb(246,211,101)_100%)] box-border leading-9 text-center mb-2.5",
      containerClass: "relative bg-[url('https://lp9.ru/img/v2/lp9-t-1.jpg')] bg-cover box-border h-[315px] w-full overflow-hidden bg-[position:left_50%] mx-auto rounded-[17px]"
    },
    {
      id: 'bonus-feed',
      title: 'Лента бонусов',
      description: 'Благодаря изображениям и бесконечной прокрутке отлично привлекает внимание и вовлекает в розыгрыш',
      titleClass: "text-2xl font-bold bg-clip-text bg-[linear-gradient(rgb(249,245,134)_0%,rgb(150,251,196)_100%)] box-border leading-9 text-center mt-[100px] mb-2.5 md:mt-0",
      containerClass: "relative bg-[url('https://lp9.ru/img/v2/lp9-t-2.jpg')] bg-cover box-border h-[315px] w-full overflow-hidden bg-[position:left_50%] mx-auto rounded-[17px]",
      badge: 'Скоро!'
    }
  ] as const;
  