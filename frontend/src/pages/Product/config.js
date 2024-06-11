export const fields = {
  name: {
    type: 'string',
    required: true,
  },
  parentCategory: {
    type: 'async',
    label: 'parent Category',
    displayLabels: ['parentCategory', 'name'],
    dataIndex: ['parentCategory', 'name'],
    entity: 'parentCategory',
    required: true,
    disableForForm: true,
  },
  productCategory: {
    type: 'async',
    label: 'product Category',
    displayLabels: ['productCategory', 'name'],
    dataIndex: ['productCategory', 'name'],
    entity: 'productcategory',
    required: true,
    disableForForm: true,
  },
  References: {
    type: 'multiStepSelectAsync',
    required: true,
    disableForTable: true,
  },

  price: {
    type: 'currency',
    required: true,
  },
  description: {
    type: 'textarea',
  },
  ref: {
    type: 'string',
  },
};
