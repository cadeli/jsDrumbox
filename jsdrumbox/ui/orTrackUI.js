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

function OrTrackUI(canvas) {
	this.canvas = canvas;
	this.width = canvas.width;
	this.height = canvas.height;
	this.canvas2d = canvas.getContext("2d");
	this.pattern = null;
	this.canvas.addEventListener("mousedown", this.doMouseDown.bind(this), false);
}

OrTrackUI.prototype.doMouseDown = function(event) {
	//must recompute w_bar ?????
	var w_track = document.getElementById("tracksDataTable").rows[0].cells[3].offsetWidth ;
	this.w_bar = Math.floor(w_track/this.orTrack.nbBars);
	this.w_step = Math.floor(this.w_bar / this.orTrack.nbStepsPerBar);

	orStore.selectedTrackUuid = this.orTrack.uuid;
//	x = event.clientX - document.getElementById("stepSeqVisu").offsetLeft - Math.floor(this.canvas.offsetLeft)+ document.getElementById("stepSeqVisu").scrollLeft;
//	y = event.clientY - document.getElementById("stepSeqVisu").offsetTop + document.getElementById("stepSeqVisu").scrollTop - Math.floor(this.canvas.offsetTop) + 1;

	x = event.clientX - document.getElementById("tracksDataTable").rows[0].cells[3].offsetLeft ;
	//- Math.floor(this.canvas.offsetLeft)+ document.getElementById("col0").scrollLeft;
	y = event.clientY; 
	// - document.getElementById("stepSeqVisu").offsetTop + document.getElementById("stepSeqVisu").scrollTop - Math.floor(this.canvas.offsetTop) + 1;


	var barClicked  = Math.floor(x / this.w_bar);
	var stepClicked = Math.floor((x - (barClicked * this.w_bar)) / this.w_step);
	//console.log("wbar="+this.w_bar, " wstep="+ this.w_step + " w="+ this.width + " bar="+barClicked + " step="+ stepClicked +" x="+x);
	var posNote = this.orTrack.getPosNoteAt(barClicked, stepClicked);
	if (posNote === undefined) {
		var note = new OrNote(1, 1, 0.5, null);
		this.orTrack.createPosNoteStep(barClicked, stepClicked, note);
	} else {
		orStore.command.deleteNote(posNote.uuid);
	}
	// orStore.command.computeFlatNotes(orStore.song);
	// orStore.stepSeqVisu.draw();
	// orStore.draw();
	this.draw();

	// alert ("click on "+ this.orPattern.displayName + " x="+x+ " offset="+document.getElementById('col1_width').style.left+" y="+y+" bar="+ barClicked + " step="+ stepClicked);
 //	console.log (" offset="+ document.getElementById('col1').style.offsetLeft + "="+ document.getElementById('col1').style );
};

OrTrackUI.prototype.setTrack = function(orTrack) {
	this.orTrack = orTrack;
};

//
OrTrackUI.prototype.setTime = function(time) {
	this.isCurrent = false;
	if (time != -1) {
		this.isCurrent = true;
	}
	if (this.orTrack == undefined) { 
		//console.log("no track ???");
		return;
	}
	this.currentBarNum = this.orTrack.getMesFromTime(time, orStore.song.bpm);
	//console.log("orTrackUI.setTime "+ Math.floor(time*100) + " mes="+this.currentBarNum);
	this.currentStepInBar  = this.orTrack.getStepInMesFromTime(time, orStore.song.bpm, this.currentBarNum);
	this.currentBarNum    %= this.orTrack.nbBars;
	this.currentStepInBar %= this.orTrack.nbStepsPerBar;
	if (this.currentBarNum != this.oldBarNum || this.currentStepInBar != this.oldStepInBar) {
		var posNote = this.orTrack.getPosNoteAt(this.currentBarNum, this.currentStepInBar);
		if (posNote !== undefined) {
			if (!this.orTrack.mute) {
				var volume = posNote.note.velocity;
				var fPitch = posNote.note.fPitch;
				if (orStore.patternMode === true) {
					orStore.command.orPlayer.playASound(0, this.orTrack.sampleId, volume, fPitch);
				}
			}
		}
		this.oldBarNum = this.currentBarNum;
		this.oldStepInBar = this.currentStepInBar;
		this.draw(); // TODO optimize ...
	}
};

