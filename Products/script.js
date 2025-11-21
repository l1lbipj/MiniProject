// Data model: categories -> subcategories -> products
const CATALOG = {
  clothing: {
    name: 'Clothing',
    subs: {
      sweatshirts: { name: 'Sweatshirts' },
      polos: { name: 'Polo Shirts' },
      jackets: { name: 'Jackets & Coats' },
      tracksuits: { name: 'Tracksuits' },
      knitwear: { name: 'Knitwear' },
      tshirts: { name: 'T-Shirts' },
      trousers: { name: 'Trousers & Shorts' },
      shirts: { name: 'Shirts' },
      swimwear: { name: 'Swimwear' },
      sportclothing: { name: 'Sport Clothing' },
      underwear: { name: 'Underwear & Lounge wear' }
    }
  },
  shoes: {
    name: 'Shoes',
    subs: {
      sneakers: { name: 'Sneakers' },
      outdoor: { name: 'Outdoor' },
      performance: { name: 'Performance' },
      sockshoes: { name: 'Socks' }
    }
  },
  accessories: {
    name: 'Accessories',
    subs: {
      caps: { name: 'Caps & Hats' },
      beanies: { name: 'Beanies' },
      belts: { name: 'Belts' },
      watches: { name: 'Watches' },
      home: { name: 'Home' },
      sunglasses: { name: 'Sunglasses' },
      fragrance: { name: 'Fragrance' },
      iphonecases: { name: 'iPhone Cases' },
      socks: { name: 'Socks' }
    }
  }
};

// seed sample products
const PRODUCTS = [];

// Color palette for product variants
const COLOR_PALETTE = ['black','white','green'];
function pickColors(idx){
  const count = 2; // 2 colors per product
  const start = idx % (COLOR_PALETTE.length - count + 1);
  return COLOR_PALETTE.slice(start, start+count);
}

// Price rules per subcategory for realistic Lacoste VN pricing
const PRICE_RULES = {
  polos: [1450000, 3500000],
  tshirts: [450000, 1500000],
  sweatshirts: [1200000, 2800000],
  knitwear: [1500000, 4000000],
  jackets: [2000000, 6000000],
  tracksuits: [1200000, 3000000],
  trousers: [800000, 2500000],
  shirts: [900000, 2500000],
  swimwear: [600000, 1800000],
  sportclothing: [600000, 2200000],
  underwear: [250000, 900000],
  sneakers: [1800000, 4000000],
  outdoor: [1800000, 4200000],
  performance: [1800000, 4200000],
  sockshoes: [120000, 400000],
  caps: [450000, 1200000],
  beanies: [450000, 1200000],
  belts: [800000, 2200000],
  watches: [2000000, 8000000],
  home: [300000, 1500000],
  sunglasses: [1500000, 3800000],
  fragrance: [1200000, 2800000],
  iphonecases: [400000, 1200000],
  socks: [120000, 400000]
};
function priceFor(sub){
  const [min, max] = PRICE_RULES[sub] || [150000, 2500000];
  const step = 10000; // round to 10k
  const raw = Math.floor((Math.random()*(max-min)+min)/step)*step;
  return raw;
}

