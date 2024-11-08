import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"

export default function BlogLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <section className="">
            <SidebarProvider>
                <AppSidebar />
                <div className="w-full py-4 px-2">
                    <div className="flex flex-col">
                        <div>
                            <SidebarTrigger />
                        </div>
                        <div className="px-4">
                            {children}
                        </div>
                    </div>
                </div>
            </SidebarProvider>
        </section>
    );
}