export type FilterTypes = "status" | "species" | "gender";
export type Option<T> = { label: string; value: T };
export type Filters = Record<FilterTypes, string>;
