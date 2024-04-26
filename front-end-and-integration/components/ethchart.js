import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { Helmet } from "react-helmet";
import AOS from 'aos';
import 'aos/dist/aos.css';


export default function ETHChart() {

    
    const scriptRef = useRef(null);

    useEffect(() => {
      const script = document.createElement('script');
      script.src = "https://s3.tradingview.com/external-embedding/embed-widget-symbol-overview.js";
      script.async = true;
      script.innerHTML = `
      {
        "symbols": [
          [
            "CRYPTO:ETHUSD|1D"
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
  
      const tradingViewContainer = document.getElementById('tradingview-widget-container3');
  
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
           
            <div className="ethchartdiv rounded-xl bg-[#000]" style={{boxShadow:"2px 2px 2px 2px #333"}}>
            <Helmet>
            <script type="text/javascript" src="https://s3.tradingview.com/external-embedding/embed-widget-symbol-overview.js" async></script>
            </Helmet>
            <div id="tradingview-widget-container3"></div>
            </div>

        </div>
    )
}