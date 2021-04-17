Blockly.Blocks["string_length"] = {
    init: function () {
        this.jsonInit({
            "message0": "length of %1",
            "args0": [
                {
                    "type": "input_value",
                    "name": "VALUE",
                    "check": "String"
                }
            ],
            "output": "Number",
            "colour": 160,
            "tooltip": "Returns number of letters in the provided text.",
            "helpUrl": "http://www.w3schools.com/jsref/jsref_length_string.asp"
        });
    }
};

Blockly.JavaScript["string_length"] = function (block) {
    var argument0 = Blockly.JavaScript.valueToCode(
        block,
        "VALUE",
        Blockly.JavaScript.ORDER_FUNCTION_CALL
    ) || "''";
    return [argument0 + ".length", Blockly.JavaScript.ORDER_MEMBER];
}
