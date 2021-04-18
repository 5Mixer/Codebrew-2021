import * as Blockly from 'blockly/core';

Blockly.Blocks['http_request'] = {
  init: function() {
    // this.appendField('author')
    this.appendValueInput('url').appendField('http request to url').setCheck("String");
    this.setOutput(true, ['String']);
    
    this.setColour(130);
    this.setTooltip('Make a HTTP request and return the body as a string');
  }
};

Blockly.JavaScript['http_request'] = function(block) {
	var url = Blockly.JavaScript.valueToCode(block, 'url', Blockly.JavaScript.ORDER_NONE) || '\'\'';
	return ['http_request('+url+')', Blockly.JavaScript.ORDER_ATOMIC];
};