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

(function () {
   'use strict';
}());


function OrCommand() {
	this.label = "eee";
	this.orPlayer = new OrPlayer();
};

// player -----------------------------------------------------------
OrCommand.prototype.computeFlatNotes = function(song,bPatternMode) {
	this.orPlayer.computeFlatNotes(song,bPatternMode);
};

OrCommand.prototype.getFlatNotesAsText = function() {
	return this.orPlayer.getFlatNotesAsText();
};

OrCommand.prototype.getTimeMarksAsText = function() {
	var ret = "";
	for (var index = 0; index < orStore.timeMarkManager.timeMarks.length; index++) {
		var orTimeMark = orStore.timeMarkManager.timeMarks[index];
		ret += "\n" + index + "> timeMark = " + orTimeMark.toString();
	}
	return ret;
};


// localStorage ------------------------------------------------------------


//import
OrCommand.prototype.createSongFromJson= function(songAsJson) {
	console.log("createSongFromJson");
	var  newSong = new OrSong(songAsJson.displayName, songAsJson.bpm);
	console.log ("patterns to create " +  songAsJson.patterns.length );
	for (var patternNum=0; patternNum <  songAsJson.patterns.length; patternNum++) {
		var pattern = newSong.createPattern(songAsJson.patterns[patternNum].displayName);
		var patternSrc = songAsJson.patterns[patternNum];
		pattern.uuid = patternSrc.uuid; //TODO (not use createPattern ??)
		console.log ("tracks to create " +  patternSrc.tracks.length );
		for (var trackNum = 0; trackNum < patternSrc.tracks.length; trackNum++) {
			var trackSrc = patternSrc.tracks[trackNum];
			var track = pattern.createTrack(trackSrc.displayName, trackSrc.nbBars, trackSrc.nbStepsPerBar,trackSrc.sampleId);
			track.uuid = trackSrc.uuid;
			console.log ("notes to create " +  trackSrc.posNotes.length );
			for (var posNoteNum = 0; posNoteNum < trackSrc.posNotes.length;posNoteNum++ ) {
				var posNoteSrc = trackSrc.posNotes[posNoteNum];
				var noteSrc    = posNoteSrc.note;
				var note       = new OrNote(noteSrc.pitch, noteSrc.velocity, noteSrc.panoramic, noteSrc.effect);
				var posNote    = track.createPosNoteStep(posNoteSrc.bar, posNoteSrc.stepInBar, note);
				posNote.uuid   = posNoteSrc.uuid;
			}
		}
	}
	return newSong;
};

// Commands ------------------------------------------------------------
OrCommand.prototype.createPatternDuplicate = function(song, patternName, patternSrc) {
	var newPattern =  song.createPattern(patternName);
	for (var trackNum = 0; trackNum < patternSrc.tracks.length; trackNum++) {
		var trackSrc= patternSrc.tracks[trackNum];
		var track = orStore.command.createTrack(newPattern, trackSrc.trackName, trackSrc.nbBars, trackSrc.nbStepsPerBar, trackSrc.sampleId );
		for (var posNoteNum = 0; posNoteNum < trackSrc.posNotes.length; posNoteNum++) {
			console.log("create note (createPatternDuplicate) " + posNoteNum);
			var posNoteSrc =  trackSrc.posNotes[posNoteNum];
			var noteSrc =  posNoteSrc.note;
			var note = orStore.command.createNote(noteSrc.pitch, noteSrc.velocity, noteSrc.panoramic, noteSrc.effect);
			posNote = track.createPosNoteStep(posNoteSrc.bar, posNoteSrc.stepInBar, posNoteSrc.note);
		}
	}
	return newPattern;
};


OrCommand.prototype.createPattern = function(song, patternName) {
	return song.createPattern(patternName);
};

OrCommand.prototype.createSequence = function(song, patternId, repeat) {
	return song.createSequence(patternId,repeat);
};

OrCommand.prototype.createTrack = function(pattern, trackName, nbBars, nbStepsPerBar, sampleId) {
	return pattern.createTrack(trackName, nbBars, nbStepsPerBar, sampleId);
};

OrCommand.prototype.createNote = function(pitch, velocity, panoramic, effect) {
	var note = new OrNote(pitch, velocity, panoramic, effect);
	return note;
};

