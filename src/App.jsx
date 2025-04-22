import { useMemo, useEffect, useState } from "react";
import "./App.css"; 

import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

function App() {
  const [homeValue, setHomeValue] = useState(3000);
  const homeMin = 1000;
  const homeMax = 10000;
  const homeStep = 100;

  const [downPaymentValue, setDownPaymentValue] = useState(600);
  const downPaymentMin = 0;
  const downPaymentMax = homeValue;
  const downPaymentStep = 100;

  const [loanAmountValue, setLoanAmountValue] = useState(200);

  useEffect(() => {
    setLoanAmountValue(
      homeValue - downPaymentValue
    )
  }, [downPaymentValue,homeValue])

  const [interestValue, setInterestValue] = useState(5);
  const interestMin = 2;
  const interestMax = 18;
  const interestStep = 1;

  const [tenure, setTenureValue] = useState(5);

  const [emi, setEmi] = useState(0);
  useEffect(() => {
    const principal = loanAmountValue;
    const interestRate = interestValue / 12 / 100;
    const months = tenure * 12;
    if(interestRate === 0){
      setEmi(principal / months);
    }else{
      const emiCalc = (principal * interestRate * Math.pow(1 + interestRate, months)) /
                    (Math.pow(1 + interestRate, months) - 1);
      setEmi(emiCalc.toFixed(2));
    }
  }, [loanAmountValue,tenure,interestValue])
  
  useEffect(() => {
    console.log("Emi:- ", emi);
  }, [emi])

  const totalPayment = emi * (tenure * 12);
  const totalInterest = totalPayment - loanAmountValue;

  const data = {
    labels: ['Principal', 'Interest'],
    datasets: [
      {
        label: 'Loan Breakdown',
        data: [loanAmountValue, totalInterest],
        backgroundColor: ['#ffe0e6', '#d7ecfb'],
        borderWidth: 1,
      },
    ],
  };
  

  return (
    <>
      <header className="h-16 bg-[#1976d2] flex items-center px-10">
        <h1 className="text-3xl text-white font-medium">Banck of React</h1>
      </header>
      <main className="flex flex-col items-center lg:flex-row w-[100%]">
        <div className="ranges py-10 px-5 w-[100%] lg:w-[50%] flex flex-col justify-center items-center">
          <div className="range-div w-[100%] my-5">
            <h1>Home Value</h1>
            <h1 className="text-2xl font-medium">${homeValue}</h1>
            <div className="inner-div w-[100%]">
              <input type="range" name="" id="" value={homeValue} min={homeMin} max={homeMax} step={homeStep} className="slider w-[90%]" onChange={(e) => setHomeValue(Number(e.target.value))}/>
              <div className="min-max-range flex justify-between w-[90%]">
                <span>$1000</span>
                <span>$10000</span>
              </div>
            </div>
          </div>
          <div className="range-div w-[100%]">
            <h1>Down Payment</h1>
            <h1 className="text-2xl font-medium">${downPaymentValue}</h1>
            <div className="inner-div w-[100%] my-5">
              <input type="range" name="" id="" value={downPaymentValue} min={downPaymentMin} max={downPaymentMax} step={downPaymentStep} className="slider w-[90%]" onChange={(e) => setDownPaymentValue(Number(e.target.value))}/>
              <div className="min-max-range flex justify-between w-[90%]">
                <span>$0</span>
                <span>${homeValue}</span>
              </div>
            </div>
          </div>
          <div className="range-div w-[100%]">
            <h1>Loan Amount</h1>
            <h1 className="text-2xl font-medium">${loanAmountValue}</h1>
            <div className="inner-div w-[100%]">
              <input type="range" name="" id="" value={loanAmountValue} min={downPaymentMin} max={downPaymentMax} step={downPaymentStep} className="slider w-[90%]" onChange={(e) => setLoanAmountValue(Number(e.target.value))}
              readOnly disabled/>
              <div className="min-max-range flex justify-between w-[90%]">
                <span>$0</span>
                <span>${homeValue}</span>
              </div>
            </div>
          </div>
          <div className="range-div w-[100%] py-5">
            <h1>Interest Rate</h1>
            <h1 className="text-2xl font-medium">${interestValue}</h1>
            <div className="inner-div w-[100%]">
              <input type="range" name="" id="" value={interestValue} min={interestMin} max={interestMax} step={interestStep} className="slider w-[90%]" onChange={(e) => setInterestValue(Number(e.target.value))}/>
              <div className="min-max-range flex justify-between w-[90%]">
                <span>2%</span>
                <span>18%</span>
              </div>
            </div>
          </div>
          <div className="range-div w-[100%] py-5">
            <fieldset className="border-2 py-1 w-[90%] flex items-center">
              <legend>Tenure</legend>
              <select name="tenure" id="" className="w-[100%] outline-0 pb-1" onChange={(e) => setTenureValue(Number(e.target.value))}>
                <option value="5">5 years</option>
                <option value="10">10 years</option>
                <option value="15">15 years</option>
                <option value="20">20 years</option>
                <option value="25">25 years</option>
              </select>
            </fieldset>
          </div>
        </div>
        <div className="char-div py-10 px-5 w-[100%] lg:w-[50%]">
          <div className="result flex justify-center items-center py-10">
            <h1 className="text-2xl lg:text-3xl">Monthly Payment: <span className="font-bold">${emi}</span></h1>
          </div>
          <div className="char-div w-[100%] flex flex-col items-center justify-center">
            <h2 className="text-xl font-semibold mb-4">EMI Breakdown</h2>
            <div className="char w-[100%] lg:w-[50%] flex justify-center">
              <Pie data={data}/>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

export default App;