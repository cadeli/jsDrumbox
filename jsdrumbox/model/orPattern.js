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

function OrPattern(displayName) {
		this.displayName=displayName;
		this.tracks = [];
		this.uuid = createUUID();
	};


OrPattern.prototype.createTrack = function(displayName,nbBars,nbStepsPerBar,sampleId) {
		console.log ("createTrack :" + displayName);
		var track = new  OrTrack(displayName,nbBars,nbStepsPerBar,sampleId);
		this.tracks[this.tracks.length]= track;
		return track;
	};		
	
OrPattern.prototype.getDisplayName = function() {
		return this.displayName;
	};

OrPattern.prototype.setDisplayName = function(displayName) {
		this.displayName = displayName;
	};	

OrPattern.prototype.computeJSONtext = function () {
	var ret="{";
	ret += '"displayName"' + ":" + '"' + this.displayName + '"' +',' ;
	ret += '"uuid"'        + ":" + '"' + this.uuid + '"'  +',' ;
	ret += '"tracks"'      + ":" + '[';
	for (var i =0; i < this.tracks.length;i++) {
		ret += this.tracks[i].computeJSONtext();
		if (i < (this.tracks.length-1)) {
			ret += ',';
		}
	}
	ret +=']';
	
	ret +="}";
	return ret;
}

