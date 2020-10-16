
import Vue, { CreateElement, VNode } from 'vue';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
import TDialogOverlayWrapper from './TDialogOverlayWrapper';
import { DialogInput } from './TDialogOverlayWrapperTransitionDialog';

const TDialogOverlay = Vue.extend({
  name: 'TDialogOverlay',

  props: {
    getElementCssClass: {
      type: Function,
      required: true,
    },
    overlayShow: {
      type: Boolean,
      required: true,
    },
    dialogShow: {
      type: Boolean,
      required: true,
    },
    titleTag: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      default: undefined,
    },
    htmlTitle: {
      type: String,
      default: undefined,
    },
    textTag: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      default: undefined,
    },
    htmlText: {
      type: String,
      default: undefined,
    },
    icon: {
      type: String,
      default: undefined,
    },
    htmlIcon: {
      type: String,
      default: undefined,
    },
    cancelButtonText: {
      type: String,
      required: true,
    },
    cancelButtonAriaLabel: {
      type: String,
      default: undefined,
    },
    okButtonText: {
      type: String,
      required: true,
    },
    okButtonAriaLabel: {
      type: String,
      default: undefined,
    },
    showCloseButton: {
      type: Boolean,
      required: true,
    },
    closeButtonHtml: {
      type: String,
      required: true,
    },
    preConfirm: {
      type: Function,
      default: undefined,
    },
    inputAttributes: {
      type: Object,
      default: undefined,
    },
    inputType: {
      type: String,
      required: true,
    },
    inputValidator: {
      type: Function,
      default: undefined,
    },
    inputValue: {
      type: [String, Array],
      default: undefined,
    },
    inputOptions: {
      type: [Array, Object],
      default: undefined,
    },
    inputPlaceholder: {
      type: String,
      default: undefined,
    },
    type: {
      type: String,
      default: null,
    },
  },

  methods: {
    clickHandler(e: MouseEvent) {
      if (e.target !== this.$el) {
        return;
      }

      this.$emit('outsideClick', e);
    },
    keyupHandler(e: KeyboardEvent) {
      this.$emit('keyup', e);
    },
    focus() {
      (this.$el as HTMLDivElement).focus();
    },
    enableBodyScroll() {
      const mdl = this.$el as HTMLDivElement;
      enableBodyScroll(mdl);
    },
    disableBodyScroll() {
      const mdl = this.$el as HTMLDivElement;
      disableBodyScroll(mdl, {
        reserveScrollBarGap: true,
      });
    },
  },

  render(createElement: CreateElement): VNode {
    if (!this.overlayShow) {
      return createElement();
    }

    return createElement(
      'div',
      {
        attrs: {
          tabindex: 0,
        },
        class: this.getElementCssClass('overlay'),
        on: {
          keyup: this.keyupHandler,
          click: this.clickHandler,
        },
      },
      [
        createElement(
          TDialogOverlayWrapper,
          {
            props: {
              type: this.type,
              getElementCssClass: this.getElementCssClass,
              dialogShow: this.dialogShow,
              titleTag: this.titleTag,
              title: this.title,
              htmlTitle: this.htmlTitle,
              icon: this.icon,
              htmlIcon: this.htmlIcon,
              textTag: this.textTag,
              text: this.text,
              htmlText: this.htmlText,
              cancelButtonText: this.cancelButtonText,
              cancelButtonAriaLabel: this.cancelButtonAriaLabel,
              okButtonText: this.okButtonText,
              okButtonAriaLabel: this.okButtonAriaLabel,
              showCloseButton: this.showCloseButton,
              closeButtonHtml: this.closeButtonHtml,
              preConfirm: this.preConfirm,
              inputAttributes: this.inputAttributes,
              inputType: this.inputType,
              inputValidator: this.inputValidator,
              inputValue: this.inputValue,
              inputOptions: this.inputOptions,
              inputPlaceholder: this.inputPlaceholder,
            },
            on: {
              dismiss: (e: MouseEvent) => this.$emit('dismiss', e),
              cancel: (e: MouseEvent) => this.$emit('cancel', e),
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              submit: (e: MouseEvent, input: DialogInput, response?: any) => this.$emit('submit', e, input, response),
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              submitError: (e: MouseEvent, input: DialogInput, error?: any) => this.$emit('submitError', e, input, error),
            },
          },
        ),
      ],
    );
  },
});

export default TDialogOverlay;