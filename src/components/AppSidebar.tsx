
import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';
import { Monitor, Users, Settings, Calendar, CalendarCheck } from 'lucide-react';

const menuItems = [
  { title: 'Queue Display', value: 'display', icon: Monitor },
  { title: 'Patient Check-In', value: 'checkin', icon: Users },
  { title: 'Staff Panel', value: 'staff', icon: Settings },
  { title: 'Schedule', value: 'schedule', icon: Calendar },
  { title: 'Appointments', value: 'appointments', icon: CalendarCheck },
];

interface AppSidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function AppSidebar({ activeTab, onTabChange }: AppSidebarProps) {
  const { state } = useSidebar();
  const isCollapsed = state === 'collapsed';

  return (
    <Sidebar className="border-r border-gray-200">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-blue-600 font-semibold">
            Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.value}>
                  <SidebarMenuButton
                    onClick={() => onTabChange(item.value)}
                    isActive={activeTab === item.value}
                    className={`w-full justify-start ${
                      activeTab === item.value
                        ? 'bg-blue-600 text-white hover:bg-blue-700'
                        : 'hover:bg-gray-100'
                    }`}
                  >
                    <item.icon className="h-4 w-4" />
                    {!isCollapsed && <span>{item.title}</span>}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