// =====================================================
// PRODUCT IMAGES
// Để thêm ảnh của bạn: thay URL bằng đường dẫn ảnh của bạn
// Ví dụ: '../images/polo1.jpg' hoặc 'https://example.com/image.jpg'
// =====================================================
const lacosteImages = {
  sweatshirts: [
    '../images/High Neck Sweatshirt.avif',
    '../images/High Neck Sweatshirt.avif'
  ],
  polos: [
    'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?auto=format&fit=crop&w=600&q=80'
  ],
  tracksuits: [
    'https://images.unsplash.com/photo-1519904981063-b0cf448d479e?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1519904981063-b0cf448d479e?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1519904981063-b0cf448d479e?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1519904981063-b0cf448d479e?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1519904981063-b0cf448d479e?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1519904981063-b0cf448d479e?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1519904981063-b0cf448d479e?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1519904981063-b0cf448d479e?auto=format&fit=crop&w=600&q=80'
  ],
  knitwear: [
    'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=600&q=80'
  ],
  tshirts: [
    'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1503217267063-09c0ea89f9fa?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1505330622279-bf7d7fc0001f?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1516859031f2-96e35df759e7?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1519167381010-695e82dd3771?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1556264355-fcd17537b4e0?auto=format&fit=crop&w=600&q=80'
  ],
  trousers: [
    'https://images.unsplash.com/photo-1542272604-787c62d465d1?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1473621038790-b3ece06edee9?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1542272604-787c62d465d1?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1473621038790-b3ece06edee9?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1542272604-787c62d465d1?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1473621038790-b3ece06edee9?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1542272604-787c62d465d1?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1473621038790-b3ece06edee9?auto=format&fit=crop&w=600&q=80'
  ],
  shirts: [
    'https://images.unsplash.com/photo-1551028719-00167b16ebc5?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1551804318-51b4d6ce66c0?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1580703675133-6efe06c9bab2?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1551028719-00167b16ebc5?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1554568611-207d0ac6dad7?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1578152080444-bcc066f7eca1?auto=format&fit=crop&w=600&q=80'
  ],
  swimwear: [
    'https://images.unsplash.com/photo-1551028719-00167b16ebc5?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1551028719-00167b16ebc5?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1551028719-00167b16ebc5?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1551028719-00167b16ebc5?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1551028719-00167b16ebc5?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1551028719-00167b16ebc5?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1551028719-00167b16ebc5?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1551028719-00167b16ebc5?auto=format&fit=crop&w=600&q=80'
  ],
  sportclothing: [
    'https://images.unsplash.com/photo-1519904981063-b0cf448d479e?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1519904981063-b0cf448d479e?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1519904981063-b0cf448d479e?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1519904981063-b0cf448d479e?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1519904981063-b0cf448d479e?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1519904981063-b0cf448d479e?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1519904981063-b0cf448d479e?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1519904981063-b0cf448d479e?auto=format&fit=crop&w=600&q=80'
  ],
  underwear: [
    'https://images.unsplash.com/photo-1503217267063-09c0ea89f9fa?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1503217267063-09c0ea89f9fa?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1503217267063-09c0ea89f9fa?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1503217267063-09c0ea89f9fa?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1503217267063-09c0ea89f9fa?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1503217267063-09c0ea89f9fa?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1503217267063-09c0ea89f9fa?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1503217267063-09c0ea89f9fa?auto=format&fit=crop&w=600&q=80'
  ],
  sneakers: [
    'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80'
  ],
  outdoor: [
    'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80'
  ],
  performance: [
    'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80'
  ],
  sockshoes: [
    'https://images.unsplash.com/photo-1528148343865-2218efb3211f?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1528148343865-2218efb3211f?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1528148343865-2218efb3211f?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1528148343865-2218efb3211f?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1528148343865-2218efb3211f?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1528148343865-2218efb3211f?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1528148343865-2218efb3211f?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1528148343865-2218efb3211f?auto=format&fit=crop&w=600&q=80'
  ],
  caps: [
    'https://images.unsplash.com/photo-1541185933-ef5342bc8e7f?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1541185933-ef5342bc8e7f?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1541185933-ef5342bc8e7f?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1541185933-ef5342bc8e7f?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1541185933-ef5342bc8e7f?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1541185933-ef5342bc8e7f?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1541185933-ef5342bc8e7f?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1541185933-ef5342bc8e7f?auto=format&fit=crop&w=600&q=80'
  ],
  beanies: [
    'https://images.unsplash.com/photo-1541185933-ef5342bc8e7f?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1541185933-ef5342bc8e7f?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1541185933-ef5342bc8e7f?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1541185933-ef5342bc8e7f?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1541185933-ef5342bc8e7f?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1541185933-ef5342bc8e7f?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1541185933-ef5342bc8e7f?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1541185933-ef5342bc8e7f?auto=format&fit=crop&w=600&q=80'
  ],
  belts: [
    'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=600&q=80'
  ],
  watches: [
    'https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=600&q=80'
  ],
  home: [
    'https://images.unsplash.com/photo-1505330622279-bf7d7fc0001f?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1505330622279-bf7d7fc0001f?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1505330622279-bf7d7fc0001f?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1505330622279-bf7d7fc0001f?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1505330622279-bf7d7fc0001f?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1505330622279-bf7d7fc0001f?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1505330622279-bf7d7fc0001f?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1505330622279-bf7d7fc0001f?auto=format&fit=crop&w=600&q=80'
  ],
  sunglasses: [
    'https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=600&q=80'
  ],
  fragrance: [
    'https://images.unsplash.com/photo-1516859031f2-96e35df759e7?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1516859031f2-96e35df759e7?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1516859031f2-96e35df759e7?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1516859031f2-96e35df759e7?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1516859031f2-96e35df759e7?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1516859031f2-96e35df759e7?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1516859031f2-96e35df759e7?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1516859031f2-96e35df759e7?auto=format&fit=crop&w=600&q=80'
  ],
  iphonecases: [
    'https://images.unsplash.com/photo-1519167381010-695e82dd3771?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1519167381010-695e82dd3771?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1519167381010-695e82dd3771?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1519167381010-695e82dd3771?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1519167381010-695e82dd3771?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1519167381010-695e82dd3771?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1519167381010-695e82dd3771?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1519167381010-695e82dd3771?auto=format&fit=crop&w=600&q=80'
  ],
  socks: [
    'https://images.unsplash.com/photo-1528148343865-2218efb3211f?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1528148343865-2218efb3211f?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1528148343865-2218efb3211f?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1528148343865-2218efb3211f?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1528148343865-2218efb3211f?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1528148343865-2218efb3211f?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1528148343865-2218efb3211f?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1528148343865-2218efb3211f?auto=format&fit=crop&w=600&q=80'
  ],
  jackets: [
    'https://images.unsplash.com/photo-1551028719-00167b16ebc5?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1539533057592-4d2b7472e0f9?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1551028719-00167b16ebc5?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1539533057592-4d2b7472e0f9?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1551028719-00167b16ebc5?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1539533057592-4d2b7472e0f9?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=600&q=80'
  ]
};

const img = (cat, sub, idx) => {
  const images = lacosteImages[sub] || [];
  return images[(idx - 1) % images.length] || 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80';
};

function pushProd(cat, sub, idx, title){
  const collections = ['sport','classic','lifestyle','live','golf','tennis'];
  const genders = ['men','women','unisex'];
  const gender = genders[idx % genders.length];
  
  // Replace Men's with Women's for women products
  let finalTitle = title;
  if(gender === 'women' && title.includes('Men\'s')){
    finalTitle = title.replace('Men\'s', 'Women\'s');
  }
  
  PRODUCTS.push({
    id: `${cat}-${sub}-${idx}`,
    category: cat,
    sub,
    title: finalTitle,
    price: priceFor(sub),
    image: img(cat, sub, idx),
    colors: pickColors(idx),
    collection: collections[idx % collections.length],
    gender: gender
  });
}

