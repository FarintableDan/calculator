export interface IButtons {
  key: number | boolean | string,
  text: string,
  type?: string,
  value?: string,
}

export interface IButton extends IButtons {
  value: string,
  calc: (item: IButtons) => void,
}
