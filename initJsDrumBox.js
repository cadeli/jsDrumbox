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

var startTime=0;
var endTime=0;
var shouldPlay = false;

		var mySongAsText = "";
		var mySongAsJson = "";



//-------------------------------------------------------------------------------
	$(document).ready(function(){
		console.log("initJsDrumbox document ready ");
		loadAndInit();
		//alert("bmp=" + mySongAsJson.bpm);
		//alert("pat=" + mySongAsJson.patterns[0].uuid);
		
	});

//-------------------------------------------------------------------------------------
function loadAndInit() {
//init model
		console.log("create orStore ");
		orStore= new OrStore();
		var demoSong = new DemoSongCreator();
		initSong(demoSong.song);
		orStore.drumkitManager.setDrumkit(orStore.drumkitManager.DRUMKIT_ACCOUSTIC)     ;

}

//-------------------------------------------------------------------------------------
function initSong(newSong) {
		orStore.song = newSong;		
		orStore.selectedPatternUuid = orStore.song.patterns[0].uuid;
		orStore.selectedTrackUuid   = orStore.song.patterns[0].tracks[0].uuid;
		console.log("initSong sel pat = " + orStore.selectedPatternUuid + " sel trk="+ orStore.selectedTrackUuid );		
		refreshPatternList();
		refreshTrackList();
}



function updateTimer() {
	var currentTime = orStore.command.orPlayer.audioContext.currentTime ;
	//update player
	if (shouldPlay=== true) {
		if ((currentTime - startTime) > orStore.command.orPlayer.loopTimeDuration) {
		      playOneLoop() ;
		}
	} 
	//update UI
	if (shouldPlay===true ) {
		var timeForPat  =parseInt( orStore.timeMarkManager.timeMarks[0].endTime) ; // just for pattern mode
		var cTime       = (currentTime - startTime)*1000;
		cTime          %= timeForPat ;
		var pos         = parseInt(100*(cTime/timeForPat));
//		console.log("updateTimer  currentTime="+ cTime + " < " + timeForPat);
//		console.log("updateTimer "+ pos+ " / "+ orStore.command.orPlayer.loopTimeDuration);
		document.getElementById("timeBtn").innerHTML = Math.floor(pos) ;
//		$('#progressbarSong').css('width', pos+'%').attr('aria-valuenow', pos);  
//		document.getElementById("cursor_mark").style.left=Math.floor(w_bar*pos+ l_bar)+ 'px';
	
		orStore.updateMark.setTime(currentTime - startTime);
	    var currentPlayedPattern = orStore.updateMark.currentPlayedPattern;
		//console.log("updateTimer pattern found = "+ orStore.updateMark.currentPlayedPattern.displayName + "="+currentPlayedPattern );
		if (currentPlayedPattern !== null) {
			for (var i=0; i < orStore.orTrackUIs.length;i++) {
				if (orStore.patternMode) {
					orStore.orTrackUIs[i].setTime(currentTime - startTime);
				} else {
					orStore.orTrackUIs[i].setTime(orStore.updateMark.timeInPattern);
				}
			}
		}	else {
			console.log("FATAL  (updateTimer) no playedPattern for time :" + (currentTime - startTime));
		}		
		document.getElementById("playPatternBtn").style.backgroundColor = "#ADD8E6";
	} else {	
		timeBtn.innerHTML ="000";		
		document.getElementById("playPatternBtn").style.backgroundColor = "gray";
	}
}

function playOneLoop() {
	startTime = orStore.command.orPlayer.audioContext.currentTime ;
	endTime   = startTime+orStore.command.orPlayer.loopTimeDuration;
	orStore.command.orPlayer.play();
	console.log("play one loop startTime="+ startTime + " endtTime="+endTime);
}

function playStop() {
	if (shouldPlay === true) {
		console.log("player pause");
		shouldPlay = false;
		clearInterval(startStop);
	} else {
		console.log("player start patternMode = "+ orStore.patternMode);
		shouldPlay = true;
		orStore.command.computeFlatNotes(orStore.song,orStore.patternMode);
		
		console.log(orStore.command.getTimeMarksAsText());
		console.log("start flat notes");
		console.log(orStore.command.getFlatNotesAsText());
		console.log("end flat notes :" + orStore.command.orPlayer.loopTimeDuration + " patMode="+ orStore.patternMode);

		var startStop = setInterval(updateTimer, orStore.command.orPlayer.tickInterval);
		playOneLoop();
	}
	//majPlayButton();
}

