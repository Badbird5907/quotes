import {getInitialData} from "@/util/quote";
import {QuoteData} from "@/types/quotes";
import QuoteList from "@components/QuoteList";

export default async function Page() {
    const data: QuoteData[] = await getInitialData();
    return (
        <>
            <h1 className={"text-4xl align-center justify-center"}>Quotes</h1>
            {data?.map((quote, i) => {
                return (
                    <QuoteList data={quote} key={i}/>
                )
            })}
        </>
    )
}
