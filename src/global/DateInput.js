import React from "react";
import Input from "./Input";
import $ from "jquery";
import { DateInput } from "reactstrap";
/*global $*/
/*eslint no-undef: "error"*/

export default class DateInputx extends React.Component {
  render() {
    return <Input usage="Date" name="date" extraClasses="datepicker" />;
  }

  componentDidMount() {
    let { onChange, value } = this.props;
    $(".datepicker").datepicker({
      onSelect: function(dateText) {
        onChange($(".datepicker").datepicker("getDate"));
      },
      dateFormat: "dd/mm/yy"
    });
    $(".datepicker").datepicker("setDate", value);
  }
}
