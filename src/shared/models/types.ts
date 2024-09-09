export interface ApiError {
  status: number;
  data: { message: string };
}

export interface RefreshToken {
  data: {
    access: string;
  };
}