// Real Lacoste product names (2 per category to match product count)
const PRODUCT_NAMES = {
  sweatshirts: [
    'Men\'s LACOSTE SPORT Hooded Fleece Sweatshirt',
    'Men\'s Zippered Stand-Up Collar Sweatshirt'
  ],
  polos: [
    'Men\'s Classic L.12.12 Polo',
    'Men\'s L.12.12 Lacoste Polo'
  ],
  jackets: [
    'Men\'s Quilted Water-Resistant Puffer Jacket',
    'Men\'s Windbreaker Zip Jacket',
    'Men\'s Reversible Wool Blend Jacket',
    'Men\'s Water-Resistant Bomber Jacket',
    'Men\'s Classic Blazer',
    'Men\'s Hooded Raincoat',
    'Men\'s Leather Bomber Jacket',
  ],
  jackets: [
    'Men\'s Quilted Water-Resistant Puffer Jacket',
    'Men\'s Windbreaker Zip Jacket'
  ],
  tracksuits: [
    'Men\'s SPORT Tennis Tracksuit',
    'Men\'s Colorblock Zip Tracksuit'
  ],
  knitwear: [
    'Men\'s Crew Neck Merino Wool Sweater',
    'Men\'s V-Neck Cotton Sweater'
  ],
  tshirts: [
    'Men\'s Crew Neck Pima Cotton T-shirt',
    'Men\'s V-Neck Cotton Jersey T-shirt'
  ],
  trousers: [
    'Men\'s Slim Fit Stretch Chinos',
    'Men\'s Regular Fit Cotton Gabardine Pants'
  ],
  shirts: [
    'Men\'s Regular Fit Oxford Cotton Shirt',
    'Men\'s Slim Fit Poplin Shirt'
  ],
  swimwear: [
    'Men\'s Swimming Trunks',
    'Men\'s Quick-Dry Swim Shorts'
  ],
  sportclothing: [
    'Men\'s SPORT Technical Jersey T-shirt',
    'Men\'s Tennis Performance Polo'
  ],
  underwear: [
    'Men\'s Cotton Boxer Briefs 3-Pack',
    'Men\'s Stretch Cotton Trunks'
  ],
  sneakers: [
    'Men\'s Carnaby Evo Leather Sneakers',
    'Men\'s Lerond Leather Sneakers'
  ],
  outdoor: [
    'Men\'s Montbard Leather Boots',
    'Men\'s Hiking Boots'
  ],
  performance: [
    'Men\'s Court Performance Tennis Shoes',
    'Men\'s AG-LT 21 Ultra Tennis Shoes'
  ],
  sockshoes: [
    'Men\'s Cotton Socks 3-Pack',
    'Men\'s Sport Ankle Socks'
  ],
  caps: [
    'Men\'s Classic Gabardine Cap',
    'Men\'s Crocodile Cap'
  ],
  beanies: [
    'Men\'s Wool Beanie',
    'Men\'s Ribbed Knit Beanie'
  ],
  belts: [
    'Men\'s Reversible Leather Belt',
    'Men\'s Classic Leather Belt'
  ],
  watches: [
    'Men\'s Lacoste.12.12 Watch',
    'Men\'s Chronograph Watch'
  ],
  home: [
    'Cotton Bath Towel',
    'Crocodile Beach Towel'
  ],
  sunglasses: [
    'Men\'s Rectangular Sunglasses',
    'Men\'s Aviator Sunglasses'
  ],
  fragrance: [
    'L\'HOMME LACOSTE Eau de Toilette',
    'LACOSTE Pour Homme Eau de Toilette'
  ],
  iphonecases: [
    'Crocodile iPhone 15 Case',
    'Leather iPhone 14 Case'
  ],
  socks: [
    'Men\'s Cotton Sport Socks 3-Pack',
    'Men\'s No-Show Socks 5-Pack'
  ]
};

Object.entries(CATALOG).forEach(([cat, catObj])=>{
  Object.keys(catObj.subs).forEach((sub, sidx)=>{
    for(let i=1;i<=2;i++){
      const names = PRODUCT_NAMES[sub] || [];
      const title = names[i-1] || `${catObj.subs[sub].name} ${i}`;
      pushProd(cat, sub, i+sidx*10, title);
    }
  });
});

console.log('Total products created:', PRODUCTS.length);
console.log('Sample product:', PRODUCTS[0]);

const state = {
  category: null,
  sub: null,
  promo: null,
  query: '',
  sort: 'relevance'
};

// UI-applied filters
state.filters = { colors: [], collection: [], genders: [], priceRange: null };

const els = {
  breadcrumbs: document.getElementById('breadcrumbs'),
  grid: document.getElementById('productGrid'),
  search: document.getElementById('searchInput') || document.querySelector('.search-input-top'),
  sort: document.getElementById('sortSelect') || document.querySelector('.sort-select-top'),
  resultTitle: document.getElementById('resultTitle'),
  resultCount: document.getElementById('resultCount'),
  activeFilters: document.getElementById('activeFilters'),
  filtersPanel: document.getElementById('filters')
};

// keep original sort HTML so we can restore it when leaving cart view
let originalSortHTML = null;
let originalSortDisplay = null;

// mega menu helpers (used by newer main branch)
let megaNavItem = null;
function closeMegaMenu(){
  if(megaNavItem){
    megaNavItem.classList.remove('open');
  }
}

// Routing-like helpers
function setCategory(cat, sub=null){
  state.category = cat; state.sub = sub; state.promo = null; renderUI();
  const path = ['products'];
  if(cat) path.push(cat);
  if(sub) path.push(sub);
  history.replaceState({}, '', '#/'+path.join('/'));
}

