import { createBehavior, createResource } from '@designable/core';
import { DnFC, DroppableWidget, useTreeNode } from '@designable/react';
import { observer } from '@formily/react';
import { Drawer as AntdDrawer, Button, Space } from 'antd';
import React, { useRef, useState } from 'react';
import {
  createFieldSchema,
  createVoidFieldSchema,
} from '@designable/formily-antd';
import ButtonGroup from 'antd/lib/button/button-group';
import { getLocales } from './shared';

const getSettingsPanelWidth = () => {
  return `${
    document.querySelector('.dn-settings-panel')?.getBoundingClientRect()
      ?.width || '320'
  }px`;
};
const getCompositePanelWidth = () => {
  return `${
    document.querySelector('.dn-composite-panel')?.getBoundingClientRect()
      ?.width || '320'
  }px`;
};

export const Drawer: DnFC<React.ComponentProps<typeof AntdDrawer>> = observer(
  (props) => {
    const node = useTreeNode();
    const [visible, setVisible] = useState(false);
    const ref = useRef();

    console.log('---props', { props, node });

    return (
      <>
        <Button
          onClick={() => {
            setVisible(true);
          }}
        >
          {node.props.title || '打开 Drawer'}
        </Button>
        <div ref={ref}>
          <AntdDrawer
            zIndex={1}
            getContainer={() => {
              return (
                document.querySelector('.dn-component-tree') || ref.current
              );
            }}
            closable={false}
            maskStyle={{
              left: getCompositePanelWidth(),
            }}
            style={{
              right: getSettingsPanelWidth(),
            }}
            maskClosable
            visible={visible}
            afterVisibleChange={setVisible}
            title={
              <Space>
                <Button type="link" onClick={() => setVisible(false)}>
                  关闭
                </Button>
                <Button type="text">{node.props.title || '表单内容'}</Button>
              </Space>
            }
            footer={
              <ButtonGroup>
                <Button onClick={() => setVisible(false)}>关闭</Button>
              </ButtonGroup>
            }
          >
            <DroppableWidget>{props.children}</DroppableWidget>
          </AntdDrawer>
        </div>
      </>
    );
  },
);

Drawer.Behavior = createBehavior({
  name: 'QueryTable.Action.Drawer',
  extends: ['Field'],
  selector: (node) => node.props['x-component'] === 'QueryTable.Action.Drawer',
  designerProps: {
    droppable: true,
    // allowDrop: () => true, // (node) => node.props['type'] === 'object',
    propsSchema: createFieldSchema(),
  },
  designerLocales: getLocales('QueryTable.Action.Drawer'),
});

Drawer.Resource = createResource({
  title: 'Drawer',
  icon: 'CardSource',
  elements: [
    {
      componentName: 'Field',
      props: {
        type: 'object',
        'x-component': 'QueryTable.Action.Drawer',
      },
      children: [
        {
          componentName: 'Field',
          props: {
            type: 'void',
            'x-component': 'Space',
          },
        },
      ],
    },
  ],
});
