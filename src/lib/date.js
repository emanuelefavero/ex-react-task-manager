import dayjs from 'dayjs';
import 'dayjs/locale/it';

dayjs.locale('it');

export const formatDate = (value, format = 'DD/MM/YYYY') =>
  dayjs(value).format(format);
