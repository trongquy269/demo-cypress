export type HttpResponse<T> = {
  status: number;
  message: string;
  data?: T;
};