function initFromHash(){
  const h = location.hash.replace(/^#\//,'');
  const parts = h.split('/');
  if(parts[0] !== 'products'){ renderUI(); return; }
  // support promo routing: #/products/promo/<key>
  const cat = parts[1] || null;
  const sub = parts[2] || null;
  if(cat === 'promo' && parts[2]){
    const key = parts[2];
    state.promo = key; state.category = null; state.sub = null; renderUI(); return;
  }
  if(cat && CATALOG[cat]){
    state.promo = null;
    if(sub && CATALOG[cat].subs[sub]) setCategory(cat, sub);
    else setCategory(cat, null);
  } else {
    // Show all products when just #/products
    state.category = null;
    state.sub = null;
    state.promo = null;
    renderUI();
  }
}

// Rendering
function renderBreadcrumbs(){
  const toTitle = (k, type) => (type==='cat'? CATALOG[k]?.name : CATALOG[state.category]?.subs[k]?.name) || '';
  const parts = [
    `<a href="#/products">Sản phẩm</a>`
  ];
  if(state.promo){
    const promoTitles = {
      newin: "New Arrivals",
      members: "Members' Exclusives",
      bestsellers: "Bestsellers",
      runway: "Fall-Winter 2025 Runway Collection"
    };
    parts.push(`<span>${promoTitles[state.promo] || state.promo}</span>`);
    els.breadcrumbs.innerHTML = parts.join('');
    return;
  }
  if(state.category){
    parts.push(`<a href="#/products/${state.category}">${toTitle(state.category,'cat')}</a>`);
  }
  if(state.sub){
    parts.push(`<span>${toTitle(state.sub,'sub')}</span>`);
  }
  els.breadcrumbs.innerHTML = parts.join('');
  els.breadcrumbs.addEventListener('click', (e)=>{
    const a = e.target.closest('a');
    if(!a) return;
    e.preventDefault();
    const href = a.getAttribute('href');
    location.hash = href;
  });
}

// Promo definitions: key -> filter function and optional title/desc
const PROMOS = {
  newin: {
    title: "HÀNG MỚI NAM",
    desc: "Tinh xảo trong từng chi tiết. Khám phá bộ sưu tập nam Lacoste mới và tạo dấu ấn phong cách của bạn.",
    filter: (list) => list.slice(0, 24)
  },
  members: {
    title: "ĐẶC QUYỀN THÀNH VIÊN CLUB LACOSTE",
    desc: "Khám phá các sản phẩm chỉ dành cho thành viên chương trình khách hàng thân thiết.",
    filter: (list) => list.filter(p => ['polo','tshirts','polos','tshirts'].some(k=>p.sub.includes('t'))).slice(0,24)
  },
  bestsellers: {
    title: "SẢN PHẨM BÁN CHẠY",
    desc: "Những thiết kế nổi bật được ưa chuộng. Gợi ý phong cách từ các sản phẩm bán chạy của Lacoste.",
    filter: (list) => list.slice().sort((a,b)=> b.price - a.price).slice(0,24)
  },
  runway: {
    title: "BỘ SƯU TẬP SÀN DIỄN THU-ĐÔNG 2025",
    desc: "Khám phá bộ sưu tập Thu-Đông 2025 của Lacoste, lấy cảm hứng từ phong cách ngoài sân đấu.",
    filter: (list) => list.filter(p => ['jackets','knitwear','swimwear','tshirts'].includes(p.sub)).slice(0,24)
  }
};

function filterAndSort(){
  let list = PRODUCTS.slice();
  // if promo is set, use promo filter first
  if(state.promo && PROMOS[state.promo]){
    list = PROMOS[state.promo].filter(PRODUCTS);
  }
  if(state.category){
    list = list.filter(p=>p.category===state.category);
  }
  if(state.sub){
    list = list.filter(p=>p.sub===state.sub);
  }
  if(state.query){
    const q = state.query.toLowerCase();
    list = list.filter(p=> p.title.toLowerCase().includes(q));
  }
  // Apply color filters
  if(state.filters.colors.length > 0){
    list = list.filter(p => state.filters.colors.some(c => p.colors.includes(c)));
  }
  // Apply collection filters
  if(state.filters.collection.length > 0){
    list = list.filter(p => state.filters.collection.includes(p.collection));
  }
  // Apply gender filters
  if(state.filters.genders.length > 0){
    list = list.filter(p => state.filters.genders.includes(p.gender));
  }
  // Apply price range filter
  if(state.filters.priceRange){
    const [min, max] = state.filters.priceRange.split('-').map(Number);
    list = list.filter(p => p.price >= min && p.price <= max);
  }
  switch(state.sort){
    case 'priceAsc': list.sort((a,b)=>a.price-b.price); break;
    case 'priceDesc': list.sort((a,b)=>b.price-a.price); break;
    case 'nameAsc': list.sort((a,b)=>a.title.localeCompare(b.title)); break;
    case 'nameDesc': list.sort((a,b)=>b.title.localeCompare(a.title)); break;
    default: break;
  }
  return list;
}

// Calculate filter counts for UI
function calculateFilterCounts(){
  let baseList = PRODUCTS.slice();
  if(state.promo && PROMOS[state.promo]){
    baseList = PROMOS[state.promo].filter(PRODUCTS);
  }
  if(state.category) baseList = baseList.filter(p=>p.category===state.category);
  if(state.sub) baseList = baseList.filter(p=>p.sub===state.sub);
  
  const counts = { colors: {}, collection: {}, genders: {} };
  baseList.forEach(p => {
    p.colors.forEach(c => counts.colors[c] = (counts.colors[c] || 0) + 1);
    counts.collection[p.collection] = (counts.collection[p.collection] || 0) + 1;
    counts.genders[p.gender] = (counts.genders[p.gender] || 0) + 1;
  });
  return counts;
}

function productCard(p){
  const visible = p.colors.slice(0,3);
  const more = p.colors.length - visible.length;
  const swatchesHtml = visible.map(c=> `<span class="swatch-mini" style="background:${colorToCss(c)}${c==='white'?';border:1px solid #ddd':''}"></span>`).join('');
  const moreHtml = more>0 ? `<span class="more">+ ${more}</span>` : '';
  return `
    <article class="card">
      <a class="thumb" href="#/products/${p.category}/${p.sub}/${p.id}" data-view="${p.id}"><img src="${p.image}" alt="${p.title}"></a>
      <div class="info-bar">
        <div class="info-left">
          <a class="title" href="#/products/${p.category}/${p.sub}/${p.id}" data-view="${p.id}">${p.title}</a>
          <div class="swatch-row">
            ${swatchesHtml}
            ${moreHtml}
          </div>
        </div>
        <div class="info-right">
          <div class="price">${currency(p.price)}</div>
        </div>
      </div>
      <button class="btn-view-details" data-view="${p.id}">Xem chi tiết</button>
    </article>
  `;
}

function colorToCss(key){
  switch(key){
    case 'black': return '#111';
    case 'grey': return '#7d8180';
    case 'white': return '#fff';
    case 'brown': return '#6b4f3b';
    case 'beige': return '#d6c7b8';
    case 'green': return 'var(--lacoste-green)';
    case 'blue': return '#2b6fb3';
    case 'pink': return '#d66fa6';
    case 'red': return '#c41e3a';
    case 'navy': return '#001f3f';
    case 'yellow': return '#ffd700';
    case 'orange': return '#ff8c00';
    default: return '#ccc';
  }
}

const COLOR_LABELS = {
  black: 'Đen',
  grey: 'Xám',
  white: 'Trắng',
  brown: 'Nâu',
  beige: 'Be',
  green: 'Xanh lá',
  blue: 'Xanh dương',
  pink: 'Hồng',
  red: 'Đỏ',
  navy: 'Xanh navy',
  yellow: 'Vàng',
  orange: 'Cam'
};

function getColorLabel(key){
  return COLOR_LABELS[key] || key;
}

function formatPriceRange(range){
  if(!range) return '';
  const [min, max] = range.split('-').map(Number);
  if(!Number.isFinite(min)) return '';
  if(!Number.isFinite(max) || max >= 999999999){
    return `${currency(min)}+`;
  }
  return `${currency(min)} - ${currency(max)}`;
}

function renderGrid(){
  const list = filterAndSort();
  els.grid.innerHTML = list.map(productCard).join('');
  updateResultInfo(list);
  renderActiveFilters();
}

function renderHero(){
  const hero = document.getElementById('heroBanner');
  const titleEl = document.getElementById('promoTitle');
  const descEl = document.getElementById('promoDesc');
  if(!hero || !titleEl || !descEl) return;
  if(state.promo && PROMOS[state.promo]){
    const p = PROMOS[state.promo];
    hero.style.display = 'block';
    hero.setAttribute('aria-hidden','false');
    titleEl.textContent = p.title;
    descEl.textContent = p.desc || '';
  } else {
    hero.style.display = 'none';
    hero.setAttribute('aria-hidden','true');
    titleEl.textContent = '';
    descEl.textContent = '';
  }
}

function updateResultInfo(list){
  const catName = state.category ? CATALOG[state.category]?.name : 'Tất cả sản phẩm';
  const subName = state.sub ? CATALOG[state.category]?.subs[state.sub]?.name : '';
  let title = catName;
  if(subName) title += ` - ${subName}`;
  els.resultTitle.textContent = title;
  els.resultCount.textContent = `${list.length} sản phẩm`;
}

function renderActiveFilters(){
  if(!els.activeFilters) return;
  const pills = [];
  if(state.query){
    pills.push({ type: 'query', value: '', label: `Từ khóa: "${state.query}"` });
  }
  if(state.promo){
    pills.push({ type: 'promo', value: state.promo, label: PROMOS[state.promo]?.title || 'Ưu đãi' });
  }
  if(state.category){
    const label = state.sub ? CATALOG[state.category]?.subs[state.sub]?.name : CATALOG[state.category]?.name;
    if(label) pills.push({ type: 'category', value: 'category', label });
  }
  if(state.filters.priceRange){
    pills.push({ type: 'price', value: state.filters.priceRange, label: `Giá ${formatPriceRange(state.filters.priceRange)}` });
  }
  state.filters.colors.forEach(color=>{
    pills.push({ type: 'color', value: color, label: `Màu ${getColorLabel(color)}` });
  });
  state.filters.collection.forEach(col=>{
    const nice = col.charAt(0).toUpperCase() + col.slice(1);
    pills.push({ type: 'collection', value: col, label: `BST ${nice}` });
  });
  state.filters.genders.forEach(gen=>{
    const name = gen === 'men' ? 'Nam' : gen === 'women' ? 'Nữ' : 'Unisex';
    pills.push({ type: 'gender', value: gen, label: `Giới tính: ${name}` });
  });

  if(!pills.length){
    els.activeFilters.innerHTML = '<span class="pill-empty">Bạn chưa áp dụng bộ lọc nào.</span>';
    return;
  }

  els.activeFilters.innerHTML = pills.map(pill => `
    <button class="filter-pill" data-pill-type="${pill.type}" data-pill-value="${pill.value}">
      <span>${pill.label}</span>
      <span aria-hidden="true">×</span>
    </button>
  `).join('');
}

function updateQuickFiltersState(){
  const chips = document.querySelectorAll('[data-chip]');
  chips.forEach(chip=>{
    const { promo, category, sub, reset } = chip.dataset;
    let isActive = false;
    if(reset === 'all' && !state.category && !state.sub && !state.promo){
      isActive = true;
    } else if(promo && state.promo === promo){
      isActive = true;
    } else if(category && state.category === category && (state.sub || null) === (sub || null)){
      isActive = true;
    }
    chip.classList.toggle('is-active', isActive);
  });
}

function syncSortUI(){
  if(els.sort){
    els.sort.value = state.sort;
  }
  document.querySelectorAll('.filter-option[data-sort]').forEach(opt=>{
    opt.classList.toggle('active', opt.getAttribute('data-sort') === state.sort);
  });
}

function setSort(value){
  if(!value) return;
  state.sort = value;
  syncSortUI();
  renderGrid();
}

function renderUI(){
  renderBreadcrumbs();
  renderGrid();
  renderHero();
  updateQuickFiltersState();
  syncSortUI();
}

function removeFilterPill(type, value){
  switch(type){
    case 'query':
      state.query = '';
      if(els.search) els.search.value = '';
      break;
    case 'promo':
      state.promo = null;
      history.replaceState({}, '', '#/products');
      break;
    case 'category':
      state.category = null;
      state.sub = null;
      history.replaceState({}, '', '#/products');
      break;
    case 'price':
      state.filters.priceRange = null;
      document.querySelectorAll('.filter-option[data-price]').forEach(opt => opt.classList.remove('active'));
      break;
    case 'color':
      state.filters.colors = state.filters.colors.filter(c => c !== value);
      document.querySelector(`.swatch[data-color="${value}"]`)?.classList.remove('active');
      break;
    case 'collection':
      state.filters.collection = state.filters.collection.filter(c => c !== value);
      document.querySelector(`.filter-option[data-collection="${value}"]`)?.classList.remove('active');
      break;
    case 'gender':
      state.filters.genders = state.filters.genders.filter(g => g !== value);
      document.querySelector(`.filter-option[data-gender="${value}"]`)?.classList.remove('active');
      break;
    default:
      break;
  }
  renderUI();
}

function clearAllFilters(){
  state.filters = { colors: [], collection: [], genders: [], priceRange: null };
  state.sort = 'relevance';
  state.query = '';
  if(els.search) els.search.value = '';
  document.querySelectorAll('.swatch.active, .filter-option.active').forEach(el => el.classList.remove('active'));
  renderUI();
  toast('✓ Đã xóa bộ lọc');
}

function bindQuickFilters(){
  const chips = document.querySelectorAll('[data-chip]');
  chips.forEach(chip=>{
    chip.addEventListener('click', ()=>{
      const { promo, category, sub, reset } = chip.dataset;
      if(reset === 'all'){
        state.promo = null;
        state.category = null;
        state.sub = null;
        history.replaceState({}, '', '#/products');
        renderUI();
        return;
      }
      if(promo){
        state.promo = promo;
        state.category = null;
        state.sub = null;
        history.replaceState({}, '', '#/products/promo/' + promo);
        renderUI();
        return;
      }
      if(category){
        setCategory(category, sub || null);
      }
    });
  });
}

function bindFilterPills(){
  if(!els.activeFilters) return;
  els.activeFilters.addEventListener('click', (e)=>{
    const pill = e.target.closest('.filter-pill');
    if(!pill) return;
    removeFilterPill(pill.dataset.pillType, pill.dataset.pillValue || '');
  });
}

function bindFilterToggle(){
  const toggleBtn = document.querySelector('[data-toggle-filters]');
  if(!toggleBtn || !els.filtersPanel) return;
  toggleBtn.addEventListener('click', ()=>{
    els.filtersPanel.classList.toggle('is-hidden');
    toggleBtn.textContent = els.filtersPanel.classList.contains('is-hidden') ? 'Hiện bộ lọc' : 'Ẩn bộ lọc';
  });
}

// Mega-menu click routing
function bindMegaMenu(){
  megaNavItem = document.querySelector('.nav-item.has-mega');
  if(!megaNavItem) return;
  const navLink = megaNavItem.querySelector('.nav-link-products');
  const isDesktop = () => window.matchMedia('(min-width: 1025px)').matches;

  if(navLink){
    navLink.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      if(!isDesktop()) { 
        // On mobile, navigate to products page
        location.hash = '#/products';
        closeMegaMenu();
        return;
      }
      // On desktop, check if mega menu is already open
      if(megaNavItem.classList.contains('open')){
        // If open, navigate to all products
        location.hash = '#/products';
        closeMegaMenu();
      } else {
        // If closed, open the mega menu
        megaNavItem.classList.add('open');
      }
    });
  }

  document.addEventListener('click', (e) => {
    if(!megaNavItem) return;
    if(megaNavItem.contains(e.target)) return;
    closeMegaMenu();
  }, true);

  const attachExploreLinks = () => {
    // attach to both main explore links and promo links
    megaNavItem.querySelectorAll('.mega-main a, .mega-promo a').forEach(a=>{
      a.addEventListener('click', (e)=>{
        e.preventDefault();
        e.stopPropagation();
        const promo = a.getAttribute('data-promo');
        if(promo){
          location.hash = '#/products/promo/' + promo;
        } else {
          const href = a.getAttribute('href') || '#/products';
          location.hash = href;
        }
        closeMegaMenu();
      });
    });
  };

  const attachSubLinks = () => {
    megaNavItem.querySelectorAll('.mega-menu a[data-category]').forEach(a=>{
      a.addEventListener('click', (e)=>{
        e.preventDefault();
        e.stopPropagation();
        const cat = a.getAttribute('data-category');
        const sub = a.getAttribute('data-sub');
        const href = '#/products/' + cat + (sub ? '/' + sub : '');
        location.hash = href;
        closeMegaMenu();
      });
    });
  };

  attachExploreLinks();
  attachSubLinks();

  window.addEventListener('scroll', closeMegaMenu);
  window.addEventListener('hashchange', closeMegaMenu);
  window.addEventListener('resize', () => {
    if(!isDesktop()) closeMegaMenu();
  });
}

