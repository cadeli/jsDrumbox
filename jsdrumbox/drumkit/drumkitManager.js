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


function DrumkitManager() {
	this.DRUMKIT_808       = "808"      ;
	this.DRUMKIT_VINTAGE   = "VINTAGE"  ;
	this.DRUMKIT_ACCOUSTIC = "ACCOUSTIC";
	this.DRUMKIT_HUMAN     = "HUMAN"    ;
	this.DRUMKIT_PERCUS    = "PERCUS"   ;
	this.DRUMKIT_ACID      = "ACID"     ;
	this.DRUMKIT_8_BITS    = "8_BITS"   ;
}

DrumkitManager.prototype.loadDrumkit = function(sampleList) {
	console.log("load drumkit");
	if (orStore.command.orPlayer.audioContext) {
	  bufferLoader = new BufferLoader(
	    sampleList,
	    this.finishedLoadingSamples
	    );
	  bufferLoader.load();
	} else {
		console.log("FATAL (loadDrumkit) no audioContext");
	}
 };

DrumkitManager.prototype.finishedLoadingSamples = function(bufferList) {	
	console.log ("load sample complete : nb samples = "+ bufferList.length);
	for (var i = 0; i < bufferList.length;i++) {
		 orStore.command.createOrSample(orStore.drumkit, bufferLoader.urlList[i]);
		 //console.log ("play sample= "+ bufferLoader.urlList[i]+ " at " + i*100);
	}
	refreshTrackList  ();
	refreshSoundList  ();
	refreshDrumkitList();
	testCurrentDrumkit();
};


function testCurrentDrumkit (name) {
	var time = 0;
	for ( var i = 0; i < orStore.drumkit.samples.length; i++) {
		var volume =    1;
		var fPitch =    1;
		time       += 0.5;
		orStore.command.orPlayer.playASound(time, i, 1, 1);
		//console.log("testDrumkitSounds : sample="+i+ "=" + orStore.drumkit.samples[i].displayName + " at time :"+ time);
	}
};


