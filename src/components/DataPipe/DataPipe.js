import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import s from './DataPipe.scss';
import withStyles from '../../decorators/withStyles';
import d3 from 'd3';

const MIN_RECT_HEIGHT = 80;
const RADIUS = 20;

@withStyles(s)
class DataPipe extends Component {

  constructor() {
    super();
    this.state = {
      totalHeight: 0,
      operators: [],
    }
  };

  static propTypes = {
    title: PropTypes.string,
  };

  static contextTypes = {
    onSetTitle: PropTypes.func.isRequired,
  };

  addOperator() {
    const operatorToAdd = this.getOperatorName();
    const operators = this.state.operators;
    operators.push(operatorToAdd);
    this.setState({
      operators: operators
    })
  };

  componentDidMount() {
    debugger;
    const elem = this.refs.container;
    this.setState({totalHeight: elem.clientHeight});
  };

  render() {
    this.context.onSetTitle(this.props.title);
    debugger;
    let elems = null;
    if (this.state.totalHeight > 0) {
      const numOperators = this.state.operators.length;
      const rectHeight = numOperators > 1 ?
        (this.state.totalHeight - numOperators * 2 * RADIUS) / (numOperators - 1) : 0;
      elems = this.state.operators.map((operatorName, i) => {
        const opElem = this.getOperator(operatorName);
        return opElem;
      });
    }
    return (
      <div className={s.container} ref="container">
        {elems}
        <button className={s.addButton} onClick={() => this.addOperator()}>Add Operator</button>
      </div>
    );
  }

  getOperatorName() {
    let operator;
    const numOps = this.state.numOperators;
    if (numOps === 0) {
      operator = "join";
    } else {
      const rand = Math.floor((Math.random() * 3) + 1);
      if (rand === 1) {
        operator = "combobulator";
      } else if (rand === 2) {
        operator = "filter";
      } else {
        operator = "reformat";
      }
    }
    return operator;
  };

  getOperator(name) {
    if (name === 'join') return this.getJoin();
    if (name === 'combobulator') return this.getCombobulator();
    if (name === 'filter') return this.getFilter();
    if (name === 'reformat') return this.getReformat();
  };

  getReformat() {
    return (
      <svg width="40" height="40" viewBox="-2 -2 44 44">
        <defs>
            <circle id="a" cx="20" cy="20" r="20"/>
        </defs>
        <g fill="none" fill-rule="evenodd">
            <use stroke="#E4C04D" strokeWidth="4" fill="#DCAD02" xlinkHref="#a"/>
            <use xlinkHref="#a"/>
            <path fill="#FFF" d="M19 17l4 3-4 3z"/>
            <path stroke="#FFF" d="M8 16h8v8H8z"/>
            <circle stroke="#FFF" cx="29" cy="20" r="4"/>
        </g>
      </svg>
    );
  };

  getCombobulator() {
    return (
      <svg width="40" height="40" viewBox="-2 -2 44 44">
        <defs>
            <circle id="a" cx="20" cy="20" r="20"/>
        </defs>
        <g fill="none" fill-rule="evenodd">
            <g>
                <use stroke="#E4C04D" strokeWidth="4" fill="#DCAD02" xlinkHref="#a"/>
                <use xlinkHref="#a"/>
            </g>
            <g stroke="#FFF" stroke-linecap="square">
                <path d="M13 12h14M13 16h14M13 20h14M13 24h14M13 28h14"/>
            </g>
        </g>
      </svg>
    );
  };

  getFilter() {
    return (
      <svg width="40" height="40" viewBox="-2 -2 44 44">
        <defs>
            <circle id="a" cx="20" cy="20" r="20"/>
        </defs>
        <g fill="none" fill-rule="evenodd">
            <g>
                <use stroke="#E4C04D" strokeWidth="4" fill="#DCAD02" xlinkHref="#a"/>
                <use xlinkHref="#a"/>
            </g>
            <path d="M20 12v16M24.5 12.5L22 28M15.5 12.5L18 28M11.5 14.5L16 28M28.5 14.5L24 28" stroke="#FFF" stroke-linecap="square"/>
        </g>
      </svg>
    );
  };

  getJoin() {
    return (
      <svg width="40" height="40" viewBox="-2 -2 44 44">
        <defs><circle id="a" cx="20" cy="20" r="20"/></defs>
        <g fill="none" fill-rule="evenodd">
          <g><use stroke="#E4C04D" strokeWidth="4" fill="#DCAD02" xlinkHref="#a"/><use xlinkHref="#a"/></g>
          <g transform="translate(11 14)" stroke="#FFF">
            <circle cx="6" cy="6" r="6"/>
            <circle cx="12" cy="6" r="6"/>
          </g>
        </g>
      </svg>
    );
  };

  getRect(height) {
    if (!height) {
      height = 80;
    }
    return (
      <svg with="6" height={height}>
        <rect x="0" y = "0" width="6" height={height} fill="#DCAD02"/>
      </svg>
    );
  };
}

class OperatorCircle extends Component {

}

export default DataPipe;
