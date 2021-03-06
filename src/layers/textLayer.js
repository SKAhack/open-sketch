var mixin = require('./layerMixin');
var GeneralLayer = require('./general');
var _ = require('../util');

function TextLayer(layer) {
  GeneralLayer.call(this, layer);
}

TextLayer.prototype = Object.create(GeneralLayer.prototype);
TextLayer.prototype.constructor = TextLayer;

TextLayer.prototype.styles = function() {
  var re = GeneralLayer.prototype.styles.call(this);
  re = re.concat(this.cssAttributes());
  re = re.concat(this.cssText());
  re = re.concat(this.blur());
  re = re.concat(this.shadow());
  return re;
};

TextLayer.prototype.blur = mixin.exportBlur;

TextLayer.prototype.shadow = mixin.exportShadow;

TextLayer.prototype.cssText = function(){
  var re = new Array();
  if (this.className() == "MSTextLayer") {
    // Text Behaviour: 0:auto 1:fixed
    re.push("text-behaviour: " + (this._layer.textBehaviour() == 0 ? 'auto' : 'fixed'));

    // Text Align
    var textAlign;
    if (this._layer.textAlignment() == 0) {
      textAlign = 'left';
    } else if (this._layer.textAlignment() == 1) {
      textAlign = 'right';
    } else if (this._layer.textAlignment() == 2) {
      textAlign = 'center';
    }
    re.push("text-align: " + textAlign);

    // Letter Spacing
    if (this._layer.characterSpacing() && this._layer.characterSpacing() > 0) {
      re.push("letter-spacing: " + parseFloat(this._layer.characterSpacing()).toFixed(3) + 'px');
    }

    // Content
    re.push("content: '" + this.stringValue() + "'");

    var attrs = this._layer.styleAttributes();

    // Underline
    if (attrs.NSUnderline > 0) {
      re.push("text-decoration: " + _.underlineNumberToString(attrs.NSUnderline));
    }

    // Line through
    if (attrs.NSStrikethrough > 0) {
      re.push("text-decoration: line-through");
    }
  }
  return re;
};

module.exports = TextLayer;
