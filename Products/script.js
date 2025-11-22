/**
 * Cấu trúc dữ liệu danh mục sản phẩm
 * Phân cấp: Danh mục chính → Danh mục phụ → Sản phẩm
 */
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
      shirts: { name: 'Shirts' }
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
      belts: { name: 'Belts' },
      watches: { name: 'Watches' },
      sunglasses: { name: 'Sunglasses' },
      fragrance: { name: 'Fragrance' }
    }
  }
};

/**
 * Mảng chứa toàn bộ sản phẩm được khởi tạo
 */
const PRODUCTS = [];

/**
 * Bảng màu cho các biến thể sản phẩm
 */
const COLOR_PALETTE = ['black','white','green','red','grey','blue'];
function pickColors(idx){
  const count = 2; /** Mỗi sản phẩm có 2 màu */
  const start = idx % (COLOR_PALETTE.length - count + 1);
  return COLOR_PALETTE.slice(start, start+count);
}

/**
 * Quy định khoảng giá theo từng danh mục phụ
 * Áp dụng mức giá thực tế của Lacoste tại Việt Nam
 */
const PRICE_RULES = {
  polos: [1450000, 3500000],
  tshirts: [450000, 1500000],
  sweatshirts: [1200000, 2800000],
  knitwear: [1500000, 4000000],
  jackets: [2000000, 6000000],
  tracksuits: [1200000, 3000000],
  trousers: [800000, 2500000],
  shirts: [900000, 2500000],
  sneakers: [1800000, 4000000],
  outdoor: [1800000, 4200000],
  performance: [1800000, 4200000],
  sockshoes: [120000, 400000],
  caps: [450000, 1200000],
  belts: [800000, 2200000],
  watches: [2000000, 8000000],
  sunglasses: [1500000, 3800000],
  fragrance: [1200000, 2800000]
};
function priceFor(sub){
  const [min, max] = PRICE_RULES[sub] || [150000, 2500000];
  const step = 10000; /** Làm tròn đến 10.000₫ */
  const raw = Math.floor((Math.random()*(max-min)+min)/step)*step;
  return raw;
}

/**
 * =================================================================
 * QUẢN LÝ HÌNH ẢNH SẢN PHẨM
 * =================================================================
 * Cấu trúc: Mỗi sản phẩm có thể có nhiều màu khác nhau
 * Chỉ cần định nghĩa màu nào có ảnh, không bắt buộc đủ tất cả màu
 */
