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

function OrTrack(displayName, nbBars, nbStepsPerBar, sampleId) {
	this.displayName   = displayName;
	this.nbBars        = nbBars;
	this.nbStepsPerBar = nbStepsPerBar;

	this.volume = 1;
	this.pitch = 0;
	this.arp = null;
	this.mute = false;
	this.solo = false;
	this.sampleId = sampleId;

	this.posNotes = [];
	this.uuid = createUUID();
}

OrTrack.prototype.getMesFromTime = function(time, bpm) {
	var msTempo = (96/ orStore.song.bpm) ;
	var timeForBar = msTempo ;
	return Math.floor(time / timeForBar);
};

OrTrack.prototype.getStepInMesFromTime = function(time, bpm, currentBarNum) {
	var msTempo = (96 / orStore.song.bpm) ;
	var timeForBar = (msTempo );
	time %= timeForBar; // optimize
	var timeForStep = (timeForBar / this.nbStepsPerBar);
	return Math.floor(time / timeForStep);
};

OrTrack.prototype.createPosNoteTick = function(bar, tick256, note) {
	var stepInBar = this.computeStepInBarFromTick256(tick256);
	var orPosNote = new OrPosNote(bar, tick256, stepInBar, note);
	this.posNotes[this.posNotes.length] = orPosNote;
	return orPosNote;
};

OrTrack.prototype.createPosNoteStep = function(bar, stepInBar, note) {
	console.log("OrTrack.prototype.createPosNoteStep bar="+ bar + " stepInBar="+ stepInBar+ " note pitch="+note.pitch);
	var tick256 = this.computeTick256FromStepInBar(stepInBar);
	var orPosNote = new OrPosNote(bar, tick256, stepInBar, note);
	this.posNotes[this.posNotes.length] = orPosNote;
	return orPosNote;
};

OrTrack.prototype.computeStepInBarFromTick256 = function(tick256) {
	return Math.floor((tick256 * this.nbStepsPerBar) / 256);
};

OrTrack.prototype.computeTick256FromStepInBar = function(stepInBar) {
	return Math.floor((stepInBar * 256 / this.nbStepsPerBar));
};

OrTrack.prototype.setSoundBuffer = function(soundBuffer) {
	this.soundBuffer = soundBuffer;
};

OrTrack.prototype.getDisplayName = function() {
	return this.displayName;
};

OrTrack.prototype.setDisplayName = function(displayName) {
	this.displayName = displayName;
};

OrTrack.prototype.getPosNoteAt = function(bar, stepInBar) {
	for ( var i = 0; i < this.posNotes.length ; i++) {
		var posNote = this.posNotes[i];
		if (posNote.bar==bar) {
			if (posNote.stepInBar==stepInBar) {
				return posNote;
			}
		}
	}
	return undefined;
};

OrTrack.prototype.incrNbBar = function() {
	this.nbBars++;
	if (this.nbBars > 8) {
		this.nbBars = 1;
	}
};

OrTrack.prototype.incrNbStepsPerBar = function() {
	this.nbStepsPerBar++;
	if (this.nbStepsPerBar > 12) {
		this.nbStepsPerBar = 1;
	}
};

OrTrack.prototype.computeJSONtext = function() {
	var ret = "{";
	ret += '"displayName"'   + ":" + '"' + this.displayName + '",';
	ret += '"uuid"'          + ":" + '"' + this.uuid + '"'  +',' ;
	ret += '"nbBars"'        + ":" + '"' + this.nbBars + '",';
	ret += '"nbStepsPerBar"' + ":" + '"' + this.nbStepsPerBar + '",';
	ret += '"sampleId"'      + ":" + '"' + this.sampleId + '",';

	ret += '"posNotes"' + ":" + '[';
	for ( var i = 0; i < this.posNotes.length ; i++) {
		ret += this.posNotes[i].computeJSONtext();
		if (i < (this.posNotes.length - 1)) {
			ret += ',';
		}
	}
	ret += ']';

	ret += "}";
	return ret;
};