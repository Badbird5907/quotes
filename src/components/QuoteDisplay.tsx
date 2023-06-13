import React, {memo, useEffect} from 'react';
import Person from "@app-types/person";
import {Quote, QuoteData} from "@app-types/quotes";
import ClientAvatar from "@components/ClientAvatar";
import {Card, CardBody, CardFooter, CardHeader} from "@nextui-org/card";
import {Divider} from "@nextui-org/react";
import {FaChevronLeft, FaChevronRight, FaDice} from "react-icons/fa";
import {Button} from "@nextui-org/button";
import axios from "axios";
import {debug} from "@/util/log";

interface QuoteProps {
    initialQuote: Quote;
    person: Person;
    initialTotalQuotes: number;
}
type QuoteLineProps = {
    line: string | Quote,
    displaySide?: Quote["display"]
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

    const QuoteText = ({quote}: { quote: Quote }) => {
        // god awful code
        // TODO: display: right doesn't work properly unless the quote is a child quote
        /*
        {
      "quote": [
        "left",
        {
          "display": "right",
          "quote": "right"
        },
        "left"
      ]
    },
         */
        const image = quote.image;
        const ImageComponent = memo(function Img() {
            if (image) return <img src={image} className={"rounded-lg"}/>
            return null;
        });
        const q = quote.quote; // string | string[] | Quote[]

        const QuoteLine = ({line, displaySide = undefined}: QuoteLineProps) => {
            const classBase = "text-sm text-white-500";
            if (typeof line === "string") return <span className={`${classBase} ${displaySide === "right" ? "float-right" : ""} ${displaySide === "left" ? "float-left" : ""}`}>{'"'}{line}{'"'}</span>
            const richQuote = line as Quote;
            const quoteText = richQuote.quote; // string | string[] | Quote[]
            const display = richQuote.display; // left | right
            const clazz = `${classBase} ${(display === "right" || displaySide === "right") ? "float-right" : ""} ${(display === "left" || displaySide === "left") ? "float-left" : ""}`;
            if (Array.isArray(quoteText)) {
                return (
                    <div className={clazz}>
                        {quoteText.map((line, index) => <QuoteLine key={index} line={line} displaySide={display || displaySide} />)}
                    </div>
                )
            }
            return (
                <div className={clazz}>
                    <QuoteLine line={quoteText} displaySide={display || displaySide} />
                </div>
            )
        }
        if (Array.isArray(q)) {
            return (
                <div className="flex flex-col gap-2">
                    <ImageComponent/>
                    {q.map((line, index) => <QuoteLine key={index} line={line}/>)}
                </div>
            )
        }
        return (
            <div className="flex flex-col gap-2">
                <ImageComponent/>
                <QuoteLine line={q}/>
            </div>
        )
    }

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
                <QuoteText quote={quote}/>
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
