export interface FormCreateAdditionalService {
  topic?: string;
  files?: File[];
  details?: string;
  passengers?: string[];
}

export interface FormCreateAppeal {
  topic: string;
  subject: string;
  details: string;
  passengers: string[];
  files: File[];
}

export interface CreateAppeal {
  billing_number: string;
  topic: string;
  subject: string;
  details?: string;
  appeals_detail: AppealsDetail;
}

export interface CreateAppealFormData {
  billing_number: number | null;
  topic: string;
  subject?: string;
  details?: string;
  images?: File[];
  appeals_detail?: AppealsDetail | string;
}

export interface CreateAdditionalService {
  billing_number: string;
  appeals: Appeal[];
}

export interface Appeal {
  topic?: string;
  details: string;
  appeals_detail: AppealsDetail;
}

export interface AppealsDetail {
  commentary?: string;
  status?: string;
  penality_amount?: string;
  passengers?: PassengerAppeal[];
}

export interface PassengerAppeal {
  passenger_key?: string;
  price_of_service?: string;
  status?: string;
}

export interface RefundAppeal {
  user_id: string;
  billing_number: number;
  amount: string;
  appeals_detail: AppealsDetail;
}
