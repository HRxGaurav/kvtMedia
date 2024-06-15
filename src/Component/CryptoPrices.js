import React, { useEffect, useState } from 'react';
import styles from './CryptoPrices.module.css';

const CryptoPrices = () => {
  const [prices, setPrices] = useState(null);
  const [coin, setCoin] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://api.coindesk.com/v1/bpi/currentprice.json');
        const data = await response.json();
        setPrices(data.bpi);
        setCoin(data.chartName);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  if (!prices) {
    return <div>Loading...</div>;
  }

  return (
      <>
    <div className={styles.coinName}>{coin}</div>
    <div className={styles.container}>
      {Object.keys(prices).map(currency => (
        <div key={currency} className={styles.card}>
            <div className={styles.symbolDiv}>
                <div className={styles.symbol} dangerouslySetInnerHTML={{ __html: prices[currency].symbol }}></div>
                <div className={styles.code}>{prices[currency].code}</div>
            </div>
          <div className={styles.description} >{prices[currency].description}</div>


          <div className={styles.rateDiv}>
            <div>
                <div className={styles.rateTag}>Rate</div>
                <div className={styles.rate}>{prices[currency].rate}</div>
            </div>
            <div>
                <div className={styles.rateTag}>Float</div>
                <div className={styles.rate}>{prices[currency].rate_float}</div>
            </div>
          </div>
          
        </div>
      ))}
    </div>
    </>
  );
};

export default CryptoPrices;
