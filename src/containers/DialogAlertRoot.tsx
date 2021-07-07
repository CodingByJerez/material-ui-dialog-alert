import React from 'react';
import DialogAlert from './DialogAlert';
import { DialogProps } from '@material-ui/core';

type IProps = {
  closeOnOverlayTap?: boolean;
  dialogProps?: Partial<DialogProps>;
};

const DialogAlertRoot: React.FunctionComponent<IProps> = ({ closeOnOverlayTap, dialogProps, children }) => {
  return (
    <React.Fragment>
      {children}
      <DialogAlert ref={DialogAlert.instance} closeOnOverlayTap={closeOnOverlayTap} dialogProps={dialogProps} />
    </React.Fragment>
  );
};

export default DialogAlertRoot;
