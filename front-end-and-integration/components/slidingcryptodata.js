import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { Helmet } from 'react-helmet';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function SlidingCryptoData() {

    const scriptRef = useRef(null);

    useEffect(() => {
      const script = document.createElement('script');
      script.src = "https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js";
      script.async = true;
      script.innerHTML = `
      {
        "width": "100%",
        "symbols": [
          {
            "description": "Bitcoin",
            "proName": "BINANCE:BTCUSDT"
          },
          {
            "description": "Ethereum",
            "proName": "BINANCE:ETHUSDT"
          },
          {
            "description": "Solana",
            "proName": "BINANCE:SOLUSDT"
          },
          {
            "description": "AVAX",
            "proName": "BINANCE:AVAXUSDT"
          },
          {
            "description": "Dogecoin",
            "proName": "BINANCE:DOGEUSDT"
          },
          {
            "description": "XRP",
            "proName": "BINANCE:XRPUSDT"
          },
          {
            "description": "FTM",
            "proName": "BINANCE:FTMUSDT"
          },
          {
            "description": "ADA",
            "proName": "BINANCE:ADAUSDT"
          },
          {
            "description": "SHIB",
            "proName": "BINANCE:SHIBUSDT"
          },
          {
            "description": "MATIC",
            "proName": "BINANCE:MATICUSDT"
          },
          {
            "description": "PEPE",
            "proName": "BINANCE:PEPEUSDT"
          },
          {
            "description": "LINK",
            "proName": "COINBASE:LINKUSD"
          },
          {
            "description": "BNB",
            "proName": "BINANCE:BNBUSDT"
          },
          {
            "description": "FET",
            "proName": "BINANCE:FETUSDT"
          },
          {
            "description": "RNDR",
            "proName": "BINANCE:RNDRUSDT"
          },
          {
            "description": "AAVE",
            "proName": "BINANCE:AAVEUSDT"
          },
          {
            "description": "OP",
            "proName": "BINANCE:OPUSDT"
          },
          {
            "description": "CAKE",
            "proName": "BINANCE:CAKEUSDT"
          },
          {
            "description": "ARB",
            "proName": "BINANCE:ARBUSDT"
          }
            ],
        "showSymbolLogo": true,
        "colorTheme": "dark",
        "displayMode": "compact",
        "isTransparent": true,
        "locale": "en"
      }
      `;
  
      scriptRef.current = script;
  
      const tradingViewContainer = document.getElementById('tradingview-widget-container1');
  
      if (tradingViewContainer) {
        tradingViewContainer.appendChild(script);
      }
  
      return () => {
        if (scriptRef.current && scriptRef.current.parentNode) {
          scriptRef.current.parentNode.removeChild(scriptRef.current);
        }
      };
    }, []);

    useEffect(() => {
        AOS.init();
      }, [])
      
    return (
        <div>
            
            <div>
            <Helmet>
            <script type="text/javascript" src="https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js" async></script>
            </Helmet>
            <div id="tradingview-widget-container1"></div>
            </div>

        </div>
    )
}