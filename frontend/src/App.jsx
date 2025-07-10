import React, { useEffect, useState } from 'react';
import { Menu, Spin, ConfigProvider } from 'antd';
import axios from 'axios';
import CryptocurrencyCard from './components/CryptocurrencyCard';


function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type
  };
}

const App = () => {

  const [currencies, setCurrencies] = useState([]);
  const [currencyId, setCurrencyId] = useState(1);
  const [currencyData, setCurrencyData] = useState(null);

  const fetchCurrencies = () => {
    axios.get('http://127.0.0.1:8000/cryptocurrencies').then(r => {
      const currenciesResponse = r.data
      const menuItems = [
        getItem('Список криптовалют', 'g1', null, currenciesResponse.map(c => { 
          return {label: c.name, key: c.id}
        }), 'group'
      )
    ]
    setCurrencies(menuItems)
  })
  }

  useEffect(() => {
    fetchCurrencies()
  }, []);

  const onClick = e => {
    setCurrencyId(e.key)
  };

const fetchCurrency = () => {
    axios.get(`http://127.0.0.1:8000/cryptocurrencies/${currencyId}`).then(r => {
    setCurrencyData(r.data)
  })
  }

useEffect(() => {
  setCurrencyData(null)
  fetchCurrency()
}, [currencyId]);


  return (
    <div className='min-h-screen flex flex-col md:flex-row'>
      <ConfigProvider
        theme={{
          components: {
            Menu: {
              darkItemBg: "#242424",
              darkItemSelectedBg: '#fff',
              darkItemHoverColor: '#fff',
              darkItemSelectedColor: '#000'
            },
          },
        }}
      >
    
      <Menu
            onClick={onClick}
            style={{ width: 256 }}
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            mode="inline"
            theme='dark'
            items={currencies}
            className='h-screen overflow-scroll'
          />
    </ConfigProvider>
      <div className='mx-auto my-auto'>
        {currencyData ? <CryptocurrencyCard currency={currencyData}/> : <Spin size = "large" />}
      </div>
    </div>
    
  );
};
export default App;