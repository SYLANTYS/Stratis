export default {
  name: 'buyform',
  title: 'BuyForm',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name of Project',
      type: 'string',
    },
    {
      name: 'websiteURL',
      title: 'Website URL',
      type: 'string',
    },
    {
      name: 'imageURL',
      title: 'Image URL',
      type: 'string',
    },
    {
      name: 'xfirstcoord',
      title: 'First Coord X',
      type: 'number',
    },
    {
      name: 'yfirstcoord',
      title: 'First Coord Y',
      type: 'number',
    },
    {
      name: 'xlastcoord',
      title: 'Last Coord X',
      type: 'number',
    },
    {
      name: 'ylastcoord',
      title: 'Last Coord Y',
      type: 'number',
    },
    {
      name: 'hash',
      title: 'TX Hash',
      type: 'string',
    },
    {
      name: 'email',
      title: 'Email',
      type: 'string',
    },
    {
      name: 'block',
      title: 'Block Image',
      type: 'ADMIN Controls: Toggle if Image is deemed inappropriate',
      type: 'boolean',
    },
  ],
}