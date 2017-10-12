import * as React from 'react';

interface Props {
  title: string;
  rows: number;
  name: string;
  content: string;
  resize: boolean;
  placeholder: string;
  controlFunc: (event: any) => any;
}
const TextArea = (props: Props) => (
  <div className="form-group">
    <label className="form-label">{props.title}</label>
    <textarea
      className="form-input"
      style={props.resize ? {} : { resize: 'none' }}
      name={props.name}
      rows={props.rows}
      value={props.content}
      onChange={props.controlFunc}
      placeholder={props.placeholder}
    />
  </div>
);

export default TextArea;
