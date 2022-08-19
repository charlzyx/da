/* eslint-disable no-shadow */
import { createBehavior, createResource } from '@designable/core';
import { DnFC, DroppableWidget, useTreeNode } from '@designable/react';
import { observer } from '@formily/react';
import { FormGrid, FormLayout } from '@formily/antd';
import React from 'react';

import { createFieldSchema } from '@designable/formily-antd';
import { getLocales } from './shared';
import { Button, Space } from 'antd';
import { LoadTemplate } from '@designable/formily-antd/lib/common/LoadTemplate';

export const QueryForm: DnFC<{
  grid?: React.ComponentProps<typeof FormGrid>;
  layout?: React.ComponentProps<typeof FormLayout>;
}> = observer((props) => {
  // const node = useTreeNode();
  return (
    <DroppableWidget>
      <>
        <FormLayout {...props.layout}>
          <FormGrid {...props.grid}>{props.children}</FormGrid>
        </FormLayout>
        <Space style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button>重置</Button>
          <Button type="primary">查询</Button>
        </Space>
        <LoadTemplate
          actions={[
            {
              title: '↑ 查询表单',
              onClick: () => {},
            },
          ]}
        ></LoadTemplate>
      </>
    </DroppableWidget>
  );
});

QueryForm.Behavior = createBehavior({
  name: 'QueryForm',
  extends: ['Field'],
  selector: (node) => node.props['x-component'] === 'QueryForm',
  designerProps: {
    droppable: true,
    // allowDrop: () => true, // (node) => node.props['type'] === 'object',
    propsSchema: createFieldSchema(),
  },
  designerLocales: getLocales('QueryForm'),
});

QueryForm.Resource = createResource({
  title: 'QueryForm',
  icon: 'CardSource',
  elements: [
    {
      componentName: 'Field',
      props: {
        type: 'object',
        'x-component': 'QueryForm',
        'x-component-props': {
          grid: {
            maxRows: 2,
            maxColumns: 3,
          },
        },
      },
      // children: [
      //   {
      //     componentName: 'Field',
      //     props: {
      //       type: 'void',
      //       'x-component': 'FormLayout',
      //     },
      //     children: [
      //       {
      //         componentName: 'Field',
      //         props: {
      //           type: 'void',
      //           'x-component': 'FormGrid',
      //         },
      //         children: [
      //           {
      //             componentName: 'Field',
      //             props: {
      //               type: 'void',
      //               'x-component': 'FormGrid.GridColumn',
      //             },
      //           },
      //           {
      //             componentName: 'Field',
      //             props: {
      //               type: 'void',
      //               'x-component': 'FormGrid.GridColumn',
      //             },
      //           },
      //           {
      //             componentName: 'Field',
      //             props: {
      //               type: 'void',
      //               'x-component': 'FormGrid.GridColumn',
      //             },
      //           },
      //         ],
      //       },
      //     ],
      //   },
      // ],
    },
  ],
});
