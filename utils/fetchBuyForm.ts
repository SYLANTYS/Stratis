import { BuyForm } from '../typings';

export const fetchBuyForm = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/getBuyForm`)

  const data = await res.json()
  const buyform: BuyForm[] = data.buyform

  return buyform
}