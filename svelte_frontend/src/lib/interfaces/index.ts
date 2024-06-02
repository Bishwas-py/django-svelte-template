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
