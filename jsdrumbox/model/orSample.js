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

function OrSample(url) {
	this.displayName = this.getNameFromUrl(url);
	this.buffer = new Audio(url);
	this.uuid = createUUID();
}

OrSample.prototype.getNameFromUrl = function(url) {
	var tret = url.split("/");
	var ret = tret[tret.length-1];
	var tret2 = ret.split(".");
	return tret2[0];
};

OrSample.prototype.getAsText = function() {
	var ret ="Name ="+ this.displayName;
		ret += '"uuid"'        + ":" + '"' + this.uuid + '"'  +',' ;
	return ret;
};



