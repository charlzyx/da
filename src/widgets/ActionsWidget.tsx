import React, { useEffect } from 'react';
import { Button, Radio, Space } from 'antd';
import GithubOutlined from '@ant-design/icons/GithubOutlined';
import { TextWidget, useDesigner } from '@designable/react';
import { GlobalRegistry } from '@designable/core';
import { observer } from '@formily/react';
import { loadInitialSchema, saveSchema } from '../service';

export const ActionsWidget = observer(() => {
  const designer = useDesigner();

  useEffect(() => {
    loadInitialSchema(designer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const supportLocales = ['zh-cn', 'en-us', 'ko-kr'];
  useEffect(() => {
    if (!supportLocales.includes(GlobalRegistry.getDesignerLanguage())) {
      GlobalRegistry.setDesignerLanguage('zh-cn');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Space style={{ marginRight: 10 }}>
      <Radio.Group
        value={GlobalRegistry.getDesignerLanguage()}
        optionType="button"
        options={[
          // { label: 'English', value: 'en-us' },
          { label: '简体中文', value: 'zh-cn' },
          // { label: '한국어', value: 'ko-kr' },
        ]}
        onChange={(e) => {
          GlobalRegistry.setDesignerLanguage(e.target.value);
        }}
      />
      <Button
        type="primary"
        href="https://github.com/charlzyx/da"
        target="_blank"
      >
        <GithubOutlined />
        Github
      </Button>
      <Button href="https://github.com/alibaba/designable" target="_blank">
        <GithubOutlined />
        Designable
      </Button>
      {/* <Button
        onClick={() => {
          saveSchema(designer)
        }}
      >
        <TextWidget>Save</TextWidget>
      </Button>
      <Button
        type="primary"
        onClick={() => {
          saveSchema(designer)
        }}
      >
        <TextWidget>Publish</TextWidget>
      </Button> */}
    </Space>
  );
});
