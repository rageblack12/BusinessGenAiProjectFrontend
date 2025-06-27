
export const Posts = [
  {
    id: 1,
    title: 'New Product Launch!',
    description: 'We are excited to announce our latest product with amazing features.',
    image: 'https://via.placeholder.com/600x300/4CAF50/white?text=New+Product',
    likes: 15,
    comments: [
      {
        id: 1,
        userId: 2,
        userName: 'John Doe',
        text: 'This looks amazing! Can\'t wait to try it.',
        timestamp: new Date(Date.now() - 86400000)
      }
    ],
    createdAt: new Date(Date.now() - 172800000)
  },
  {
    id: 2,
    title: 'Summer Sale - 50% Off',
    description: 'Limited time offer on all our premium products. Don\'t miss out!',
    image: 'https://via.placeholder.com/600x300/FF9800/white?text=Summer+Sale',
    likes: 23,
    comments: [],
    createdAt: new Date(Date.now() - 86400000)
  }
];

export const Complaints = [
  {
    id: 1,
    userId: 2,
    userName: 'John Doe',
    orderId: 'ORD-12345',
    productType: 'Electronics',
    description: 'The product arrived damaged and is not functioning properly.',
    severity: 'High',
    status: 'Open',
    adminReply: null,
    createdAt: new Date(Date.now() - 86400000)
  },
  {
    id: 2,
    userId: 3,
    userName: 'Jane Smith',
    orderId: 'ORD-12346',
    productType: 'Clothing',
    description: 'Wrong size delivered, need exchange.',
    severity: 'Moderate',
    status: 'Resolved',
    adminReply: 'We apologize for the inconvenience. Please contact our support team for an exchange.',
    createdAt: new Date(Date.now() - 172800000)
  }
];

export const productTypes = [
  'Electronics',
  'Clothing',
  'Home & Garden',
  'Books',
  'Sports',
  'Beauty',
  'Automotive',
  'Others'
];