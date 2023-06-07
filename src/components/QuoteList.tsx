"use client"

import React from 'react';
import {QuoteData} from "@/types/quotes";
import Person from "@/types/person";
import Quote from "@components/Quote";

interface QuoteListProps {
    initialData: QuoteData;
}
const QuoteList = ({initialData}: QuoteListProps) => {
    const [data, setData] = React.useState(initialData);
    return (
        <div>
            {data.quotes.map((quote,i) => {
                return <Quote quote={quote} person={data as Person} key={i} />
            })}
        </div>
    );
};

export default QuoteList;