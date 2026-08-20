export interface Order {
  orderId: string;
  orderDate: string;
  customerId: string;
  customerName: string;
  city: string;
  state: string;
  country: string;
  region: string;
  salesperson: string;
  productId: string;
  productName: string;
  category: string;
  subCategory: string;
  quantity: number;
  unitPrice: number;
  discountPercent: number;
  revenue: number;
  cost: number;
  profit: number;
  profitMarginPercent: number;
  orderStatus: 'Delivered' | 'Shipped' | 'Processing' | 'Cancelled' | 'Returned';
  deliveryDate: string;
  paymentMethod: 'Credit Card' | 'Wire Transfer' | 'ACH' | 'PayPal' | 'Corporate Account';
}

export interface Customer {
  customerId: string;
  customerName: string;
  industry: string;
  companySize: 'Enterprise' | 'Mid-Market' | 'SMB' | 'Startup';
  city: string;
  state: string;
  country: string;
  customerSince: string;
  lifetimeValue: number;
  customerSegment: 'VIP Enterprise' | 'High Value SMB' | 'Regular Corporate' | 'At Risk';
}

export interface Product {
  productId: string;
  productName: string;
  category: string;
  subCategory: string;
  brand: string;
  costPrice: number;
  sellingPrice: number;
}

export interface SalesTarget {
  month: string;
  region: string;
  salesperson: string;
  salesTarget: number;
}

export type QuestionCategory = 'sales' | 'customers' | 'products' | 'finance' | 'regional' | 'insights';

export interface QuestionItem {
  id: string;
  category: QuestionCategory;
  text: string;
  icon: string;
  badge?: string;
  description?: string;
}

export interface KPI {
  label: string;
  value: string;
  change?: string;
  isPositive?: boolean;
  subtext?: string;
  category?: string;
}

export interface ChartSeriesKey {
  key: string;
  name: string;
  color: string;
  type?: 'bar' | 'line' | 'area';
}

export interface ChartConfig {
  xAxisKey: string;
  dataKeys: ChartSeriesKey[];
  title: string;
  subtitle?: string;
  formatValue?: 'currency' | 'number' | 'percent';
}

export interface AnalysisResult {
  questionId: string;
  question: string;
  category: QuestionCategory;
  summary: string;
  keyFindings: string[];
  kpis: KPI[];
  chartType: 'line' | 'bar' | 'donut' | 'pie' | 'scatter' | 'heatmap' | 'area' | 'composed';
  chartData: Record<string, any>[];
  chartConfig: ChartConfig;
  tableHeaders: string[];
  tableRows: Record<string, any>[];
  insights: string[];
  recommendations: Array<{ title: string; desc: string; priority: 'High' | 'Medium' | 'Strategic' }>;
  confidence: string;
  calculationExplanation: string;
}

export type ViewMode = 'dashboard' | 'assistant' | 'dataset';
