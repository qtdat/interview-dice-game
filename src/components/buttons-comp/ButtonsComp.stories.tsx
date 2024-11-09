import { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

import ButtonsComp from '@/components/buttons-comp';

const meta = {
  title: 'Libraries/Components/Buttons group',
  component: ButtonsComp,
  parameters: {},
  tags: ['autodocs'],
  argTypes: {},
  args: { onCallback: fn() },
  decorators: [
    (Story) => {
      return (
        <div className='w-full'>
          <Story />
        </div>
      );
    },
  ],
} satisfies Meta<typeof ButtonsComp>;

export default meta;

type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    items: [
      {
        name: 'save',
        label: 'save',
      },
      {
        name: 'cancel',
        label: 'cancel',
        color: 'error',
      },
      {
        name: 'google',
        label: 'Go to Google',
        isLink: true,
        i18n: false,
        to: 'https://www.google.com',
      },
      {
        isDropdown: true,
        name: 'my-dropdown',
        label: 'my-dropdown',
        items: [
          {
            action: 'insert',
            label: 'insert',
          },
          {
            action: 'delete',
            label: 'delete',
          },
        ],
      },
      {
        name: 'close',
        label: 'close',
      },
    ],
    className: 'py-8',
  },
};
