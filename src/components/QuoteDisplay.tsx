import React, {memo, useEffect} from 'react';
import Person from "@app-types/person";
import {Quote, QuoteData, RichQuoteText} from "@app-types/quotes";
import ClientAvatar from "@components/ClientAvatar";
import {Card, CardBody, CardFooter, CardHeader} from "@nextui-org/card";
import {Divider} from "@nextui-org/react";
import {FaChevronLeft, FaChevronRight, FaDice} from "react-icons/fa";
import {Button} from "@nextui-org/button";
import axios from "axios";

interface QuoteProps {
    initialQuote: Quote;
    person: Person;
    initialTotalQuotes: number;
}

const QuoteDisplay = ({initialQuote, person, initialTotalQuotes}: QuoteProps) => {
    const [page, setPage] = React.useState(1);
    const [quote, setQuote] = React.useState<Quote>(initialQuote);
    const [totalQuotes, setTotalQuotes] = React.useState<number>(initialTotalQuotes || 1);
    const [data, setData] = React.useState<QuoteData | null>(null);
    useEffect(() => {
        axios.get(`/api/quotes/${person.name}/get`).then((res) => {
            setData(res.data as QuoteData);
            setTotalQuotes(res.data.total);
        })
    }, [])

    useEffect(() => {
        if (page === 1) {
            setQuote(initialQuote);
            return;
        }
        if (!data) return;
        setQuote(data.quotes[page - 1]);
    }, [page])

    const QuoteText = memo(function QuoteText() {
        const {image} = quote;
        const ImageComponent = memo(function Img() {
            if (image) return <img src={image} className={"rounded-lg"}/>
            return null;
        });
        const q = quote.quote;
        const QuoteLine = ({line}: { line: string | RichQuoteText }) => {
            if (typeof line === 'string') {
                return (
                    <span className={"text-sm text-white-500"}>
                        {`"${line}"`}
                    </span>
                )
            } else if (typeof line === 'object') {
                const richQuote = line as RichQuoteText;
                const display = richQuote.display; // left or right
                return (
                    <span className={`text-sm text-white-500 ${display === "right" ? "float-right" : ""}`}>
                        {`"${richQuote.quote}"`}
                    </span>
                )
            }
            return null;
        }
        if (typeof q === 'string') {
            return (
                <>
                    <ImageComponent/>
                    <QuoteLine line={q}/>
                </>
            );
        }
        return (
            <>
                <ImageComponent/>
                {q?.map((q, i) => {
                    return (
                        <div key={i}>
                            <QuoteLine line={q}/>
                            <br/>
                        </div>
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
            <CardFooter className="flex justify-between items-center">
                <span className="text-gray-400 float-left">({page}/{totalQuotes || 1})</span>
                <div className="flex justify-center">
                    <Button isIconOnly variant="faded"
                            className={`${page === 1 || !data ? "hover:cursor-not-allowed" : ""}`}
                            disabled={page === 1 || !data} onPress={() => {
                        if (page === 1 || !data) return;
                        setPage(page - 1)
                    }}>
                        <FaChevronLeft/>
                    </Button>
                    <Button isIconOnly variant="faded" className={`mx-4 ${!data ? "hover:cursor-not-allowed" : ""}`}
                            disabled={!data} onPress={() => {
                        setPage(Math.floor(Math.random() * totalQuotes) + 1);
                    }}>
                        <FaDice/>
                    </Button>
                    <Button isIconOnly variant="faded"
                            className={`${page === totalQuotes || !data ? "hover:cursor-not-allowed" : ""}`}
                            disabled={page === totalQuotes || !data} onPress={() => {
                        if (page === totalQuotes || !data) return;
                        setPage(page + 1)
                    }}>
                        <FaChevronRight/>
                    </Button>
                </div>
            </CardFooter>
        </Card>
    );
};

export default QuoteDisplay;
