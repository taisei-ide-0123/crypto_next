import Head from 'next/head'
import Link from 'next/link'
import styles from '../../styles/Home.module.css'
import { Line } from 'react-chartjs-2'

export default function Chart(props) {
  const market_data = props.data
  const crypto_name = props.crypto
  const seven_days = []
  const crypto_price = []
  // console.log(crypto_name)
  // console.log(market_data.prices)
  for (let i = 0; i < 8; i++) {
    const date = new Date(market_data.prices[i][0])
    const simple_date =
      date.getFullYear() +
      '/' +
      (date.getMonth() + 1) +
      '/' +
      date.getDay() +
      ' ' +
      date.getHours() +
      ':' +
      date.getMinutes() +
      ':' +
      date.getSeconds()
    seven_days[i] = simple_date

    const price = market_data.prices[i][1]
    crypto_price[i] = price
  }

  // console.log(seven_days)
  // console.log(crypto_price)

  const chart_data = {
    labels: seven_days,
    datasets: [
      {
        label: crypto_name,
        fill: false,
        lineTension: 0.1,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'rgba(75,192,192,1)',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(75,192,192,1)',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: crypto_price,
      },
    ],
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Crypto Markets</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1 className="text-muted">{crypto_name}</h1>
      <Line data={chart_data} />
    </div>
  )
}

export async function getServerSideProps({ query }) {
  const res = await fetch(
    `https://api.coingecko.com/api/v3/coins/${query.id}/market_chart?vs_currency=jpy&days=7&interval=daily`,
  )
  const data = await res.json()
  const crypto = query.id
  // console.log(crypto)

  if (!data) {
    return {
      notFound: true,
    }
  }

  return {
    props: { data, crypto }, // will be passed to the page component as props
  }
}
