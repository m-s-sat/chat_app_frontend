"use client";
import { ReactNode, useEffect } from "react";
import { useAppDispatch } from "@/lib/hooks";
import { checkUserAsync } from "@/lib/features/Auth/authSlice";
import { Nav } from "./Nav";

export default function AppShell({ children }: { children: ReactNode }) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(checkUserAsync());
  }, [dispatch]);

  return (
    <section>
      <Nav />
      {children}
    </section>
  );
}