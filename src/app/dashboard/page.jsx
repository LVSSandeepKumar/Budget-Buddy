"use client"
import InfoCard from "@/components/InfoCard";
import { useUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { db } from "../../../utils/dbConfig";
import { desc, eq, getTableColumns, sql } from "drizzle-orm";
import { Budgets, Expenses, Incomes } from "../../../utils/schema";
import BarChartDashboard from "@/components/BarChartDashboard";

const Dashboard = () => {
  
  const {user} = useUser();

  const [budgetList, setBudgetList] = useState([]);
  const [incomeList, setIncomeList] = useState([]);
  const [espensesList, setExpensesList] = useState([]);

  useEffect(() => {
    if(!user) {
      redirect("/sign-in");
    }
    user && getBudgetList()
  }, [user])

  const getBudgetList = async() => {
    const result = await db.select({
      ...getTableColumns(Budgets),
      totalSpent: sql`sum(cast(${Expenses.amount} as numeric()))`.mapWith(Number),
      totalItem: sql`count(${Expenses.id})`.mapWith(Number)
    }).from(Budgets).leftJoin(Budgets.id, Expenses.budgetId)
    .where(eq(Budgets.createdBy, user?.primaryEmailAddress?.emailAddress))
    .groupBy(Budgets.id)
    .orderBy(desc(Budgets.id));

    setBudgetList(result);
    getAllExpenses();
    getIncomeList();
  }

  const getAllExpenses = async () => {
    const result = await db.select({
      id: Expenses.id,
      name: Expenses.name,
      amount: Expenses.amount,
      createdAt: Expenses.createdAt
    }).from(Budgets).rightJoin(Expenses, eq(Budgets.id, Expenses.budgetId))
    .where(eq(Budgets.createdBy, user?.primaryEmailAddress?.emailAddress))
    .orderBy(desc(Expenses.id));

    setExpensesList(result);
  }

  const getIncomeList = async() => {
    const result = await db.select({
      ...getTableColumns(Incomes),
      totalAmount: sql`sum(cast(${Incomes.amount} as numeric()))`.mapWith(Number)
    }).from(Incomes).groupBy(Incomes.id);

    setIncomeList(result);
  }

  return (
    <div className="p-8">
      <h2 className="text-4xl font-bold">
        Hi, {user?.fullName}
      </h2>
      <p className="text-gray-500">Have a look at what's happening with your money. Manage your expenses now.</p>
      <InfoCard budgetList={budgetList} incomeList={incomeList}/>
      <div className="grid grid-cols-1 lg:grid-cols-3 mt-6 gap-5">
        <div className="lg:col-span-2">
          {
             <BarChartDashboard budgetList={budgetList} />

            // <ExpenseListTable expenseList={expenseList}
            //  refreshData={() => getBudgetList()}
            // />
          }
        </div>
        <div className="grid gap-5">
          <h2 className="font-bold text-lg">Latest Budgets</h2>
          { budgetList?.length > 0 ? budgetList.map((budget, index) => (
            <BudgetItem budget={budget} key={index} />
          )) : (
            [1,2,3,4].map((item, index) => (
              <div className="h-[180px] w-full bg-slate-200 animate-pulse"></div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
