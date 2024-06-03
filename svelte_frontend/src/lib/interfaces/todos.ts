import type {GenericResponse} from "$lib/interfaces/index";

export type Todo = {
    title: string
    completed_at: string
    will_complete_at: string
} & GenericResponse