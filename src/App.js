import { useState, useEffect } from 'react';
import axios from 'axios';
import currency from './currency';
import Table from './components/Table';
import Input from './components/Input';
import CurrencyConvert from './components/CurrencyConvert'

const App = () => {
  const [initData, setInitData] = useState([]);
  const [initExchange, setInitExchange] = useState([]);
  const [newExchange, setNewExchange] = useState([]);
  const [money, setMoney] = useState(1);

  const getExchange = async () => {
    try {
      const data = [];
      const res = await axios.get('https://api.exchangerate-api.com/v4/latest/TWD');
      Object.keys(res.data.rates).forEach((item) => {
        Object.keys(currency).forEach((key) => {
          if (item === key) {
            data.push({
              name: currency[key],
              money: res.data.rates[key]
            });
          }
        })
      });
      setInitData(res.data.rates);
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
    if (+money === 1) return setNewExchange(initExchange);
    data.forEach((item) => {
      item.money = (item.money * money).toFixed(2);
    });
    setNewExchange(data);
  };

  useEffect(() => {
    getExchange();
  }, []);
  return (
    <div className="min-h-screen bg-slate-800 flex flex-col justify-center items-center">
      <div className='flex xl:flex-row flex-col justify-center items-center'>
        <CurrencyConvert initData={initData} />
        <div className='xl:mr-16'>
          <h2 className='text-center text-2xl text-white font-bold mb-5'>原始匯率 $1臺幣可兌換金額</h2>
          <div className='sm:flex'>
            <div className="sm:mr-5">
              <Table data={[...initExchange].splice(0, 10)} />
            </div>
            <Table data={[...initExchange].splice(10, initExchange.length)} />
          </div>
        </div>
        <div>
          <div className='flex sm:items-center items-end justify-center mb-5'>
            <Input money={money} updateMoney={updateMoney} type="number" layout="flex">更改匯率 $臺幣</Input>
            <button
              className='bg-emerald-600 hover:bg-emerald-800 text-white px-5 py-2 rounded-lg ml-2'
              onClick={updateExchange}
            >換算</button>
          </div>
          <div className='sm:flex'>
            <div className="sm:mr-5">
              <Table data={[...newExchange].splice(0, 10)} />
            </div>
            <Table data={[...newExchange].splice(10, newExchange.length)} />
          </div>
        </div>
      </div>
      <p className='text-white text-center xl:mb-0 mb-5 px-5'>相關資料僅供參考，不代表實際交易價格。實際交易價格以各銀行實際交易時之價格為準。</p>
    </div>
  );
};

export default App;
