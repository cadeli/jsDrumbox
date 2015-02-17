/*
Copyright 2015 ordrumbox


Contact the authors at contact@ordrumbox.com
See updates at http://www.ordrumbox.com

This source is a part of the project jsDrumbox 

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at
   http://www.apache.org/licenses/LICENSE-2.0
Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

 */

function OrPosNote(bar,tick256,stepInBar,note) {
	this.bar = bar;
	this.stepInBar = stepInBar;
	this.tick256 = tick256;
	this.note = note;
	this.uuid = createUUID();
	//console.log("New OrPosNote"+ this.computeJSONtext());
}

OrPosNote.prototype.computeJSONtext = function () {
	var ret="{";
	ret +='"bar"' + ":" + '"' + this.bar + '"' +',' ;
	ret +='"stepInBar"'   + ":" + '"' + this.stepInBar       + '"' +',' ;
	ret +='"tick256"'     + ":" + '"' + this.tick256         + '"' +',' ;
	ret +='"note"'    + ":" +this.note.computeJSONtext();
	ret +='';
	
	ret +="}";
	return ret;
};