const lacosteImages = {
  sweatshirts: {
    1: { /** Áo nỉ cổ cao có khóa kéo - chỉ màu đen */
      black: '../images/sweatshirt-1-black.jpg'
    },
    2: { /** Áo hoodie có khóa - đầy đủ 3 màu */
      white: '../images/sweatshirt-2-white.jpg',
      green: '../images/sweatshirt-2-green.jpg',
      black: '../images/sweatshirt-2-black.jpg'
    },
    3: {
      grey: '../images/sweatshirt-3-grey.jpg',
      black: '../images/sweatshirt-3-black.jpg'
    },
    4: {
      green: '../images/sweatshirt-4-green.jpg',
      white: '../images/sweatshirt-4-white.jpg'
    }
  },
  polos: {
    1: {
      white: '../images/polo-1-white.jpg',
      black: '../images/polo-1-black.jpg'
    },
    2: {
      green: '../images/polo-2-green.jpg',
      white: '../images/polo-2-white.jpg'
    },
    3: {
      red: '../images/polo-3-red.jpg',
      grey: '../images/polo-3-grey.jpg'
    },
    4: {
      black: '../images/polo-4-black.jpg',
      green: '../images/polo-4-green.jpg'
    }
  },
  jackets: {
    1: {
      black: '../images/jacket-1-black.jpg',
      grey: '../images/jacket-1-grey.jpg'
    },
    2: {
      white: '../images/jacket-2-white.jpg',
      black: '../images/jacket-2-black.jpg'
    },
    3: {
      green: '../images/jacket-3-green.jpg',
      blue: '../images/jacket-3-blue.jpg'
    },
    4: {
      red: '../images/jacket-4-red.jpg',
      blue: '../images/jacket-4-blue.jpg'
    }
  },
  tracksuits: {
    1: {
      black: '../images/tracksuit-1-black.jpg',
      green: '../images/tracksuit-1-green.jpg'
    },
    2: {
      black: '../images/tracksuit-2-black.jpg',
      green: '../images/tracksuit-2-green.jpg'
    },
    3: {
      red: '../images/tracksuit-3-red.jpg'
    },
    4: {
      white: '../images/tracksuit-4-white.jpg'
    }
  },
  knitwear: {
    1: {
      black: '../images/knitwear-1-black.jpg',
      white: '../images/knitwear-1-white.jpg',
      grey: '../images/knitwear-1-grey.jpg'
    },
    2: {
      black: '../images/knitwear-2-black.jpg',
      green: '../images/knitwear-2-green.jpg'
    },
    3: {
      grey: '../images/knitwear-3-grey.jpg'
    },
    4: {
      white: '../images/knitwear-4-white.jpg'
    }
  },
  tshirts: {
    1: {
      black: '../images/tshirt-1-black.jpg',
      white: '../images/tshirt-1-white.jpg',
      red: '../images/tshirt-1-red.jpg'
    },
    2: {
      black: '../images/tshirt-2-black.jpg',
      grey: '../images/tshirt-2-grey.jpg'
    },
    3: {
      white: '../images/tshirt-3-white.jpg'
    },
    4: {
      green: '../images/tshirt-4-green.jpg'
    }
  },
  trousers: {
    1: {
      black: '../images/trouser-1-black.jpg',
      grey: '../images/trouser-1-grey.jpg',
      white: '../images/trouser-1-white.jpg'
    },
    2: {
      black: '../images/trouser-2-black.jpg',
      green: '../images/trouser-2-green.jpg'
    },
    3: {
      grey: '../images/trouser-3-grey.jpg'
    },
    4: {
      white: '../images/trouser-4-white.jpg'
    }
  },
  shirts: {
    1: {
      black: '../images/shirt-1-black.jpg',
      white: '../images/shirt-1-white.jpg',
      grey: '../images/shirt-1-grey.jpg'
    },
    2: {
      black: '../images/shirt-2-black.jpg',
      red: '../images/shirt-2-red.jpg'
    },
    3: {
      white: '../images/shirt-3-white.jpg'
    },
    4: {
      grey: '../images/shirt-4-grey.jpg'
    }
  },
  sneakers: {
    1: {
      black: '../images/sneaker-1-black.jpg',
      white: '../images/sneaker-1-white.jpg'
    },
    2: {
      black: '../images/sneaker-2-black.jpg',
      green: '../images/sneaker-2-green.jpg'
    }
  },
  outdoor: {
    1: {
      black: '../images/outdoor-1-black.jpg',
      grey: '../images/outdoor-1-grey.jpg'
    },
    2: {
      black: '../images/outdoor-2-black.jpg',
      white: '../images/outdoor-2-white.jpg'
    }
  },
  performance: {
    1: {
      black: '../images/performance-1-black.jpg',
      red: '../images/performance-1-red.jpg'
    },
    2: {
      black: '../images/performance-2-black.jpg',
      green: '../images/performance-2-green.jpg'
    }
  },
  sockshoes: {
    1: {
      black: '../images/sockshoe-1-black.jpg',
      white: '../images/sockshoe-1-white.jpg'
    },
    2: {
      black: '../images/sockshoe-2-black.jpg',
      grey: '../images/sockshoe-2-grey.jpg'
    }
  },
  caps: {
    1: {
      black: '../images/cap-1-black.jpg'
    },
    2: {
      black: '../images/cap-2-black.jpg'
    }
  },
  belts: {
    1: {
      black: '../images/belt-1-black.jpg'
    },
    2: {
      black: '../images/belt-2-black.jpg'
    }
  },
  watches: {
    1: {
      black: '../images/watch-1-black.jpg'
    },
    2: {
      black: '../images/watch-2-black.jpg'
    }
  },
  sunglasses: {
    1: {
      black: '../images/sunglasses-1-black.jpg'
    },
    2: {
      black: '../images/sunglasses-2-black.jpg'
    }
  },
  fragrance: {
    1: {
      black: '../images/fragrance-1-black.jpg'
    },
    2: {
      black: '../images/fragrance-2-black.jpg'
    }
  }
};

