import { useState, useEffect } from 'react';
import { Select, Space } from 'antd';
import { request } from '@/request';
import errorHandler from '@/request/errorHandler';

const { Option } = Select;

const asyncList = (entity) => {
  return request.list({ entity });
};

const asyncFilter = (entity, options) => {
  return request.filter({ entity, options });
};

const MultiStepSelectAsync = ({
  firstSelectProps = { placeholder: 'Parent Category' },
  secondSelectProps = { placeholder: 'Product Category' },
  entityName = 'parentcategory',
  subEntityName = 'productcategory',
  onChange,
  value = {},
  firstSelectValueKey = 'name',
  firstSelectLabelKey = 'name',
  secondSelectLabelKey = 'name',
  secondSelectValueKey = 'name',
  firstSelectIdKey = 'name',
  secondSelectIdKey = 'parentcategory',
  style = {},
  filterFieldName = 'parentCategoryName',
}) => {
  const firstSelectedOption = value.firstSelectedOption;
  const [firstSelectOptions, setFirstSelectOptions] = useState([]);
  const [secondSelectOptions, setSecondSelectOptions] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        if (firstSelectedOption) {
          const data = await asyncFilter(subEntityName, {
            filter: filterFieldName,
            equal: firstSelectedOption[firstSelectIdKey],
          });
          setSecondSelectOptions(data.result);
          return;
        }
        const data = await asyncList(entityName);
        setFirstSelectOptions(data.result);
      } catch (error) {
        errorHandler(error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [firstSelectedOption]);

  return (
    <Space direction="vertical" style={style}>
      <Select
        placeholder="Select an option"
        style={{ width: 200 }}
        {...firstSelectProps}
        loading={!firstSelectedOption ? loading : false}
        onChange={(value) => {
          const selectedOption = firstSelectOptions.find(
            (option) => option[firstSelectValueKey] === value
          );
          if (onChange) {
            onChange({ firstSelectedOption: selectedOption });
          }
        }}
      >
        {firstSelectOptions.map((option, index) => (
          <Option key={index} value={option[firstSelectValueKey]}>
            {option[firstSelectLabelKey]}
          </Option>
        ))}
      </Select>
      {firstSelectedOption && (
        <Select
          placeholder="Select another option"
          loading={loading}
          style={{ width: 200 }}
          {...secondSelectProps}
          onChange={(value) => {
            const selectedOption = secondSelectOptions.find(
              (option) => option[secondSelectValueKey] === value
            );
            if (onChange) {
              onChange({
                firstSelectedOption,
                secondSelectedOption: selectedOption,
              });
            }
          }}
        >
          {secondSelectOptions.map((option, index) => (
            <Option key={index} value={option[secondSelectValueKey]}>
              {option[secondSelectLabelKey]}
            </Option>
          ))}
        </Select>
      )}
    </Space>
  );
};

export default MultiStepSelectAsync;
