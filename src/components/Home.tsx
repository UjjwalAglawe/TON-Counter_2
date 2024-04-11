import { CHAIN, TonConnectButton } from '@tonconnect/ui-react';
import { useTonConnect } from '../hooks/useTonConnect';
// import { useJettonContract } from './hooks/useMainContract';
import { useCounterContract } from '../hooks/useMainContract';

let maincounts;

// const Aew = async ()=>{
//     const maincount = await useCounterContract();
//     maincounts=maincount;
//     console.log("App maincount", maincounts);
// }

const Home = async () => {
    const { network } = useTonConnect();

    const net = network ? network === CHAIN.TESTNET ? "testnet" : "mainnet" : "N/A";
    return (
        <div>
            <TonConnectButton />
            <button>{net}</button>
            <p>Count: </p>


        </div>
    );
}

export default Home;
