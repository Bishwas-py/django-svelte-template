const DEFAULT_LIMIT = 20;
const DEFAULT_OFFSET = 0;
const MAX_LIMIT = 100;

export function get_paginator(url: URL) {
    let limit = Number(url.searchParams.get('limit') || DEFAULT_LIMIT);
    let offset = Number(url.searchParams.get('offset') || DEFAULT_OFFSET);

    const search = url.searchParams.get('search') || '';
    const order_by = url.searchParams.get('order_by') || '';

    limit = !isNaN(limit) && limit <= MAX_LIMIT ? limit : DEFAULT_LIMIT;
    offset = !isNaN(offset) && offset >= 0 ? offset : DEFAULT_OFFSET;

    return {
        limit,
        offset,
        search,
        order_by
    };
}