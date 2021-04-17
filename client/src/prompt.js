import * as Blockly from 'blockly/core';
import Swal from "sweetalert2";

var renameVar = function(name) {
  return name;
};

Blockly.prompt = function(msg, defaultValue, callback) {
  Swal.fire({
    title: "Variable:",
    input: "text",
    inputAttributes: {
      autocapitalize: "off"
    },
    showCancelButton: true,
    confirmButtonText: "Look up",
    showLoaderOnConfirm: true,
    allowOutsideClick: () => !Swal.isLoading()
  }).then(result => {
    if (result.value) {
      callback(renameVar(result.value));
    }
  });
};