function bindControls(){
  if(els.search){
    els.search.addEventListener('input', ()=>{
      state.query = els.search.value.trim();
      renderGrid();
    });
  }

  const clearButtons = document.querySelectorAll('[data-clear-filters]');
  clearButtons.forEach(btn=>{
    btn.addEventListener('click', clearAllFilters);
  });

  if(els.sort){
    els.sort.addEventListener('change', (e)=> setSort(e.target.value));
  }

  document.querySelectorAll('.filter-option[data-sort]').forEach(el=>{
    el.addEventListener('click', ()=>{
      const sortValue = el.getAttribute('data-sort');
      setSort(sortValue);
    });
  });

  // Price range filter
  document.querySelectorAll('.filter-option[data-price]').forEach(el=>{
    el.addEventListener('click', ()=>{
      const priceRange = el.getAttribute('data-price');
      if(state.filters.priceRange === priceRange){
        state.filters.priceRange = null;
        el.classList.remove('active');
      } else {
        document.querySelectorAll('.filter-option[data-price]').forEach(opt => opt.classList.remove('active'));
        state.filters.priceRange = priceRange;
        el.classList.add('active');
      }
      renderGrid();
    });
  });

  // filter sidebar interactions
  document.querySelectorAll('.swatch[data-color]').forEach(el=>{
    el.addEventListener('click', ()=>{
      const color = el.getAttribute('data-color');
      const idx = state.filters.colors.indexOf(color);
      if(idx===-1) state.filters.colors.push(color);
      else state.filters.colors.splice(idx,1);
      el.classList.toggle('active');
      renderGrid();
    });
  });
  document.querySelectorAll('.filter-option[data-collection]').forEach(el=>{
    el.addEventListener('click', ()=>{
      const col = el.getAttribute('data-collection');
      if(state.filters.collection.includes(col)){
        state.filters.collection = state.filters.collection.filter(c=>c!==col);
        el.classList.remove('active');
      } else {
        state.filters.collection.push(col);
        el.classList.add('active');
      }
      renderGrid();
    });
  });
  document.querySelectorAll('.filter-option[data-gender]').forEach(el=>{
    el.addEventListener('click', ()=>{
      const gender = el.getAttribute('data-gender');
      if(state.filters.genders.includes(gender)){
        state.filters.genders = state.filters.genders.filter(g=>g!==gender);
        el.classList.remove('active');
      } else {
        state.filters.genders.push(gender);
        el.classList.add('active');
      }
      renderGrid();
    });
  });

  els.grid.addEventListener('click', (e)=>{
    const add = e.target.closest('[data-add]');
    const view = e.target.closest('[data-view]');
    if(add){
      const id = add.getAttribute('data-add');
      addToCart(id);
    } else if(view){
      e.preventDefault();
      const id = view.getAttribute('data-view');
      openProductModal(id);
    }
  });

  window.addEventListener('hashchange', initFromHash);
}

