"use client";

import { useNoteContext } from "@/app/context/note-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { Folder, PlusCircle } from "lucide-react";
import { useState } from "react";

export function FolderSidebar() {
  const { folders, activeFolderId, selectFolder, addFolder } = useNoteContext();
  const [newFolderName, setNewFolderName] = useState("");

  const handleAddFolder = () => {
    if (newFolderName.trim()) {
      addFolder(newFolderName.trim());
      setNewFolderName("");
    }
  };

  return (
    <Sidebar>
      <SidebarHeader>
        <h2 className="text-lg font-semibold tracking-tight">Folders</h2>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {folders.map((folder) => (
            <SidebarMenuItem key={folder.id}>
              <SidebarMenuButton
                onClick={() => selectFolder(folder.id)}
                isActive={activeFolderId === folder.id}
                className="w-full justify-start"
              >
                <Folder className="h-4 w-4" />
                <span>{folder.name}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <Input
              type="text"
              placeholder="New Folder..."
              value={newFolderName}
              onChange={(e) => setNewFolderName(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleAddFolder()}
              className="h-9"
            />
            <Button
              variant="ghost"
              size="icon"
              onClick={handleAddFolder}
              className="h-9 w-9 flex-shrink-0"
              aria-label="Add new folder"
            >
              <PlusCircle className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
