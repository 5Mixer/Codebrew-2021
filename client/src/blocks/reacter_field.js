import * as Blockly from 'blockly/core';

Blockly.Blocks['reacter_field'] = {
  init: function() {
    // this.appendField('author')
    this.appendDummyInput().appendField('reacter');
    this.setOutput(true, ['Messagable', 'String']);
    
    this.setColour(130);
    this.setTooltip('The person who reacted to a message message');
  }
};

Blockly.JavaScript['reacter_field'] = function() {
	return ['reacter', Blockly.JavaScript.ORDER_ATOMIC];
};