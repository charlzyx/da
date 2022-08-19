/* eslint-disable no-shadow */
import { createBehavior, createResource } from '@designable/core';
import { DnFC } from '@designable/react';
import { observer } from '@formily/react';
import React from 'react';

import { createVoidFieldSchema } from '@designable/formily-antd';
import { QueryList as BaseQueryList } from '../../components/QueryList';
import { actions, getLocales } from './shared';
import { Toolbar } from './Toolbar';

export const QueryList: DnFC<React.ComponentProps<typeof BaseQueryList>> & {
  Toolbar?: typeof Toolbar;
} = observer((props) => {
  return <>{props.children}</>;
});

QueryList.Behavior = createBehavior({
  name: 'QueryList',
  extends: ['Field'],
  selector: (node) => ['QueryList'].indexOf(node.props['x-component']) > -1,
  designerProps: {
    droppable: true,
    // allowDrop: () => true, // (node) => node.props['type'] === 'object',
    propsSchema: createVoidFieldSchema(),
  },
  designerLocales: getLocales('QueryList'),
});

QueryList.Resource = createResource({
  title: 'QueryList',
  icon: 'ArrayTableSource',
  elements: [
    {
      componentName: 'Field',
      props: {
        type: 'void',
        'x-component': 'QueryList',
        'x-component-props': {
          service: '{{service}}',
        },
      },
      children: [
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
          children: [
            {
              componentName: 'Field',
              props: {
                type: 'string',
                title: '输入框',
                'x-decorator': 'FormItem',
                'x-component': 'Input',
              },
            },
          ],
        },
        {
          componentName: 'Field',
          props: {
            title: '工具栏',
            type: 'object',
            'x-component': 'QueryTable.Toolbar',
          },
          children: actions(),
        },
        {
          componentName: 'Field',
          props: {
            type: 'array',
            'x-component': 'QueryTable',
          },
          children: [
            {
              componentName: 'Field',
              props: {
                type: 'void',
                'x-component': 'QueryTable.Column',
                'x-component-props': {
                  width: 80,
                  title: 'Index',
                  align: 'center',
                },
              },
              children: [
                {
                  componentName: 'Field',
                  props: {
                    type: 'void',
                    'x-component': 'QueryTable.Index',
                  },
                },
              ],
            },
            {
              componentName: 'Field',
              props: {
                type: 'void',
                'x-component': 'QueryTable.Column',
                'x-component-props': {
                  width: 80,
                  title: 'Index',
                  align: 'center',
                },
              },
              children: actions(),
            },
          ],
        },
      ],
    },
  ],
});
