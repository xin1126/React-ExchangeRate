import { useState, useEffect } from 'react';
import axios from 'axios';
import Input from './Input';
import Select from './Select';
import currency from '../currency';

const CurrencyConvert = ({ initData }) => {
    const data = { ...currency };
    data['TWD'] = '臺幣';

    const [currencyTarget, setCurrencyyTarget] = useState('');
    const [inputStatus, setInputStatus] = useState('');

    const [firstData, setFirstData] = useState({});
    const [firstMoney, setFirstMoney] = useState(1);
    const [firstCurrency, setfirstCurrency] = useState('USD');

    const [lastData, setLastData] = useState({});
    const [lastMoney, setLastMoney] = useState(1);
    const [lastCurrency, setlastCurrency] = useState('TWD');

    const updateFirstMoney = (e) => {
        setFirstMoney(e.target.value);
        setInputStatus('first');
    }
    const updateLastMoney = (e) => {
        setLastMoney(e.target.value);
        setInputStatus('last');
    }

    const updatefirstCurrency = (e) => {
        setfirstCurrency(e.target.value);
        setCurrencyyTarget('first');
    };

    const updateLastCurrency = (e) => {
        setlastCurrency(e.target.value);
        setCurrencyyTarget('last');
    };

    const getExchange = async () => {
        try {
            const res = await axios.get(`https://api.exchangerate-api.com/v4/latest/${currencyTarget === 'first' || !currencyTarget ? firstCurrency : lastCurrency}`);

            if (!currencyTarget) {
                setFirstData(res.data.rates);
                setLastMoney(res.data.rates['TWD']);
                return;
            }

            if (currencyTarget === 'first') {
                setFirstData(res.data.rates);
                return;
            }

            setLastData(res.data.rates);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        setLastData(initData);
    }, [initData]);

    useEffect(() => {
        if (!Object.keys(firstData).length) return;
        if (inputStatus === 'last') return;
        setLastMoney((firstData[lastCurrency] * firstMoney).toFixed(2) * 1);
    }, [firstMoney]);

    useEffect(() => {
        if (!lastMoney) return;
        if (inputStatus === 'first') return;
        setFirstMoney((lastData[firstCurrency] * lastMoney).toFixed(2) * 1);
    }, [lastMoney]);

    useEffect(() => {
        setFirstMoney(1);
        if (!Object.keys(firstData).length) return;
        setLastMoney(firstData[lastCurrency]);
    }, [firstData, lastData]);

    useEffect(() => {
        getExchange();
    }, [firstCurrency, lastCurrency]);
    return (
        <div className='xl:mr-16 xl:mt-0 mt-5 mb-10'>
            <div className='mb-5'>
                <p className='text-gray-300 text-xl'>{firstMoney} {data[firstCurrency]} 等於</p>
                <p className='text-4xl text-white'>{lastMoney} {data[lastCurrency]}</p>
            </div>
            <div className='mb-5'>
                <Select value={firstCurrency} updateValue={updatefirstCurrency} />
                <Input money={firstMoney} updateMoney={updateFirstMoney} type="number" layout="flex" />
            </div>
            <div className='mb-5'>
                <Select value={lastCurrency} updateValue={updateLastCurrency} />
                <Input money={lastMoney} updateMoney={updateLastMoney} type="number" layout="flex" />
            </div>
        </div>
    )
}

export default CurrencyConvert;