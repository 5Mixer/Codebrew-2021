import * as Blockly from 'blockly/core';

Blockly.Blocks['json_access'] = {
  init: function() {
    // this.appendField('author')
    this.appendDummyInput().appendField('load data from a JSON string');
    this.appendValueInput('string').appendField('string').setCheck("String");
    this.appendValueInput('access').appendField('lookup').setCheck("String");
    this.setOutput(true);
    
    this.setColour(130);
    this.setTooltip('Load data from a JSON string');
  }
};

Blockly.JavaScript['json_access'] = function(block) {
	var string = Blockly.JavaScript.valueToCode(block, 'string', Blockly.JavaScript.ORDER_NONE) || '{}';
	var access = Blockly.JavaScript.valueToCode(block, 'access', Blockly.JavaScript.ORDER_NONE);
	return ['JSON.parse('+string+')'+access, Blockly.JavaScript.ORDER_ATOMIC];
};