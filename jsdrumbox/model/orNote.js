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

function OrNote(pitch, velocity, panoramic, effect) {
	this.pitch = pitch;
	this.velocity = velocity;
	this.panoramic = panoramic;
	this.effect = effect;
	this.fPitch = this.getFPitchFromPitch(pitch);
	// console.log("new OrNote"+ this.computeJSONtext());
}

OrNote.prototype.getFPitchFromPitch = function (pitch) {
	return 1;
};

OrNote.prototype.computeJSONtext = function() {
	var ret = "{";
	ret     += '"pitch"' + ":" + '"' + this.pitch + '"' + ',';
	ret     += '"velocity"' + ":" + '"' + this.velocity + '"' + ',';
	ret     += '"panoramic"' + ":" + '"' + this.panoramic + '"' + ',';
	ret     += '"effect"' + ":" + '"' + this.effect + '"';
	ret     += "}";
	return ret;
};
