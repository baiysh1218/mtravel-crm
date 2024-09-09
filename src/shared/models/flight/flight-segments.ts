export interface Segment {
  ticket_duration: number;
  type: string;
  provider: ProviderSegment;
  baggage: Baggage;
  comment: string;
  cbaggage: Cbaggage;
  is_refund: boolean;
  is_change: boolean;
  flight_number: number;
  direction: number;
  duration: Duration;
  class_: Class;
  fare_code: string;
  carrier: Carrier;
  is_mini_rules_exists: boolean;
  is_online_checkin_required: boolean;
  baggage_recheck: boolean;
  refunded_status: any;
  arr: Arr;
  dep: Dep;
}

export interface Arr {
  date: string;
  time: string;
  datetime: string;
  terminal: string;
  airport: Airport;
  city: City;
}

export interface Airport {
  title: string;
  code: string;
}

export interface City {
  code: string;
  title: string;
}

export interface Dep {
  date: string;
  time: string;
  datetime: string;
  terminal: string;
  airport: Airport;
  city: City;
}

export interface Baggage {
  piece: number;
  weight: number;
}

export interface Cbaggage {
  piece: number;
  weight: number;
}

export interface Carrier {
  id: number;
  code: string;
  title: string;
  logo_url: string;
}

export interface Class {
  type_id: number;
  name: string;
  title: string;
}

export interface Duration {
  flight: FlightTimer;
  transfer?: FlightTimer;
}

export interface FlightTimer {
  common: number;
  hour: number;
  minute: number;
}

export interface ProviderSegment {
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
