export interface ItemType {
    id: number;
    name: string;
    description: string;
    price: number;
    category: 'Clothing' | 'Accessories' | 'Electronics';
    imageUrl: string;
    quantity:number
  }