const img = (cat, sub, productIndex, color = 'black') => {
  const images = lacosteImages[sub];
  if (!images || !images[productIndex]) return 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80';
  return images[productIndex][color] || images[productIndex]['black'] || 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80';
};

function pushProd(cat, sub, idx, title){
  const collections = ['sport','classic','lifestyle','live','golf','tennis'];
  /** Quần áo: chu kỳ index 1-4, các mục khác: 1-2 */
  const maxIndex = cat === 'clothing' ? 4 : 2;
  const productIndex = ((idx - 1) % maxIndex) + 1;
  
  /** Lấy danh sách màu sẵn có cho sản phẩm cụ thể */
  const productImages = lacosteImages[sub]?.[productIndex] || {};
  const availableColors = Object.keys(productImages);
  
  /** Ưu tiên màu có sẵn, dự phòng dùng hàm pickColors nếu chưa định nghĩa */
  const colors = availableColors.length > 0 ? availableColors : pickColors(idx);
  
  PRODUCTS.push({
    id: `${cat}-${sub}-${idx}`,
    category: cat,
    sub,
    title: title,
    price: priceFor(sub),
    image: img(cat, sub, productIndex, colors[0]), /** Màu đầu tiên làm mặc định */
    colors: colors,
    collection: collections[idx % collections.length],
    productIndex: productIndex /** Lưu index để sử dụng sau */
  });
}

/**
 * Tên sản phẩm chính hãng Lacoste
 * Quần áo: 4 sản phẩm/danh mục, các mục khác: 2 sản phẩm/danh mục
 */
const PRODUCT_NAMES = {
  sweatshirts: [
    'High Neck Zipped Fleece Sweatshirt',
    'Zip-Up Fleece Hoodie',
    'Crew Neck Cotton Sweatshirt',
    'Paris Zip-Up Jacquard Track Jacket'
  ],
  polos: [
    'Classic Fit L.12.12 Original Polo Shirt',
    'Regular Fit Paris Stretch Piqué Polo Shirt',
    'Slim Fit L.12.12 Piqué Polo Shirt',
    'Classic Fit Long Sleeved L.12.12 Polo Shirt'
  ],
  jackets: [
    'Water-Repellent Sport Track Jacket',
    'Water-Repellent Plaid Trench Coat',
    'Quilted Zip Jacket',
    'SPORT Colourblock Lightweight Stretch Zip Golf Jacket'
  ],
  tracksuits: [
    'SPORT Tennis Tracksuit',
    'Colorblock Zip Tracksuit',
    'Fleece Jogging Suit',
    'Diamond Taffeta Sport Tracksuit'
  ],
  knitwear: [
    'Crew Neck Merino Wool Sweater',
    'V-Neck Cotton Sweater',
    'Cable Knit Pullover',
    'Half-Zip Wool Blend Sweater'
  ],
  tshirts: [
    'Crew Neck Pima Cotton T-shirt',
    'V-Neck Cotton Jersey T-shirt',
    'Striped Cotton T-shirt',
    'Graphic Print Croc T-shirt'
  ],
  trousers: [
    'Slim Fit Stretch Chinos',
    'Regular Fit Cotton Gabardine Pants',
    'Tapered Jogging Pants',
    'Pleated Dress Trousers'
  ],
  shirts: [
    'Regular Fit Oxford Cotton Shirt',
    'Slim Fit Poplin Shirt',
    'Linen Blend Casual Shirt',
    'Checked Flannel Shirt'
  ],
  sneakers: [
    'Carnaby Evo Leather Sneakers',
    'Lerond Leather Sneakers'
  ],
  outdoor: [
    'Montbard Leather Boots',
    'Hiking Boots'
  ],
  performance: [
    'Court Performance Tennis Shoes',
    'AG-LT 21 Ultra Tennis Shoes'
  ],
  sockshoes: [
    'Cotton Socks 3-Pack',
    'Sport Ankle Socks'
  ],
  caps: [
    'Classic Gabardine Cap',
    'Crocodile Cap'
  ],
  belts: [
    'Reversible Leather Belt',
    'Classic Leather Belt'
  ],
  watches: [
    'Lacoste.12.12 Watch',
    'Chronograph Watch'
  ],
  sunglasses: [
    'Rectangular Sunglasses',
    'Aviator Sunglasses'
  ],
  fragrance: [
    'L\'HOMME LACOSTE Eau de Toilette',
    'LACOSTE Pour Homme Eau de Toilette'
  ]
};

