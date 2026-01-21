"use client";

import * as React from "react";
import { Download, FileText, Settings } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  RadioGroup,
  RadioGroupItem,
} from "@/components/ui/radio-group";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useToast } from "@/hooks/use-toast";

export function AppHeader() {
  const { toast } = useToast();

  const handleExport = () => {
    toast({
      title: "Exporting PDF",
      description: "PDF generation is a work in progress!",
    });
  };

  return (
    <header className="flex h-14 items-center gap-4 border-b bg-background/95 px-4 lg:h-[60px] lg:px-6">
      <SidebarTrigger className="md:hidden" />
      <div className="flex flex-1 items-center gap-2">
        <FileText className="h-6 w-6 text-primary" />
        <h1 className="text-lg font-semibold tracking-tight">NoteDown</h1>
      </div>
      <Dialog>
        <DialogTrigger asChild>
          <Button size="sm" className="gap-2 bg-accent text-accent-foreground hover:bg-accent/90">
            <Download className="h-4 w-4" />
            <span className="hidden sm:inline">Download PDF</span>
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5"/>
              Export to PDF
            </DialogTitle>
            <DialogDescription>
              Customize the formatting of your exported PDF document.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="page-size" className="text-right">
                Page Size
              </Label>
              <RadioGroup defaultValue="a4" className="col-span-3 flex gap-4">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="a4" id="a4" />
                  <Label htmlFor="a4">A4</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="letter" id="letter" />
                  <Label htmlFor="letter">Letter</Label>
                </div>
              </RadioGroup>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="orientation" className="text-right">
                Orientation
              </Label>
              <RadioGroup
                defaultValue="portrait"
                className="col-span-3 flex gap-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="portrait" id="portrait" />
                  <Label htmlFor="portrait">Portrait</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="landscape" id="landscape" />
                  <Label htmlFor="landscape">Landscape</Label>
                </div>
              </RadioGroup>
            </div>
          </div>
          <DialogFooter>
            <Button
              onClick={handleExport}
              className="w-full bg-accent text-accent-foreground hover:bg-accent/90"
            >
              Export
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </header>
  );
}
