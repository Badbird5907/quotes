import React, {memo, useEffect} from 'react';
import Person from "@app-types/person";
import {Quote} from "@app-types/quotes";
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

const QuoteDisplay = ({initialQuote, person, initialTotalQuotes}: QuoteProps) => {
    const [page, setPage] = React.useState(1);
    const [quote, setQuote] = React.useState<Quote>(initialQuote);
    const [totalQuotes, setTotalQuotes] = React.useState<number>(initialTotalQuotes || 1);
    const [mounted, setMounted] = React.useState(false);

    const query = () => {
        const url = `/api/quotes/${person.name}/${page}`;
        debug(`Querying ${url}`);
        axios.get(url).then(res => {
            setQuote(res.data.quote as Quote);
            setTotalQuotes(res.data.total);
        });
    }

    useEffect(() => {
        if (mounted) { // Check if component has mounted
            query();
        } else {
            setMounted(true); // Set isMounted to true after the initial render
        }
    }, [page])

    const QuoteText = memo(function QuoteText() {
        const {image} = quote;
        const ImageComponent = memo(function Img() {
            if (image) return <img src={image} className={"rounded-lg"}/>
            return null;
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
                        <div key={i}>
                            <span className={"text-sm text-white-500"}>
                                {`"${q}"`}
                            </span>
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
                    <Button isIconOnly variant="faded" className={`${page === 1 ? "hover:cursor-not-allowed" : ""}`}
                            disabled={page === 1} onPress={() => {
                        if (page === 1) return;
                        setPage(page - 1)
                    }}>
                        <FaChevronLeft />
                    </Button>
                    <Button isIconOnly variant="faded" className="mx-4" onPress={() => {
                        setPage(Math.floor(Math.random() * totalQuotes) + 1);
                    }}>
                        <FaDice />
                    </Button>
                    <Button isIconOnly variant="faded" className={`${page === totalQuotes ? "hover:cursor-not-allowed" : ""}`}
                            disabled={page === totalQuotes} onPress={() => {
                        if (page === totalQuotes) return;
                        setPage(page + 1)
                    }}>
                        <FaChevronRight />
                    </Button>
                </div>
            </CardFooter>
        </Card>
    );
};

export default QuoteDisplay;