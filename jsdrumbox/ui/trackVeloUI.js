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

function TrackVeloUI(canvas) {
	this.canvas = canvas;
	this.width = canvas.width;
	this.height = canvas.height;
	this.canvas2d = canvas.getContext("2d");
	this.orTrack = null;
	this.canvas.addEventListener("mousedown", this.doMouseDown.bind(this),	false);
}

TrackVeloUI.prototype.doMouseDown = function(event) {
		//must recompute w_bar ?????
	var w_track = document.getElementById("tracksDataTable").rows[0].cells[3].offsetWidth ;
	this.w_bar  = Math.floor(w_track    / this.orTrack.nbBars);
	this.w_step = Math.floor(this.w_bar / this.orTrack.nbStepsPerBar);

	var nbTracks = orStore.nbTrackSlots;
	var h =   document.getElementById("tracksDataTable").rows[nbTracks].cells[0].offsetHeight;
	x = event.clientX - (document.getElementById("tracksDataTable").rows[0].cells[3].offsetLeft      + document.getElementById("tracksDataTable").offsetLeft);
	y = event.clientY - (document.getElementById("tracksDataTable").rows[nbTracks].cells[3].offsetTop
		+ h
		+ 2*this.canvas.offsetTop
		+ document.getElementById("tracksDataTable").offsetTop );

	var barClicked = Math.floor(x / this.w_bar);
	var stepClicked = Math.floor((x - (barClicked * this.w_bar)) / this.w_step);
	var posNote = orStore.getSelectedTrack().getPosNoteAt(barClicked, stepClicked);
	if (posNote === undefined) {
		var note = new OrNote(1, 1, 0.5, null);
		posNote = orStore.getSelectedTrack().createPosNoteStep(barClicked, stepClicked, note);
	}  
	posNote.note.velocity = (Math.floor((h - y)*8/h)/8);
	console.log("velo = "+ posNote.note.velocity + " y="+ y +"/"+h + " x="+x);
	this.draw();
};


//
TrackVeloUI.prototype.setTime = function(time) {
	this.isCurrent = false;
	if (time != -1) {
		this.isCurrent = true;
	}
	this.currentBarNum = this.orTrack.getMesFromTime(time, orStore.song.bpm);
	// console.log("orTrackUI.setTime "+ Math.floor(time*100) + " mes="+this.currentBarNum);
	this.currentStepInBar = this.orTrack.getStepInMesFromTime(time, orStore.song.bpm, this.currentBarNum);
	this.currentBarNum %= this.orTrack.nbBars;
	this.currentStepInBar %= this.orTrack.nbStepsPerBar;
	if (this.currentBarNum != this.oldBarNum || this.currentStepInBar != this.oldStepInBar) {
		this.oldBarNum = this.currentBarNum;
		this.oldStepInBar = this.currentStepInBar;
		this.draw(); // TODO optimize ...
	}
};

//
TrackVeloUI.prototype.draw = function() {
	
	this.orTrack = orStore.getSelectedTrack();
	this.canvas2d.clearRect(0, 0, this.canvas.width, this.canvas.height);
	this.canvas2d.beginPath();
	this.canvas2d.fillStyle = "#F0F0F0"; // backColor
	this.canvas2d.fillRect(0, 0, this.width, this.height);
	this.w_bar = (this.width/this.orTrack.nbBars);
	this.w_step = (this.w_bar / this.orTrack.nbStepsPerBar);
	//console.log("wbar="+this.w_bar, " wstep="+ this.w_step + " "+ track.displayName + "="+ this.width);
	this.drawNotes(this.orTrack, this.w_bar, this.w_step);
	if (this.isCurrent === true) {
		this.drawCursor(this.w_bar, this.currentBarNum, this.w_step,this.currentStepInBar);
	}
	this.drawBarMarks(this.w_bar, this.orTrack.nbBars, this.w_step,this.orTrack.nbStepsPerBar);
//	this.canvas2d.font      = "20px Arial";
//	this.canvas2d.fillStyle = "#000000";
//	this.canvas2d.fillText(this.orTrack.displayName, 10, 0);
//	this.canvas2d.fillText( orStore.drumkit.samples[track.sampleId].displayName, 10, 20);
//	this.canvas2d.fillText(" - " + this.orTrack.nbBars + " of "+this.orTrack.nbStepsPerBar, 100, 10);
};

TrackVeloUI.prototype.drawCursor = function(w_bar, currentBarNum, w_step, currentStepInBar) {
	var w_cursor = w_step;
	var h_cursor = this.height;
	var y_cursor = 0;
	var x_cursor = currentBarNum * w_bar + currentStepInBar * w_step;
	this.canvas2d.fillStyle = "#00FFFF";
	this.canvas2d.fillRect(x_cursor, y_cursor, w_cursor, h_cursor);
};

TrackVeloUI.prototype.drawNotes = function(track, w_bar, w_step) {
	this.canvas2d.fillStyle = "#FF8800";
	var w_note = w_step;
	var h_note = this.height;
	var y_note = 0;
	for ( var i = 0; i < track.posNotes.length; i++) {
		y_note = this.height - this.height*track.posNotes[i].note.velocity;
		var x_note = track.posNotes[i].bar * w_bar + track.posNotes[i].stepInBar * w_step;
		this.canvas2d.fillRect(x_note, y_note, w_note, h_note);
		// console.log("draw note #"+i+ " x="+ x_note + " -"+y_note + " h="+ h_note);
	}
};

TrackVeloUI.prototype.drawBarMarks = function(w_bar, nbBars, w_step, nbStepsPerBar) {
	for ( var i = 0; i < nbBars; i++) {
		var x_bar = i * w_bar;
		this.canvas2d.fillStyle = "#00FF00";
		this.canvas2d.moveTo(0, 0);
		this.canvas2d.fillRect(x_bar, 0, (4), this.height);

		for ( var j = 1; j < (nbStepsPerBar); j++) {
			var x_step = x_bar + j * w_step;
			this.canvas2d.moveTo(x_step, this.height / 2);
			this.canvas2d.lineTo(x_step, this.height);
			this.canvas2d.fillStyle = "#000000";
			this.canvas2d.lineWidth = 1;
			this.canvas2d.stroke();
		}
	}
	for (var i = nbBars; i < 8; i++) {
		var x_bar = i * w_bar;
		this.canvas2d.fillStyle = "#383838";
		this.canvas2d.moveTo(0, 0);
		this.canvas2d.fillRect(x_bar, 0, (i + 1) * w_bar, this.height);
	};

}