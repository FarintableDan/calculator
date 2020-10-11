import * as React from 'react';

import { IApp } from 'interfaces/IApp';
import { IButtons } from 'interfaces/IButton';

import buttons from './helpers/buttons';

import { Button } from './components/button';


export default class App extends React.Component<unknown, IApp> {
  constructor(props:null) {
    super(props);

    this.state = {
      query: '',
      mathQuery: '',
      result: '',
    };

    this.keyboardCalc = this.keyboardCalc.bind(this);
  }

  componentDidMount(): void {
    this.keyboardCalc();
  }

  keyboardCalc():void {
    document.body.addEventListener('keydown', (e) => {
      Object.values(buttons).find((button):void => {
        if (e.key === button.key) {
          this.getCalc(button);
        }
      });
    });
  }

  getCalc(item:IButtons): void {
    const {
      query,
      mathQuery,
    } = this.state;
    switch (item.type) {
      case 'sqrt':
        return this.setState({ result: Math.sqrt(eval(mathQuery)), query: `${eval(mathQuery)}` });
      case 'clear':
        return this.setState({ query: '', result: '', mathQuery: '' });
      case 'eval':
        return this.setState({ result: eval(mathQuery) });
      case 'percent':
        return this.setState({ result: mathQuery });
      default: return this.setState({
        query: query + item.text,
        mathQuery: mathQuery + item.value,
      });
    }
  }

  render(): React.ReactElement {
    const {
      query,
      result,
    } = this.state;

    return (
      <React.Fragment>
        <div className="wrapper">
          <div className="container">
            <div className="calc">
              <div className="calc__query">
                <div className="calc__string">
                  {query}
                </div>
                <div className="calc__result">
                  {result}
                </div>
              </div>
              <div className="calc__buttons">
                {buttons.map((button, index) => (
                  <Button
                    type="button"
                    text={button.text}
                    key={index}
                    value={button.value}
                    calc={() => this.getCalc(button)}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
