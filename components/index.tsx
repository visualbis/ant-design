/* @remove-on-es-build-begin */
// this file is not used if use https://github.com/ant-design/babel-plugin-import
import DatePicker from './date-picker';
import * as React from "react";
import * as ReactDOM from "react-dom";
import "./date-picker/style"
import "./calendar/style"
const {MonthPicker} = DatePicker;
const ENV = process.env.NODE_ENV;
if (ENV !== 'production' &&
  ENV !== 'test' &&
  typeof console !== 'undefined' &&
  console.warn &&
  typeof window !== 'undefined') {
  console.warn(
    'You are using a whole package of antd, ' +
    'please use https://www.npmjs.com/package/babel-plugin-import to reduce app bundle size.',
  );
}
/* @remove-on-es-build-end */
export  function loadEditor(element, options, config) {
  ReactDOM.render(<MonthPicker monthflow={options.monthflow} type={options.type} selectedvalue={options.selectedvalue} onSelect={options.onDateSelect.bind(this)} onQuarterSelect={options.onQuarterSelect.bind(this)} />, element);
}
