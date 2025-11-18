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
const COLOR_PALETTE = ['black','white','grey','brown','beige','green','blue','pink'];
function pickColors(idx){
  const count = 2 + (idx%3); // 2-4 colors per product
  const start = idx % (COLOR_PALETTE.length - count);
  return COLOR_PALETTE.slice(start, start+count);
}

const price = () => { // generate realistic VND price
  const min = 150000, max = 2500000; // 150k - 2.5m VND
  const step = 10000; // round to 10k
  const raw = Math.floor((Math.random()*(max-min)+min)/step)*step;
  return raw;
};

// Real product images from Unsplash (clothing, shoes, accessories)
// Real product images from Unsplash (clothing, shoes, accessories)
const lacosteImages = {
  sweatshirts: [
    'https://images.unsplash.com/photo-1556821552-7f41c5d440db?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1556821552-7f41c5d440db?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1519904981063-b0cf448d479e?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1556821552-7f41c5d440db?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1519904981063-b0cf448d479e?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1556821552-7f41c5d440db?auto=format&fit=crop&w=600&q=80'
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
  const collections = ['sport','classic','lifestyle'];
  const genders = ['men','women','unisex'];
  PRODUCTS.push({
    id: `${cat}-${sub}-${idx}`,
    category: cat,
    sub,
    title,
    price: price(),
    brand: ['Lacoste'][idx%5],
    image: img(cat, sub, idx),
    colors: pickColors(idx),
    collection: collections[idx % collections.length],
    gender: genders[idx % genders.length]
  });
}

Object.entries(CATALOG).forEach(([cat, catObj])=>{
  Object.keys(catObj.subs).forEach((sub, sidx)=>{
    for(let i=1;i<=8;i++){
      const title = `${catObj.subs[sub].name} ${i}`;
      pushProd(cat, sub, i+sidx*10, title);
    }
  });
});

const state = {
  category: null,
  sub: null,
  promo: null,
  query: '',
  sort: 'relevance'
};

// UI-applied filters
state.filters = { colors: [], collection: [], genders: [] };

const els = {
  breadcrumbs: document.getElementById('breadcrumbs'),
  grid: document.getElementById('productGrid'),
  search: document.getElementById('searchInput') || document.querySelector('.search-input-top'),
  sort: document.getElementById('sortSelect') || document.querySelector('.sort-select-top'),
  resultTitle: document.getElementById('resultTitle'),
  resultCount: document.getElementById('resultCount')
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
  } else renderUI();
}

// Rendering
function renderBreadcrumbs(){
  const toTitle = (k, type) => (type==='cat'? CATALOG[k]?.name : CATALOG[state.category]?.subs[k]?.name) || '';
  const parts = [
    `<a href="#/products">Products</a>`
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
    title: "MEN'S NEW ARRIVALS",
    desc: "Expert craftsmanship. Discover the new Lacoste men's collection and make style your signature.",
    filter: (list) => list.slice(0, 24)
  },
  members: {
    title: "CLUB LACOSTE MEMBERS' EXCLUSIVES",
    desc: "Discover pieces available only to members of our loyalty programme.",
    filter: (list) => list.filter(p => ['polo','tshirts','polos','tshirts'].some(k=>p.sub.includes('t'))).slice(0,24)
  },
  bestsellers: {
    title: "MEN'S BESTSELLERS",
    desc: "Some pieces naturally stand out. Get inspired with Lacoste men's Bestsellers.",
    filter: (list) => list.slice().sort((a,b)=> b.price - a.price).slice(0,24)
  },
  runway: {
    title: "FALL-WINTER 2025 RUNWAY COLLECTION",
    desc: "Step into Lacoste Fall-Winter 2025, a refined collection inspired by off-court lifestyle.",
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
    list = list.filter(p=> p.title.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q));
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
          <div class="brand">${p.brand}</div>
          <div class="price">${currency(p.price)}</div>
        </div>
      </div>
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
    default: return '#ccc';
  }
}

function renderGrid(){
  const list = filterAndSort();
  els.grid.innerHTML = list.map(productCard).join('');
  updateResultInfo(list);
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
  const catName = state.category ? CATALOG[state.category]?.name : 'All Products';
  const subName = state.sub ? CATALOG[state.category]?.subs[state.sub]?.name : '';
  let title = catName;
  if(subName) title += ` - ${subName}`;
  els.resultTitle.textContent = title;
  els.resultCount.textContent = `${list.length} products`;
}

function renderUI(){
  renderBreadcrumbs();
  renderGrid();
  renderHero();
}

