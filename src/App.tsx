// App.tsx
import './App.css';
import { CHAIN, TonConnectButton } from '@tonconnect/ui-react';
import { useTonConnect } from './hooks/useTonConnect';
import { useCounterContract } from './hooks/useMainContract';
import { useState } from 'react';

function App() {
    const { network } = useTonConnect();
    const {counts,increase} = useCounterContract();
    const [reload, setReload] = useState(false);
    console.log("App maincount", counts);

    const net = network ? (network === CHAIN.TESTNET ? "testnet" : "mainnet") : "N/A";
    const handleReload = () => {
      setTimeout(() => {
          setReload(true);
      }, 1000);
  };

  

  if (reload) {
      window.location.reload();
  }
    
    return (
        <div className='maind'>
          <h1>Counter Website</h1>
            <TonConnectButton className='con-but'/>
            <p>You are Connected to <span className='connected'>{net}</span></p>
            <p className='counterss'>Count: {counts !== null ? counts.toString() : 'Loading...'}</p>
            <button onClick={increase} className='increase'>Increase</button>
            <br/>
            <button onClick={handleReload}>Update Counter</button>
        </div>
    );
}

export default App;
