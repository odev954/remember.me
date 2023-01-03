import { StatusCodes } from './statusCodes';

export interface Result<TData = never> {
  status: StatusCodes;
  data?: TData;
}