function initMobileMenu(){
  const mobileMenu = document.getElementById('mobile-menu');
  const navMenu = document.querySelector('.nav-menu');
  if(!mobileMenu || !navMenu) return;
  const originalOverflow = document.body.style.overflow;

  const closeMenu = () => {
    navMenu.classList.remove('active');
    mobileMenu.classList.remove('active');
    document.body.style.overflow = originalOverflow || '';
    closeMegaMenu();
  };

  mobileMenu.addEventListener('click', (e)=>{
    e.stopPropagation();
    mobileMenu.classList.toggle('active');
    navMenu.classList.toggle('active');
    if(navMenu.classList.contains('active')){
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = originalOverflow || '';
    }
  });

  navMenu.querySelectorAll('.nav-link').forEach(link=>{
    link.addEventListener('click', closeMenu);
  });

  document.addEventListener('click', (e)=>{
    if(!navMenu.classList.contains('active')) return;
    if(mobileMenu.contains(e.target) || navMenu.contains(e.target)) return;
    closeMenu();
  });
}

// Cart with localStorage
const CART_KEY = 'mp_cart_v1';
function getCart(){
  try{ return JSON.parse(localStorage.getItem(CART_KEY)) || []; }catch{ return []; }
}
function setCart(c){ localStorage.setItem(CART_KEY, JSON.stringify(c)); updateCartCount(); }
function addToCart(id){
  const cart = getCart();
  const item = cart.find(i=>i.id===id);
  if(item) item.qty += 1; else cart.push({ id, qty:1 });
  setCart(cart);
  toast('✓ Đã thêm vào giỏ');
}
function updateCartCount(){
  const countEl = document.getElementById('cartCount');
  if(!countEl) {
    console.warn('Cart count element not found');
    return;
  }
  const total = getCart().reduce((s,i)=>s+i.qty,0);
  countEl.textContent = String(total);
  countEl.style.display = total > 0 ? 'inline-block' : 'inline-block';
}

