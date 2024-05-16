interface Item {
    id: number;
    name: string;
    description: string;
    price: number;
    category: 'Clothing' | 'Accessories' | 'Electronics';
    imageUrl: string;
  }
  
  const items: Item[] = [
    {
      id: 1,
      name: 'T-Shirt',
      description: 'Classic cotton t-shirt',
      price: 19.99,
      category: 'Clothing',
      imageUrl: 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?q=80&w=1915&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    },
    {
      id: 2,
      name: 'Jeans',
      description: 'Slim fit denim jeans',
      price: 49.99,
      category: 'Clothing',
      imageUrl: 'https://images.unsplash.com/photo-1637069585336-827b298fe84a?q=80&w=1973&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    },
    {
      id: 3,
      name: 'Leather Wallet',
      description: 'Genuine leather bifold wallet',
      price: 29.99,
      category: 'Accessories',
      imageUrl: 'https://images.unsplash.com/photo-1601592996763-f05c9c80a7f1?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    },
    {
      id: 4,
      name: 'Sunglasses',
      description: 'Polarized UV protection sunglasses',
      price: 14.99,
      category: 'Accessories',
      imageUrl: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    },
    {
      id: 5,
      name: 'Laptop',
      description: 'High-performance laptop with 16GB RAM',
      price: 999.99,
      category: 'Electronics',
      imageUrl: 'https://images.unsplash.com/photo-1575024357670-2b5164f470c3?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    },
    {
      id: 6,
      name: 'Wireless Headphones',
      description: 'Noise-canceling Bluetooth headphones',
      price: 79.99,
      category: 'Electronics',
      imageUrl: 'https://images.unsplash.com/photo-1483032469466-b937c425697b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    }
  ];