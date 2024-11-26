"use client";

import { BookMarked, BookOpen, Briefcase, Building2, Camera, ChevronDown, Edit, FileText, Gem, Home, LogOut, Plus, Trash2, User } from "lucide-react"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
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
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./ui/collapsible";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

const sections = [
    {
        name: 'Blog',
        icon: BookOpen,
        items: [
            { name: 'Nuevo', icon: Plus, urlMatrimonio: '/admin/trenza-matrimonios/blog/nuevo', urlEstudio: '/admin/trenza-estudio/blog/nuevo' },
            { name: 'Blogs', icon: FileText, urlMatrimonio: '/admin/trenza-matrimonios/blog', urlEstudio: '/admin/trenza-estudio/blog' }
        ]
    },
    {
        name: 'Portafolio',
        icon: Briefcase,
        items: [
            { name: 'Nuevo', icon: Plus, urlMatrimonio: '/admin/trenza-matrimonios/portfolio/nuevo', urlEstudio: '/admin/trenza-estudio/portafolio/nuevo' },
            { name: 'Portafolio', icon: Camera, urlMatrimonio: '/admin/trenza-matrimonios/portfolio', urlEstudio: '/admin/trenza-estudio/portafolio' }
        ]
    },
]
const currentUser = {
    name: 'Felipe',
    email: 'Trenzaestudiomatrimonios@gmail.com',
    avatar: 'https://github.com/shadcn.png',
}

export function AppSidebar() {
    const router = usePathname();
    const isInSection = (path: string, section: string) => new RegExp(`^/admin/${section}`).test(path);


    return (
        <Sidebar collapsible="icon">
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            <SidebarMenuItem>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <SidebarMenuButton className="bg-zinc-700 h-12 group-data-[collapsible=icon]:!p-0">
                                            <div className="flex justify-center items-center gap-2">
                                                <div className="p-1 bg-zinc-500 rounded-md">
                                                    {
                                                        isInSection(router, "trenza-matrimonios") ? <Gem /> :
                                                            isInSection(router, "trenza-estudio") ? <BookMarked /> : <Building2 />
                                                    }
                                                </div>
                                                <span className="text-nowrap">
                                                    {
                                                        isInSection(router, "trenza-matrimonios") ? "Trenza Matrimonios" :
                                                            isInSection(router, "trenza-estudio") ? "Trenza Estudio" : "Selecciona la empresa"
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
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            <SidebarGroupLabel>Acciones</SidebarGroupLabel>
                            <SidebarMenuItem >
                                <SidebarMenuButton asChild>
                                    <Link href="/admin">
                                        <Home />
                                        <span>Inicio</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            {isInSection(router, "trenza-matrimonios") && sections.map((section) => (
                                <Collapsible key={section.name}>
                                    <CollapsibleTrigger asChild>
                                        <SidebarMenuItem >
                                            <SidebarMenuButton asChild>
                                                <div className="w-full flex justify-between items-center">
                                                    <span className="flex items-center">
                                                        <section.icon className="mr-2 h-4 w-4" />
                                                        <span className="group-data-[collapsible=icon]:hidden">{section.name}</span>
                                                    </span>
                                                    <ChevronDown className="h-4 w-4 group-data-[collapsible=icon]:hidden" />
                                                </div>
                                            </SidebarMenuButton>
                                        </SidebarMenuItem>
                                    </CollapsibleTrigger>
                                    <CollapsibleContent>
                                        <SidebarGroupContent>
                                            <SidebarMenu>
                                                {section.items.map((option) => (
                                                    <SidebarMenuItem key={option.name}>
                                                        <SidebarMenuButton>
                                                            <Link href={isInSection(router, "trenza-matrimonios") ? option.urlMatrimonio : option.urlEstudio} className="flex items-center w-full">
                                                                <option.icon className="mr-4 h-4 w-4" />
                                                                <span className="group-data-[collapsible=icon]:hidden">{option.name}</span>
                                                            </Link>
                                                        </SidebarMenuButton>
                                                    </SidebarMenuItem>
                                                ))}
                                            </SidebarMenu>
                                        </SidebarGroupContent>
                                    </CollapsibleContent>
                                </Collapsible>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <SidebarMenuButton size="lg" className="w-full justify-start">
                                    <Avatar className="h-6 w-6 mr-2">
                                        <AvatarImage src={currentUser.avatar} alt={currentUser.name} />
                                        <AvatarFallback>{currentUser.name.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                    <span className="flex-1 text-left group-data-[collapsible=icon]:hidden">
                                        {currentUser.name}
                                    </span>
                                </SidebarMenuButton>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-56" align="end">
                                <DropdownMenuItem>
                                    <User className="mr-2 h-4 w-4" />
                                    <span>Perfil</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <LogOut className="mr-2 h-4 w-4" />
                                    <span>Cerrar sesión</span>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    )
}