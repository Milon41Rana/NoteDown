"use client";

import { NoteProvider } from "@/app/context/note-context";
import { AppHeader } from "@/components/app-header";
import { FolderSidebar } from "@/components/folder-sidebar";
import { NoteEditor } from "@/components/note-editor";
import { NoteList } from "@/components/note-list";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";

export default function Home() {
  return (
    <NoteProvider>
      <SidebarProvider>
        <div className="flex h-dvh">
          <FolderSidebar />
          <SidebarInset>
            <div className="flex h-full flex-col">
              <AppHeader />
              <main className="grid flex-1 grid-cols-1 md:grid-cols-[320px_1fr] lg:grid-cols-[350px_1fr] overflow-hidden">
                <NoteList />
                <NoteEditor />
              </main>
            </div>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </NoteProvider>
  );
}
