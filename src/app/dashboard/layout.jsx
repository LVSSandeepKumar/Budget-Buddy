"use client";
import { ClerkProvider, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { db } from "../../../utils/dbConfig";
import { Budgets } from "../../../utils/schema";
import { eq } from "drizzle-orm";
import SideNav from "@/components/SideNav";
import DashboardHeader from "@/components/DashboardHeader";

const DashboardLayout = ({ children }) => {
  const { user } = useUser();
  const router = useRouter();

  useEffect(() => {
    user && checkUserBudget();
  }, [user]);

  const checkUserBudget = async () => {
    const result = await db
      .select()
      .from(Budgets)
      .where(eq(Budgets.createdBy, user?.primaryEmailAddress?.emailAddress));
    if (result.length === 0) {
      //router.replace("/dashbooard/budgets");
    }
  };

  return (
    
      <div>
        <div className="fixed md:w-64 hidden md:block">
          <SideNav />
        </div>
        <div className="md:ml-64">
          <DashboardHeader />
          {children}
        </div>
      </div>
    
  );
};

export default DashboardLayout;
