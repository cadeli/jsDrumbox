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

 function OrStore() {
	this.drumkit             = new OrDrumkit();
	this.song                = new OrSong("defaultSong", 120);
	this.command             = new OrCommand();
	this.timeMarkManager     = new OrTimeMarkManager();
	this.updateMark          = new UpdateMark();
	this.drumkitManager      = new DrumkitManager();
	
	this.selectedPatternUuid = null;
	this.selectedTrackUuid   = null;
	this.patternMode         = true;
	
	//UI
	this.nbTrackSlots  =  8;
	this.nbSoundSlots  = 16;
	this.orTrackUIs    = [];
	this.orVeloTrackUI    =null ;
	this.orMatrixTrackUI  =null ;
}


//ui -------------------------
OrStore.prototype.draw = function() {
	this.stepSeqVisu.draw();
	this.patternListVisu.draw();	
	this.arpeggiatorVisu.draw();	
	
};

OrStore.prototype.getSelectedTrack = function() {
	var track = orStore.command.getTrackFromUuid(orStore.selectedTrackUuid);
	if (track === null) {
		track = orStore.command.getPatternFromUuid(orStore.selectedPatternUuid).tracks[0];
		this.selectedTrackUuid = track.uuid;
	}
	return track;
};

//selection -------------------------------------------------------------
OrStore.prototype.setSelectedPatternFromNum = function (num) {
	uuidPattern = orStore.song.patterns[num].uuid;
	orStore.selectedPatternUuid = uuidPattern;
	console.log("setSelectedPatternFromNum :" + num + " = "+ orStore.command.getPatternFromUuid(orStore.selectedPatternUuid).displayName );
	refreshTrackList();
}

//utils --------------------------------------------------------------------

//used in json
OrStore.prototype.replacer = function (key, value) {
    if (typeof value === 'number' && !isFinite(value)) {
        return String(value);
    }
    return value;
}


function createUUID() {
 // http://www.ietf.org/rfc/rfc4122.txt
 var s = [];
 var hexDigits = "0123456789abcdef";
 for (var i = 0; i < 36; i++) {
     s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
 }
 s[14] = "4";  // bits 12-15 of the time_hi_and_version field to 0010
 s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);  // bits 6-7 of the clock_seq_hi_and_reserved to 01
 s[8] = s[13] = s[18] = s[23] = "-";

 var uuid = s.join("");
// console.log ("uuid = "+ uuid)
 return uuid;
}

