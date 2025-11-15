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
const price = () => { // generate realistic VND price
  const min = 150000, max = 2500000; // 150k - 2.5m VND
  const step = 10000; // round to 10k
  const raw = Math.floor((Math.random()*(max-min)+min)/step)*step;
  return raw;
};
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
      <a class="thumb" href="#/products/${p.category}/${p.sub}/${p.id}" data-view="${p.id}"><img src="${p.image}" alt="${p.title}"></a>
      <div class="body">
        <h3 class="title"><a href="#/products/${p.category}/${p.sub}/${p.id}" data-view="${p.id}" style="color:inherit;text-decoration:none">${p.title}</a></h3>
        <div class="meta"><span>${p.brand}</span><span class="price">${currency(p.price)}</span></div>
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
      e.preventDefault();
      const id = view.getAttribute('data-view');
      openProductModal(id);
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
function setCart(c){ localStorage.setItem(CART_KEY, JSON.stringify(c)); updateCartCount(); }
function addToCart(id){
  const cart = getCart();
  const item = cart.find(i=>i.id===id);
  if(item) item.qty += 1; else cart.push({ id, qty:1 });
  setCart(cart);
  toast('Đã thêm vào giỏ');
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
    t.style.cssText='position:fixed;left:50%;bottom:24px;transform:translateX(-50%);background:#0d1117;color:#fff;padding:10px 14px;border:1px solid #222;border-radius:10px;box-shadow:0 10px 20px rgba(0,0,0,.3);z-index:9999';
    document.body.appendChild(t);
  }
  t.textContent = msg;
  t.style.opacity = '1';
  clearTimeout(toastTimer);
  toastTimer = setTimeout(()=>{ t.style.opacity='0'; }, 1400);
}

// Product detail modal logic
function findProductById(id){ return PRODUCTS.find(p=>p.id===id); }
function openProductModal(id){
  const p = findProductById(id); if(!p) return;
  const modal = document.getElementById('productModal');
  document.getElementById('modalImage').src = p.image;
  document.getElementById('modalImage').alt = p.title;
  document.getElementById('modalTitle').textContent = p.title;
  document.getElementById('modalBrand').textContent = p.brand;
  document.getElementById('modalPrice').textContent = `${currency(p.price)}`;
  document.getElementById('modalDesc').textContent = `Mô tả: ${p.title} thuộc danh mục ${CATALOG[p.category].name} - ${CATALOG[p.category].subs[p.sub].name}. Chất lượng cao, thiết kế hiện đại.`;
  const addBtn = document.getElementById('modalAdd');
  addBtn.onclick = ()=> addToCart(p.id);
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
  if(cart.length===0){ 
    els.grid.innerHTML = '<div class="cart"><div class="cart-header"><h2>Giỏ hàng</h2></div><div class="cart-empty">Giỏ hàng trống</div></div>'; 
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
          <button class="qty-btn" data-dec="${ci.id}">-</button>
          <input class="qty-input" type="number" min="1" value="${ci.qty}" data-qty="${ci.id}" />
          <button class="qty-btn" data-inc="${ci.id}">+</button>
        </div>
        <div class="ci-line">${currency(line)}</div>
        <button class="ci-remove" aria-label="Xóa" data-del="${ci.id}">✕</button>
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
        <h2>Giỏ hàng</h2>
        <div style="display:flex;gap:8px">
          <button class="btn secondary" id="clearCart">Xóa hết</button>
          <a href="#/products" class="btn secondary">Tiếp tục mua sắm</a>
        </div>
      </div>
      <div class="cart-content">
        <div class="cart-items">
          ${rows}
        </div>
        <aside class="cart-summary">
          <h3>Tóm tắt đơn</h3>
          <div class="summary-row"><span>Tạm tính</span><span>${currency(subtotal)}</span></div>
          <div class="summary-row"><span>Vận chuyển</span><span>${shipping? currency(shipping): 'Miễn phí'}</span></div>
          <div class="summary-row"><span>Giảm giá</span><span>- ${discount? currency(discount): currency(0)}</span></div>
          <div class="summary-total"><strong>Tổng</strong><strong>${currency(total)}</strong></div>
          <button class="btn" id="checkoutBtn">Thanh toán</button>
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
  if(clear) clear.addEventListener('click', ()=> { setCart([]); renderCart(); toast('Đã xóa giỏ hàng'); });
  const checkout = document.getElementById('checkoutBtn');
  if(checkout) checkout.addEventListener('click', ()=> toast('Chức năng thanh toán demo')); 
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
}

function route(){
  const h = location.hash.replace(/^#\//,'');
  if(h.startsWith('cart')){ renderBreadcrumbs(); els.breadcrumbs.textContent = 'Giỏ hàng'; renderCart(); return; }
  initFromHash();
}

// Init
document.addEventListener('DOMContentLoaded', ()=>{
  bindMegaMenu();
  bindControls();
  updateCartCount();
  route();
  window.addEventListener('hashchange', ()=>{ route(); updateCartCount(); });
});
