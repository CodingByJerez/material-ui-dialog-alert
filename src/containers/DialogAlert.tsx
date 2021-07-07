import React, { FunctionComponent, ReactElement } from 'react';
import { Button, ButtonProps, Dialog, DialogActions, DialogContent, DialogContentText, DialogProps, DialogTitle } from '@material-ui/core';

type IButton = { buttonProps?: ButtonProps; title: string; onClick: () => void };
export type IConfig = {
  closeOnOverlayTap?: boolean;
  dialogProps?: Partial<DialogProps>;
  title: string;
  description: string | ReactElement;
  buttons: [IButton] | [IButton, IButton];
  onClose?: () => void;
};

type IProps = {
  closeOnOverlayTap?: boolean;
  dialogProps?: Partial<DialogProps>;
};

type IState = {
  dialogProps: Partial<DialogProps>;
  overlayClose?: boolean;
  visible: boolean;
  config: null | IConfig;
};

class DialogAlert extends React.Component<IProps, IState> {
  /**
   * @type {React.RefObject<DialogAlert>}
   */
  public static instance: React.RefObject<DialogAlert> = React.createRef();

  /**
   * @param {IConfig} args
   */
  public static show = (args: IConfig): void => {
    DialogAlert.instance.current?._open(args);
  };

  /**
   * @return {void}
   */
  public static hide = (): void => {
    DialogAlert.instance.current?._close();
  };

  /**
   * @param {IProps} props
   */
  constructor(props: IProps) {
    super(props);
    this.state = {
      dialogProps: props.dialogProps ?? {},
      config: null,
      visible: false,
    };
  }

  /**
   * @param {IConfig} config
   */
  private _open = async (config: IConfig): Promise<void> => {
    this.setState(prevState => ({ ...prevState, visible: true, config }));
  };

  /**
   * @return {Promise<void>}
   */
  private _close = async (reason?: 'backdropClick' | 'escapeKeyDown'): Promise<void> => {
    const { visible, config } = this.state;
    if (!visible) {
      return;
    }

    if (reason === 'backdropClick' && (config?.closeOnOverlayTap === false || (config?.closeOnOverlayTap !== true && !this.props?.closeOnOverlayTap))) {
      return;
    }
    const onClose = config?.onClose;
    await new Promise<void>(resolve => this.setState(prevState => ({ ...prevState, config: null, visible: false }), resolve));
    onClose?.();
  };

  /**
   * @param {string | undefined} title
   * @return {JSX.Element}
   */
  private _TitleRender: FunctionComponent<{ title?: string }> = ({ title }) => (title ? <DialogTitle>{title}</DialogTitle> : <React.Fragment />);

  /**
   * @param {string | React.ReactElement<any, string | React.JSXElementConstructor<any>> | undefined} content
   * @return {JSX.Element}
   */
  private _ContentRender: FunctionComponent<{ content?: IConfig['description'] }> = ({ content }) => {
    if (!content) {
      return <React.Fragment />;
    }
    if (typeof content !== 'string') {
      return <DialogContent>{content}</DialogContent>;
    }
    return (
      <DialogContent>
        <DialogContentText>{content}</DialogContentText>
      </DialogContent>
    );
  };

  /**
   * @param {[IButton] | [IButton, IButton]} buttons
   * @return {JSX.Element}
   */
  private _ActionsRender: FunctionComponent<Pick<IConfig, 'buttons'>> = ({ buttons }) => (
    <DialogActions>
      {buttons.map((button, index) => (
        <Button key={index.toString()} {...button.buttonProps} onClick={button.onClick}>
          {button.title}
        </Button>
      ))}
    </DialogActions>
  );

  /**
   * @return {JSX.Element}
   */
  public render = (): ReactElement => {
    const { visible, config } = this.state;
    const { _TitleRender, _ContentRender, _ActionsRender } = this;
    return (
      <Dialog //
        fullWidth={true}
        {...(config?.dialogProps ?? this.props.dialogProps)}
        open={visible}
        onClose={(_, reason) => this._close(reason)}
      >
        {config && (
          <React.Fragment>
            <_TitleRender title={config.title} />
            <_ContentRender content={config.description} />
            <_ActionsRender buttons={config.buttons} />
          </React.Fragment>
        )}
      </Dialog>
    );
  };
}

export default DialogAlert;
