import React from 'react';
import {QuoteData} from "@/types/quotes";
import Person from "@/types/person";
import Quote from "@components/Quote";

interface QuoteListProps {
    data: QuoteData;
}
const QuoteList = ({data}: QuoteListProps) => {
    return (
        <div>
            {data.quotes.map((quote,i) => {
                return <Quote quote={quote} person={data as Person} key={i} />
            })}
        </div>
    );
};

export default QuoteList;