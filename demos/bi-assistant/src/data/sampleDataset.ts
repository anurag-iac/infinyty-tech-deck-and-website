import { Order, Customer, Product, SalesTarget } from '../types';

// Deterministic seed pseudo-random number generator
function createPrng(seed = 123456789) {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

const random = createPrng(42);

const CITIES_BY_REGION: Record<string, Array<{ city: string; state: string; country: string }>> = {
  'North America': [
    { city: 'New York', state: 'NY', country: 'USA' },
    { city: 'San Francisco', state: 'CA', country: 'USA' },
    { city: 'Chicago', state: 'IL', country: 'USA' },
    { city: 'Austin', state: 'TX', country: 'USA' },
    { city: 'Seattle', state: 'WA', country: 'USA' },
    { city: 'Toronto', state: 'ON', country: 'Canada' },
    { city: 'Boston', state: 'MA', country: 'USA' },
    { city: 'Miami', state: 'FL', country: 'USA' },
  ],
  'Europe': [
    { city: 'London', state: 'Greater London', country: 'UK' },
    { city: 'Berlin', state: 'Berlin', country: 'Germany' },
    { city: 'Paris', state: 'Île-de-France', country: 'France' },
    { city: 'Amsterdam', state: 'North Holland', country: 'Netherlands' },
    { city: 'Zurich', state: 'Zurich', country: 'Switzerland' },
    { city: 'Madrid', state: 'Madrid', country: 'Spain' },
  ],
  'Asia Pacific': [
    { city: 'Tokyo', state: 'Tokyo', country: 'Japan' },
    { city: 'Singapore', state: 'Singapore', country: 'Singapore' },
    { city: 'Sydney', state: 'NSW', country: 'Australia' },
    { city: 'Hong Kong', state: 'Hong Kong', country: 'China' },
    { city: 'Seoul', state: 'Seoul', country: 'South Korea' },
  ],
  'Latin America': [
    { city: 'São Paulo', state: 'SP', country: 'Brazil' },
    { city: 'Mexico City', state: 'CDMX', country: 'Mexico' },
    { city: 'Buenos Aires', state: 'BA', country: 'Argentina' },
  ],
  'Middle East': [
    { city: 'Dubai', state: 'Dubai', country: 'UAE' },
    { city: 'Riyadh', state: 'Riyadh', country: 'Saudi Arabia' },
    { city: 'Doha', state: 'Doha', country: 'Qatar' },
  ],
};

const SALESPERSONS_BY_REGION: Record<string, string[]> = {
  'North America': ['Sarah Jenkins', 'Michael Chang', 'David Ross', 'Emily Watson'],
  'Europe': ['Alexander Wright', 'Elena Rostova', 'Marcus Thorne'],
  'Asia Pacific': ['Kenji Takahashi', 'Li Wei', 'Aisha Patel'],
  'Latin America': ['Carlos Mendez', 'Sofia Rossi'],
  'Middle East': ['Tariq Al-Mansoor', 'Fatima Vance'],
};

const CATEGORIES_AND_PRODUCTS = [
  {
    category: 'Technology',
    subCategories: ['Cloud Infrastructure', 'AI Analytics Suite', 'Enterprise Laptops', 'Cybersecurity Shield'],
    brands: ['NexusTech', 'Aura Cloud', 'Vanguard', 'QuantumAI'],
    items: [
      { name: 'Aura Cloud Enterprise Cluster', basePrice: 4200, marginFactor: 0.45 },
      { name: 'Quantum Analytics Server v4', basePrice: 2800, marginFactor: 0.38 },
      { name: 'Vanguard Pro Workstation 16"', basePrice: 1950, marginFactor: 0.28 },
      { name: 'CyberShield Zero-Trust Appliance', basePrice: 3100, marginFactor: 0.52 },
      { name: 'Nexus Ultra HD Smart Display 32"', basePrice: 850, marginFactor: 0.22 },
      { name: 'Aura AI Voice Assistant Hub', basePrice: 490, marginFactor: 0.35 },
    ]
  },
  {
    category: 'Furniture',
    subCategories: ['Ergonomic Desks', 'Executive Chairs', 'Acoustic Pods', 'Conference Tables'],
    brands: ['Herman Modern', 'SteelCraft', 'ErgoLux', 'Kinnarps'],
    items: [
      { name: 'ErgoLux Motorized Standing Desk 72"', basePrice: 1250, marginFactor: 0.32 },
      { name: 'Herman Executive Mesh Chair', basePrice: 980, marginFactor: 0.36 },
      { name: 'SteelCraft Quiet Pod Solo', basePrice: 6500, marginFactor: 0.42 },
      { name: 'Kinnarps Modular Boardroom Table', basePrice: 3400, marginFactor: 0.30 },
      { name: 'ErgoLux Active Balance Stool', basePrice: 320, marginFactor: 0.25 },
    ]
  },
  {
    category: 'Office Supplies',
    subCategories: ['Smart Printers', 'Paper & Media', 'Storage Units', 'Ergonomic Accessories'],
    brands: ['PrintMaster', 'EcoPaper', 'StorageMax', 'Fellowes'],
    items: [
      { name: 'PrintMaster Laser Enterprise 500', basePrice: 890, marginFactor: 0.24 },
      { name: 'EcoPaper Premium Recycled Case (10pk)', basePrice: 110, marginFactor: 0.18 },
      { name: 'StorageMax Heavy Security Safe 50L', basePrice: 620, marginFactor: 0.29 },
      { name: 'Fellowes DocuShred Silent 99C', basePrice: 450, marginFactor: 0.31 },
    ]
  },
  {
    category: 'Industrial',
    subCategories: ['Robotics Arm', 'IoT Sensors', 'Power Management', 'Safety Gear'],
    brands: ['RoboMotion', 'SensTech', 'PowerCore', 'SafeGuard'],
    items: [
      { name: 'RoboMotion Modular Pick Arm X1', basePrice: 8500, marginFactor: 0.40 },
      { name: 'SensTech Thermal IoT Sensor Array', basePrice: 1400, marginFactor: 0.48 },
      { name: 'PowerCore Industrial UPS 10kVA', basePrice: 4200, marginFactor: 0.33 },
      { name: 'SafeGuard Smart Helmet with HUD', basePrice: 780, marginFactor: 0.35 },
    ]
  }
];

const INDUSTRIES = ['Technology', 'Financial Services', 'Healthcare & Biotech', 'Manufacturing', 'Retail & E-commerce', 'Consulting & Legal'];
const COMPANY_SIZES: Array<'Enterprise' | 'Mid-Market' | 'SMB' | 'Startup'> = ['Enterprise', 'Mid-Market', 'SMB', 'Startup'];
const PAYMENT_METHODS: Array<'Credit Card' | 'Wire Transfer' | 'ACH' | 'PayPal' | 'Corporate Account'> = [
  'Credit Card', 'Wire Transfer', 'ACH', 'PayPal', 'Corporate Account'
];

// Generate 500 Products
export function generateProducts(): Product[] {
  const products: Product[] = [];
  let idCounter = 101;

  CATEGORIES_AND_PRODUCTS.forEach(catGroup => {
    catGroup.items.forEach(item => {
      // Create variations
      for (let v = 1; v <= 20; v++) {
        if (products.length >= 500) break;
        const subCat = catGroup.subCategories[(v - 1) % catGroup.subCategories.length];
        const brand = catGroup.brands[(v - 1) % catGroup.brands.length];
        const sellingPrice = Math.round(item.basePrice * (0.85 + (v * 0.03)));
        const costPrice = Math.round(sellingPrice * (1 - item.marginFactor));
        
        products.push({
          productId: `PRD-${idCounter}`,
          productName: `${brand} ${item.name} ${v > 1 ? `(Gen ${v})` : ''}`.trim(),
          category: catGroup.category,
          subCategory: subCat,
          brand,
          costPrice,
          sellingPrice,
        });
        idCounter++;
      }
    });
  });

  // Fill up to 500 if needed
  while (products.length < 500) {
    const pIndex = products.length;
    const catGroup = CATEGORIES_AND_PRODUCTS[pIndex % CATEGORIES_AND_PRODUCTS.length];
    const item = catGroup.items[pIndex % catGroup.items.length];
    const subCat = catGroup.subCategories[pIndex % catGroup.subCategories.length];
    const brand = catGroup.brands[pIndex % catGroup.brands.length];
    const sellingPrice = Math.round(item.basePrice * (0.9 + random() * 0.4));
    const costPrice = Math.round(sellingPrice * (1 - item.marginFactor));

    products.push({
      productId: `PRD-${idCounter}`,
      productName: `${brand} ${item.name} Custom Edition ${pIndex}`,
      category: catGroup.category,
      subCategory: subCat,
      brand,
      costPrice,
      sellingPrice,
    });
    idCounter++;
  }

  return products;
}

// Generate 2,000 Customers
export function generateCustomers(): Customer[] {
  const customers: Customer[] = [];
  const regions = Object.keys(CITIES_BY_REGION);
  const companyPrefixes = ['Apex', 'Global', 'Synergy', 'Vanguard', 'Omni', 'Horizon', 'Pinnacle', 'Starlight', 'Velocity', 'Titan', 'Acme', 'Quantum', 'Elysium', 'Prism', 'Beacon'];
  const companySuffixes = ['Corporation', 'Systems', 'Holdings', 'Labs', 'Solutions', 'Group', 'Networks', 'Technologies', 'Capital', 'Industries'];

  for (let i = 1; i <= 2000; i++) {
    const region = regions[i % regions.length];
    const cities = CITIES_BY_REGION[region];
    const cityObj = cities[i % cities.length];
    const industry = INDUSTRIES[i % INDUSTRIES.length];
    const size = COMPANY_SIZES[i % COMPANY_SIZES.length];
    
    const prefix = companyPrefixes[Math.floor(random() * companyPrefixes.length)];
    const suffix = companySuffixes[Math.floor(random() * companySuffixes.length)];
    const customerName = `${prefix} ${suffix} #${i}`;
    
    let segment: 'VIP Enterprise' | 'High Value SMB' | 'Regular Corporate' | 'At Risk';
    let ltv = Math.round(15000 + random() * 480000);
    
    if (size === 'Enterprise' || ltv > 300000) {
      segment = 'VIP Enterprise';
    } else if (size === 'Mid-Market' || ltv > 120000) {
      segment = 'High Value SMB';
    } else if (i % 7 === 0) {
      segment = 'At Risk';
    } else {
      segment = 'Regular Corporate';
    }

    const year = 2021 + (i % 4);
    const month = String((i % 12) + 1).padStart(2, '0');
    const day = String((i % 28) + 1).padStart(2, '0');

    customers.push({
      customerId: `CUST-${String(i).padStart(4, '0')}`,
      customerName,
      industry,
      companySize: size,
      city: cityObj.city,
      state: cityObj.state,
      country: cityObj.country,
      customerSince: `${year}-${month}-${day}`,
      lifetimeValue: ltv,
      customerSegment: segment,
    });
  }

  return customers;
}

// Generate 10,000 Orders
export function generateOrders(products: Product[], customers: Customer[]): Order[] {
  const orders: Order[] = [];
  const regions = Object.keys(CITIES_BY_REGION);
  const orderStatuses: Array<'Delivered' | 'Shipped' | 'Processing' | 'Cancelled' | 'Returned'> = [
    'Delivered', 'Delivered', 'Delivered', 'Delivered', 'Shipped', 'Processing', 'Cancelled', 'Returned'
  ];

  // Dates spanning 2024-01-01 to 2025-12-31 (24 months)
  const months = [
    '2024-01', '2024-02', '2024-03', '2024-04', '2024-05', '2024-06',
    '2024-07', '2024-08', '2024-09', '2024-10', '2024-11', '2024-12',
    '2025-01', '2025-02', '2025-03', '2025-04', '2025-05', '2025-06',
    '2025-07', '2025-08', '2025-09', '2025-10', '2025-11', '2025-12'
  ];

  // Multiplier for seasonal trends (Q4 boost)
  const monthWeights = [
    0.85, 0.88, 0.95, 0.92, 1.0, 1.05,
    0.98, 1.02, 1.10, 1.15, 1.35, 1.45,
    0.90, 0.94, 1.02, 1.00, 1.08, 1.12,
    1.05, 1.08, 1.18, 1.25, 1.48, 1.60
  ];

  for (let i = 1; i <= 10000; i++) {
    // Select customer
    const customer = customers[(i * 3) % customers.length];
    
    // Select region based on customer country/city
    let region = 'North America';
    for (const [rName, cityList] of Object.entries(CITIES_BY_REGION)) {
      if (cityList.some(c => c.city === customer.city)) {
        region = rName;
        break;
      }
    }

    // Select salesperson from region
    const salespersons = SALESPERSONS_BY_REGION[region] || SALESPERSONS_BY_REGION['North America'];
    const salesperson = salespersons[i % salespersons.length];

    // Select product
    const product = products[(i * 7) % products.length];

    // Select month with seasonal distribution
    const monthIndex = i % months.length;
    const yearMonth = months[monthIndex];
    const dayNum = String((i % 28) + 1).padStart(2, '0');
    const orderDate = `${yearMonth}-${dayNum}`;

    // Delivery date (2-5 days later)
    const delDay = Math.min(28, (i % 28) + 1 + (i % 4) + 1);
    const deliveryDate = `${yearMonth}-${String(delDay).padStart(2, '0')}`;

    // Quantity (1 to 15 based on product type)
    let quantity = 1 + (i % 8);
    if (product.category === 'Office Supplies') quantity += 5;
    if (customer.companySize === 'Enterprise') quantity *= 2;

    // Discount % (0% to 25%)
    let discountPercent = (i % 5 === 0) ? 15 : (i % 3 === 0) ? 10 : (i % 7 === 0) ? 20 : 5;
    if (customer.customerSegment === 'VIP Enterprise') discountPercent = Math.min(25, discountPercent + 5);

    const unitPrice = product.sellingPrice;
    const grossRevenue = quantity * unitPrice;
    const revenue = Math.round(grossRevenue * (1 - discountPercent / 100));
    const unitCost = product.costPrice;
    const cost = Math.round(quantity * unitCost);
    const profit = revenue - cost;
    const profitMarginPercent = revenue > 0 ? Number(((profit / revenue) * 100).toFixed(2)) : 0;

    const status = orderStatuses[i % orderStatuses.length];
    const paymentMethod = PAYMENT_METHODS[i % PAYMENT_METHODS.length];

    orders.push({
      orderId: `ORD-2025-${String(i).padStart(5, '0')}`,
      orderDate,
      customerId: customer.customerId,
      customerName: customer.customerName,
      city: customer.city,
      state: customer.state,
      country: customer.country,
      region,
      salesperson,
      productId: product.productId,
      productName: product.productName,
      category: product.category,
      subCategory: product.subCategory,
      quantity,
      unitPrice,
      discountPercent,
      revenue,
      cost,
      profit,
      profitMarginPercent,
      orderStatus: status,
      deliveryDate,
      paymentMethod,
    });
  }

  return orders;
}

// Generate Sales Targets
export function generateSalesTargets(): SalesTarget[] {
  const targets: SalesTarget[] = [];
  const months = ['2025-01', '2025-02', '2025-03', '2025-04', '2025-05', '2025-06', '2025-07', '2025-08', '2025-09', '2025-10', '2025-11', '2025-12'];
  
  for (const month of months) {
    for (const [region, salespersons] of Object.entries(SALESPERSONS_BY_REGION)) {
      for (const sp of salespersons) {
        targets.push({
          month,
          region,
          salesperson: sp,
          salesTarget: 180000 + Math.floor(random() * 60000),
        });
      }
    }
  }

  return targets;
}

// Singleton Cache
let cachedProducts: Product[] | null = null;
let cachedCustomers: Customer[] | null = null;
let cachedOrders: Order[] | null = null;
let cachedTargets: SalesTarget[] | null = null;

export function getSampleBusinessDataset() {
  if (!cachedProducts) cachedProducts = generateProducts();
  if (!cachedCustomers) cachedCustomers = generateCustomers();
  if (!cachedOrders) cachedOrders = generateOrders(cachedProducts, cachedCustomers);
  if (!cachedTargets) cachedTargets = generateSalesTargets();

  return {
    orders: cachedOrders,
    customers: cachedCustomers,
    products: cachedProducts,
    salesTargets: cachedTargets,
  };
}
