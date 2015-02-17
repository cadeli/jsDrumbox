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

function OrSequence(patternId,repeat) {
	this.patternId = patternId;
	this.repeat = repeat;
	this.uuid = createUUID();
}

OrSequence.prototype.computeJSONtext = function () {
	var ret="{";
	ret +='"patternId"' + ":" + '"' + this.patternId + '"' + ',' ;
	ret += '"uuid"'     + ":" + '"' + this.uuid      + '"' + ',' ;
	ret +='"repeat"'    + ":" + '"' + this.repeat          + '"' ;
	ret +="}";
	return ret;
};