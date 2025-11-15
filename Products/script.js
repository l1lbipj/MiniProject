// Data model: categories -> subcategories -> products
const CATALOG = {
  clothing: {
    name: 'Clothing',
    subs: {
      tshirts: { name: 'T-Shirts' },
      shirts: { name: 'Shirts' },
      hoodies: { name: 'Hoodies' },
      jackets: { name: 'Jackets' },
      pants: { name: 'Pants' }
    }
  },
  shoes: {
    name: 'Shoes',
    subs: {
      running: { name: 'Running' },
      basketball: { name: 'Basketball' },
      casual: { name: 'Casual' },
      sandals: { name: 'Sandals' }
    }
  },
  accessories: {
    name: 'Accessories',
    subs: {
      hats: { name: 'Hats' },
      bags: { name: 'Bags' },
      socks: { name: 'Socks' },
      watches: { name: 'Watches' }
    }
  }
};

// seed sample products
const PRODUCTS = [];
const price = () => Number((Math.random()*60+10).toFixed(2));
const img = (t) => `https://dummyimage.com/600x600/e9ecef/333&text=${encodeURIComponent(t)}`;

function pushProd(cat, sub, idx, title){
  PRODUCTS.push({
    id: `${cat}-${sub}-${idx}`,
    category: cat,
    sub,
    title,
    price: price(),
    brand: ['Nike','Adidas','Puma','Uniqlo','Zara'][idx%5],
    image: img(title)
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
  query: '',
  sort: 'relevance'
};

const els = {
  breadcrumbs: document.getElementById('breadcrumbs'),
  grid: document.getElementById('productGrid'),
  search: document.getElementById('searchInput'),
  sort: document.getElementById('sortSelect')
};

// Routing-like helpers
function setCategory(cat, sub=null){
  state.category = cat; state.sub = sub; render();
  const path = ['products'];
  if(cat) path.push(cat);
  if(sub) path.push(sub);
  history.replaceState({}, '', '#/'+path.join('/'));
}

function initFromHash(){
  const h = location.hash.replace(/^#\//,'');
  const parts = h.split('/');
  if(parts[0] !== 'products'){ render(); return; }
  const cat = parts[1] || null;
  const sub = parts[2] || null;
  if(cat && CATALOG[cat]){
    if(sub && CATALOG[cat].subs[sub]) setCategory(cat, sub);
    else setCategory(cat, null);
  } else render();
}

// Rendering
function renderBreadcrumbs(){
  const toTitle = (k, type) => (type==='cat'? CATALOG[k]?.name : CATALOG[state.category]?.subs[k]?.name) || '';
  const parts = [
    `<a href="#/products" data-bc="root">Products</a>`
  ];
  if(state.category){
    parts.push(`<span>/</span><a href="#/products/${state.category}" data-bc="cat">${toTitle(state.category,'cat')}</a>`);
  }
  if(state.sub){
    parts.push(`<span>/</span><span>${toTitle(state.sub,'sub')}</span>`);
  }
  els.breadcrumbs.innerHTML = parts.join(' ');
}

function filterAndSort(){
  let list = PRODUCTS.slice();
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
  switch(state.sort){
    case 'priceAsc': list.sort((a,b)=>a.price-b.price); break;
    case 'priceDesc': list.sort((a,b)=>b.price-a.price); break;
    case 'nameAsc': list.sort((a,b)=>a.title.localeCompare(b.title)); break;
    case 'nameDesc': list.sort((a,b)=>b.title.localeCompare(a.title)); break;
    default: break;
  }
  return list;
}

function productCard(p){
  return `
    <article class="card">
      <div class="thumb"><img src="${p.image}" alt="${p.title}"></div>
      <div class="body">
        <h3 class="title">${p.title}</h3>
        <div class="meta"><span>${p.brand}</span><span class="price">$${p.price}</span></div>
        <div class="actions">
          <button class="btn" data-add="${p.id}">Thêm giỏ</button>
          <button class="btn secondary" data-view="${p.id}">Chi tiết</button>
        </div>
      </div>
    </article>
  `;
}

function renderGrid(){
  const list = filterAndSort();
  els.grid.innerHTML = list.map(productCard).join('');
}

function render(){
  renderBreadcrumbs();
  renderGrid();
}

// Event handling
// Mega-menu click routing
function bindMegaMenu(){
  document.querySelectorAll('.mega-menu a[data-category]').forEach(a=>{
    a.addEventListener('click', (e)=>{
      e.preventDefault();
      const cat = a.getAttribute('data-category');
      const sub = a.getAttribute('data-sub');
      setCategory(cat, sub || null);
    });
  });
}

function bindControls(){
  els.search.addEventListener('input', ()=>{ state.query = els.search.value.trim(); renderGrid(); });
  els.sort.addEventListener('change', ()=>{ state.sort = els.sort.value; renderGrid(); });

  els.grid.addEventListener('click', (e)=>{
    const add = e.target.closest('[data-add]');
    const view = e.target.closest('[data-view]');
    if(add){
      const id = add.getAttribute('data-add');
      addToCart(id);
    } else if(view){
      const id = view.getAttribute('data-view');
      alert('Chi tiết sản phẩm: '+id);
    }
  });

  els.breadcrumbs.addEventListener('click', (e)=>{
    const a = e.target.closest('a');
    if(!a) return;
    const root = a.getAttribute('data-bc');
    if(root==='root'){ e.preventDefault(); setCategory(null,null); }
    if(root==='cat'){ e.preventDefault(); setCategory(state.category, null); }
  });

  window.addEventListener('hashchange', initFromHash);
}

// Cart with localStorage
const CART_KEY = 'mp_cart_v1';
function getCart(){
  try{ return JSON.parse(localStorage.getItem(CART_KEY)) || []; }catch{ return []; }
}
function setCart(c){ localStorage.setItem(CART_KEY, JSON.stringify(c)); }
function addToCart(id){
  const cart = getCart();
  const item = cart.find(i=>i.id===id);
  if(item) item.qty += 1; else cart.push({ id, qty:1 });
  setCart(cart);
  toast('Đã thêm vào giỏ');
}

// Minimal toast
let toastTimer;
function toast(msg){
  let t = document.getElementById('toast');
  if(!t){
    t = document.createElement('div');
    t.id='toast';
    t.style.cssText='position:fixed;left:50%;bottom:24px;transform:translateX(-50%);background:#0d1117;color:#fff;padding:10px 14px;border:1px solid #222;border-radius:10px;box-shadow:0 10px 20px rgba(0,0,0,.3);z-index:9999';
    document.body.appendChild(t);
  }
  t.textContent = msg;
  t.style.opacity = '1';
  clearTimeout(toastTimer);
  toastTimer = setTimeout(()=>{ t.style.opacity='0'; }, 1400);
}

// Init
document.addEventListener('DOMContentLoaded', ()=>{
  bindMegaMenu();
  bindControls();
  initFromHash();
});
