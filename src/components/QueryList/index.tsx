import { Space } from 'antd';
import React from 'react';
import { IQueryListContext, QueryListProvider } from './ctx';

type QueryListProps = React.PropsWithChildren<
  Pick<IQueryListContext, 'service' | 'pageSize' | 'startIndex'>
>;

export const QueryList: React.FC<QueryListProps> = (props: QueryListProps) => {
  const { children } = props;

  return (
    <>
      <QueryListProvider {...props}>{children}</QueryListProvider>
    </>
  );
};

export { QueryForm } from './QueryForm';
export { QueryTable } from './QueryTable';
