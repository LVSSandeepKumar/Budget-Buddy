import { CircleDollarSign, PiggyBank, ReceiptText, Sparkles, Wallet } from "lucide-react";
import { useEffect, useState } from "react";
import formatNumber from "../../utils";

const InfoCard = ({ budgetList, incomeList }) => {
  const [totalBudget, setTotalBudget] = useState(0);
  const [totalSpent, setTotalSpent] = useState(0);
  const [totalIncome, setTotalIncome] = useState(0);
  const [financialAdvice, setFinancialAdvice] = useState("");

  useEffect(() => {
    if (budgetList.length > 0 || incomeList.length > 0) {
      CalculateCardInfo();
    }
  }, [budgetList, incomeList]);

  useEffect(() => {
    //if(totalBudget > 0 || totalIncome > 0 || totalSpent > 0) {
    //  const fetchFinancialAdvice = async() => {
    //    const advice = await getFinancialAdvice(totalBudget, totalIncome, totalSpent)
    //  }
    //  setFinancialAdvice(advice)
    //}
    //fetchFinancialAdvice();
  }, [totalBudget, totalIncome, totalSpent]);

  const CalculateCardInfo = () => {
    let total_Budget = 0;
    let total_Income = 0;
    let total_Spent = 0;

    budgetList.forEach((element) => {
      total_Budget = total_Budget + Number(element.amount);
      total_Spent = total_Spent + element.total_Spent;
    });

    incomeList.forEach((element) => {
      total_Income = total_Income + element.totalAmount;
    });

    setTotalBudget(total_Budget);
    setTotalIncome(total_Income);
    setTotalSpent(total_Spent);
  };

  return (
    <div>
      {budgetList.length > 0 ? (
        <div>
          <div className="p-7 border mt-4 rounded-2xl flex items-center justify-between">
            <div>
              <div className="flex mb-2 space-x-1 items-center">
                <h2>Budget Buddy AI</h2>
                <Sparkles className="rounded-full text-white w-10 h-10 p-2 bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 background-animate"/>
              </div>
              <h2 className="text-md font-light">
              {financialAdvice || "Loading Financial Advice..."}</h2>
            </div>
          </div>
          
          <div className="mt-7 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            <div className="p-7 border rounded-2xl flex items-center justify-between">
              <div>
                <h2 className="text-sm">Total Budget</h2>
                <h2 className="font-bold text-2xl">₹{formatNumber(totalBudget)}</h2>
              </div>
              <PiggyBank className="bg-blue-800 p-3 h-12 w-12 rounded-full text-white"/>
            </div>
          </div>
          <div className="mt-7 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            <div className="p-7 border rounded-2xl flex items-center justify-between">
              <div>
                <h2 className="text-sm">Total Spent</h2>
                <h2 className="font-bold text-2xl">₹{formatNumber(totalSpent)}</h2>
              </div>
              <ReceiptText className="bg-blue-800 p-3 h-12 w-12 rounded-full text-white"/>
            </div>
          </div>
          <div className="mt-7 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            <div className="p-7 border rounded-2xl flex items-center justify-between">
              <div>
                <h2 className="text-sm">No.of Budgets</h2>
                <h2 className="font-bold text-2xl">₹{budgetList.length}</h2>
              </div>
              <Wallet className="bg-blue-800 p-3 h-12 w-12 rounded-full text-white"/>
            </div>
          </div>
          <div className="mt-7 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            <div className="p-7 border rounded-2xl flex items-center justify-between">
              <div>
                <h2 className="text-sm">Total Income</h2>
                <h2 className="font-bold text-2xl">₹{formatNumber(totalIncome)}</h2>
              </div>
              <CircleDollarSign className="bg-blue-800 p-3 h-12 w-12 rounded-full text-white"/>
            </div>
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default InfoCard;
