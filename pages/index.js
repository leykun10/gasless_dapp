import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Web3modal from 'web3modal'
import WalletConnectProvider from '@walletconnect/web3-provider'
import Web3 from 'web3'

import { useState,useEffect,useRef } from 'react'


export default function Home() {

  const [walletConnected,setWalletConnected] = useState(false)
  const [selectedAccount,setSelectedAccount] =useState()
  const [currentETBBalance,setCurrentETBBalance] =useState()
  const web3modalRef = useRef()

  useEffect(()=>{
    if(!walletConnected){
      web3modalRef.current = new Web3modal({
       providerOptions:{
         walletconnect: {
         package: WalletConnectProvider, // required
         options: {
          infuraId: "INFURA_ID" // required
            }
  }

       },
       disableInjectedProvider:false
     })

    }

  },[])

  const connectWallet = async ()=>{
    const provider =await web3modalRef.current.connect()
    const web3 = new Web3(provider)
    const account = await web3.eth.getAccounts()
    setWalletConnected(true)
    setSelectedAccount(account)
    setCurrentETBBalance(10)
  }

  const renderButtonOrAddress = ()=>{

    if(!walletConnected){
      return(
        <div>
          <button className={styles.button} onClick={connectWallet}>
            Connect Wallet
          </button>
        </div>
      )
    }
    return (<div className={styles.card}>
      <div>
        Connected with {selectedAccount}
      </div>
      <div>
        Balance: {currentETBBalance} ETB
      </div>
      
    </div>)


  }


  const renderContractButton =()=>{
    if(walletConnected){
      return (
        <div>
          
             <button className={styles.button}>Stake</button>
            
             <button className={styles.button}>Withdraw</button>
         
        </div>
        )
    }
  }
  return (
    <div className={styles.container}>
      <Head>
        <title>ETB</title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
    
        <h1 className={styles.title}>
          Welcome to ETB Hodlers
        </h1>
        {renderButtonOrAddress()}
        {renderContractButton()}

      </main>

      <footer className={styles.footer}>
      </footer>
    </div>
  )
}
