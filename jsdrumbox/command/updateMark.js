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

function UpdateMark(canvas) {
	this.timeInPattern=0;
	this.currentPlayedPattern = null;
}

UpdateMark.prototype.setTime = function (time) {
	this.time = time;
	this.computeCurrentPatternFromTime();
};

UpdateMark.prototype.computeCurrentPatternFromTime = function() {
	this.currentPlayedPattern =null;
	this.timeInPattern =0;
	for (index = 0; index < orStore.timeMarkManager.timeMarks.length; index++) {
		var orTimeMark = orStore.timeMarkManager.timeMarks[index];
		//console.log("computeCurrentPatternFromTime "+ index + " len="+ orStore.timeMarkManager.timeMarks.length + ">"+ orTimeMark.toString() );
		if (this.time >= orTimeMark.startTime && this.time < orTimeMark.endTime) {
			//console.log( "t="+ this.time+" MATCH" + orStore.command.getPatternFromUuid(orTimeMark.uuidPattern).displayName);
			this.timeInPattern        = (this.time - orTimeMark.startTime);
			this.currentPlayedPattern = orStore.command.getPatternFromUuid(orTimeMark.uuidPattern);
			index = orStore.timeMarkManager.timeMarks.length;
			return ;
		}
	}
	console.log ("FATAL UpdateMark: no currentPlayedPattern for time : " + this.time);
};



//UpdateMark.prototype.getCurrentTracksFromTime = function(time) {
//	var pTracks = new Array();
//	var indexPTrack = 0;
//	for (index = 0; index < orStore.timeMarkManager.timeMarks.length; index++) {
//		var orTimeMark = orStore.timeMarkManager.timeMarks[index];
//		if (time >= orTimeMark.startTime && time < orTimeMark.endTime) {
//			pTracks[indexPTrack]= this.getTrackFromUuid(orTimeMark.uuidTrack);
//			indexPTrack++;
//			console.log ("getTrackFromUuid add : "+indexPTrack+":"+ this.getTrackFromUuid(orTimeMark.uuidTrack).displayName);
//		}
//	}
//	return pTracks;
//}