// Minimal toast
let toastTimer;
function toast(msg){
  let t = document.getElementById('toast');
  if(!t){
    t = document.createElement('div');
    t.id='toast';
    document.body.appendChild(t);
  }
  t.textContent = msg;
  t.style.opacity = '1';
  clearTimeout(toastTimer);
  toastTimer = setTimeout(()=>{ t.style.opacity='0'; }, 2000);
}

// Product detail modal logic
function findProductById(id){ return PRODUCTS.find(p=>p.id===id); }
function openProductModal(id){
  const p = findProductById(id); if(!p) return;
  const modal = document.getElementById('productModal');
  document.getElementById('modalImage').src = p.image;
  document.getElementById('modalImage').alt = p.title;
  document.getElementById('modalTitle').textContent = p.title;
  document.getElementById('modalPrice').textContent = currency(p.price);
  document.getElementById('modalDesc').textContent = `Sản phẩm chính hãng thuộc danh mục ${CATALOG[p.category].name} - ${CATALOG[p.category].subs[p.sub].name}. Chất liệu cao cấp, phù hợp nhiều phong cách.`;
  const addBtn = document.getElementById('modalAdd');
  addBtn.onclick = ()=> { addToCart(p.id); closeProductModal(); };
  const close = document.getElementById('modalClose');
  close.onclick = ()=> closeProductModal();
  modal.classList.add('open');
  modal.setAttribute('aria-hidden','false');
  modal.addEventListener('click', (e)=>{ if(e.target===modal) closeProductModal(); }, { once:true });
}
function closeProductModal(){
  const modal = document.getElementById('productModal');
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden','true');
}

