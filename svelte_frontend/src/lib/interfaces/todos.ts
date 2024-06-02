import type {GenericResponse} from "$lib/interfaces/index";

export type Todo = {
    title: string
    completed: boolean
} & GenericResponse