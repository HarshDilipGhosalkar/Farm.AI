"use client";

import React from "react";
import { useRouter } from "next/navigation";

const loans = [
  {
    name: "Mahabank Kisan Credit Card (MKCC)",
    description:
      "This is a revolving credit facility offered by Bank of Maharashtra. It provides short-term loans for meeting cultivation expenses like seeds, fertilizers, pesticides, and labor costs.  The loan limit is based on the landholding and cropping pattern of the farmer.",
    image: "/assets/images/loan1.png", // Replace with the actual image path
    link: "https://bimaloan.in/mahabank-kisan-credit-card-ki-vishestae-kya-hai/", // Link to the scheme details
  },
  {
    name: "Mahabank Kisan All Purpose Term Loan",
    description:
      "This loan scheme from Bank of Maharashtra caters to the medium-term financial needs of farmers for undertaking various agricultural activities and allied activities like purchase of farm machinery, milch animals, poultry birds, undertaking vermi-composting, fisheries, etc. The maximum loan amount is Rs. 20 lakh.",
    image: "/assets/images/loan2.png", // Replace with the actual image path
    link: "https://govinfo.me/mahabank-kisan-purpose-term-loan/", // Link to the scheme details
  },
  {
    name: "Agriculture Term Loans (Maharashtra Gramin Bank)",
    description:
      "Offered by Maharashtra Gramin Bank, these are long-term loans for purposes like land development, horticulture plantation, fisheries, animal husbandry, etc. The loan amount can vary depending on the project and the landholding.",
    image: "/assets/images/loan3.png", // Replace with the actual image path
    link: "https://www.mahagramin.in/", // Link to Maharashtra Gramin Bank website (scheme details might be there)
  },
  {
    name: "Pledge Loan Scheme (Maharashtra)",
    description:
      "This scheme is facilitated by the Maharashtra State Agricultural Marketing Board (MSAMB) through Warehousing Corporations. Farmers can avail loans against their agricultural produce stored in warehouses. This helps farmers get better prices for their produce by allowing them to sell it when the market prices are high.",
    image: "/assets/images/loan4.png", // Replace with the actual image path
    link: "https://msamb.gov.in/", // Link to MSAMB website (scheme details might be there)
  },
  {
    name: "Crop Loan",
    description:
      "This is a short-term loan offered by various banks in India to meet the cultivation expenses of farmers for notified crops like Kharif ( खरीफ) and Rabi (रबी). The loan covers expenses like seeds, fertilizers, pesticides, and labor.",
    image: "/assets/images/loan5.png", // Replace with the actual image path
    link: "https://sbi.co.in/web/agri-rural/agriculture-banking/crop-loan", // Link to Government of India Krishi website for crop loan schemes
  },
  {
    name: "Kisan Credit Card (KCC)",
    description:
      "This is a government-sponsored scheme that provides a credit limit to farmers for their short-term agricultural needs. It is a revolving credit facility, which means that farmers can withdraw and repay the loan amount as per their requirement during the crop cycle.",
    image: "/assets/images/loan6.png", // Replace with the actual image path
    link: "https://fasalrin.gov.in/", // Link to Government of India Krishi website for KCC details
  },
  {
    name: "Tractor Loan",
    description:
      "This loan is specifically designed to help farmers purchase tractors for their agricultural activities. The loan amount can be used to finance the purchase of a new or used tractor.",
    image: "/assets/images/loan7.png", // Replace with the actual image path
    link: "https://www.agrimachineryportal.in/loan-tractor", // Link to Agrimachineryportal.in for tractor loan info (might not be Maharashtra specific)
  },
  {
    name: "Combine Harvester Loan",
    description:
      "This loan is helpful for farmers who want to purchase combine harvesters for their agricultural operations. A combine harvester is a machine that helps in harvesting crops efficiently.",
    image: "/assets/images/loan8.png", // Replace with the actual image path
    link: "https://www.agrimachineryportal.in/loan-combine-harvester", // Link to Agrimachineryportal.in for combine harvester loan info (might not be Maharashtra specific)
  },
];

const Loan = () => {
  return (
    <>
      <div className="p-[15px]">
        <h1 className="text-center text-2xl font-semibold">
          List of Loans and Grants
        </h1>
        <div className="flex flex-col mt-[20px] gap-y-[15px]">
          {loans.map((loan) => (
            <a href={loan.link}>
              <div className="flex gap-x-[20px] bg-gray-100 rounded-[15px] border shadow-sm p-[15px]">
                <img
                  className="rounded-[15px] w-[150px] h-[150px]"
                  src={loan.image}
                />
                <div>
                  <h2 className="text-lg font-semibold">{loan.name}</h2>
                  <p
                    style={{
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {loan.description.length > 60
                      ? loan.description.substring(0, 60) + "..."
                      : loan.description}
                  </p>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
      <div className="fixed bottom-0 w-full bg-white border shadow-lg bottom-navbar">
        <div className="flex justify-around gap-x-[5px] px-[30px] py-[10px] text-gray-400">
          <div
            className={`flex flex-col items-center hover:text-green-400 `}
            onClick={() => router.push("/")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              class="w-[35px] h-[35px]"
            >
              <path d="M11.47 3.841a.75.75 0 0 1 1.06 0l8.69 8.69a.75.75 0 1 0 1.06-1.061l-8.689-8.69a2.25 2.25 0 0 0-3.182 0l-8.69 8.69a.75.75 0 1 0 1.061 1.06l8.69-8.689Z" />
              <path d="m12 5.432 8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 0 1-.75-.75v-4.5a.75.75 0 0 0-.75-.75h-3a.75.75 0 0 0-.75.75V21a.75.75 0 0 1-.75.75H5.625a1.875 1.875 0 0 1-1.875-1.875v-6.198a2.29 2.29 0 0 0 .091-.086L12 5.432Z" />
            </svg>
            Home
          </div>
          <div
            className="flex items-center justify-center bg-blue-400 mt-[-30px] h-[80px] w-[80px] rounded-[50%] text-white"
            onClick={null}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-[35px] h-[35px]"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M12 18.75a6 6 0 0 0 6-6v-1.5m-6 7.5a6 6 0 0 1-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 0 1-3-3V4.5a3 3 0 1 1 6 0v8.25a3 3 0 0 1-3 3Z"
              />
            </svg>
          </div>
          <div className="flex flex-col items-center hover:text-green-400">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              class="w-[35px] h-[35px]"
            >
              <path
                fill-rule="evenodd"
                d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z"
                clip-rule="evenodd"
              />
            </svg>
            Profile
          </div>
        </div>
      </div>
    </>
  );
};

export default Loan;
