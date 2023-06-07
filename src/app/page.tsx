import {getInitialData} from "@/util/quote";
import {QuoteData} from "@/types/quotes";
import QuoteList from "@components/QuoteList";

export default async function Page() {
    const data: QuoteData[] = await getInitialData();
    return (
        <>
            <div className={"flex flex-col items-center"}>
                <h1 className={"text-5xl font-bold"}>Quotes (WIP)</h1>
            </div>
            <div className={"pt-4"}>
                {data?.map((quote, i) => {
                    return (
                        <QuoteList initialData={quote} key={i}/>
                    )
                })}
            </div>
        </>
    )
}
