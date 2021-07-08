// @ts-ignore
import React from 'react';
import { DialogAlertRoot, DialogAlert } from 'material-ui-dialog-alert';
import 'material-ui-dialog-alert/dist/index.css';

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
          onClick: () => {
            alert('callback button Ok :)');
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
