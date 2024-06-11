import CrudModule from '@/modules/CrudModule/CrudModule';
import DynamicForm from '@/forms/DynamicForm';
import { fields } from './config';
import useLanguage from '@/locale/useLanguage';

export default function Product() {
  const translate = useLanguage();
  const entity = 'product';
  const searchConfig = {
    displayLabels: ['name'],
    searchFields: 'name',
  };
  const deleteModalLabels = ['name'];

  const Labels = {
    PANEL_TITLE: translate('Product'),
    DATATABLE_TITLE: translate('Product_list'),
    ADD_NEW_ENTITY: translate('add_new_Product'),
    ENTITY_NAME: translate('Product'),
  };
  const configPage = {
    entity,
    ...Labels,
  };
  const config = {
    ...configPage,
    fields,
    searchConfig,
    deleteModalLabels,
  };
  return (
    <CrudModule
      createForm={<DynamicForm fields={fields} />}
      updateForm={<DynamicForm fields={fields} />}
      config={config}
    />

    // const [multiStepSelectValue, setMultiStepSelectValue] = useState({});
    // <MultiStepSelectAsync
    //   entityName="parentcategory"
    //   subEntityName="productcategory"
    //   onChange={(value) => setMultiStepSelectValue(value)}
    //   value={multiStepSelectValue}
    //   firstSelectValueKey="name"
    //   firstSelectLabelKey="name"
    //   secondSelectLabelKey="name"
    //   secondSelectValueKey="name"
    //   firstSelectIdKey="name"
    //   secondSelectIdKey="parentcategory"
    //   style={{ marginTop: 8, marginBottm: 8 }}
    //   filterFieldName="parentCategoryName"
    // />
  );
}