DrumkitManager.prototype.setDrumkit = function(name) {
		console.log("setDrumkit " + name);
		orStore.drumkit.samples.length=0;
		orStore.drumkit.displayName=name;
		var sampleList = [
	      './jsdrumbox/samples/accoustic/kick.wav',
	  	  './jsdrumbox/samples/accoustic/Snare.wav',
	      './jsdrumbox/samples/accoustic/chh.wav',
	      './jsdrumbox/samples/accoustic/ohh.wav',
	      './jsdrumbox/samples/accoustic/ride.wav',
	      './jsdrumbox/samples/accoustic/ltom.wav',
	      './jsdrumbox/samples/accoustic/mtom.wav',
	      './jsdrumbox/samples/accoustic/clap.wav',
	      './jsdrumbox/samples/accoustic/Cowbell.wav',
	      './jsdrumbox/samples/accoustic/e_bass_c3.wav',
	  	  './jsdrumbox/samples/accoustic/Rimshot.wav',
	      './jsdrumbox/samples/accoustic/tambourine.wav',
	    ];

	if (name === this.DRUMKIT_808) {
		sampleList = [
	      './jsdrumbox/samples/808/BD.wav',
	      './jsdrumbox/samples/808/SD.wav',
	      './jsdrumbox/samples/808/CB.wav',
	      './jsdrumbox/samples/808/HC.wav',
	      './jsdrumbox/samples/808/OH.wav',
	      './jsdrumbox/samples/808/CY.wav',
	      './jsdrumbox/samples/808/LT.wav',
	  	  './jsdrumbox/samples/808/MT.wav',
	      './jsdrumbox/samples/808/LC.wav',
	      './jsdrumbox/samples/808/CL.wav',
	      './jsdrumbox/samples/808/MC.wav',
	      './jsdrumbox/samples/808/RS.wav',
	    ];
	} else
	if (name === this.DRUMKIT_8_BITS) {
		sampleList = [
	      './jsdrumbox/samples/8bit/kck.wav',
	  	  './jsdrumbox/samples/8bit/snare.wav',
	      './jsdrumbox/samples/8bit/bass.wav',
	      './jsdrumbox/samples/8bit/beep.wav',
	      './jsdrumbox/samples/8bit/ohh.wav',
	      './jsdrumbox/samples/8bit/htom.wav',
	      './jsdrumbox/samples/8bit/ltom.wav',
	      './jsdrumbox/samples/8bit/crash.wav',
	      './jsdrumbox/samples/8bit/hit.wav',
	      './jsdrumbox/samples/8bit/melo.wav',
	      './jsdrumbox/samples/8bit/timbal.wav',
	      './jsdrumbox/samples/8bit/ride.wav',
	    ];
	} else
	if (name === this.DRUMKIT_ACCOUSTIC) {
		sampleList = [
	      './jsdrumbox/samples/accoustic/kick.wav',
	  	  './jsdrumbox/samples/accoustic/Snare.wav',
	      './jsdrumbox/samples/accoustic/chh.wav',
	      './jsdrumbox/samples/accoustic/ohh.wav',
	      './jsdrumbox/samples/accoustic/ride.wav',
	      './jsdrumbox/samples/accoustic/ltom.wav',
	      './jsdrumbox/samples/accoustic/mtom.wav',
	      './jsdrumbox/samples/accoustic/clap.wav',
	      './jsdrumbox/samples/accoustic/Cowbell.wav',
	      './jsdrumbox/samples/accoustic/e_bass_c3.wav',
	  	  './jsdrumbox/samples/accoustic/Rimshot.wav',
	      './jsdrumbox/samples/accoustic/tambourine.wav',
	    ];
	} else
	if (name === this.DRUMKIT_PERCUS) {
		sampleList = [
	      './jsdrumbox/samples/percus/HAgogo.wav',
	      './jsdrumbox/samples/percus/HBongo.wav',
	      './jsdrumbox/samples/percus/Hi_Cabasa.wav',
	      './jsdrumbox/samples/percus/HiCongas.wav',
	      './jsdrumbox/samples/percus/L_Congas.wav',
	      './jsdrumbox/samples/percus/L_Guiro.wav',
	      './jsdrumbox/samples/percus/LAgogo.wav',
	      './jsdrumbox/samples/percus/LCCOngas.wav',
	      './jsdrumbox/samples/percus/LCongas.wav',
	  	  './jsdrumbox/samples/percus/LTimbale.wav',
	  	  './jsdrumbox/samples/percus/OCongas.wav',
	      './jsdrumbox/samples/percus/SGuiro.wav',
	    ];
	} else
	if (name === this.DRUMKIT_HUMAN) {
		sampleList = [
	      './jsdrumbox/samples/human/bd.wav',
	      './jsdrumbox/samples/human/Snare.wav',
	      './jsdrumbox/samples/human/chh.wav',
	      './jsdrumbox/samples/human/OHH.wav',
	      './jsdrumbox/samples/human/Crash.wav',
	      './jsdrumbox/samples/human/HiTom.wav',
	      './jsdrumbox/samples/human/LowTom.wav',
	      './jsdrumbox/samples/human/MidTom.wav',
	    ];
	} else
	if (name === this.DRUMKIT_VINTAGE) {
		sampleList = [
	      './jsdrumbox/samples/vintage/kick.wav',
	      './jsdrumbox/samples/vintage/snare.wav',
	      './jsdrumbox/samples/vintage/chh.wav',
	      './jsdrumbox/samples/vintage/cy.wav',
	      './jsdrumbox/samples/vintage/lt.wav',
	      './jsdrumbox/samples/vintage/melo_c3.wav',
	     ];
	} else
	if (name === this.DRUMKIT_ACID) {
		sampleList = [
	      './jsdrumbox/samples/acid/wood.wav',
	      './jsdrumbox/samples/acid/hit_c3.wav',
	      './jsdrumbox/samples/acid/shaker.wav',
	      './jsdrumbox/samples/acid/Claves.wav',
	      './jsdrumbox/samples/acid/crash.wav',
	      './jsdrumbox/samples/acid/bass_c3.wav',
	      './jsdrumbox/samples/acid/piano_c3.wav',
	      './jsdrumbox/samples/acid/melo_c3.wav',
	     ];
	}
	this.loadDrumkit(sampleList);
};
