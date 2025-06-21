export interface BuyForm extends BuyFormBody {
  _id: string
  _createdAt: string
  _updatedAt: string
  _rev: string
  _type: 'buyform'
  block: boolean
}

export type BuyFormBody = {
  name: string
  websiteURL: string
  imageURL: string
  xfirstcoord: number
  yfirstcoord: number
  xlastcoord?: number
  ylastcoord?: number
  hash: string
  email: string
}

declare global {
  interface Window {
    ethereum: any;
    web3: any;
  }
}

declare global {
  interface NodeModule {
    getTransactionReceiptMined: any;
    getTransactionReceipt: any;
  }
}