/**
 * Mô tả chi tiết sản phẩm hiển thị trong modal
 */
const PRODUCT_DESCRIPTIONS = {
  sweatshirts: [
    'Áo nỉ cổ cao với khóa kéo toàn phần, chất liệu fleece mềm mại giữ ấm tốt. Thiết kế thể thao năng động, phù hợp mặc hàng ngày hoặc tập luyện.',
    'Áo hoodie có khóa kéo với nón trùm đầu thoải mái. Chất liệu cotton pha fleece cao cấp, logo cá sấu thêu nổi bật. Lý tưởng cho phong cách streetwear.',
    'Áo nỉ cổ tròn kiểu dáng cổ điển với chất liệu cotton 100% mềm mịn. Form regular fit thoải mái, dễ phối đồ với quần jeans hay joggers.',
    'Áo khoác track với họa tiết jacquard Paris độc đáo. Có khóa kéo toàn phần, túi bên hông tiện dụng. Thể hiện phong cách thời trang đương đại.'
  ],
  polos: [
    'Áo polo L.12.12 huyền thoại - biểu tượng của Lacoste từ 1933. Chất liệu piqué cotton thoáng mát, form classic fit thoải mái. Logo cá sấu thêu tay cao cấp.',
    'Áo polo dài tay phong cách Paris với chất piqué stretch co giãn nhẹ. Thiết kế thanh lịch phù hợp môi trường công sở và dạo phố.',
    'Áo polo slim fit ôm dáng hiện đại với chất piqué stretch thoải mái. Cổ áo và bo tay viền tương phản tạo điểm nhấn thời trang.',
    'Áo polo colorblock với thiết kế phối màu táo bạo. Form regular fit dễ mặc, chất liệu piqué cotton thoáng khí. Phù hợp phong cách năng động.'
  ],
  jackets: [
    'Áo khoác thể thao chống thấm nước với công nghệ water-repellent. Thiết kế track jacket năng động, lớp lót thoáng mát. Lý tưởng cho hoạt động ngoài trời.',
    'Áo măng tô dài với họa tiết kẻ caro sang trọng. Chống thấm nước, có thắt lưng điều chỉnh. Phong cách lịch lãm cho những ngày mưa.',
    'Áo bomber jacket phối bông ấm áp với khóa kéo chắc chắn. Túi bên hông tiện lợi, bo viền elastic. Thiết kế casual hiện đại.',
    'Áo khoác này được may bằng vải taffeta màu nhẹ, có khóa kéo, cổ áo tiện dụng, túi khóa kéo và dây đeo cổ tay có thể điều chỉnh. Một sản phẩm thiết yếu dành cho chơi golf hiệu suất cao.'
  ],
  tracksuits: [
    'Bộ đồ thể thao tennis SPORT với chất liệu technical cao cấp. Thấm hút mồ hôi tốt, co giãn 4 chiều thoải mái. Logo SPORT phản quang nổi bật.',
    'Bộ đồ thể thao lý tưởng cho mọi môn thể thao, từ Lacoste, chuyên gia thể thao từ năm 1933. Với áo khoác trùm đầu và quần đơn sắc, được thiết kế để đồng hành cùng bạn trên chất liệu taffeta nhẹ, thoáng khí và mang tính biểu tượng của chúng tôi. Các chi tiết hoàn thiện tinh tế tạo nên nét thanh lịch cho thiết kế cơ bảnn.',
    'Bộ jogging suit chất liệu fleece mềm mại ấm áp. Bo gấu elastic thoải mái, túi kangaroo tiện dụng. Phù hợp mặc nhà và tập gym.',
    'Bộ tracksuit colorblock với thiết kế phối màu hiện đại. Áo khoác có khóa kéo toàn phần, quần có túi khóa an toàn. Phong cách streetwear.'
  ],
  knitwear: [
    'Áo len cổ tròn chất liệu merino wool cao cấp từ New Zealand. Mềm mại, ấm áp mà không gây ngứa. Form regular fit thanh lịch, dễ phối layer.',
    'Áo sweater cổ V cotton blend thoáng mát. Thiết kế tối giản với logo cá sấu tinh tế. Phù hợp mặc công sở và dạo phố.',
    'Áo pullover họa tiết cable knit cổ điển. Chất len dệt kim chắc chắn, giữ ấm tốt. Phong cách preppy lịch lãm.',
    'Áo len half-zip với chất wool blend cao cấp. Khóa kéo nửa thân tiện lợi, bo viền rib chắc chắn. Thiết kế golf/casual versatile.'
  ],
  tshirts: [
    'Áo thun cổ tròn chất Pima cotton siêu mềm mịn. Độ bền màu cao, form regular fit thoải mái. Logo cá sấu thêu cao cấp trên ngực.',
    'Áo thun cổ V basic chất cotton jersey thấm hút tốt. Thiết kế simple versatile dễ mix-match. Essential wardrobe item.',
    'Áo thun sọc ngang phong cách Breton marinière. Chất cotton thoáng mát, sọc tương phản nổi bật. Phong cách French Riviera.',
    'Áo thun in họa tiết graphic croc độc đáo. Chất cotton 100%, in lụa cao cấp bền màu. Thể hiện cá tính thời trang.'
  ],
  trousers: [
    'Quần chinos slim fit với chất stretch cotton co giãn nhẹ. Thiết kế 5 túi tiện dụng, form ôm dáng hiện đại. Phù hợp smart casual.',
    'Quần gabardine regular fit chất cotton cao cấp. Kiểu dáng cổ điển thanh lịch, nếp gấp sắc nét. Lý tưởng cho môi trường công sở.',
    'Quần joggers tapered với bo gấu elastic thoải mái. Chất cotton blend mềm mại, túi khóa kéo an toàn. Phong cách athleisure.',
    'Quần âu pleated với ly xếp phía trước sang trọng. Chất vải cao cấp không nhăn, form rộng thoải mái. Business formal style.'
  ],
  shirts: [
    'Áo sơ mi Oxford regular fit chất cotton dệt kỹ. Túi ngực có nắp cài khuy, tay áo có nút điều chỉnh. Phong cách preppy cổ điển.',
    'Áo sơ mi poplin slim fit với chất vải mỏng nhẹ thoáng mát. Form ôm dáng hiện đại, dễ tuck-in quần. Perfect for office.',
    'Áo sơ mi linen blend casual với chất vải thoáng mát. Kiểu dáng relaxed, phù hợp mùa hè. Resort vacation style.',
    'Áo sơ mi flannel họa tiết kẻ caro ấm áp. Chất vải cotton chải lông mềm mại. Phong cách outdoor rugged.'
  ],
  sneakers: [
    'Giày sneaker Carnaby Evo da thật trắng tinh khiết. Đế cao su vulcanized bền bỉ, lót giày êm ái. Icon minimalist của Lacoste.',
    'Giày Lerond leather với thiết kế tennis court classic. Da mềm cao cấp, đế cupsole thoải mái. Everyday casual sneaker.'
  ],
  outdoor: [
    'Boots Montbard da thật cao cổ chống nước. Đế Vibram chống trơn trượt, lót lông giữ ấm. Outdoor adventure ready.',
    'Giày hiking boots với hệ thống hỗ trợ mắt cá chân. Chất liệu technical chống thấm, đế trail grip. Mountain trekking gear.'
  ],
  performance: [
    'Giày tennis court performance với đế chống mài mòn. Công nghệ cushioning hấp thụ lực, support ổn định. For serious players.',
    'Giày AG-LT 21 Ultra với công nghệ Kurim lighweight. Đế All-Court versatile, upper breathable. Tournament level shoe.'
  ],
  sockshoes: [
    'Bộ 3 đôi tất cotton sport cao cổ. Chất liệu cotton blend thấm hút tốt, bo gấu elastic không bóp chân. Training essential.',
    'Bộ 5 đôi tất ankle no-show siêu mỏng. Công nghệ anti-slip giữ tất cố định, thấm mồ hôi tốt. Sneaker companion.'
  ],
  caps: [
    'Nón lưỡi trai gabardine classic với logo cá sấu thêu. Chất vải cotton cao cấp, vành cứng định hình. Timeless accessory.',
    'Nón cap với logo crocodile kim loại nổi bật. Chất vải technical chống nắng, băng điều chỉnh phía sau. Sport cap.'
  ],
  belts: [
    'Thắt lưng da reversible 2 màu đen/nâu tiện lợi. Da bò thật cao cấp, khóa kim loại sang trọng. Classic essential.',
    'Dây nịt da classic với khóa cài logo Lacoste. Da mềm mại bền đẹp, thiết kế tối giản thanh lịch. Business accessory.'
  ],
  watches: [
    'Đồng hồ Lacoste.12.12 với thiết kế minimalist. Dây silicone êm ái, mặt số analog dễ đọc. Water resistant 50m.',
    'Đồng hồ chronograph với 3 sub-dials chức năng. Dây thép không gỉ cao cấp, mặt kính sapphire. Premium timepiece.'
  ],
  sunglasses: [
    'Kính mát rectangular với gọng acetate cao cấp. Tròng UV400 bảo vệ tối đa, logo cá sấu kim loại. Timeless style.',
    'Kính aviator với gọng kim loại mảnh nhẹ. Tròng polarized chống chói, hinge flex thoải mái. Pilot inspired.'
  ],
  fragrance: [
    'Nước hoa L\'HOMME LACOSTE Eau de Toilette 100ml. Hương thơm woody aromatic nam tính. Notes: quýt, tiêu hồng, gỗ tuyết tùng.',
    'LACOSTE Pour Homme EDT với hương thơm fougère classic. Fresh opening, woody dry down. Signature scent for gentlemen.'
  ]
};

