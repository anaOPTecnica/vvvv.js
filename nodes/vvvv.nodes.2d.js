// VVVV.js -- Visual Web Client Programming
// (c) 2011 Matthias Zauner
// VVVV.js is freely distributable under the MIT license.
// Additional authors of sub components are mentioned at the specific code locations.

/*
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 NODE: Cross (2d)
 Author(s): 'Matthias Zauner'
 Original Node Author(s): 'VVVV Group'
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
*/

VVVV.Nodes.Cross2d = function(id, graph) {
  this.constructor(id, "Cross (2d)", graph);
  
  this.meta = {
    authors: ['Matthias Zauner'],
    original_authors: ['VVVV Group'],
    credits: [],
    compatibility_issues: []
  };
  
  this.auto_evaluate = false;
  
  // input pins
  var xinIn = this.addInputPin('X In', [0], this);
  var yinIn = this.addInputPin('Y In', [0], this);
  var includeupperIn = this.addInputPin('Include Upper', [1], this);
  var includelowerIn = this.addInputPin('Include Lower', [1], this);
  var includeequalIn = this.addInputPin('Include Equal', [1], this);

  // output pins
  var xoutOut = this.addOutputPin('X Out', [0], this);
  var youtOut = this.addOutputPin('Y Out', [0], this);

  // evaluate() will be called each frame
  // (if the input pins have changed, or the nodes is flagged as auto-evaluating)
  this.evaluate = function() {
    
    var idx = 0;
    for (var i=0; i<yinIn.getSliceCount(); i++) {
      for (var j=0; j<xinIn.getSliceCount(); j++) {
        if (includeupperIn.getValue(0)<0.5 && i>j)
          continue;
        if (includelowerIn.getValue(0)<0.5 && i<j)
          continue;
        if (includeequalIn.getValue(0)<0.5 && i==j)
          continue;
        xoutOut.setValue(idx, xinIn.getValue(j));
        youtOut.setValue(idx, yinIn.getValue(i));
        idx++;
      }
    }
    xoutOut.setSliceCount(idx);
    youtOut.setSliceCount(idx);
  }

}
VVVV.Nodes.Cross2d.prototype = new VVVV.Core.Node();