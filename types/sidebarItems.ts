import { LucideProps } from "lucide-react";

interface AppSubItem {
    title: string;
    href: string;
    color: string;
}

export interface AppSideBarItems {
    title: string;
    href: string;
    color: string;
    icon: React.ForwardRefExoticComponent<Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>
    subItems?: AppSubItem[]
}
