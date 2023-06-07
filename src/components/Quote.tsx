import React from 'react';
import Person from "@app-types/person";
import {Quote} from "@app-types/quotes";
import ClientAvatar from "@components/ClientAvatar";

interface QuoteProps {
    quote: Quote;
    person: Person;
}

const Quote = ({quote, person}: QuoteProps) => {
    return (
        <div className="flex items-start space-x-4">
            <ClientAvatar showFallback name={person.name} src={person.image} className={"self-center"}/>
            <div className="flex flex-col">
                <div className="flex items-center">
                    <span className="font-medium text-white-500">{person.name}</span>
                </div>
                <div className="bg-gray-200 p-3 rounded-lg mt-1">
                    <p className="text-sm text-gray-800">{typeof quote === "string" ? quote : quote.quote}</p>
                </div>
            </div>
        </div>
    );
};

export default Quote;