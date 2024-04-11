// import { getHttpEndpoint } from '@orbs-network/ton-access';
// import { TonClient } from 'ton';
// import { useAsyncInitialize } from './useAsyncInitialize';

// //read and send trnsaction to blockchain
// export function useTonClient() {
//   return useAsyncInitialize(
//     async () =>
//       new TonClient({
//         endpoint: await getHttpEndpoint({ network: 'testnet' }),
//       })
//   );
// }
//this will return a client that is connected to blockchain node
//this cloent will be used to read and send trasnaction to the blockchain
import { getHttpEndpoint } from "@orbs-network/ton-access";
import { CHAIN } from "@tonconnect/ui-react";
import { TonClient } from "@ton/ton";
import { useAsyncInitialize } from "./useAsyncInitialize";
import { useTonConnect } from "./useTonConnect";

export function useTonClient() {
    const {network} = useTonConnect()

    return {
        client: useAsyncInitialize(async ()=>{
            if(!network) return;

            return new TonClient({
                endpoint: await getHttpEndpoint({
                    network: network === CHAIN.MAINNET ? "mainnet" : "testnet"
                })
            })
        }, [network])
    }
}