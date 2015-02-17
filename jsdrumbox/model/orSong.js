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

//--
function OrSong(displayName, bpm) {

	this.displayName = displayName;
	this.bpm         = bpm;

	this.sequences = [];
	this.patterns  = [];
}

OrSong.prototype.getDisplayName = function() {
	return this.displayName;
};

OrSong.prototype.setDisplayName = function(displayName) {
	this.displayName = displayName;
};

OrSong.prototype.clearSequences = function() {
	this.sequences.length = 0;
};

OrSong.prototype.createSequence = function(patternId, nbRepeat) {
	var sequence = new OrSequence(patternId, nbRepeat);
	this.sequences[this.sequences.length] = sequence;
	return sequence;
};

OrSong.prototype.createPattern = function(displayName) {
	console.log ("createPattern :" + displayName);
	var pattern = new OrPattern(displayName);
	this.patterns[this.patterns.length] = pattern;
	return pattern;
};

OrSong.prototype.getPatternFromUuid = function(uuid) {
	for ( var i = 0; i < this.patterns.length; i++) {
		if (this.patterns[i].uuid == uuid) {
			return this.patterns[i];
		}
	}
	return null;
};

OrSong.prototype.computeJSONtext = function() {
	var ret = "{";
	ret += '"displayName"' + ":" + '"' + this.displayName + '"' + ',';
	ret += '"bpm"' + ":" + '"' + this.bpm + '"' + ',';

	ret += '"patterns"' + ":" + '[';
	for ( var i = 0; i < this.patterns.length; i++) {
		ret += this.patterns[i].computeJSONtext();
		if (i < (this.patterns.length - 1)) {
			ret += ',';
		}
	}
	ret += ']';

	ret += ',"sequences"' + ":" + '[';
	for (  i = 0; i < this.sequences.length; i++) {
		ret += this.sequences[i].computeJSONtext();
		if (i < (this.sequences.length - 1)) {
			ret += ',';
		}
	}
	ret += ']';

	ret += "}";
	return ret;
};