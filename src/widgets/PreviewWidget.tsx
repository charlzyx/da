import React, { useMemo } from 'react';
import { createForm } from '@formily/core';
import { createSchemaField } from '@formily/react';
import {
  ArrayCards,
  ArrayTable,
  Cascader,
  Checkbox,
  DatePicker,
  Editable,
  Form,
  FormCollapse,
  FormGrid,
  FormItem,
  FormLayout,
  FormTab,
  Input,
  NumberPicker,
  Password,
  PreviewText,
  Radio,
  Reset,
  Select,
  Space,
  Submit,
  Switch,
  TimePicker,
  Transfer,
  TreeSelect,
  Upload,
} from '@formily/antd';
import { QueryForm, QueryList, QueryTable } from '../components/QueryList';
import { Card, Rate, Slider } from 'antd';
import { TreeNode } from '@designable/core';
import { transformToSchema } from '@designable/formily-transformer';

const Text: React.FC<{
  value?: string;
  content?: string;
  mode?: 'normal' | 'h1' | 'h2' | 'h3' | 'p';
}> = ({ value, mode, content, ...props }) => {
  const tagName = mode === 'normal' || !mode ? 'div' : mode;
  return React.createElement(tagName, props, value || content);
};

const SchemaField = createSchemaField({
  components: {
    QueryTable,
    QueryList,
    QueryForm,
    Space,
    FormGrid,
    FormLayout,
    FormTab,
    FormCollapse,
    ArrayTable,
    ArrayCards,
    FormItem,
    DatePicker,
    Checkbox,
    Cascader,
    Editable,
    Input,
    Text,
    NumberPicker,
    Switch,
    Password,
    PreviewText,
    Radio,
    Reset,
    Select,
    Submit,
    TimePicker,
    Transfer,
    TreeSelect,
    Upload,
    Card,
    Slider,
    Rate,
  },
});

export interface IPreviewWidgetProps {
  tree: TreeNode;
}

export const PreviewWidget: React.FC<IPreviewWidgetProps> = (props) => {
  const form = useMemo(() => createForm(), []);
  const { form: formProps, schema } = transformToSchema(props.tree);
  return (
    <Form {...formProps} form={form}>
      <SchemaField schema={schema} />
    </Form>
  );
};
