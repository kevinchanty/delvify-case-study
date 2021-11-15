import { createContext } from "react";

export type ListContextState =
    { status: "LOADING" | "ERROR" } |
    { status: "LOADED", value: ListValue[] }

export type ListValue = {
    id: number,
    user_id: number,
    name: string,
    is_deleted: boolean,
    created_at: string,
    updated_at: string,
}

export const ListContext = createContext<ListContextState>({ status: "LOADING" });
