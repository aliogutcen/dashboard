import { ReactNode } from "react";

export interface SidebarItem {
    id:number;
    item: string;
    icon?: ReactNode;
    link?: string;
    subItems?: SidebarItem[];
}
