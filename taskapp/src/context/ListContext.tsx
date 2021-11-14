import { createContext } from "react";

export type ListContextState =
    { status: "LOADING" | "ERROR" } |
    { status: "LOADED", value: { id: number, name: string }[] }

export const ListContext = createContext<ListContextState>({ status: "LOADING" });
