import { Meta, StoryObj } from '@storybook/react';

import { products } from '../sample.json';
import Datasource from './data-source';

const meta = {
  title: 'Demo/Redux/DataSource',
  component: Datasource,
  parameters: { layout: '' },
  tags: ['autodocs'],
  argTypes: {},
  args: {},
} satisfies Meta<typeof Datasource>;

export default meta;

type Story = StoryObj<typeof meta>;

export const primary: Story = {
  args: {
    initValues: products,
  },
};

