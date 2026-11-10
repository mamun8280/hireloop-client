import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { useSession } from "@/lib/auth-client"

const menuItemsByRole = {
  seeker: [],
  recruiter: [],
  admin: [],
}

export function DashboardSidebar() {
  const { data: session, isPending } = useSession()
  const role = session?.user?.role || "seeker"

  return (
    <Sidebar className="mt-22">
      <SidebarHeader />
      <SidebarContent>
        <SidebarGroup />
        <SidebarGroup />
        <SidebarMenu>
          {
          
            // menuItemsByRole[role]?.map((item) => (
            //     <SidebarMenuItem key={item.name}>
            //     <SidebarMenuButton render={<a href={item.url} />}>
            //         <item.icon />
            //         <span>{item.name}</span>
            //     </SidebarMenuButton>
            //     </SidebarMenuItem>
            // ))
          
          }
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  )
}
