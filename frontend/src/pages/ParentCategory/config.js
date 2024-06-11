import color from '@/utils/color';
import { validateInputLength } from '@/utils/helpers';

export const fields = {
  name: {
    type: 'stringWithColor',
    required: true,
    validator: validateInputLength,
  },
  enabled: {
    type: 'boolean',
    required: true,
  },
};
