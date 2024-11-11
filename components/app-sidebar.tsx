"use client";

import { BookMarked, BriefcaseBusiness, Building2, ChevronDown, Gem, Home, NotebookPen } from "lucide-react"
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
import Link from "next/link"
import { usePathname } from 'next/navigation';

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
    const router = usePathname();


    return (
        <Sidebar>
            <SidebarContent>
                <SidebarGroup>
                    {/* <SidebarGroupLabel>{router}</SidebarGroupLabel> */}
                    <SidebarGroupContent>
                        <SidebarMenu>
                            <SidebarMenuItem>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <SidebarMenuButton className="bg-zinc-700 h-12">
                                            <div className="flex justify-center items-center gap-2">
                                                <div className="p-1 bg-zinc-500 rounded-md">
                                                    {
                                                        router === "/admin/trenza-matrimonios" ? <Gem /> :
                                                            router === "/admin/trenza-estudio" ? <BookMarked /> : <Building2 />
                                                    }
                                                </div>
                                                <span>
                                                    {
                                                        router === "/admin/trenza-matrimonios" ? "Trenza Matrimonios" :
                                                            router === "/admin/trenza-estudio" ? "Trenza Estudio" : "Selecciona la empresa"
                                                    }
                                                </span>
                                            </div>
                                            <ChevronDown className="ml-auto" />
                                        </SidebarMenuButton>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent side="left" className="w-[--radix-popper-anchor-width] mt-2">
                                        <DropdownMenuItem >
                                            <Link href="/admin/trenza-matrimonios" className="flex justify-center items-center gap-2">
                                                <Gem />
                                                <span>Trenza Matrimonios</span>
                                            </Link>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem>
                                            <Link href="/admin/trenza-matrimonios" className="flex justify-center items-center gap-2">
                                                <BookMarked />
                                                <span>Trenza Estudio</span>
                                            </Link>
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </SidebarMenuItem>
                            <SidebarMenuItem >
                                <SidebarMenuButton asChild>
                                    <Link href="/admin">
                                        <Home />
                                        <span>Inicio</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>

                            {
                                router === "/admin/trenza-matrimonios" ? items.map((item) => (
                                    <SidebarMenuItem key={item.title}>
                                        <SidebarMenuButton asChild>
                                            <Link href={item.url}>
                                                <item.icon />
                                                <span>{item.title}</span>
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                )) : router === "/admin/trenza-estudio" ? items.map((item) => (
                                    <SidebarMenuItem key={item.title}>
                                        <SidebarMenuButton asChild>
                                            <Link href={item.url}>
                                                <item.icon />
                                                <span>{item.title}</span>
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                )) :
                                    null
                            }
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    )
}