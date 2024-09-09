export interface AppealsSubjects {
  appeals_topic: KeyValue[];
  refund_ticket_subjects: KeyValue[];
  trade_ticket_subjects: KeyValue[];
  additional_service_subjects: KeyValue[];
  other_subjects: KeyValue[];
}

export interface KeyValue {
  key: string;
  value: string;
}
