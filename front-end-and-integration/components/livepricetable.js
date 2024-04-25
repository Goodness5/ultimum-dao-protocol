import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { Helmet } from "react-helmet";
import AOS from 'aos';
import 'aos/dist/aos.css';


export default function LivePriceTable() {

    
    const scriptRef = useRef(null);

    useEffect(() => {
      const script = document.createElement('script');
      script.src = "https://s3.tradingview.com/external-embedding/embed-widget-market-quotes.js"
      script.async = true;
      script.innerHTML = `
      {
        "width": "100%",
        "height": "400",
        "symbolsGroups": [
          {
            "name": "Cryptocurrencies",
            "symbols": [
              {
                "name": "BINANCE:MATICUSDT"
              },
              {
                "name": "BINANCE:USDCUSDT"
              },
              {
                "name": "BINANCE:AAVEUSDT"
              },
              {
                "name": "BINANCE:PEPEUSDT"
              },
              {
                "name": "BINANCE:ARBUSDT"
              }
            ]
          },  
          {
            "name": "",
            "symbols": []
          }
        ],
        "showSymbolLogo": true,
        "colorTheme": "dark",
        "isTransparent": true,
        "locale": "en",
        "autosize": true
      }
      `;
  
      scriptRef.current = script;
  
      const tradingViewContainer = document.getElementById('tradingview-widget-container4');
  
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
           
            <div className="livepricediv rounded-xl bg-[#000]" style={{boxShadow:"2px 2px 2px 2px #333"}}>
            <Helmet>
            <script type="text/javascript" src="https://s3.tradingview.com/external-embedding/embed-widget-market-quotes.js" async></script>
            </Helmet>
            <div id="tradingview-widget-container4"></div>
            </div>

        </div>
    )
}