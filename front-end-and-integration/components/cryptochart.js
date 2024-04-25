import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { Helmet } from "react-helmet";
import AOS from 'aos';
import 'aos/dist/aos.css';


export default function CryptoChart() {

    
    const scriptRef = useRef(null);

    useEffect(() => {
      const script = document.createElement('script');
      script.src = "https://s3.tradingview.com/external-embedding/embed-widget-symbol-overview.js";
      script.async = true;
      script.innerHTML = `
      {
        "symbols": [
          [
            "BINANCE:ETHUSDT|1D"
          ],
          [
            "BINANCE:BTCUSDT|1D"
          ],
          [
            "BINANCE:BNBUSDT|1D"
          ],
          [
            "BINANCE:AAVEUSDT|1D"
          ],
          [
            "BINANCE:SOLUSDT|1D"
          ],
          [
            "BINANCE:FETUSDT|1D"
          ],
          [
            "BINANCE:PEPEUSDT|1D"
          ],
          [
            "BINANCE:ARBUSDT|1D"
          ],
          [
            "BINANCE:USDCUSDT|1D"
          ],
          [
            "BINANCE:MATICSDT|1D"
          ],
          [
            "BINANCE:LINKUSDT|1D"
          ],
          [
            "BINANCE:UNIUSDT|1D"
          ],
          [
            "BINANCE:TWTUSDT|1D"
          ],
          [
            "BINANCE:CAKEUSDT|1D"
          ],
          [
            "BINANCE:DOGEUSDT|1D"
          ],
          [
            "BINANCE:SHIBUSDT|1D"
          ]
        ], 
        "chartOnly": false,
        "width": "100%",
        "height": 500,
        "locale": "en",
        "colorTheme": "dark",
        "autosize": false,
        "showVolume": true,
        "showMA": true,
        "hideDateRanges": false,
        "hideMarketStatus": false,
        "hideSymbolLogo": false,
        "scalePosition": "right",
        "scaleMode": "Normal",
        "fontFamily": "-apple-system, BlinkMacSystemFont, Trebuchet MS, Roboto, Ubuntu, sans-serif",
        "fontSize": "10",
        "noTimeScale": false,
        "valuesTracking": "1",
        "changeMode": "price-and-percent",
        "chartType": "area",
        "maLineColor": "#2962FF",
        "maLineWidth": 1,
        "isTransparent": true,
        "maLength": 9,
        "lineWidth": 1,
        "lineType": 0,
        "dateRanges": [
          "1d|1",
          "1m|30",
          "3m|60",
          "12m|1D",
          "60m|1W",
          "all|1M"
        ]
      }
      `;
  
      scriptRef.current = script;
  
      const tradingViewContainer = document.getElementById('tradingview-widget-container2');
  
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
           
            <div className="cryptochartdiv rounded-xl" style={{boxShadow:"2px 2px 10px 2px #f00"}}>
            <Helmet>
            <script type="text/javascript" src="https://s3.tradingview.com/external-embedding/embed-widget-symbol-overview.js" async></script>
            </Helmet>
            <div id="tradingview-widget-container2"></div>
            </div>

        </div>
    )
}