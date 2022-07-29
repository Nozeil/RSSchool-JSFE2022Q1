export default interface TextComponentI {
  getTextComponent(elName: string, parentEl: HTMLElement, buttonClass: string, buttonText: string): HTMLElement;
}
