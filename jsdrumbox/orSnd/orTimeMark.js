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

	function OrTimeMark(lastPatternTime, uuidPattern, uuidTrack, barLength, stepLength){
		this.startTime   = lastPatternTime;
		this.endTime     = lastPatternTime;
		this.uuidPattern = uuidPattern;
		this.uuidTrack   = uuidTrack;
		this.uuidTrack   = uuidTrack;
		this.barLength   = barLength;
		this.stepLength  = stepLength;
		//console.log("new OrTimeMark"+ this.toString());
		}

	OrTimeMark.prototype.toString = function () {
		var pattern = orStore.command.getPatternFromUuid(this.uuidPattern);
		var track   = orStore.command.getTrackFromUuid(this.uuidTrack);
		return "time = "+this.startTime+":"+this.endTime+" pattern = "+ pattern.displayName + " track="+ track.displayName;
	};