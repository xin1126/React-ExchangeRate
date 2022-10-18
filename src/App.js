import { useState, useEffect } from 'react';
import axios from 'axios';
import currency from './currency';
import Table from './components/Table';
import Input from './components/Input';

const App = () => {
  const [initExchange, setInitExchange] = useState([]);
  const [newExchange, setNewExchange] = useState([]);
  const [money, setMoney] = useState(1);

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
      setInitExchange(data);
      setNewExchange(data);
    } catch (error) {
      console.error(error);
    }
  };

  const updateMoney = (e) => setMoney(e.target.value);

  const updateExchange = () => {
    if (!money) return alert('請輸入數值');
    const data = JSON.parse(JSON.stringify(initExchange));
    data.forEach((item) => {
      const num = String((item.money * money)).split('');
      if (!num.includes('.')) {
        item.money = num.join('');
      } else {
        item.money = item.name === '越南盾' || item.name === '印尼幣' ? (+num.join('')).toFixed(4) : (+num.join('')).toFixed(2) * 1
      }
    });
    setNewExchange(data);
  };

  useEffect(() => {
    getExchange();
  }, []);
  return (
    <div className="min-h-screen bg-slate-800 flex justify-center items-center">
      <div className='a mr-16'>
        <h2 className='text-center text-2xl text-white font-bold mb-5'>原始匯率</h2>
        <div className='flex'>
          <div className="mr-5">
            <Table data={[...initExchange].splice(0, 10)} />
          </div>
          <Table data={[...initExchange].splice(10, initExchange.length)} />
        </div>
      </div>
      <div>
        <div className='flex items-center justify-center mb-5'>
          <Input money={money} updateMoney={updateMoney} type="number" layout="flex">更改匯率</Input>
          <button
            className='bg-emerald-600 hover:bg-emerald-800 text-white px-5 py-2 rounded-lg ml-2'
            onClick={updateExchange}
          >換算</button>
        </div>
        <div className='flex'>
          <div className="mr-5">
            <Table data={[...newExchange].splice(0, 10)} />
          </div>
          <Table data={[...newExchange].splice(10, newExchange.length)} />
        </div>
      </div>
    </div>
  );
};

export default App;
