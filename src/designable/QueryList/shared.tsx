export const actions = (
  givedName?: 'Popover' | 'Popconfirm' | 'Modal' | 'Drawer',
) =>
  (givedName ? [givedName] : ['Popover', 'Popconfirm', 'Modal', 'Drawer']).map(
    (name) => {
      return {
        componentName: 'Field',
        props: {
          type: 'object',
          title: name,
          'x-component': `QueryTable.Action.${name}`,
        },
        children: [
          {
            componentName: 'Field',
            props: {
              type: 'string',
              title: '输入框',
              'x-component': 'Input',
              'x-component-props': {
                title: '输入',
              },
            },
          },
        ],
      };
    },
  );

export const getQueryNode = () => ({
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
    // {
    //   componentName: 'Field',
    //   props: {
    //     type: 'string',
    //     'x-decorator': 'FormItem',
    //     'x-component': 'Input',
    //   },
    // },
  ],
});

export const getToolbarNode = () => ({
  componentName: 'Field',
  props: {
    type: 'void',
    'x-component': 'QueryTable.Toolbar',
  },
  children: actions(),
});

export const getColumnNode = () => ({
  componentName: 'Field',
  props: {
    type: 'void',
    'x-component': 'QueryTable.Column',
    'x-component-props': {
      title: `Title`,
    },
  },
});

export const getIndexNode = () => ({
  componentName: 'Field',
  props: {
    type: 'void',
    'x-component': 'QueryTable.Column',
    'x-component-props': {
      title: `序号`,
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
});

export const getActionsNode = () => ({
  componentName: 'Field',
  props: {
    type: 'void',
    'x-component': 'QueryTable.Column',
    'x-component-props': {
      title: `操作`,
    },
  },
  children: actions(),
});

export const getListNode = (source: any[]) => {
  return {
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
            title: `Title`,
          },
        },
        children: [
          ...source.map((node) => {
            node.props.title = undefined;
            return node;
          }),
        ],
      },
    ],
  };
};

export const getLocales = (title: string) => {
  return {
    'zh-CN': {
      title,
    },
    'en-US': {
      title,
    },
    'ko-KR': {
      title,
    },
  };
};
