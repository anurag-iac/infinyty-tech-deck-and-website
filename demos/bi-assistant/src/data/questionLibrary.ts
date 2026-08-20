import { QuestionItem } from '../types';

export const CATEGORY_METADATA = [
  { id: 'sales', label: 'Sales', icon: 'TrendingUp', color: 'emerald', description: 'Revenue trends, sales comparisons, and volume performance' },
  { id: 'customers', label: 'Customers', icon: 'Users', color: 'blue', description: 'Segmentation, top accounts, LTV, and churn analysis' },
  { id: 'products', label: 'Products', icon: 'Package', color: 'purple', description: 'Top performers, product margins, inventory & lifecycle' },
  { id: 'finance', label: 'Finance', icon: 'DollarSign', color: 'amber', description: 'Profitability, margins, order values, and quarterly reviews' },
  { id: 'regional', label: 'Regional Performance', icon: 'Globe', color: 'cyan', description: 'Geographic insights, state & city breakdowns, rep rankings' },
  { id: 'insights', label: 'AI Insights', icon: 'Sparkles', color: 'rose', description: 'Executive summary, strategic opportunities, and risk audits' },
] as const;

export const CURATED_QUESTIONS: QuestionItem[] = [
  // 📈 Sales
  {
    id: 'sales-total',
    category: 'sales',
    text: 'What were the total sales?',
    icon: 'DollarSign',
    badge: 'Popular',
    description: 'Calculates overall gross revenue, order counts, and YoY growth rate'
  },
  {
    id: 'sales-monthly-trend',
    category: 'sales',
    text: 'Show monthly sales trends.',
    icon: 'LineChart',
    badge: 'Trend',
    description: 'Visualizes 24-month revenue trajectory and seasonal velocity'
  },
  {
    id: 'sales-highest-revenue-products',
    category: 'sales',
    text: 'Which products generated the highest revenue?',
    icon: 'Award',
    description: 'Ranks top 10 products by total dollar sales volume'
  },
  {
    id: 'sales-highest-profit-products',
    category: 'sales',
    text: 'Which products generated the highest profit?',
    icon: 'TrendingUp',
    description: 'Identifies core profit drivers with highest net dollar margins'
  },
  {
    id: 'sales-quarterly-compare',
    category: 'sales',
    text: 'Compare sales by quarter.',
    icon: 'BarChart2',
    description: 'Side-by-side quarter-over-quarter growth comparison across years'
  },
  {
    id: 'sales-revenue-by-region',
    category: 'sales',
    text: 'Show revenue by region.',
    icon: 'Map',
    description: 'Geographic distribution across North America, Europe, APAC, LatAm, ME'
  },
  {
    id: 'sales-revenue-by-state',
    category: 'sales',
    text: 'Show revenue by state.',
    icon: 'Navigation',
    description: 'Breakdown of top performing states and territories'
  },
  {
    id: 'sales-category-sales',
    category: 'sales',
    text: 'Show category-wise sales.',
    icon: 'PieChart',
    description: 'Share of revenue across Technology, Furniture, Office Supplies, Industrial'
  },

  // 👥 Customers
  {
    id: 'cust-top10',
    category: 'customers',
    text: 'Who are the top 10 customers?',
    icon: 'Crown',
    badge: 'Key Accounts',
    description: 'Identifies highest value corporate clients by cumulative order value'
  },
  {
    id: 'cust-most-revenue',
    category: 'customers',
    text: 'Which customers generated the most revenue?',
    icon: 'Users',
    description: 'Detailed analysis of account concentration and enterprise sales'
  },
  {
    id: 'cust-segmentation',
    category: 'customers',
    text: 'Show customer segmentation.',
    icon: 'Grid',
    description: 'Breaks down accounts into VIP Enterprise, High Value SMB, and At Risk'
  },
  {
    id: 'cust-fastest-growing',
    category: 'customers',
    text: 'Which customer segments are growing fastest?',
    icon: 'Zap',
    description: 'Growth velocity and lifetime value expansion by account type'
  },

  // 📦 Products
  {
    id: 'prod-top-selling',
    category: 'products',
    text: 'Top selling products.',
    icon: 'Package',
    badge: 'Bestsellers',
    description: 'Units sold, revenue totals, and market penetration by product'
  },
  {
    id: 'prod-lowest-selling',
    category: 'products',
    text: 'Lowest selling products.',
    icon: 'ArrowDownRight',
    description: 'Identifies slow-moving inventory and underperforming SKUs'
  },
  {
    id: 'prod-highest-margin',
    category: 'products',
    text: 'Which products have the highest profit margin?',
    icon: 'Percent',
    description: 'Evaluates profitability efficiency and gross margin percentage'
  },
  {
    id: 'prod-discontinue',
    category: 'products',
    text: 'Which products should be discontinued?',
    icon: 'AlertTriangle',
    badge: 'Optimization',
    description: 'Recommends phase-out candidate products with negative or low margin'
  },

  // 💰 Finance
  {
    id: 'fin-total-revenue',
    category: 'finance',
    text: 'Total revenue.',
    icon: 'Briefcase',
    description: 'Full financial breakdown of top-line revenue, discounts, and net sales'
  },
  {
    id: 'fin-total-profit',
    category: 'finance',
    text: 'Total profit.',
    icon: 'DollarSign',
    badge: 'Bottom Line',
    description: 'Net profit calculation across all 10,000 order transactions'
  },
  {
    id: 'fin-aov',
    category: 'finance',
    text: 'What is the average order value?',
    icon: 'Calculator',
    description: 'Analyzes basket size, pricing efficiency, and order volume distribution'
  },
  {
    id: 'fin-revenue-vs-profit',
    category: 'finance',
    text: 'Revenue vs Profit.',
    icon: 'Activity',
    description: 'Dual-axis comparison chart tracking gross sales against bottom-line profit'
  },
  {
    id: 'fin-monthly-profit-trend',
    category: 'finance',
    text: 'Monthly profit trend.',
    icon: 'TrendingUp',
    description: 'Tracks monthly profit margins and operational efficiency over time'
  },

  // 🌍 Regional Performance
  {
    id: 'reg-best-performing',
    category: 'regional',
    text: 'Best performing region.',
    icon: 'Trophy',
    badge: 'Geographic',
    description: 'Highlights market leader in revenue, volume, and target achievement'
  },
  {
    id: 'reg-lowest-performing',
    category: 'regional',
    text: 'Lowest performing region.',
    icon: 'Compass',
    description: 'Pinpoints underperforming markets requiring sales enablement'
  },
  {
    id: 'reg-compare-all',
    category: 'regional',
    text: 'Compare all regions.',
    icon: 'Globe',
    description: 'Multi-region comparison across revenue, order size, and rep targets'
  },
  {
    id: 'reg-revenue-by-city',
    category: 'regional',
    text: 'Revenue by city.',
    icon: 'Building2',
    description: 'Metro-level breakdown of top global commercial centers'
  },

  // 📊 AI Insights
  {
    id: 'ai-summarize-performance',
    category: 'insights',
    text: 'Summarize business performance.',
    icon: 'Sparkles',
    badge: 'Executive',
    description: 'Comprehensive C-Suite briefing synthesizing sales, customers, & margins'
  },
  {
    id: 'ai-trends-observe',
    category: 'insights',
    text: 'What trends do you observe?',
    icon: 'Search',
    description: 'Pattern recognition for seasonality, discount creep, and segment shift'
  },
  {
    id: 'ai-biggest-risks',
    category: 'insights',
    text: 'What are the biggest risks?',
    icon: 'ShieldAlert',
    description: 'Audit of account concentration, discount erosion, and return rates'
  },
  {
    id: 'ai-losing-profit',
    category: 'insights',
    text: 'Where are we losing profit?',
    icon: 'TrendingDown',
    badge: 'Profit Leaks',
    description: 'Pinpoints high discount orders, low margin products, and return costs'
  },
  {
    id: 'ai-recommend-revenue',
    category: 'insights',
    text: 'Recommend ways to increase revenue.',
    icon: 'Target',
    description: 'Data-backed playbook to expand market share and enterprise accounts'
  },
  {
    id: 'ai-recommend-profitability',
    category: 'insights',
    text: 'Recommend ways to improve profitability.',
    icon: 'ShieldCheck',
    description: 'Margin expansion strategies, discount capping, and high-margin pushing'
  },
  {
    id: 'ai-opportunities-focus',
    category: 'insights',
    text: 'What opportunities should management focus on?',
    icon: 'Compass',
    description: 'Strategic roadmap prioritizing high-yield initiatives'
  },
];