// Mega-menu click routing
function bindMegaMenu(){
  megaNavItem = document.querySelector('.nav-item.has-mega');
  if(!megaNavItem) return;
  const navLink = megaNavItem.querySelector('.nav-link-products');
  const isDesktop = () => window.matchMedia('(min-width: 1025px)').matches;

  if(navLink){
    navLink.addEventListener('click', (e) => {
      if(!isDesktop()) { closeMegaMenu(); return; }
      e.preventDefault();
      e.stopPropagation();
      megaNavItem.classList.toggle('open');
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
  if(els.search) els.search.addEventListener('input', ()=>{ state.query = els.search.value.trim(); renderGrid(); });
  if(els.sort) els.sort.addEventListener('change', ()=>{ state.sort = els.sort.value; renderGrid(); });

  // Clear all filters button
  const clearBtn = document.getElementById('clearFilters');
  if(clearBtn){
    clearBtn.addEventListener('click', ()=>{
      state.filters = { colors: [], collection: [], genders: [] };
      document.querySelectorAll('.swatch.active, .filter-option.active').forEach(el => el.classList.remove('active'));
      renderGrid();
      toast('✓ Filters cleared');
    });
  }

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
  toast('✓ Added to cart');
}
function updateCartCount(){
  const countEl = document.getElementById('cartCount');
  if(!countEl) return;
  const total = getCart().reduce((s,i)=>s+i.qty,0);
  countEl.textContent = String(total);
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
  document.getElementById('modalBrand').textContent = `Brand: ${p.brand}`;
  document.getElementById('modalPrice').textContent = currency(p.price);
  document.getElementById('modalDesc').textContent = `Premium quality product from ${CATALOG[p.category].name} - ${CATALOG[p.category].subs[p.sub].name} collection.`;
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
function renderCart(){
  const cart = getCart();
  // Update page title/breadcrumbs so previous category doesn't persist
  if (els.resultTitle) els.resultTitle.textContent = 'Shopping Cart';
  if (els.resultCount) els.resultCount.textContent = '';
  // show plain Cart label (remove clickable Products breadcrumb to avoid confusion)
  if (els.breadcrumbs) els.breadcrumbs.textContent = 'Cart';

  if(cart.length===0){ 
    els.grid.innerHTML = '<div class="cart"><div class="cart-header"><h2>🛒 Shopping Cart</h2></div><div class="cart-empty">Your cart is empty</div></div>'; 
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
          <div class="ci-meta">${p.brand} • ${CATALOG[p.category].name} / ${CATALOG[p.category].subs[p.sub].name}</div>
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

  els.grid.innerHTML = `
    <div class="cart">
      <div class="cart-header">
        <h2>🛒 Shopping Cart</h2>
        <div style="display:flex;gap:8px">
          <button class="btn secondary" id="clearCart">Clear Cart</button>
          <a href="#/products" class="btn secondary">Continue Shopping</a>
        </div>
      </div>
      <div class="cart-content">
        <div class="cart-items">
          ${rows}
        </div>
        <aside class="cart-summary">
          <h3>💰 Order Summary</h3>
          <div class="summary-row"><span>Subtotal</span><span>${currency(subtotal)}</span></div>
          <div class="summary-row"><span>Shipping</span><span>${shipping? currency(shipping): 'Free'}</span></div>
          <div class="summary-row"><span>Discount</span><span>− ${discount? currency(discount): currency(0)}</span></div>
          <div class="summary-total"><strong>💵 Total</strong><strong>${currency(total)}</strong></div>
          <button class="btn" id="checkoutBtn">💳 Checkout</button>
        </aside>
      </div>
    </div>
  `;

  // bind actions
  els.grid.querySelectorAll('[data-inc]').forEach(b=> b.addEventListener('click', ()=> changeQty(b.getAttribute('data-inc'), 1)) );
  els.grid.querySelectorAll('[data-dec]').forEach(b=> b.addEventListener('click', ()=> changeQty(b.getAttribute('data-dec'), -1)) );
  els.grid.querySelectorAll('[data-del]').forEach(b=> b.addEventListener('click', ()=> removeFromCart(b.getAttribute('data-del')) ));
  els.grid.querySelectorAll('[data-qty]').forEach(inp=> inp.addEventListener('change', ()=> setQty(inp.getAttribute('data-qty'), Number(inp.value)||1)) );
  const clear = document.getElementById('clearCart');
  if(clear) clear.addEventListener('click', ()=> { setCart([]); renderCart(); toast('✓ Cart cleared'); });
  const checkout = document.getElementById('checkoutBtn');
  if(checkout) checkout.addEventListener('click', ()=> toast('Checkout functionality coming soon')); 
}

function setQty(id, qty){
  const cart = getCart();
  const item = cart.find(i=>i.id===id);
  if(!item) return;
  item.qty = Math.max(1, Math.floor(qty));
  setCart(cart);
  renderCart();
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
  renderCart();
}
function removeFromCart(id){
  const cart = getCart().filter(i=>i.id!==id);
  setCart(cart);
  renderCart();
  toast('✓ Item removed');
}

function route(){
  const h = location.hash.replace(/^#\//,'');
  const isCart = h.startsWith('cart');
  if(isCart){
    // add a body class so CSS can hide controls on the cart view
    document.body.classList.add('view-cart');
    // remove the two sort options that shouldn't appear in the cart view
    if(els.sort && originalSortHTML === null){
      originalSortHTML = els.sort.innerHTML;
    }
    if(els.sort && originalSortHTML !== null){
      // remove 'priceDesc' (Price: High to Low) and 'nameAsc' (Name: A-Z)
      ['priceDesc','nameAsc'].forEach(v=>{
        const o = els.sort.querySelector(`option[value="${v}"]`);
        if(o) o.remove();
      });
      // ensure selected value is valid
      if(!els.sort.querySelector(`option[value="${els.sort.value}"]`)) els.sort.value = 'relevance';
    }
    // hide the entire sort control in cart view (store previous display for restore)
    if(els.sort && originalSortDisplay === null){
      originalSortDisplay = els.sort.style.display || '';
      els.sort.style.display = 'none';
    }
    els.breadcrumbs.textContent = '';
    renderCart();
    return;
  } else {
    document.body.classList.remove('view-cart');
    // restore full sort options when leaving cart
    if(els.sort && originalSortHTML !== null){
      els.sort.innerHTML = originalSortHTML;
      originalSortHTML = null;
    }
    // restore sort display property
    if(els.sort && originalSortDisplay !== null){
      els.sort.style.display = originalSortDisplay;
      originalSortDisplay = null;
    }
  }
  initFromHash();
}

// Init
document.addEventListener('DOMContentLoaded', ()=>{
  bindMegaMenu();
  initMobileMenu();
  bindControls();
  updateCartCount();
  route();
  window.addEventListener('hashchange', ()=>{ route(); updateCartCount(); });
});


