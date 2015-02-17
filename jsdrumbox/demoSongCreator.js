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

 function DemoSongCreator() {

	console.log("createTestSong");
	this.song = new OrSong("demoSong", 140);

	// some patterns
	var pattern1 = this.song.createPattern("first pattern");
	var pattern2 = orStore.command.createPattern(this.song, "2rd pattern");


	// some track for pattern1
	var nbBars = 4;
	var nbStepsPerBar = 4;

	var track1 = pattern1.createTrack("first track", nbBars, nbStepsPerBar,5);
	var track2 = pattern1.createTrack("sec track", nbBars, nbStepsPerBar,1);
	var track3 = orStore.command.createTrack(pattern1, "track 3", 1, 3, 6);

	// some track for pattern2
	nbBars = 2;
	nbStepsPerBar = 4;
	var track21 = pattern2.createTrack("track21", nbBars, nbStepsPerBar,0);
	var track22 = pattern2.createTrack("track22", nbBars, nbStepsPerBar,1);
	var track23 = orStore.command.createTrack(pattern2, "track23", 1, 6,2);

	// a note
	var pitch = 0;
	var velocity = 1;
	var panoramic = 0.5;
	var effect = null;

	// fill track with notes using ticks
	/*
	 * for (var bar = 0; bar < 2; bar++) { for (var i = 0; i <4; i++) { var
	 * tick256 = i*(256/4); var posNote =
	 * track.createPosNoteTick(bar,tick256,note); var posNote2 =
	 * track2.createPosNoteTick(bar,tick256+128,note); } }
	 */
	// fill track with notes using quantized
	for ( var bar = 0; bar < track1.nbBars; bar++) {
		var step = 0;
		var note = orStore.command.createNote(pitch, velocity, panoramic, effect);
		var posNote1 = track1.createPosNoteStep(bar, step, note);
	}

	for (  bar = 0; bar < track2.nbBars; bar++) {
		var step = track2.nbStepsPerBar / 2;
		var note = orStore.command.createNote(pitch, velocity, panoramic, effect);
		var posNote = track2.createPosNoteStep(bar, step, note);
	}
	track3.createPosNoteStep(0, 0, note);

	// fill track with notes using quantized
	for ( var bar = 0; bar < track1.nbBars; bar++) {
		var step = 0;
		var note = orStore.command.createNote(pitch, velocity, panoramic, effect);
		track21.createPosNoteStep(bar, step, note);
	}

	for ( var bar = 0; bar < track2.nbBars; bar++) {
		var step = Math.floor(track2.nbStepsPerBar * 3 / 4);
		var note = orStore.command.createNote(pitch, velocity, panoramic, effect);
		track22.createPosNoteStep(bar, step, note);
	}
	var note = orStore.command.createNote(pitch, velocity, panoramic, effect);
	track23.createPosNoteStep(0, 3, note);

	// create sequence
	this.song.clearSequences();
	var patternUuid = this.song.patterns[0].uuid;
	var patternId = 0;
	this.song.createSequence(patternId, 2);
	patternId = 1;
	this.song.createSequence(patternId, 4);

	var txt = this.song.computeJSONtext();
	console.log ("demo song generate : "+ txt);	
}

DemoSongCreator.prototype.addRandNotes = function () {
	for ( var indexPattern = 0; indexPattern < this.song.patterns.length; indexPattern++) {
		var pattern = this.song.patterns[indexPattern];
		for ( var indexTrack = 0; indexTrack < pattern.tracks.length; indexTrack++) {
			var track = pattern.tracks[indexTrack];
			for ( var bar = 0; bar < track.nbBars; bar++) {
				for ( var step = 0; step < track.nbStepsPerBar; step++) {
					var pitch = 0;
					var velocity = step;
					var panoramic = 0.5;
					var effect = null;
					var note = orStore.command.createNote(pitch, velocity,
							panoramic, effect);
					if (Math.floor((Math.random() * 10)) === 0) {
						track.createPosNoteStep(bar, step, note);
					}
				}
			}
		}
	}
}

DemoSongCreator.prototype.delRandNotes = function () {
	for ( var indexPattern = 0; indexPattern < this.song.patterns.length; indexPattern++) {
		var pattern = this.song.patterns[indexPattern];
		for ( var indexTrack = 0; indexTrack < pattern.tracks.length; indexTrack++) {
			var track = pattern.tracks[indexTrack];
			for ( var indexNote = 0; indexNote < track.posNotes.length; indexNote++) {
				var posNote = track.posNotes[indexNote];
				orStore.command.deleteNote(posNote.uuid);
			}
		}
	}
}

DemoSongCreator.prototype.changeTrack = function () {
	var bars = Math.floor((Math.random() * 7) + 1);
	var spb = Math.floor((Math.random() * 7) + 1);
	for ( var indexPattern = 0; indexPattern < this.song.patterns.length; indexPattern++) {
		var pattern = this.song.patterns[indexPattern];
		for ( var indexTrack = 1; indexTrack < pattern.tracks.length; indexTrack++) {
			var track = pattern.tracks[indexTrack];
			track.nbStepsPerBar = spb;
			track.bars = bars;
		}
	}
}

DemoSongCreator.prototype.addTrack = function () {
	for ( var indexPattern = 0; indexPattern < this.song.patterns.length; indexPattern++) {
		var pattern = this.song.patterns[indexPattern];
		var sampleId = 3;
		pattern.createTrack("track21", 4, 4, sampleId);
	}
}

DemoSongCreator.prototype.delTrack = function () {
	for ( var indexPattern = 0; indexPattern < this.song.patterns.length; indexPattern++) {
		var pattern = this.song.patterns[indexPattern];
		for ( var indexTrack = 0; indexTrack < pattern.tracks.length; indexTrack++) {
			if (Math.floor(Math.random() * 2) === 0) {
				orStore.command.deleteTrack(pattern.tracks[indexTrack].uuid);
			}
		}
	}
}

DemoSongCreator.prototype.addPattern = function () {
	var pattern = orStore.command.createPattern(this.song,"pat_"+ this.song.patterns.length);
	var track = orStore.command.createTrack(pattern, "maintrk", 4,4, Math.floor((Math.random() * orStore.drumkit.samples.length)));
	orStore.command.createSequence(this.song, (this.song.patterns.length-1), 4);
}

DemoSongCreator.prototype.delPattern = function () {
	for ( var indexPattern = 0; indexPattern < this.song.patterns.length; indexPattern++) {
		var pattern = this.song.patterns[indexPattern];
		if (Math.floor(Math.random() * 2) === 0) {
			orStore.command.deletePattern(pattern.uuid);
		}
	}
}
