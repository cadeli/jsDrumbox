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

function OrPlayer() {

	try {
		window.AudioContext   = window.AudioContext || window.webkitAudioContext;
		this.audioContext     = new AudioContext();
		console.log("create audio context")
  	}
  	catch(e) {
    	alert('Web Audio API is not supported in this browser');
  	}

	this.loopTimeDuration =    1000;
	this.tickInterval     =    5;
	this.orFlatNoteHash   =   {};
}

OrPlayer.prototype.computeFlatNotes = function(song, bPatternMode) {
	this.resetFlatNoteList();
	orStore.timeMarkManager.resetTimeMark();
	if (bPatternMode === true) {
		this.computeFlatNotesPattern(song, orStore.command.getPatternFromUuid(orStore.selectedPatternUuid));
	} else {
		this.computeFlatNotesSong(song);
	}
};

OrPlayer.prototype.computeFlatNotesPattern = function(song, pattern) {
	var msTempo = (24000 / song.bpm) ;
	var lastPatternTime = 0;
	// TODO assume track0 = main track for pattern size
	var endTime = msTempo * pattern.tracks[0].nbBars * pattern.tracks[0].nbStepsPerBar;
	if (pattern.tracks.length === 0) return;
	for ( var indexTrack = 0; indexTrack < pattern.tracks.length; indexTrack++) {
		var track = pattern.tracks[indexTrack];
		// console.log("computeFlatNotes track="+ track.displayName);
		var time       = 0;
		var barLength  = msTempo * track.nbStepPerBar;
		var stepLength = msTempo;
		if (indexTrack == 0) {
			orStore.timeMarkManager.addTimeMark(lastPatternTime, pattern.uuid, track.uuid, barLength, stepLength);
		}
		for ( var repeat = 0; time < endTime ; repeat++) {
			if (track.posNotes.length == 0)
				break;
			for ( var indexNote = 0; indexNote < track.posNotes.length; indexNote++) {
				var posNote = track.posNotes[indexNote];
				// console.log("computeFlatNotes Note="+ posNote.bar +":"+posNote.stepInBar);
				time = msTempo * ((posNote.bar + repeat) * track.nbStepsPerBar + posNote.stepInBar);
				if (time < endTime) {
				//console.log("posNote b="+ posNote.bar + " st:"+posNote.stepInBar + " tk="+posNote.tick256 +" t="+ time + "="+Math.floor(time/ this.tickInterval) );
				this.addFlatNote(track.sampleId, posNote.note.velocity, posNote.note.fPitch, posNote.note.pano, time);
			}}
		}
	}
	lastPatternTime += endTime;
	
	orStore.timeMarkManager.addLastTimeMark(lastPatternTime);
	this.loopTimeDuration = Math.floor(lastPatternTime/ this.tickInterval);
	//console.log("computeFlatNotesPattern.loopTimeDuration " + this.loopTimeDuration  );
};

OrPlayer.prototype.computeFlatNotesSong = function(song) {
	var msTempo = (24000 / song.bpm) ;
	var lastPatternTime = 0;
	for ( var indexSequence = 0; indexSequence < song.sequences.length; indexSequence++) {
		// var patternUuid = song.sequences[indexSequence].patternUuid;
		// var pattern = song.getPatternFromUuid(patternUuid);
		var patternId = song.sequences[indexSequence].patternId;
		var pattern = song.patterns[patternId];
		console.log("computeFlatNotes pat=" + pattern.displayName);
		// TODO assume track0 = main track for pattern size
		var endTime = (msTempo * pattern.tracks[0].nbBars * pattern.tracks[0].nbStepsPerBar);
		for ( var i = 0; i < song.sequences[indexSequence].repeat; i++) {
			if (pattern.tracks.length === 0)
				break;
			for ( var indexTrack = 0; indexTrack < pattern.tracks.length; indexTrack++) {
				var track = pattern.tracks[indexTrack];
				// console.log("computeFlatNotes track="+ track.displayName);
				var time = 0;
				//
				var barLength = msTempo * track.nbStepPerBar;
				var stepLength = msTempo;
				if (indexTrack === 0) {
					orStore.timeMarkManager.addTimeMark(lastPatternTime, pattern.uuid, track.uuid, barLength, stepLength);
				}
				//
				for ( var repeat = 0; time < (endTime * song.sequences[indexSequence].repeat); repeat++) {
					if (track.posNotes.length === 0) {
						break;
					}
					for ( var indexNote = 0; indexNote < track.posNotes.length; indexNote++) {
						var posNote = track.posNotes[indexNote];
						// console.log("computeFlatNotes Note="+ posNote.bar
						// +":"+posNote.stepInBar);
						time = msTempo * ((posNote.bar + repeat) * track.nbStepsPerBar + posNote.stepInBar);
						time += lastPatternTime;
						// console.log("posNote b="+ posNote.bar + "
						// st:"+posNote.stepInBar + " tk="+posNote.tick256 +
						// " t="+ time);
						this.addFlatNote(track.sampleId, posNote.note.velocity, posNote.note.fPitch, posNote.note.pano, time);
					}
				}
			}
			lastPatternTime += endTime;
		}
	}
	orStore.timeMarkManager.addLastTimeMark(lastPatternTime);
	this.loopTimeDuration = lastPatternTime;
};

