export interface PaginationPageModel {
  page: number;
  countPage?: number;
  countOnPage?: string;
  propsSelect?: { name: string | number; option: string | number }[];

  onChange?(page: number): void;

  onChangeCount?(page: string | number): void;
}

export interface PaginationPage {
  count?: number;
  all_appeals_counts?: string;
  has_next?: boolean;
  has_previous?: boolean;
  page?: number;
  page_size?: number;
}
