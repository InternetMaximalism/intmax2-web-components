"use client";

import * as React from "react";

import * as TabsPrimitive from "@radix-ui/react-tabs";

import { cn } from "@/utils";

const Tabs2 = TabsPrimitive.Root;

const Tabs2List = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn("flex border-b border-gray-250 font-inter", className)}
    {...props}
  />
));
Tabs2List.displayName = TabsPrimitive.List.displayName;

const Tabs2Trigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      "px-4 pt-3 pb-2 border-b-4 border-transparent transition-all relative text-gray-600 data-[state=active]:text-black data-[state=active]:font-medium data-[state=active]:border-b-black",
      className,
    )}
    {...props}
  />
));
Tabs2Trigger.displayName = TabsPrimitive.Trigger.displayName;

const Tabs2Content = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      "ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 mt-4 space-y-4",
      className,
    )}
    {...props}
  />
));
Tabs2Content.displayName = TabsPrimitive.Content.displayName;

export { Tabs2, Tabs2List, Tabs2Trigger, Tabs2Content };
