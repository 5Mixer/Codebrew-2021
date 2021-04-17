import * as Blockly from 'blockly/core';

Blockly.Blocks['on_react'] = {
  init: function() {
    // this.appendField('author')
    this.appendDummyInput().appendField('on react');
    this.appendStatementInput('on_react_handler');
    this.setOutput(false);
    
    this.setColour(160);
    this.setTooltip('Triggers when the bot observes a user reacting to a message');
  }
};

Blockly.JavaScript['on_react'] = function(block) {
	var handler = Blockly.JavaScript.statementToCode(block, 'on_react_handler',  Blockly.JavaScript.ORDER_FUNCTION_CALL);
	return 'events.onreact = (msg, emoji, reacter) => {\n' + handler + '}\n';
};