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

function  OrFlatNote(fPitch, volume, sampleId, pano, time) {
	this.fPitch = fPitch;
	this.volume = volume;
	this.sampleId =sampleId;
	this.pano = 0.5;
	this.time = time;
}

OrFlatNote.prototype.debugDisplay = function() {
	var ret = "";
	ret += 'p:'+  this.fPitch + ' ';
	ret += 'v' +  this.volume + ' ';
	ret += 'sampleId:' + this.sampleId + ' ';
	ret += "time:" + this.time ;
	return ret;
};


OrFlatNote.prototype.computeJSONtext = function() {
	var ret = "{";
	ret += '"fPitch"' + ":" + '"' + this.fPitch + '"' + ',';
	ret += '"volume"' + ":" + '"' + this.volume + '"' + ',';
	ret += '"panoramic"' + ":" + '"' + this.pano + '"' + ',';
	ret += '"sampleId"' + ":" + '"' + this.sampleId + '"' + ',';
	ret += '"time"' + ":" + '"' + this.time + '"';
	ret += "}";
	return ret;
};


