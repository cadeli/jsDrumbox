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


function OrTimeMarkManager() {
	this.indexTimeMark =0;
	this.timeMarks =  [];
}


OrTimeMarkManager.prototype.addTimeMark = function (time, uuidPattern, uuidTrack, barLength, stepLength){
	var orTimeMark = new OrTimeMark(time, uuidPattern, uuidTrack, barLength, stepLength);
	this.timeMarks[this.indexTimeMark] = orTimeMark;
	for (var i=0; i < this.indexTimeMark;i++) {
		this.timeMarks[this.indexTimeMark-1].endTime = time;
	}
	this.indexTimeMark++;
	//console.log("addTimeMark " + this.indexTimeMark);
};


OrTimeMarkManager.prototype.addLastTimeMark = function (time){
	if (this.indexTimeMark>0) {
		this.timeMarks[this.indexTimeMark-1].endTime = time;
	}
};

OrTimeMarkManager.prototype.resetTimeMark = function () {
	this.indexTimeMark=0;
};

//OrTimeMarkManager.prototype.display = function () {
//	for (var i =0; i < this.indexTimeMark;i++) {
//		var orTimeMark =this.timeMarks[i];
//		console.log("ee"+orTimeMark.toString());
//	}
//};