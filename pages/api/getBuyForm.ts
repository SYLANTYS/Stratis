// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { sanityClient } from '../../sanity'
import { BuyForm } from '../../typings'
import { groq } from 'next-sanity'

const feedQuery = groq`
  *[_type == "buyform" && !block] {
    _id,
    ...
  } | order(_createdAt desc)
`

type Data = {
  buyform: BuyForm[]
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const buyform: BuyForm[] = await sanityClient.fetch(feedQuery)

  res.status(200).json({ buyform })
}
