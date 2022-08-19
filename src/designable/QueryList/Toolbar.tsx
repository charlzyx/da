import { TreeNode, createBehavior, createResource } from '@designable/core';
import { DnFC, DroppableWidget, useTreeNode } from '@designable/react';
import React from 'react';
import { Space } from '@formily/antd';
import {
  AllLocales,
  AllSchemas,
  createVoidFieldSchema,
} from '@designable/formily-antd';
import { withContainer } from '@designable/formily-antd/lib/common/Container';
import { LoadTemplate } from '@designable/formily-antd/lib/common/LoadTemplate';
import { actions, getActionsNode } from './shared';

export const Toolbar: DnFC<React.ComponentProps<typeof Space>> = withContainer(
  (props) => {
    const node = useTreeNode();
    return (
      <>
        <Space
          style={{ width: '100%', display: 'flex', justifyContent: 'flex-end' }}
        >
          {props.children}
        </Space>

        <LoadTemplate
          actions={[
            {
              title: '↑ 工具栏 →',
              onClick: () => {},
            },
            {
              title: '添加Drawer',
              icon: 'AddIndex',
              onClick: () => {
                const drawer = new TreeNode(actions('Drawer')[0]);
                node.prepend(drawer);
              },
            },
          ]}
        ></LoadTemplate>
      </>
    );
  },
);

Toolbar.Behavior = createBehavior({
  name: 'QueryTable.Toolbar',
  extends: ['Field'],
  selector: (node) => node.props['x-component'] === 'QueryTable.Toolbar',
  designerProps: {
    droppable: true,
    inlineChildrenLayout: true,
    propsSchema: createVoidFieldSchema(AllSchemas.Space),
  },
  designerLocales: AllLocales.Space,
});

Toolbar.Resource = createResource({
  title: 'Toolbar',
  icon: 'SpaceSource',
  elements: [
    {
      componentName: 'Field',
      props: {
        type: 'void',
        'x-component': 'QueryTable.Toolbar',
      },
    },
  ],
});
