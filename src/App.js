import { useState, useEffect } from 'react';
import axios from 'axios';
import currency from './currency';
import Table from './components/Table';

const App = () => {
  const [exchange, setExchange] = useState([]);

  const getExchange = async () => {
    try {
      const data = [];
      const res = await axios.get('https://cors-anywhere.herokuapp.com/https://tw.rter.info/capi.php');
      Object.keys(res.data).forEach((item) => {
        Object.keys(currency).forEach((key) => {
          if (item === `USD${key}`) {
            const exrate = 1 / (res.data.USDTWD.Exrate / 1000 * res.data[item].Exrate)
            data.push({
              name: currency[key],
              money: key === 'VND' || key === 'IDR' ? exrate.toFixed(4) : exrate.toFixed(2)
            });
          }
        })
      });
      data.unshift({
        name: '美金',
        money: res.data.USDTWD.Exrate
      });
      setExchange(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getExchange();
  }, []);
  return (
    <div className="min-h-screen bg-slate-800 flex justify-center items-center">
      <div className='flex'>
        <Table data={[...exchange].splice(0, 10)} />
        <Table data={[...exchange].splice(10, exchange.length)} />
      </div>
    </div>
  );
};

export default App;
