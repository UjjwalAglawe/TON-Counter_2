// useMainContract.ts
import { useEffect, useState } from "react";
import { Address, OpenedContract, toNano } from "@ton/core";
import { useAsyncInitialize } from "./useAsyncInitialize";
import { useTonClient } from "./useTonClient";
import { useTonConnect } from "./useTonConnect";
import { Counter } from "../wrappers/Counter";

export function useCounterContract() {
    const { client } = useTonClient();
    const { wallet , sender } = useTonConnect();
    const [count, setCount] = useState<BigInt | null>(null);

    const countContract = useAsyncInitialize(async () => {
        if (!client || !wallet) return;

        const contract = Counter.fromAddress(Address.parse("EQDiGr-RaYVspOywZ6Fyk-tddKUwkX3tTgHQwab3hs6UurXG"));

        return client.open(contract) as OpenedContract<Counter>;
    }, [client, wallet]);

    useEffect(() => {
        async function getCount() {
            if (!countContract) return;

            const countValue = await countContract.getCounter();
            setCount(countValue);
            console.log("Maincon count",count);
        }

        
        

        getCount();
    }, [countContract]);

    useEffect(()=>{
        
    })
    async function increase() {
        const increaseResult = await countContract?.send(
            sender,
            {
                value: toNano('0.005'),
            },
            {
                $$type: 'Add',
                queryId: 0n,
                amount: 1n,
            }
        );

        console.log("increase result", increaseResult);
        
    }


    return {
        counts:count,
        increase:increase,
    };
}
