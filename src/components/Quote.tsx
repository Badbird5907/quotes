import React, {memo} from 'react';
import Person from "@app-types/person";
import {Quote} from "@app-types/quotes";
import ClientAvatar from "@components/ClientAvatar";
import {Card, CardBody, CardFooter, CardHeader} from "@nextui-org/card";
import {Divider} from "@nextui-org/react";

interface QuoteProps {
    quote: Quote;
    person: Person;
}

const Quote = ({quote, person}: QuoteProps) => {
    const QuoteText = memo(function QuoteText() {
        if (typeof quote === 'string') {
            return <span className={"text-sm text-white-500"}>
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
                    <span className={"text-sm text-white-500"}>
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
                            <span className={"text-sm text-white-500"}>
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
        <Card className="w-[400px] mb-4">
            <CardHeader className="flex gap-3">
                <ClientAvatar showFallback name={person.name} src={person.image} className={"self-center"}/>
                <div className="flex flex-col">
                    <p className="text-md">{person.name}</p>
                    <p className="text-sm text-default-500">{person.description}</p>
                </div>
            </CardHeader>
            <Divider/>
            <CardBody>
                <QuoteText/>
            </CardBody>
            <Divider/>
            <CardFooter>

            </CardFooter>
        </Card>
    );
};

export default Quote;