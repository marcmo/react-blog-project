import * as React from 'react';

interface Props {
  inputType: 'text' | 'number';
  title: string;
  name: string;
  controlFunc: (event: any) => any;
  content: string | number;
  placeholder: string;
}
const SingleInput = (props: Props) => (
  <div className="form-group">
    <label className="form-label">{props.title}</label>
    <input
      className="form-input"
      type={props.inputType}
      value={props.content}
      onChange={props.controlFunc}
      placeholder={props.placeholder}
    />
  </div>
);

export default SingleInput;
