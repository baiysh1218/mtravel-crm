import { User } from "@/entities/application/module/appealItem.ts";
import { ExchangeAppeal } from "@/entities/application/module/edit-appeal.ts";
import { FlightAppealTicket } from "@/entities/flight/model/flightTicket.ts";
import { REQUEST_STATUS, TYPE_APPLICATION } from "@/shared/constants";

export interface AppealFlight {
  id: string;
  user: User;
  new_messages_count: number;
  flight_appeal: FlightAppeal;
  details: string;
  topic?: TYPE_APPLICATION;
  status: REQUEST_STATUS;
  email: any;
  created_at: string;
  updated_at: string;
  commentary?: string;
  responsible?: Responsible;
}

export interface FlightAppeal {
  id: number;
  ticket: FlightAppealTicket[];
  // flight_appeal_messages: FlightAppealMessage[]
  created: string;
  billing_number: number;
  topic: string;
  status: string;
  avia_appeal_id: string;
  passengers: string[][];
  last_message_created: string;
  appeal: string;
  transactions: OtherAppealTransactions[];
  appeals_detail: ExchangeAppeal;
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

export interface FlightAppealMessage {
  id: number;
  subject: string;
  body: string;
  ticket_id: number;
  created_at: string;
  is_readed: boolean;
  is_outgoing: boolean;
  avia_article_id: string;
  flight_appeals: number;
}

export interface OtherAppealTransactions {
  id: string;
  amount: string;
  appeal_id: string;
  appeal_status: REQUEST_STATUS;
  appeal_topic: TYPE_APPLICATION;
}

export interface Responsible {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  role: string;
}
