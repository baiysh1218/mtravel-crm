import { TRANSACTION_STATUS } from "@/shared/constants";
import { PaginationPage } from "@/shared/models/pagination.ts";

export interface TransactionList extends PaginationPage {
  results: TransactionItem[];
}

export interface StatusCountResult {
  all_transactions_count: string;
  status_counts: StatusCount[];
}

export interface StatusCount {
  status: number;
  count: number;
}

export interface TransactionItem {
  id: string;
  user_id: string;
  user_first_name: string;
  user_last_name: string;
  user_middle_name: string;
  ticket_billing_number: number;
  ticket_departure_date: string;
  ticket_departure_time: string;
  ticket_arrival_date: string;
  ticket_arrival_time: string;
  amount: string;
  status: TRANSACTION_STATUS;
  payment_provider: number;
  created_at: string;
  updated_at: string;
}
