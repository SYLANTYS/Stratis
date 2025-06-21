// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { BuyFormBody } from "../../typings";

type Data = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const data: BuyFormBody = JSON.parse(req.body);

  const mutations = {
    mutations: [
      {
        create: {
          _type: "buyform",
          name: data.name,
          websiteURL: data.websiteURL,
          imageURL: data.imageURL,
          xfirstcoord: data.xfirstcoord,
          yfirstcoord: data.yfirstcoord,
          xlastcoord: data.xlastcoord,
          ylastcoord: data.ylastcoord,
          hash: data.hash,
          email: data.email,
          block: false,
        },
      },
    ],
  };

  const apiEndpoint = `https://${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}.api.sanity.io/v2021-06-07/data/mutate/${process.env.NEXT_PUBLIC_SANITY_DATASET}`;

  const result = await fetch(apiEndpoint, {
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${process.env.SANITY_API_TOKEN}`,
    },
    body: JSON.stringify(mutations),
    method: "POST",
  });

  const json = await result.json();

  res.status(200).json({ message: "Added" });
}
