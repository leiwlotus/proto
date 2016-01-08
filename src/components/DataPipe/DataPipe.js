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
      idCounter: 0
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
    operators.push({
      name: operatorToAdd,
      key: this.getNextKey()
    });
    this.setState({
      operators: operators
    })
  };

  getNextKey() {
    const nextId = this.state.idCounter;
    this.setState({ idCounter: nextId + 1});
    return nextId;
  };

  componentDidMount() {
    const elem = this.refs.container;
    this.setState({totalHeight: elem.clientHeight});
  };

  render() {
    this.context.onSetTitle(this.props.title);
    let elems = null;
    if (this.state.totalHeight > 0) {
      const numOperators = this.state.operators.length;
      let rectHeight = numOperators > 1 ?
        (this.state.totalHeight - numOperators * 2 * RADIUS) / (numOperators - 1) : 0;
      if (rectHeight < MIN_RECT_HEIGHT) {
        rectHeight = MIN_RECT_HEIGHT;
      }
      elems = this.state.operators.map((operator, i) => {
        let opElem = this.getOperator(operator);
        if (i < this.state.operators.length - 1) {
          const rectElem = this.getRect('rect_' + operator.key, rectHeight);
          opElem = ([opElem, rectElem]);
        }
        return opElem;
      });
    }
    return (
      <div className={s.container} ref="container">
        {elems}
        <button className={s.addButton} onClick={() => this.addOperator()}>Add Operator</button>
        <button className={s.deleteButton} onClick={() => this.deleteOperator()}>Delete Operator</button>
      </div>
    );
  };

  getOperatorName() {
    let operator;
    const numOps = this.state.operators.length;
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

  getOperator({name, key}) {
    if (name === 'join') return this.getJoin(key);
    if (name === 'combobulator') return this.getCombobulator(key);
    if (name === 'filter') return this.getFilter(key);
    if (name === 'reformat') return this.getReformat(key);
  };

  deleteOperator() {
    const operators = this.state.operators;
    if (operators.length > 0) {
      operators.pop();
      this.setState({ operators: operators });
    }
  };

  getReformat(key) {
    return (
      <svg key={key} width="40" height="40" viewBox="-2 -2 44 44">
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

  getCombobulator(key) {
    return (
      <svg key={key} width="40" height="40" viewBox="-2 -2 44 44">
        <defs>
            <circle id="a" cx="20" cy="20" r="20"/>
        </defs>
        <g fill="none" fill-rule="evenodd">
            <g>
                <use stroke="#E4C04D" strokeWidth="4" fill="#DCAD02" xlinkHref="#a"/>
                <use xlinkHref="#a"/>
            </g>
            <g stroke="#FFF" strokeLinecap="square">
                <path d="M13 12h14M13 16h14M13 20h14M13 24h14M13 28h14"/>
            </g>
        </g>
      </svg>
    );
  };

  getFilter(key) {
    return (
      <svg key={key} width="40" height="40" viewBox="-2 -2 44 44">
        <defs>
            <circle id="a" cx="20" cy="20" r="20"/>
        </defs>
        <g fill="none" fill-rule="evenodd">
            <g>
                <use stroke="#E4C04D" strokeWidth="4" fill="#DCAD02" xlinkHref="#a"/>
                <use xlinkHref="#a"/>
            </g>
            <path d="M20 12v16M24.5 12.5L22 28M15.5 12.5L18 28M11.5 14.5L16 28M28.5 14.5L24 28" stroke="#FFF" strokeLinecap="square"/>
        </g>
      </svg>
    );
  };

  getJoin(key) {
    return (
      <svg key={key} width="40" height="40" viewBox="-2 -2 44 44">
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

  getRect(key, height) {
    if (!height) {
      height = 80;
    }
    return (
      <svg key={key} width="6" height={height}>
        <rect x="0" y = "0" width="6" height={height} fill="#DCAD02"/>
      </svg>
    );
  };
}

class OperatorCircle extends Component {

}

export default DataPipe;