OrPlayer.prototype.playASound = function(time, sampleId,volume,fPitch) {
	var source    = this.audioContext.createBufferSource();
	source.buffer = bufferLoader.bufferList[sampleId];
	
	var gainNode  = this.audioContext.createGain();
	source.connect(gainNode);
	gainNode.gain.value       = volume;
	source.playbackRate.value = fPitch;
	//source.connect(this.audioContext.destination);
	gainNode.connect(this.audioContext.destination);
	time = parseInt(time*100);
	time /= 100;
	source.start( time);
	//source.loop = true;
	console.log("play : spl " + sampleId + " t="+time);

	if (sampleId==0 ) {
		var leftChannel = source.buffer.getChannelData(0);
		var i=0;
		//for (var i=0; i < source.buffer.getChannelData(0).length;i+=32) {
			console.log(" val " + leftChannel[i] + " t="+i );
		//}
	}
/*
	var analyser = this.audioContext.createAnalyser();
	source.connect(analyser);
	analyser.fftSize = 2048;
	var bufferLength = analyser.frequencyBinCount;
	var dataArray = new Uint8Array(bufferLength);
	analyser.getByteTimeDomainData(dataArray);
	if (sampleId==0 ) {
		for (var i=0; i < dataArray.length;i+=8) {
			console.log(" anal " + dataArray[i] + " t="+i );
		}
	}
*/
};

OrPlayer.prototype.play = function() {
	for (var k in this.orFlatNoteHash) {
		for (var i =0; i < this.orFlatNoteHash[k].length;i++) {
			var orFlatNote =this.orFlatNoteHash[k][i];
			this.playASound(startTime + orFlatNote.time, orFlatNote.sampleId,orFlatNote.volume,orFlatNote.fPitch);
		}
	}
};

OrPlayer.prototype.getFlatNotesAsText = function() {
	var ret = "";
	for (var k in this.orFlatNoteHash) {
    	if (this.orFlatNoteHash.hasOwnProperty(k)) {
       		ret+='t=' + k + ' : ' ;
       		for (var i =0; i < this.orFlatNoteHash[k].length;i++) {
       			ret+= this.orFlatNoteHash[k][i].debugDisplay() + "::";
       		}
       		ret +="\n";
    	}
	}
	return ret;
};

OrPlayer.prototype.resetFlatNoteList = function() {
	this.orFlatNoteHash = {};
};

OrPlayer.prototype.addFlatNote = function(sampleId, volume, fPitch, pano, time) {
	var orFlatNote = new OrFlatNote(fPitch, volume, sampleId, pano, time);
	var tickTime = Math.floor(orFlatNote.time/ this.tickInterval);
	if (this.orFlatNoteHash.hasOwnProperty(tickTime)) {
			var num = this.orFlatNoteHash[tickTime].length
       		this.orFlatNoteHash[tickTime][num]= orFlatNote;
    	} else {
		     this.orFlatNoteHash[tickTime]   = [];
		     this.orFlatNoteHash[tickTime][0]= orFlatNote;
	}
	// console.log("addOrNoteToList " + buffer);
	
};
