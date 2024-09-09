import { Segment } from "@/shared/models/flight";

export interface FlightAppealTicket {
  id: string;
  transactions: any[];
  flight_details: FlightDetails;
  price: string;
  billing_number: number;
  status: string;
  is_refund: boolean;
  created_at: string;
  updated_at: string;
  tid: string;
  is_baggage: boolean;
  is_cbaggage: boolean;
  is_change: boolean;
  booking_expire: string;
  user: string;
  ticket_transaction_status: {
    status: number;
  };
}
export interface FlightDetails {
  order: Order;
  flight: OrderFlight;
  tickets: Tickets[];
  order_price_details: OrderPriceDetails;
  passengers_price_details: PassengersPriceDetail[];
  agent_mode_prices: AgentModePrices;
  is_vtrip: boolean;
}

export interface Order {
  order_id: number;
  billing_number: number;
  expire: string;
  created: string;
  price: Price;
}

export interface Price {
  KGS: Kgs;
}

export interface Kgs {
  fare: string;
  fee: string;
  taxes: string;
  insurance: string;
  discount: string;
  extra_baggage: string;
  amount: string;
  amount_base: string;
  amount_without_payment_expense: string;
}

export interface OrderFlight {
  duration: number;
  type: string;
  provider: ProviderFlight;
  segments: Segment[];
}

export interface ProviderFlight {
  gds: number;
  name: string;
  supplier: Supplier;
}

export interface Supplier {
  id: number;
  code: string;
  title: string;
  logo_url: string;
}

export interface Duration {
  flight: Flight;
  transfer?: null;
}

export interface Flight {
  common: number;
  hour: number;
  minute: number;
}

export interface Carrier {
  id: number;
  code: string;
  title: string;
  logo_url: string;
}

export interface Tickets {
  locator: string;
  vnd_locators: string[];
  booking_office_id: string;
  receipt_text: string;
  actual: boolean;
  documents: Documents;
  booking_provider: string;
  provider: ProviderTicket;
  carrier: Carrier;
  duration: Duration;
  passengers: Passenger[];
  special_tariff_type: any;
  fare_family_marketing_name: string;
}

export interface Documents {
  ticket_receipt: string;
}

export interface ProviderTicket {
  name: string;
  currency: string;
}

export interface Passenger {
  id: number;
  name: Name;
  email: string;
  phone: string;
  gender: string;
  birthdate: string;
  citizenship: string;
  age: string;
  document: Document;
  ticketData: TicketData;
  bonus_card: any;
  key: string;
  uuid: string;
  insurances: any[];
  accompanying_adults: any[];
}

export interface Name {
  first: string;
  middle: string;
  last: string;
}

export interface Document {
  type: string;
  num: string;
  original_number: string;
  expire: string;
}

export interface TicketData {
  number: any;
  text: any;
  refunded: boolean;
}

export interface OrderPriceDetails {
  my_agent_fee: string;
  affiliate_fee: string;
  agent_affiliate_fee: string;
  partner_affiliate_fee: string;
  comsa: string;
  total_agent_profit: string;
  tickets_price: string;
  insurance_price: string;
  acquiring: string;
  total_price: string;
  total_price_without_comsa: string;
}

export interface PassengersPriceDetail {
  key: string;
  affiliate_fee: number;
  agent_affiliate_fee: number;
  partner_affiliate_fee: number;
  comsa: number;
  ticket_price: number;
  acquiring: number;
  insurance_price: number;
  vat: number;
  taxes_amount: number;
  tariff: number;
  fee: number;
  commissions: Commissions;
  taxes: Tax[];
  uuid: string;
  refund_amounts: any;
}

export interface Commissions {
  other_commission: number;
}

export interface Tax {
  code: string;
  amount: number;
  currency: string;
}

export interface AgentModePrices {
  debit_from_balance: number;
  total_amount_for_active_agent_mode: number;
  passengers_amounts_details: PassengersAmountsDetail[];
}

export interface PassengersAmountsDetail {
  key: string;
  service_amount_for_active_agent_mode: number;
  service_amount_for_non_active_agent_mode: number;
}
