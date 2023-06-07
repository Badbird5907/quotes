import React, {memo} from 'react';
import Person from "@app-types/person";
import {Quote} from "@app-types/quotes";
import ClientAvatar from "@components/ClientAvatar";

interface QuoteProps {
    quote: Quote;
    person: Person;
}

const Quote = ({quote, person}: QuoteProps) => {
    const QuoteText = memo(function QuoteText() {
        if (typeof quote === 'string') {
            return <span className={"text-sm text-gray-800"}>
                {`"${quote}"`}
            </span>;
        }
        const {image} = quote;
        const ImageComponent = memo(function Img() {
            return <img src={image} className={"rounded-lg"}/>
        });
        const q = quote.quote;
        if (typeof q === 'string') {
            return (
                <>
                    <ImageComponent/>
                    <span className={"text-sm text-gray-800"}>
                        {`"${q}"`}
                    </span>
                </>
            );
        }
        // if it's an array, we need to map it
        return (
            <>
                <ImageComponent/>
                {q.map((q, i) => {
                    return (
                        <>
                            <span className={"text-sm text-gray-800"}>
                                {`"${q}"`}
                            </span>
                            <br/>
                        </>
                    )
                })}
            </>
        )
    })
    return (
        <div className="flex items-start space-x-4">
            <ClientAvatar showFallback name={person.name} src={person.image} className={"self-center"}/>
            <div className="flex flex-col">
                <div className="flex items-center">
                    <span className="font-medium text-white-500">{person.name}</span>
                </div>
                <div className="bg-gray-200 p-3 rounded-lg mt-1">
                    <QuoteText/>
                </div>
            </div>
        </div>
    );
};

export default Quote;