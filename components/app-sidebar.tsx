import { BookMarked, BriefcaseBusiness, Building2, ChevronDown, Gem, NotebookPen } from "lucide-react"

import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu"

// Menu items.
const items = [
    {
        title: "Blog",
        url: "#",
        icon: NotebookPen,
    },
    {
        title: "Portfolio",
        url: "#",
        icon: BriefcaseBusiness,
    },
]

export function AppSidebar() {
    return (
        <Sidebar>
            <SidebarContent>
                <SidebarGroup>
                    {/* <SidebarGroupLabel>Menu Trenza</SidebarGroupLabel> */}
                    <SidebarGroupContent>
                        <SidebarMenu>
                            <SidebarMenuItem>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <SidebarMenuButton className="bg-zinc-700 h-12">
                                            <div className="flex justify-center items-center gap-2">
                                                <div className="p-1 bg-zinc-500 rounded-md">
                                                    <Building2 />
                                                </div>
                                                <span>Selecciona la empresa</span>
                                            </div>
                                            <ChevronDown className="ml-auto" />
                                        </SidebarMenuButton>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent side="left" className="w-[--radix-popper-anchor-width] mt-2">
                                        <DropdownMenuItem>
                                            <Gem />
                                            <span>Trenza Matrimonios</span>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem>
                                            <BookMarked />
                                            <span>Trenza Estudio</span>
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </SidebarMenuItem>

                            {items.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild>
                                        <a href={item.url}>
                                            <item.icon />
                                            <span>{item.title}</span>
                                        </a>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    )
}