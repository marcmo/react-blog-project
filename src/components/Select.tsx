import * as React from 'react';

interface Props {
  title?: string;
  name: string;
  options: Array<string>;
  selectedOption: string;
  controlFunc: (event: any) => any;
  placeholder?: string;
}

const Select = (props: Props) => (
  <div className="form-group">
    {props.title ? <label className="form-label">{props.title}</label> : ''}
    <select
      name={props.name}
      value={props.selectedOption}
      onChange={props.controlFunc}
      className="form-select"
    >
      {props.placeholder ? <option value="">{props.placeholder}</option> : ''}
      {props.options.map((opt: string) => {
        return (
          <option key={opt} value={opt}>
            {opt}
          </option>
        );
      })}
    </select>
  </div>
);

export default Select;
