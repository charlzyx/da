import React from 'react';
import {
  transformToSchema,
  transformToTreeNode,
} from '@designable/formily-transformer';
import { ITreeNode, TreeNode } from '@designable/core';
import { MonacoInput } from '@designable/react-settings-form';

export interface ISchemaEditorWidgetProps {
  tree: TreeNode;
  onChange?: (tree: ITreeNode) => void;
}

export const SchemaEditorWidget: React.FC<ISchemaEditorWidgetProps> = (
  props,
) => {
  console.log('----');
  const neo = JSON.stringify(transformToSchema(props.tree), null, 2);
  console.log('neo', neo);
  return (
    <MonacoInput
      {...props}
      value={neo}
      onChange={(value) => {
        props.onChange?.(transformToTreeNode(JSON.parse(value)));
      }}
      language="json"
    />
  );
};
