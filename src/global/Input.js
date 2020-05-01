import React, { Component } from "react";

export default class Input extends Component {
  render() {
    let htmlFor = "input" + this.props.usage + "3";
    let name = "input-name-" + this.props.usage;
    let type = "text";
    let extraClasses = "";
    if (this.props.name) name = this.props.name;
    if (this.props.type) type = this.props.type;
    if (this.props.extraClasses) extraClasses = this.props.extraClasses;

    let style = {
      marginTop: "2vh",
      marginBottom: "2vh",
      marginLeft: "15px",
      marginRight: "15px"
    };
    return (
      <div className="TitleInput from-group row" style={style}>
        <label
          htmlFor={htmlFor}
          className="col-sm-offset-2 col-sm-2 control-label"
        >
          {this.props.usage}
        </label>
        <div className="col-sm-5">
          <input
            type={type}
            className={`form-control ${extraClasses}`}
            id={htmlFor}
            placeholder={this.props.usage}
            value={this.props.value}
            onChange={this.props.onChange}
            onKeyUp={this.props.onKeyUp}
            name={name}
          />
        </div>
      </div>
    );
  }
}
