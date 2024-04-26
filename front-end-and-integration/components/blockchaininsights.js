import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { Helmet } from "react-helmet";
import AOS from 'aos';
import 'aos/dist/aos.css';


export default function BlockchainInsights() {

    
    const scriptRef = useRef(null);

    useEffect(() => {
      const script = document.createElement('script');
      script.src = "https://s3.tradingview.com/external-embedding/embed-widget-timeline.js";
      script.async = true;
      script.innerHTML = `
      {
        "feedMode": "market",
        "market": "crypto",
        "displayMode": "Adaptive",
        "chartOnly": false,
        "width": "100%",
        "height": 600,
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
        "isTransparent": false,
        "maLength": 9,
        "lineWidth": 1,
        "lineType": 0
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
           
            <div className="blockchaininsightsdiv" style={{border:"3px solid #00f"}}>
            <Helmet>
            <script type="text/javascript" src="https://s3.tradingview.com/external-embedding/embed-widget-symbol-overview.js" async></script>
            </Helmet>
            <div id="tradingview-widget-container4"></div>
            </div>

        </div>
    )
}