// Simple cart view routing
function currency(n){
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND', maximumFractionDigits: 0 }).format(n);
}
function renderCart(container){
  const cart = getCart();
  const targetEl = container || els.grid;

  if(cart.length===0){ 
    targetEl.innerHTML = '<div class="cart"><div class="cart-header"><h2>🛒 Giỏ hàng</h2></div><div class="cart-empty"><p>Giỏ hàng trống</p><a href="#/products" class="btn">Tiếp tục mua sắm</a></div></div>'; 
    return; 
  }
  const rows = cart.map(ci=>{
    const p = findProductById(ci.id);
    if(!p) return '';
    const line = p.price*ci.qty;
    return `
      <div class="cart-item">
        <img class="ci-thumb" src="${p.image}" alt="${p.title}" />
        <div class="ci-info">
          <div class="ci-title">${p.title}</div>
          <div class="ci-meta">${CATALOG[p.category].name} / ${CATALOG[p.category].subs[p.sub].name}</div>
        </div>
        <div class="ci-price">${currency(p.price)}</div>
        <div class="ci-qty">
          <button class="qty-btn" data-dec="${ci.id}">−</button>
          <input class="qty-input" type="number" min="1" value="${ci.qty}" data-qty="${ci.id}" />
          <button class="qty-btn" data-inc="${ci.id}">+</button>
        </div>
        <div class="ci-line">${currency(line)}</div>
        <button class="ci-remove" aria-label="Remove" data-del="${ci.id}">✕</button>
      </div>
    `;
  }).join('');

  const subtotal = cart.reduce((s,ci)=>{ const p = findProductById(ci.id); return p? s + p.price*ci.qty : s; },0);
  const shipping = subtotal > 0 ? 30000 : 0;
  const discount = subtotal > 200000 ? subtotal*0.05 : 0;
  const total = subtotal + shipping - discount;

  targetEl.innerHTML = `
    <div class="cart">
      <div class="cart-header">
        <h2>🛒 Giỏ hàng</h2>
        <div style="display:flex;gap:8px">
          <button class="btn secondary" id="clearCart">Xóa giỏ hàng</button>
          <a href="#/products" class="btn secondary">Tiếp tục mua sắm</a>
        </div>
      </div>
      <div class="cart-content">
        <div class="cart-items">
          ${rows}
        </div>
        <aside class="cart-summary">
          <h3>💰 Tóm tắt đơn hàng</h3>
          <div class="summary-row"><span>Tạm tính</span><span>${currency(subtotal)}</span></div>
          <div class="summary-row"><span>Vận chuyển</span><span>${shipping? currency(shipping): 'Miễn phí'}</span></div>
          <div class="summary-row"><span>Giảm giá</span><span>− ${discount? currency(discount): currency(0)}</span></div>
          <div class="summary-total"><strong>💵 Tổng</strong><strong>${currency(total)}</strong></div>
          <button class="btn" id="checkoutBtn">💳 Thanh toán</button>
        </aside>
      </div>
    </div>
  `;

  // bind actions
  targetEl.querySelectorAll('[data-inc]').forEach(b=> b.addEventListener('click', ()=> changeQty(b.getAttribute('data-inc'), 1)) );
  targetEl.querySelectorAll('[data-dec]').forEach(b=> b.addEventListener('click', ()=> changeQty(b.getAttribute('data-dec'), -1)) );
  targetEl.querySelectorAll('[data-del]').forEach(b=> b.addEventListener('click', ()=> removeFromCart(b.getAttribute('data-del')) ));
  targetEl.querySelectorAll('[data-qty]').forEach(inp=> inp.addEventListener('change', ()=> setQty(inp.getAttribute('data-qty'), Number(inp.value)||1)) );
  const clear = document.getElementById('clearCart');
  if(clear) clear.addEventListener('click', ()=> { setCart([]); renderCart(container); toast('✓ Đã xóa giỏ hàng'); });
  const checkout = document.getElementById('checkoutBtn');
  if(checkout) checkout.addEventListener('click', ()=> toast('Chức năng thanh toán sẽ sớm có')); 
}

function setQty(id, qty){
  const cart = getCart();
  const item = cart.find(i=>i.id===id);
  if(!item) return;
  item.qty = Math.max(1, Math.floor(qty));
  setCart(cart);
  const cartContainer = document.getElementById('cartContainer');
  renderCart(cartContainer);
}
function changeQty(id, delta){
  const cart = getCart();
  const item = cart.find(i=>i.id===id);
  if(!item) return;
  item.qty += delta;
  if(item.qty <= 0){
    const idx = cart.findIndex(i=>i.id===id);
    if(idx>-1) cart.splice(idx,1);
  }
  setCart(cart);
  const cartContainer = document.getElementById('cartContainer');
  renderCart(cartContainer);
}
function removeFromCart(id){
  const cart = getCart().filter(i=>i.id!==id);
  setCart(cart);
  const cartContainer = document.getElementById('cartContainer');
  renderCart(cartContainer);
  toast('✓ Đã xóa sản phẩm');
}

function route(){
  const h = location.hash.replace(/^#\//,'');
  const isCart = h.startsWith('cart');
  const productsWrapper = document.querySelector('.products-wrapper');
  const main = document.querySelector('.main.container');
  
  if(isCart){
    // Hide the products wrapper (filters + grid)
    if(productsWrapper) productsWrapper.style.display = 'none';
    // Create standalone cart container if it doesn't exist
    let cartContainer = document.getElementById('cartContainer');
    if(!cartContainer){
      cartContainer = document.createElement('div');
      cartContainer.id = 'cartContainer';
      cartContainer.className = 'cart-standalone';
      main.appendChild(cartContainer);
    }
    cartContainer.style.display = 'block';
    document.body.classList.add('view-cart');
    renderCart(cartContainer);
    return;
  } else {
    // Show products wrapper again
    if(productsWrapper) productsWrapper.style.display = 'grid';
    // Hide cart container
    const cartContainer = document.getElementById('cartContainer');
    if(cartContainer) cartContainer.style.display = 'none';
    document.body.classList.remove('view-cart');
  }
  initFromHash();
}

// Init
document.addEventListener('DOMContentLoaded', ()=>{
  bindMegaMenu();
  initMobileMenu();
  bindControls();
  bindQuickFilters();
  bindFilterPills();
  bindFilterToggle();
  updateCartCount();
  route();
  window.addEventListener('hashchange', ()=>{ route(); updateCartCount(); });
});
