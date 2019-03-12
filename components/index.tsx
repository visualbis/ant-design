/* @remove-on-es-build-begin */
// this file is not used if use https://github.com/ant-design/babel-plugin-import
import DatePicker from './date-picker';

import React, { Component } from 'react';
import * as ReactDOM from "react-dom";
import "./date-picker/style"
import "./calendar/style"

const {MonthPicker,WeekPicker} = DatePicker;
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

class App extends Component {
  constructor(props) {
    super(props);
  const cdate =  new Date();
  const cyear = cdate.getFullYear();
  const cmonth =  cdate.getMonth();
  const selectedvalue = {};
  
  const stylejson = "";
  
  selectedvalue[cyear] = [cmonth];
    this.state= {"calendarprops":{"stylejson":stylejson,"rangemode":true,"rangestart":2010,"rangeend":2019,"defaultyear":2011,"enablefiscal":false,"type":"yqmm","open":true,"monthflow":"vertical","selectedvalue":selectedvalue},"selectedvalue":selectedvalue,type:"yqmm",monthflow:"horizontal"};
  }
   onDateSelect(value){
     alert(value);
    const year = value._d.getFullYear();
    const month =  value._d.getMonth();
    this.updateSelectedValue(year,month);   
  }
  onQuarterSelect(year,month){
    this.updateSelectedValue(year,month);   
  }
  onRangeSelect(){
    let state = this.state;
    if(state.calendarprops.rangemode){
      if(state.calendarprops.rangestart > state.calendarprops.rangeend){
        state.calendarprops.rangeend = state.calendarprops.rangestart;
      }
      var _keys =  Object.keys(state.calendarprops.selectedvalue);
      for(var key in state.calendarprops.selectedvalue){
      if(_keys.indexOf(key) === -1){
        delete state.calendarprops.selectedvalue[key];
      }
      }
    }
    this.setState(state);
  }
  disabledDate(value){   
    return false;
  }
  
  updateSelectedValue(year,month){
    const quarterObj = {
      12:[0,1,2],
      13:[3,4,5],
      14:[6,7,8],
      15:[9,10,11]
    };
    const quarterObj1 = {
      12:[0,1,2,12],
      13:[3,4,5,13],
      14:[6,7,8,14],
      15:[9,10,11,15]
    };
    const mapObj = {
      0:12,
      1:12,
      2:12,
      3:13,
      4:13,
      5:13,
      6:14,
      7:14,
      8:14,
      9:15,
      10:15,
      11:15
    }
    let state =  this.state;
    if(!state.calendarprops.selectedvalue[year]){
      state.calendarprops.selectedvalue[year] = [];
    }
    if(this.state.calendarprops.type == "ym"){
      state.calendarprops.selectedvalue[year] = [month];
    }else if(this.state.calendarprops.type == "ymm"){
      if(state.calendarprops.selectedvalue[year].indexOf(month)==-1 ){
        state.calendarprops.selectedvalue[year].push(month);
      }else{
        state.calendarprops.selectedvalue[year].splice(state.calendarprops.selectedvalue[year].indexOf(month),1);
      }
   }else if(this.state.calendarprops.type == "yqm"){
     if(month>11){
     let qo =  quarterObj[month].filter(function(item){ return state.calendarprops.selectedvalue[year].indexOf(item)> -1; });
      if(qo.length<3){
        state.calendarprops.selectedvalue[year] = quarterObj1[month];
      }else{
        state.calendarprops.selectedvalue[year] = [];
      }
     }else{
       var index =  state.calendarprops.selectedvalue[year].indexOf(month);
       if(index >-1){
        state.calendarprops.selectedvalue[year].splice(index,1);
        var qindex =state.calendarprops.selectedvalue[year].indexOf( mapObj[month]);
        if(qindex>-1){
          state.calendarprops.selectedvalue[year].splice(qindex,1);
        }
       }else{
        var qindex = mapObj[month];
        let qo = quarterObj[qindex].filter(function(item){ return state.calendarprops.selectedvalue[year].indexOf(item)> -1; });
        if(qo.length == 0){
          state.calendarprops.selectedvalue[year] = [];
        }
        state.calendarprops.selectedvalue[year].push(month);
        if(state.calendarprops.selectedvalue[year].length == 3){
          state.calendarprops.selectedvalue[year].push(qindex);
        }
       }
     
     }

    }else if(this.state.calendarprops.type == "yqmm"){
       if(month>11){
        let qo =  quarterObj[month].filter(function(item){ return state.calendarprops.selectedvalue[year].indexOf(item)> -1; });
        if(qo.length<3){
          quarterObj1[month].forEach(function(item){
            if(state.calendarprops.selectedvalue[year].indexOf(item) === -1){
              state.calendarprops.selectedvalue[year].push(item);
            }
          });
         
        }else{
          quarterObj1[month].forEach(function(item){
            var mindex = state.calendarprops.selectedvalue[year].indexOf(item);
            state.calendarprops.selectedvalue[year].splice(mindex,1);
          });
        }
     }else{
      var index =  state.calendarprops.selectedvalue[year].indexOf(month);
      if(index >-1){
        state.calendarprops.selectedvalue[year].splice(index,1);
        var qindex =state.calendarprops.selectedvalue[year].indexOf( mapObj[month]);
        if(qindex>-1){
          state.calendarprops.selectedvalue[year].splice(qindex,1);
        }
      }else{
        state.calendarprops.selectedvalue[year].push(month); 
        var qindex = mapObj[month];
        let qo = quarterObj[qindex].filter(function(item){ return state.calendarprops.selectedvalue[year].indexOf(item) === -1; });
        if(qo.length == 0){
          state.calendarprops.selectedvalue[year].push(qindex);
        }
       
      }
     }

    }

    if(state.calendarprops.rangemode){
      if(state.calendarprops.rangestart > state.calendarprops.rangeend){
        state.calendarprops.rangeend = state.calendarprops.rangestart;
      }
      for(var i =  state.calendarprops.rangestart;i<= state.calendarprops.rangeend;i++){ 
        state.calendarprops.selectedvalue[i] =  state.calendarprops.selectedvalue[year];
      }
    }
    this.setState(state);

  }
  render() {
    return (
      <div className="App" >
    
       {/*  <WeekPicker open="false"/>  */}
       <MonthPicker disabledDate={this.disabledDate.bind(this)} open={this.state.calendarprops.open} calendarprops={this.state.calendarprops} onSelect={this.onDateSelect.bind(this)} onQuarterSelect={this.onQuarterSelect.bind(this)} onRangeSelect={this.onRangeSelect.bind(this)}/>  
      {/*    <WeekPicker calendarprops={this.state.calendarprops} onSelect={this.onDateSelect.bind(this)} open="true" placeholder="Select week" /> */}    
      </div>
    );
  }
}
//ReactDOM.render(<App/>, document.getElementById("root"));


/* @remove-on-es-build-end */
export  function loadEditor(element, options, config) {  
  ReactDOM.render(<MonthPicker  open={options.calendarprops.open} calendarprops={options.calendarprops} disabledDate={options.disabledDate.bind(this)} 
  monthCellContentRender={options.contentRender.bind(this)} onSelect={options.onDateSelect.bind(this)} onQuarterSelect={options.onQuarterSelect.bind(this)} onRangeSelect={options.onRangeSelect.bind(this)} />, element);
}
