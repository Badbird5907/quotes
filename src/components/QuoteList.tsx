"use client"

import React from 'react';
import {InitialData, QuoteData} from "@/types/quotes";
import Person from "@/types/person";
import QuoteDisplay from "@components/QuoteDisplay";

interface QuoteListProps {
    initialData: InitialData;
}
const QuoteList = ({initialData}: QuoteListProps) => {
    return (
        <div className={"flex flex-col items-center"}>
            <QuoteDisplay initialQuote={initialData.data.quotes[0]} // initial data only has one quote
                                 person={initialData.data as Person} initialTotalQuotes={initialData.total} />
        </div>
    );
};

export default QuoteList;
