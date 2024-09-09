import { TYPE_APPLICATION } from "@/shared/constants";
import { PaginationPage } from "@/shared/models/pagination.ts";

export interface AppealsList extends PaginationPage {
  results: AppealItem[];
}

export interface AppealItem {
  id: string;
  user: User;
  details: string;
  topic: string;
  status: string;
  email: string;
  created_at: string;
  updated_at: string;
  new_messages_count?: number;
}

export interface User {
  id: string;
  first_name: string;
  last_name: string;
  middle_name: string;
  email: string;
  phone_number: string;
}

export interface StatusAppeal {
  status: string;
  count: string;
}

export interface TypeAppealCount {
  appeals_counts: string;
  topic_counts: TopicCount[];
}

interface TopicCount {
  topic: TYPE_APPLICATION;
  count: number;
}