Object.entries(CATALOG).forEach(([cat, catObj])=>{
  Object.keys(catObj.subs).forEach((sub, sidx)=>{
    // Clothing gets 4 products per category, others get 2
    const count = cat === 'clothing' ? 4 : 2;
    for(let i=1;i<=count;i++){
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

/** Bộ lọc áp dụng trên giao diện */
state.filters = { colors: [], priceRange: null };

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

/** Lưu trữ HTML gốc của dropdown sắp xếp để khôi phục khi rời khỏi giỏ hàng */
let originalSortHTML = null;
let originalSortDisplay = null;

/** Quản lý menu mega (dùng cho nhánh chính mới) */
let megaNavItem = null;
function closeMegaMenu(){
  if(megaNavItem){
    megaNavItem.classList.remove('open');
  }
}

/**
 * Hệ thống điều hướng (routing)
 */
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
  /** Hỗ trợ routing cho khuyến mãi: #/products/promo/<key> */
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
    /** Hiển thị toàn bộ sản phẩm khi truy cập #/products */
    state.category = null;
    state.sub = null;
    state.promo = null;
    renderUI();
  }
}

/**
 * ===================================
 * PHẦN RENDER GIAO DIỆN
 * ===================================
 */
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

/**
 * Định nghĩa các chương trình khuyến mãi
 * Mỗi promo có: hàm lọc, tiêu đề và mô tả (tuỳ chọn)
 */
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
  /** Nếu có promo, áp dụng bộ lọc promo trước tiên */
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
  /** Áp dụng bộ lọc màu sắc */
  if(state.filters.colors.length > 0){
    list = list.filter(p => state.filters.colors.some(c => p.colors.includes(c)));
  }
  /** Áp dụng bộ lọc khoảng giá */
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

/**
 * Tính toán số lượng cho mỗi bộ lọc để hiển thị trên UI
 */
function calculateFilterCounts(){
  let baseList = PRODUCTS.slice();
  if(state.promo && PROMOS[state.promo]){
    baseList = PROMOS[state.promo].filter(PRODUCTS);
  }
  if(state.category) baseList = baseList.filter(p=>p.category===state.category);
  if(state.sub) baseList = baseList.filter(p=>p.sub===state.sub);
  
  const counts = { colors: {} };
  baseList.forEach(p => {
    p.colors.forEach(c => counts.colors[c] = (counts.colors[c] || 0) + 1);
  });
  return counts;
}

function productCard(p){
  const visible = p.colors.slice(0,3);
  const more = p.colors.length - visible.length;
  const swatchesHtml = visible.map(c=> `<span class="swatch-mini clickable" data-color="${c}" data-product-id="${p.id}" style="background:${colorToCss(c)}${c==='white'?';border:1px solid #ddd':''}"></span>`).join('');
  const moreHtml = more>0 ? `<span class="more">+ ${more}</span>` : '';
  return `
    <article class="card">
      <a class="thumb" href="#/products/${p.category}/${p.sub}/${p.id}" data-view="${p.id}">
        <img class="product-img" data-product-id="${p.id}" src="${p.image}" alt="${p.title}">
      </a>
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
    default:
      break;
  }
  renderUI();
}

function clearAllFilters(){
  state.filters = { colors: [], priceRange: null };
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

/**
 * Xử lý điều hướng khi click vào mega menu
 */
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
        /** Trên mobile: chuyển đến trang sản phẩm */
        location.hash = '#/products';
        closeMegaMenu();
        return;
      }
      /** Trên desktop: kiểm tra xem mega menu đã mở chưa */
      if(megaNavItem.classList.contains('open')){
        /** Nếu đã mở: điều hướng đến tất cả sản phẩm */
        location.hash = '#/products';
        closeMegaMenu();
      } else {
        /** Nếu đóng: mở mega menu */
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
    /** Gắn sự kiện cho cả link khám phá chính và link khuyến mãi */
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

  /** Tương tác với thanh bên bộ lọc */
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

  els.grid.addEventListener('click', (e)=>{
    const add = e.target.closest('[data-add]');
    const view = e.target.closest('[data-view]');
    const swatch = e.target.closest('.swatch-mini.clickable');
    
    if(swatch){
      e.preventDefault();
      const color = swatch.getAttribute('data-color');
      const productId = swatch.getAttribute('data-product-id');
      const product = PRODUCTS.find(p => p.id === productId);
      
      if(product && product.colors.includes(color)){
        /** Cập nhật hình ảnh sản phẩm */
        const card = swatch.closest('.card');
        const productImg = card.querySelector('.product-img');
        if(productImg){
          productImg.src = img(product.category, product.sub, product.productIndex, color);
        }
        
        /** Cập nhật trạng thái active của các mẫu màu */
        const allSwatches = card.querySelectorAll('.swatch-mini.clickable');
        allSwatches.forEach(s => s.classList.remove('active'));
        swatch.classList.add('active');
      }
    } else if(add){
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

/**
 * ===================================
 * QUẢN LÝ GIỎ HÀNG VỚI LOCALSTORAGE
 * ===================================
 */
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

/**
 * Hệ thống thông báo tối giản (toast)
 */
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

/**
 * ===================================
 * XỬ LÝ MODAL CHI TIẾT SẢN PHẨM
 * ===================================
 */
function findProductById(id){ return PRODUCTS.find(p=>p.id===id); }
function openProductModal(id){
  const p = findProductById(id); if(!p) return;
  const modal = document.getElementById('productModal');
  let selectedColor = p.colors[0]; /** Mặc định chọn màu đầu tiên */
  
  /** Thiết lập hình ảnh và thông tin ban đầu */
  document.getElementById('modalImage').src = img(p.category, p.sub, p.productIndex, selectedColor);
  document.getElementById('modalImage').alt = p.title;
  document.getElementById('modalTitle').textContent = p.title;
  document.getElementById('modalPrice').textContent = currency(p.price);
  
  /** Lấy mô tả sản phẩm từ PRODUCT_DESCRIPTIONS */
  const descriptions = PRODUCT_DESCRIPTIONS[p.sub] || [];
  const descIndex = (p.productIndex - 1) % descriptions.length;
  const description = descriptions[descIndex] || `Sản phẩm chính hãng thuộc danh mục ${CATALOG[p.category].name} - ${CATALOG[p.category].subs[p.sub].name}. Chất liệu cao cấp, phù hợp nhiều phong cách.`;
  document.getElementById('modalDesc').textContent = description;
  
  /** Render các tuỳ chọn màu sắc */
  const colorOptions = document.getElementById('colorOptions');
  const selectedColorName = document.getElementById('selectedColorName');
  selectedColorName.textContent = getColorLabel(selectedColor);
  
  colorOptions.innerHTML = p.colors.map(color => `
    <div class="color-option ${color === selectedColor ? 'selected' : ''}" 
         data-color="${color}" 
         style="background: ${colorToCss(color)}${color === 'white' ? '; border: 1px solid #ddd' : ''}"
         title="${getColorLabel(color)}">
    </div>
  `).join('');
  
  /** Xử lý khi chọn màu */
  colorOptions.addEventListener('click', (e) => {
    const option = e.target.closest('.color-option');
    if (!option) return;
    
    selectedColor = option.dataset.color;
    
    /** Cập nhật trạng thái đã chọn */
    colorOptions.querySelectorAll('.color-option').forEach(opt => {
      opt.classList.toggle('selected', opt.dataset.color === selectedColor);
    });
    
    /** Cập nhật hình ảnh */
    document.getElementById('modalImage').src = img(p.category, p.sub, p.productIndex, selectedColor);
    
    /** Cập nhật tên màu */
    selectedColorName.textContent = getColorLabel(selectedColor);
  });
  
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

/**
 * Điều hướng và hiển thị giỏ hàng đơn giản
 */
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
    /** Ẩn phần hiển thị sản phẩm (bộ lọc + lưới) */
    if(productsWrapper) productsWrapper.style.display = 'none';
    /** Tạo container giỏ hàng độc lập nếu chưa tồn tại */
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
    /** Hiển thị lại phần sản phẩm */
    if(productsWrapper) productsWrapper.style.display = 'grid';
    /** Ẩn container giỏ hàng */
    const cartContainer = document.getElementById('cartContainer');
    if(cartContainer) cartContainer.style.display = 'none';
    document.body.classList.remove('view-cart');
  }
  initFromHash();
}

/**
 * ===================================
 * KHỞI TẠO ỨNG DỤNG
 * ===================================
 */
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