OrCommand.prototype.createPosNote = function(track, bar, stepInBar, note) {
	var posNote = track.createPosNoteStep(track, bar, stepInBar, note);
	return posNote;
};

OrCommand.prototype.deletePattern = function(uuidPattern) {
	for ( var iPattern = 0; iPattern < orStore.song.patterns.length; iPattern++) {
		var pattern = orStore.song.patterns[iPattern];
		if (pattern.uuid == uuidPattern) {
			orStore.song.patterns.splice(iPattern, 1);
			for (var iSequence = 0; iSequence< orStore.song.sequences.length;iSequence++) {
				var sequence = orStore.song.sequences[iSequence];
				if (sequence.patternId > (orStore.song.patterns.length-1)) {
					sequence.patternId = (orStore.song.patterns.length-1);
				}
			}			
			return true;
		}
	}
	return false;
};

OrCommand.prototype.deleteTrack = function(uuidTrack) {
	for ( var iPattern = 0; iPattern < orStore.song.patterns.length; iPattern++) {
		var pattern = orStore.song.patterns[iPattern];
		for ( var iTrack = 0; iTrack < pattern.tracks.length; iTrack++) {
			var track = pattern.tracks[iTrack];
			if (track.uuid == uuidTrack) {
				pattern.tracks.splice(iTrack, 1);
				return true;
			}
		}
	}
	return false;
};

OrCommand.prototype.deleteNote = function(uuidNote) {
	console.log("deleteNote= " + uuidNote);
	for ( var iPattern = 0; iPattern < orStore.song.patterns.length; iPattern++) {
		var pattern = orStore.song.patterns[iPattern];
		for ( var iTrack = 0; iTrack < pattern.tracks.length; iTrack++) {
			var track = pattern.tracks[iTrack];
			for ( var iNote = 0; iNote < track.posNotes.length; iNote++) {
				var note = track.posNotes[iNote];
				if (note.uuid == uuidNote) {
					track.posNotes.splice(iNote, 1);
					return true;
				}
			}
		}
	}
	return false;
};

OrCommand.prototype.createOrSample = function(drumkit, url, source) {
	return drumkit.createOrSample(url, source);
};


// -----------------------
OrCommand.prototype.getNoteFromUuid = function(uuidNote) {
	for ( var iPattern = 0; iPattern < orStore.song.patterns.length; iPattern++) {
		var pattern = orStore.song.patterns[iPattern];
		for ( var iTrack = 0; iTrack < pattern.tracks.length; iTrack++) {
			var track = pattern.tracks[iTrack];
			for ( var iNote = 0; iNote < track.posNotes.length; iNote++) {
				var note = track.posNotes[iNote];
				if (note.uuid == uuidNote) {
					return note;
				}
			}
		}
	}
	console.log ("FATAL : getNoteFromUuid not found " +uuidNote );
	return null;
};

OrCommand.prototype.getTrackFromUuid = function(uuid) {
	for ( var iPattern = 0; iPattern < orStore.song.patterns.length; iPattern++) {
		var pattern = orStore.song.patterns[iPattern];
		for ( var iTrack = 0; iTrack < pattern.tracks.length; iTrack++) {
			var track = pattern.tracks[iTrack];
			if (track.uuid == uuid) {
				// console.log ("getTrackFromUuid found"+ track.displayName);
				return track;
			}
		}
	}
	console.log ("FATAL : getTrackFromUuid not found " +uuid );
	return null;
};

OrCommand.prototype.getPatternFromUuid = function(uuid) {
	for ( var iPattern = 0; iPattern < orStore.song.patterns.length; iPattern++) {
		var pattern = orStore.song.patterns[iPattern];
		if (pattern.uuid == uuid) {
			return pattern;
		}
	}
	console.log ("FATAL : getPatternFromUuid not found " +uuid );
	return null;
};

OrCommand.prototype.getSampleFromUuid = function(uuid) {
	for ( var iSample = 0; iSample < orStore.drumkit.samples.length; iSample++) {
		var sample = orStore.drumkit.samples[iSample];
		if (sample.uuid == uuid) {
			return sample;
		}
	}
	console.log ("FATAL : getSampleFromUuid not found " +uuid );
	return null;
};
