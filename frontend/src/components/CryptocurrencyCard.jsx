import {Card} from 'antd';

function CryptocurrencyCard(props) {

    const {currency} = props

    const price = Math.fround((currency.quote.USD.price)).toPrecision(8)

    const volume_change_24h = (currency.quote.USD.volume_change_24h).toFixed(2)
    const textColor = volume_change_24h > 0 ? "text-green-600" : "text-red-600"

    const market_cap = currency.quote.USD.market_cap

    const formatter = new Intl.NumberFormat('en', { 
            style: 'currency',
            currency: 'USD',
            notation: 'compact',
            compactDisplay: 'short',
            
        })

    return (
        <div className='flex mx-auto'>
            <Card 
                title={
                    <div className='flex items-center gap-1'>
                        <img className='size-8' src={`https://s2.coinmarketcap.com/static/img/coins/64x64/${currency.id}.png`} />
                        <span className='text-xl font-medium text-black'>{currency.name}</span>
                    </div>
                }
                style={{ 
                    width: 300,
                }}
            >
                <p>Текущая цена: ${price}</p>
                <p>Изменение цены за 24ч: <span className={`text-x1 font-bold ${textColor}`}>
                        {volume_change_24h}%
                    </span>
                    </p>
                <p>Текущая капитализация: {formatter.format(market_cap)}</p>
            </Card>
        </div>
    )
}

export default CryptocurrencyCard