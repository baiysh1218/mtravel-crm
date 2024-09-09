import { PassengerAppeal } from "@/entities/application/module/create-appeal.ts";

export interface ExchangeAppeal {
  commentary?: string;
  penality_amount?: string;
  trade_price_amount?: string;
  passengers?: PassengerAppeal[];
}

export interface RefundTicket {
  user_id: string;
  billing_number: string;
  amount: string;
  appeals_detail: ExchangeAppeal;
}

export interface AddInformationAppeal {
  status?: string;
  commentary?: string;
  crm_user_id?: number;
}

export interface ChangeAppealData<Data> {
  billing_id: string;
  data: Data;
}
