"use client"

import React from 'react';
import {QuoteData} from "@/types/quotes";
import Person from "@/types/person";
import QuoteDisplay from "@components/QuoteDisplay";

interface QuoteListProps {
    initialData: QuoteData;
}
const QuoteList = ({initialData}: QuoteListProps) => {
    return (
        <div className={"flex flex-col items-center"}>
            {initialData.quotes.map((quote,i) => {
                return <QuoteDisplay initialQuote={quote} person={initialData as Person} initialTotalQuotes={quote.total} key={i} />
            })}
        </div>
    );
};

export default QuoteList;