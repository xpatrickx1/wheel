export interface PricingPlan {
    readonly id: string;
    readonly price: string;
    readonly strikePrice?: string;
    readonly name: string;
    readonly features: string[];
  }
  
  export const pricingPlans: PricingPlan[] = [
    {
      id: 'test-drive',
      price: '0',
      name: 'тест-драйв',
      features: ['10 заявок', '1 виджет']
    },
    {
      id: 'standard',
      price: '',
      strikePrice: '390',
      name: 'стандарт',
      features: ['100 заявок/мес.', '1 виджет']
    },
    {
      id: 'expert',
      price: '',
      strikePrice: '790',
      name: 'эксперт',
      features: ['∞ заявок', '∞ виджетов']
    }
  ] as const;
  