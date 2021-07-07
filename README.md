# material-ui-dialog-alert

> Made with create-react-library

[![NPM](https://img.shields.io/npm/v/material-ui-dialog-alert.svg)](https://www.npmjs.com/package/material-ui-dialog-alert) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

#### yarn
```bash
yarn add material-ui-dialog-alert
```

#### npm
```bash
npm install --save material-ui-dialog-alert
```

## Usage

```tsx
import React from 'react';
import { DialogAlertRoot, DialogAlert } from 'material-ui-dialog-alert';

const Child = () => {
  const clickHandler = () => {
    DialogAlert.show({
      closeOnOverlayTap: false,
      dialogProps: undefined, // dialogProps (optional)
      title: 'My title', // string (optional),
      description: 'my description', // string or JSX.Element (optional),
      buttons: [
        {
          title: 'Cancel',
          buttonProps: { color: 'secondary' },
          onClick: () => {
            console.log('callback button Cancel');
            DialogAlert.hide();
          },
        },
        {
          title: 'Ok',
          buttonProps: { color: 'primary' },
          onClick: async () => {
            alert('callback button Ok');
            DialogAlert.hide();
          },
        },
      ],
      onClose: () => console.log('dialog alert is close'), // (optional)
    });
  };
  return <button onClick={clickHandler}>Test My</button>;
};

const Parent = () => {

  return (
    <DialogAlertRoot dialogProps={{ maxWidth: 'xs' }} closeOnOverlayTap={false}>
      <Child />
    </DialogAlertRoot>
  );
};

export default Parent;
```
## Usage

### Root Component
A React node that will be most likely wrapping your whole app.

| Name                | Description                                         | Require  | Default  | Type                              |
| ------------------- | --------------------------------------------------- | -------- | -------- | --------------------------------- |
|dialogProps|  |  |  | Partial\<DialogProps> |
|closeOnOverlayTap|allow close if click in overlay| |  false | bool |


### Dialog Box Component
| Name                | Description                                         | Require  | Default  | Type                              |
| ------------------- | --------------------------------------------------- | -------- | -------- | --------------------------------- |
| title               | The title text                                      |   false  |          | String                            |
| description         | The description text  or   JEX.Element              |   false  |          | String                            |
| buttons             | buttons                                             |   true   |          | [IButton] OR [IButton, IButton]    |
|closeOnOverlayTap|allow close if click in overlay| |  false | bool |
| dialogProps             |                                              |      |          | Partial\<DialogProps>    |


```ts

type IButton = { buttonProps?: ButtonProps; title: string; onClick: () => void };

export type IConfig = {
  closeOnOverlayTap?: boolean;
  dialogProps?: Partial<DialogProps>;
  title: string;
  description: string | ReactElement;
  buttons: [IButton] | [IButton, IButton];
};
```


## License

MIT © [CodingByJerez](https://github.com/CodingByJerez) Rodolphe Jerez
