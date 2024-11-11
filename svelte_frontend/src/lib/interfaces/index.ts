import type {ActionResult} from "@sveltejs/kit";

export interface GenericResponse {
  id: number;
  created_at: string;
  updated_at: string;
}

export interface OffsetPaginated<T> {
  offset: number;
  limit: number;
  search: string;
  order_by: string;
  items: T[];
  total_pages: number;
  has_next: boolean;
  has_previous: boolean;
}

export type FormActionResult<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Success extends GenericObject = Record<string, any>,
  Failure extends GenericObject = Partial<ErrorResponseData>,
> = Exclude<ActionResult<Success, Failure>, { type: 'redirect' }>;