//
OrTrackUI.prototype.draw = function() {
	//console.log("OrTrackUI.prototype.draw" + this.orTrack.displayName);
	this.canvas2d.clearRect(0, 0, this.canvas.width, this.canvas.height);
	this.canvas2d.beginPath();
	this.canvas2d.fillStyle = "#F0F0F0"; // backColor
	this.canvas2d.fillRect(0, 0, this.width, this.height);

	this.w_bar  = Math.floor(this.canvas.width/this.orTrack.nbBars);
	this.w_step = Math.floor(this.w_bar / this.orTrack.nbStepsPerBar);
	this.drawNotes();
	if (this.isCurrent === true) {
		this.drawCursor( this.currentBarNum,this.currentStepInBar);
	}
	this.drawBarMarks( this.orTrack.nbBars,this.orTrack.nbStepsPerBar);
	this.canvas2d.font = "20px Arial";
	this.canvas2d.fillStyle = "#000000";
	this.canvas2d.fillText(this.orTrack.displayName, 10, 0);
	//console.log("wbar="+this.w_bar, " wstep="+ this.w_step  +" width="+ this.width);
	// this.canvas2d.fillText(
	// orStore.drumkit.samples[this.orTrack.sampleId].displayName, 10, 20);
	// this.canvas2d.fillText(" - " + this.orTrack.nbBars + " of "+
	// this.orTrack.nbStepsPerBar, 100, 10);
};

OrTrackUI.prototype.drawCursor = function(currentBarNum,  currentStepInBar) {
	var w_cursor = this.w_step;
	var h_cursor = this.height;
	var y_cursor = 0;
	var x_cursor = currentBarNum *this.w_bar + currentStepInBar * this.w_step;
	this.canvas2d.fillStyle = "#00FFFF";
	this.canvas2d.fillRect(x_cursor, y_cursor, w_cursor, h_cursor);
};

OrTrackUI.prototype.drawNotes = function() {
	//console.log("wbar="+this.w_bar, " wstep="+ this.w_step );
	this.canvas2d.fillStyle = "#FF0000";
	var w_note = this.w_step;
	var h_note = this.height;
	var y_note = 0;
	for ( var i = 0; i < this.orTrack.posNotes.length; i++) {
		var x_note = this.orTrack.posNotes[i].bar * this.w_bar + this.orTrack.posNotes[i].stepInBar * this.w_step;
		this.canvas2d.fillRect(x_note, y_note, w_note, h_note);
		// console.log("draw note #"+i+ " x="+ x_note + " -"+y_note);
	}
};

OrTrackUI.prototype.drawBarMarks = function( nbBars, nbStepsPerBar) {
	for ( var i = 0; i < nbBars; i++) {
		var x_bar = i * this.w_bar;
		this.canvas2d.fillStyle = "#00FF00";
		this.canvas2d.moveTo(0, 0);
		this.canvas2d.fillRect(x_bar, 0, (4), this.height);

		for ( var j = 1; j < (nbStepsPerBar); j++) {
			var x_step = x_bar + j * this.w_step;
			this.canvas2d.moveTo(x_step, this.height / 2);
			this.canvas2d.lineTo(x_step, this.height);
			this.canvas2d.fillStyle = "#000000";
			this.canvas2d.lineWidth = 1;
			this.canvas2d.stroke();
		}
	}
	for (  i = nbBars; i < 8; i++) {
		x_bar = i * this.w_bar;
		this.canvas2d.fillStyle = "#383838";
		this.canvas2d.moveTo(0, 0);
		this.canvas2d.fillRect(x_bar, 0, (i + 1) * this.w_bar, this.height);
	}
};