/* eslint-disable no-shadow */
import { TreeNode, createBehavior, createResource } from '@designable/core';
import { useDropTemplate } from '@designable/formily-antd/lib/hooks';
import {
  createEnsureTypeItemsNode,
  queryNodesByComponentPath,
} from '@designable/formily-antd/lib/shared';
import { ArrayBase, ArrayBaseMixins } from '@formily/antd';
import cls from 'classnames';
import { Drawer } from './Drawer';
import { Toolbar } from './Toolbar';

import {
  DnFC,
  DroppableWidget,
  TreeNodeWidget,
  useNodeIdProps,
  useTreeNode,
} from '@designable/react';
import { observer } from '@formily/react';
import React, { Fragment } from 'react';

import {
  AllLocales,
  AllSchemas,
  createFieldSchema,
  createVoidFieldSchema,
} from '@designable/formily-antd';
import { LoadTemplate } from '@designable/formily-antd/lib/common/LoadTemplate';
import { Table, TableProps } from 'antd';
import {
  getActionsNode,
  getColumnNode,
  getIndexNode,
  getListNode,
  getLocales,
  getQueryNode,
  getToolbarNode,
} from './shared';
const HeaderCell: React.FC = (props: any) => {
  return (
    <th
      {...props}
      data-designer-node-id={props.className.match(/data-id\:([^\s]+)/)?.[1]}
    >
      {props.children}
    </th>
  );
};

const BodyCell: React.FC = (props: any) => {
  return (
    <td
      {...props}
      data-designer-node-id={props.className.match(/data-id\:([^\s]+)/)?.[1]}
    >
      {props.children}
    </td>
  );
};
const ensureObjectItemsNode = createEnsureTypeItemsNode('object');
export type ComposedQueryTable = React.FC<
  React.PropsWithChildren<
    TableProps<any> & {
      selectable?: boolean;
    }
  >
> &
  ArrayBaseMixins & {
    Column?: React.FC<React.PropsWithChildren<{}>>;
    Expand?: React.FC<React.PropsWithChildren<{}>>;
    Toolbar?: typeof Toolbar;
    Action?: {
      Drawer?: typeof Drawer;
      Popover?: typeof Drawer;
      Popconfirm?: typeof Drawer;
      Modal?: typeof Drawer;
    };
  };
export const QueryTable: DnFC<ComposedQueryTable> & ComposedQueryTable =
  observer((props) => {
    const node = useTreeNode();

    useDropTemplate('QueryTable.Column', (source) => {
      return source.map((node) => {
        node.props.title = undefined;
        return node;
      });
    });

    const columns = queryNodesByComponentPath(node, [
      'QueryTable',
      '*',
      'QueryTable.Column',
    ]);
    console.log('columns', columns);
    const defaultRowKey = () => {
      return node.id;
    };
    return (
      <>
        {node.children.length === 0 ? (
          <DroppableWidget></DroppableWidget>
        ) : (
          <ArrayBase disabled>
            <Table
              size="small"
              bordered
              {...props}
              scroll={{ x: '100%' }}
              className={cls('ant-formily-array-table', props.className)}
              style={{ marginBottom: 10, ...props.style }}
              rowKey={defaultRowKey}
              dataSource={[{ id: '1' }]}
              pagination={false}
              components={{
                header: {
                  cell: HeaderCell,
                },
                body: {
                  cell: BodyCell,
                },
              }}
            >
              {columns.map((node) => {
                const children = node.children.map((child) => {
                  return <TreeNodeWidget node={child} key={child.id} />;
                });
                const props = node.props['x-component-props'];
                return (
                  <Table.Column
                    {...props}
                    title={
                      <div data-content-editable="x-component-props.title">
                        {props.title}
                      </div>
                    }
                    dataIndex={node.id}
                    className={`data-id:${node.id}`}
                    key={node.id}
                    render={(value, record, key) => {
                      return (
                        <ArrayBase.Item key={key} index={key} record={null}>
                          {children.length > 0 ? children : 'Droppable'}
                        </ArrayBase.Item>
                      );
                    }}
                  />
                );
              })}
              {columns.length === 0 && (
                <Table.Column render={() => <DroppableWidget />} />
              )}
            </Table>
          </ArrayBase>
        )}
        <LoadTemplate
          actions={[
            {
              title: '↑ 查询列表 →',
              onClick: () => {},
            },
            {
              title: '添加索引',
              icon: 'AddIndex',
              onClick: () => {
                const indexColumn = new TreeNode(getIndexNode());
                ensureObjectItemsNode(node).prepend(indexColumn);
              },
            },
            {
              title: '添加列',
              icon: 'AddColumn',
              onClick: () => {
                const column = new TreeNode(getColumnNode());
                ensureObjectItemsNode(node).append(column);
              },
            },
            {
              title: '添加动作',
              icon: 'AddOperation',
              onClick: () => {
                const actions = new TreeNode(getActionsNode());
                ensureObjectItemsNode(node).append(actions);
              },
            },
          ]}
        ></LoadTemplate>
      </>
    );
  });

ArrayBase?.mixin?.(QueryTable);
QueryTable.Column = () => {
  return <Fragment />;
};

QueryTable.Toolbar = Toolbar;

QueryTable.Expand = () => {
  return <Fragment />;
};
QueryTable.Action = {
  Drawer,
  Popover: Drawer,
  Modal: Drawer,
  Popconfirm: Drawer,
};

QueryTable.Behavior = createBehavior(
  {
    name: 'QueryTable',
    extends: ['Field'],
    selector: (node) => node.props['x-component'] === 'QueryTable',
    designerProps: {
      droppable: true,
      // allowDrop: () => true, // (node) => node.props['type'] === 'object',
      propsSchema: createFieldSchema(AllSchemas.ArrayTable),
    },
    designerLocales: AllLocales.ArrayTable,
  },
  {
    name: 'QueryTable.Column',
    extends: ['Field'],
    selector: (node) => node.props['x-component'] === 'QueryTable.Column',
    designerProps: {
      droppable: true,
      // allowDrop: (node) =>
      //   node.props['type'] === 'object' &&
      //   node.parent?.props?.['x-component'] === 'QueryTable',
      propsSchema: createVoidFieldSchema(AllSchemas.ArrayTable.Column),
    },
    designerLocales: AllLocales.ArrayTableColumn,
  },
);

QueryTable.Resource = createResource({
  title: 'QueryTable',
  icon: 'ArrayTableSource',
  elements: [
    {
      componentName: 'Field',
      props: {
        type: 'array',
        'x-component': 'QueryTable',
      },
    },
  ],
});
