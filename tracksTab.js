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

//-------------------------------------------------------------------------------


$(document).ready(function(){

	$('#playPatternBtn').on('click', function (e) {
		playStop() ;       // pattern mode
		//playOneLoop() ;    //song mode
		console.log("play pat btn");
	});


	$("#okToDeleteTrack").click(function() {
		//alert("commande : delete selected pattern :" + orStore.selectedPatternUuid);
		orStore.command.deleteTrack(orStore.selectedTrackUuid);
		refreshTrackList() ;
	});

	$("#create_new_track_btn").click(function() {
		$.get(window.location.href, function(data){
			var html = "defaultName";
			$("#add-track-modal pre").text(html);
			$("#add-track-modal").modal();
		});
	});

	$('#okToAddTrack').on('click', function (e) {
		var name 	= "defaultName";
		var pattern = orStore.command.getPatternFromUuid(orStore.selectedPatternUuid)
		var track   = pattern.createTrack(name, 4, 4,5);
		console.log("track created " + track);
		orStore.selectedTrackUuid=track.uuid;
		refreshTrackList();
	});


	$("#track_0_delete").click(function() {
		deleteTrack(0);
	});
	$("#track_1_delete").click(function() {
		deleteTrack(1);
	});
	$("#track_2_delete").click(function() {
		deleteTrack(2);
	});
	$("#track_3_delete").click(function() {
		deleteTrack(3);
	});
	$("#track_4_delete").click(function() {
		deleteTrack(4);
	});
	$("#track_5_delete").click(function() {
		deleteTrack(5);
	});
	$("#track_6_delete").click(function() {
		deleteTrack(6);
	});
	$("#track_7_delete").click(function() {
		deleteTrack(7);
	});

	$("#track_0_mute").click(function() {
		toggleMuteTrack(0);
	});
	$("#track_1_mute").click(function() {
		toggleMuteTrack(1);
	});
	$("#track_2_mute").click(function() {
		toggleMuteTrack(2);
	});
	$("#track_3_mute").click(function() {
		toggleMuteTrack(3);
	});
	$("#track_4_mute").click(function() {
		toggleMuteTrack(4);
	});
	$("#track_5_mute").click(function() {
		toggleMuteTrack(5);
	});
	$("#track_6_mute").click(function() {
		toggleMuteTrack(6);
	});
	$("#track_7_mute").click(function() {
		toggleMuteTrack(7);
	});

	

	$(".trackDisplayRow").click(function() {
		var row = $(this).parent().children().index($(this));
		var selectedPattern = orStore.command.getPatternFromUuid(orStore.selectedPatternUuid);
		orStore.selectedTrackUuid = selectedPattern.tracks[row].uuid;
		refreshTrackList();
		//var track = orStore.command.getTrackFromUuid(orStore.selectedTrackUuid);
		//console.log("selected row="+ row + "="+ track.displayName);
	});

	$("#track_0_nbBars_btn").click(function() {
		incrNbBars(0);
	});

	$("#track_0_nbStepPerBar_btn").click(function() {
		incrNbStepsPerBar(0);
	});

	$("#track_1_nbBars_btn").click(function() {
		incrNbBars(1);
	});

	$("#track_1_nbStepPerBar_btn").click(function() {
		incrNbStepsPerBar(1);
	});

	$("#track_2_nbBars_btn").click(function() {
		incrNbBars(2);
	});

	$("#track_2_nbStepPerBar_btn").click(function() {
		incrNbStepsPerBar(2);
	});

	$("#track_3_nbBars_btn").click(function() {
		incrNbBars(3);
	});

	$("#track_3_nbStepPerBar_btn").click(function() {
		incrNbStepsPerBar(3);
	});

	$("#track_4_nbBars_btn").click(function() {
		incrNbBars(4);
	});

	$("#track_4_nbStepPerBar_btn").click(function() {
		incrNbStepsPerBar(4);
	});


	$("#track_5_nbBars_btn").click(function() {
		incrNbBars(5);
	});

	$("#track_5_nbStepPerBar_btn").click(function() {
		incrNbStepsPerBar(5);
	});

	$("#track_6_nbBars_btn").click(function() {
		incrNbBars(6);
	});

	$("#track_6_nbStepPerBar_btn").click(function() {
		incrNbStepsPerBar(6);
	});

	$("#track_7_nbBars_btn").click(function() {
		incrNbBars(7);
	});

	$("#track_7_nbStepPerBar_btn").click(function() {
		incrNbStepsPerBar(7);
	});

	




	$("#track_0_kit_0").click(function() {
		setSound(0,0);
	});

	$("#track_0_kit_1").click(function() {
		setSound(0,1);
	});

	$("#track_0_kit_2").click(function() {
		setSound(0,2);
	});

	$("#track_0_kit_3").click(function() {
		setSound(0,3);
	});

	$("#track_0_kit_4").click(function() {
		setSound(0,4);
	});

	$("#track_0_kit_5").click(function() {
		setSound(0,5);
	});

	$("#track_0_kit_6").click(function() {
		setSound(0,6);
	});

	$("#track_0_kit_7").click(function() {
		setSound(0,7);
	});

	$("#track_0_kit_8").click(function() {
		setSound(0,8);
	});

	$("#track_0_kit_9").click(function() {
		setSound(0,9);
	});

	$("#track_0_kit_10").click(function() {
		setSound(0,10);
	});

	$("#track_0_kit_11").click(function() {
		setSound(0,11);
	});

	$("#track_0_kit_12").click(function() {
		setSound(0,12);
	});

	$("#track_0_kit_13").click(function() {
		setSound(0,13);
	});

	$("#track_0_kit_14").click(function() {
		setSound(0,14);
	});

	$("#track_1_kit_15").click(function() {
		setSound(0,15);
	});

	$("#track_1_kit_0").click(function() {
		setSound(1,0);
	});

	$("#track_1_kit_1").click(function() {
		setSound(1,1);
	});

	$("#track_1_kit_2").click(function() {
		setSound(1,2);
	});

	$("#track_1_kit_3").click(function() {
		setSound(1,3);
	});

	$("#track_1_kit_4").click(function() {
		setSound(1,4);
	});

	$("#track_1_kit_5").click(function() {
		setSound(1,5);
	});

	$("#track_1_kit_6").click(function() {
		setSound(1,6);
	});

	$("#track_1_kit_7").click(function() {
		setSound(1,7);
	});

	$("#track_1_kit_8").click(function() {
		setSound(1,8);
	});

	$("#track_1_kit_9").click(function() {
		setSound(1,9);
	});

	$("#track_1_kit_10").click(function() {
		setSound(1,10);
	});

	$("#track_1_kit_11").click(function() {
		setSound(1,11);
	});

	$("#track_1_kit_12").click(function() {
		setSound(1,12);
	});

	$("#track_1_kit_13").click(function() {
		setSound(1,13);
	});

	$("#track_1_kit_14").click(function() {
		setSound(1,14);
	});

	$("#track_1_kit_15").click(function() {
		setSound(1,15);
	});

	$("#track_2_kit_0").click(function() {
		setSound(2,0);
	});

	$("#track_2_kit_1").click(function() {
		setSound(2,1);
	});

	$("#track_2_kit_2").click(function() {
		setSound(2,2);
	});

	$("#track_2_kit_3").click(function() {
		setSound(2,3);
	});

	$("#track_2_kit_4").click(function() {
		setSound(2,4);
	});

	$("#track_2_kit_5").click(function() {
		setSound(2,5);
	});

	$("#track_2_kit_6").click(function() {
		setSound(2,6);
	});

	$("#track_2_kit_7").click(function() {
		setSound(2,7);
	});

	$("#track_2_kit_8").click(function() {
		setSound(2,8);
	});

	$("#track_2_kit_9").click(function() {
		setSound(2,9);
	});

	$("#track_2_kit_10").click(function() {
		setSound(2,10);
	});

	$("#track_2_kit_11").click(function() {
		setSound(2,11);
	});

	$("#track_2_kit_12").click(function() {
		setSound(2,12);
	});

	$("#track_2_kit_13").click(function() {
		setSound(2,13);
	});

	$("#track_2_kit_14").click(function() {
		setSound(2,14);
	});

	$("#track_2_kit_15").click(function() {
		setSound(2,15);
	});

	$("#track_3_kit_0").click(function() {
		setSound(3,0);
	});

	$("#track_3_kit_1").click(function() {
		setSound(3,1);
	});

	$("#track_3_kit_2").click(function() {
		setSound(3,2);
	});

	$("#track_3_kit_3").click(function() {
		setSound(3,3);
	});

	$("#track_3_kit_4").click(function() {
		setSound(3,4);
	});

	$("#track_3_kit_5").click(function() {
		setSound(3,5);
	});

	$("#track_3_kit_6").click(function() {
		setSound(3,6);
	});

	$("#track_3_kit_7").click(function() {
		setSound(3,7);
	});

	$("#track_3_kit_8").click(function() {
		setSound(3,8);
	});

	$("#track_3_kit_9").click(function() {
		setSound(3,9);
	});

	$("#track_3_kit_10").click(function() {
		setSound(3,10);
	});

	$("#track_3_kit_11").click(function() {
		setSound(3,11);
	});

	$("#track_3_kit_12").click(function() {
		setSound(3,12);
	});

	$("#track_3_kit_13").click(function() {
		setSound(3,13);
	});

	$("#track_3_kit_14").click(function() {
		setSound(3,14);
	});

	$("#track_3_kit_15").click(function() {
		setSound(3,15);
	});

	$("#track_4_kit_0").click(function() {
		setSound(0,0);
	});

	$("#track_4_kit_1").click(function() {
		setSound(04,1);
	});

	$("#track_4_kit_2").click(function() {
		setSound(4,2);
	});

	$("#track_4_kit_3").click(function() {
		setSound(4,3);
	});

	$("#track_4_kit_4").click(function() {
		setSound(4,4);
	});

	$("#track_4_kit_5").click(function() {
		setSound(4,5);
	});

	$("#track_4_kit_6").click(function() {
		setSound(4,6);
	});

	$("#track_4_kit_7").click(function() {
		setSound(4,7);
	});

	$("#track_4_kit_8").click(function() {
		setSound(4,8);
	});

	$("#track_4_kit_9").click(function() {
		setSound(4,9);
	});

	$("#track_4_kit_10").click(function() {
		setSound(4,10);
	});

	$("#track_4_kit_11").click(function() {
		setSound(4,11);
	});

	$("#track_4_kit_12").click(function() {
		setSound(4,12);
	});

	$("#track_4_kit_13").click(function() {
		setSound(4,13);
	});

	$("#track_4_kit_14").click(function() {
		setSound(4,14);
	});

	$("#track_4_kit_15").click(function() {
		setSound(4,15);
	});

	$("#track_5_kit_0").click(function() {
		setSound(5,0);
	});

	$("#track_5_kit_1").click(function() {
		setSound(5,1);
	});

	$("#track_5_kit_2").click(function() {
		setSound(5,2);
	});

	$("#track_5_kit_3").click(function() {
		setSound(5,3);
	});

	$("#track_5_kit_4").click(function() {
		setSound(5,4);
	});

	$("#track_5_kit_5").click(function() {
		setSound(5,5);
	});

	$("#track_5_kit_6").click(function() {
		setSound(5,6);
	});

	$("#track_5_kit_7").click(function() {
		setSound(5,7);
	});

	$("#track_5_kit_8").click(function() {
		setSound(5,8);
	});

	$("#track_5_kit_9").click(function() {
		setSound(5,9);
	});

	$("#track_5_kit_10").click(function() {
		setSound(5,10);
	});

	$("#track_5_kit_11").click(function() {
		setSound(5,11);
	});

	$("#track_5_kit_12").click(function() {
		setSound(5,12);
	});

	$("#track_5_kit_13").click(function() {
		setSound(5,13);
	});

	$("#track_5_kit_14").click(function() {
		setSound(5,14);
	});

	$("#track_5_kit_15").click(function() {
		setSound(5,15);
	});

	$("#track_6_kit_0").click(function() {
		setSound(6,0);
	});

	$("#track_6_kit_1").click(function() {
		setSound(6,1);
	});

	$("#track_6_kit_2").click(function() {
		setSound(6,2);
	});

	$("#track_6_kit_3").click(function() {
		setSound(6,3);
	});

	$("#track_6_kit_4").click(function() {
		setSound(6,4);
	});

	$("#track_6_kit_5").click(function() {
		setSound(6,5);
	});

	$("#track_6_kit_6").click(function() {
		setSound(6,6);
	});

	$("#track_6_kit_7").click(function() {
		setSound(6,7);
	});

	$("#track_6_kit_8").click(function() {
		setSound(6,8);
	});

	$("#track_6_kit_9").click(function() {
		setSound(6,9);
	});

	$("#track_6_kit_10").click(function() {
		setSound(6,10);
	});

	$("#track_6_kit_11").click(function() {
		setSound(6,11);
	});

	$("#track_6_kit_12").click(function() {
		setSound(6,12);
	});

	$("#track_6_kit_13").click(function() {
		setSound(6,13);
	});

	$("#track_6_kit_14").click(function() {
		setSound(6,14);
	});

	$("#track_6_kit_15").click(function() {
		setSound(6,15);
	});

	$("#track_7_kit_0").click(function() {
		setSound(7,0);
	});

	$("#track_7_kit_1").click(function() {
		setSound(7,1);
	});

	$("#track_7_kit_2").click(function() {
		setSound(7,2);
	});

	$("#track_7_kit_3").click(function() {
		setSound(7,3);
	});

	$("#track_7_kit_4").click(function() {
		setSound(7,4);
	});

	$("#track_7_kit_5").click(function() {
		setSound(7,5);
	});

	$("#track_7_kit_6").click(function() {
		setSound(7,6);
	});

	$("#track_7_kit_7").click(function() {
		setSound(7,7);
	});

	$("#track_7_kit_8").click(function() {
		setSound(7,8);
	});

	$("#track_7_kit_9").click(function() {
		setSound(7,9);
	});

	$("#track_7_kit_10").click(function() {
		setSound(7,10);
	});

	$("#track_7_kit_11").click(function() {
		setSound(7,11);
	});

	$("#track_7_kit_12").click(function() {
		setSound(7,12);
	});

	$("#track_7_kit_13").click(function() {
		setSound(7,13);
	});

	$("#track_7_kit_14").click(function() {
		setSound(7,14);
	});

	$("#track_7_kt_15").click(function() {
		setSound(7,15);
	});


	


});

//-------------------------------------------------------------------------------------
function deleteTrack(trackNum) {
		var track = getTrack(trackNum);
		orStore.selectedTrackUuid = track.uuid;
		$("#delete-track-modal pre").text( "("+ (trackNum+1) + ") " + track.displayName); 
		$("#delete-track-modal").modal();
};

function toggleMuteTrack(trackNum) {
		var track = getTrack(trackNum);
		orStore.selectedTrackUuid = track.uuid;
		if (track.mute === true) {
			track.mute = false;
		} else {
			track.mute = true;
		}
		refreshTrackList();
};

function setSound(trackNum,soundNum) {
	var track = getTrack(trackNum);
	track.sampleId = soundNum;
}

function incrNbBars(trackNum) {
	var track = getTrack(trackNum);
	track.incrNbBar();
	refreshTrackList();
}

function incrNbStepsPerBar(trackNum) {
	var track = getTrack(trackNum);
	track.incrNbStepsPerBar();
	refreshTrackList();
}


function getTrack(trackNum) {
	var selectedPattern = orStore.command.getPatternFromUuid(orStore.selectedPatternUuid);
	orStore.selectedTrackUuid = selectedPattern.tracks[trackNum].uuid;
	var track = orStore.command.getTrackFromUuid(orStore.selectedTrackUuid);
	return track;
}

function refreshSoundList() {
	console.log("refresh sounds");
	for (var i = 0; i < orStore.nbTrackSlots; i++) {
		for (var soundNum = 0; soundNum < orStore.nbSoundSlots; soundNum++) {
			var sNameElement = "#track_"+i+"_kit_" + soundNum;
			if (orStore.drumkit.samples.length > soundNum ) {
				var soundName = orStore.drumkit.samples[ soundNum ].displayName;
				$(sNameElement).text ( soundName );
			} else {
				$(sNameElement).text ( "---" );
			}
		}
	}
}


function initUI() {
	//init UI
		for (var i = 0; i < orStore.nbTrackSlots;i++) {
			var canvas = document.getElementById('canvas_track_'+i);
			orStore.orTrackUIs[i] = new OrTrackUI(canvas);
		}
		var canvas_velo         = document.getElementById ('canvas_velo'  );
		orStore.orVeloTrackUI   =  new TrackVeloUI  (canvas_velo  );
}

function refreshTrackList() {
	if (orStore.orTrackUIs[0]== null) {
		initUI();
	}

	console.log("refresh tracks");
	$("#patternSelectedDisp").text(orStore.command.getPatternFromUuid(orStore.selectedPatternUuid).displayName);
	for (var i = 0; i < orStore.nbTrackSlots; i++) {
		var pattern           =  orStore.command.getPatternFromUuid( orStore.selectedPatternUuid);
		var track             =  pattern.tracks[i];
		var idRow                  = "#track_"+i+"_row";
		var btnNbBars              = "#track_"+i+"_nbBars_btn";
		var btnMute                = "#track_"+i+"_mute";
		var btnNbStepsPerBars      = "#track_"+i+"_nbStepPerBar_btn";
		var idTitle                = "#track_"+i+"_displayName";
		var trackDisplaySoundName  = "#track_"+i+"_displaySoundName";
		if (i < pattern.tracks.length) {
			orStore.orTrackUIs[i].setTrack(track);
			orStore.orTrackUIs[i].orPattern = pattern;
			orStore.orTrackUIs[i].draw();

			var sampleId = orStore.orTrackUIs[i].orTrack.sampleId;
			console.log ("refresh tracks : sample id = "+ sampleId + " nb samples in dk = "+orStore.drumkit.samples.length );
			if (sampleId >=0 && sampleId < orStore.drumkit.samples.length ) {
				var soundName = orStore.drumkit.samples[ sampleId ].displayName;
			}

			$(btnNbBars)             .text ( track.nbBars       );
			$(btnNbStepsPerBars)     .text ( track.nbStepsPerBar);			
			$(idTitle)               .text ( track.displayName  );
			$(trackDisplaySoundName) .text ( soundName          );

			if (track.mute === true) {
				$(btnMute).css("background-color","#FF0000");
			} else {
				$(btnMute).css("background-color","#00FF00");
			}

			$(idRow).show();
			if (orStore.selectedTrackUuid === track.uuid) {
				$(idRow).css("background-color","#ADD8E6");
			} else {
				$(idRow).css("background-color","#F0F0F0");
			}

		} else {
			$(idRow).hide();
		}	
	}
	//orStore.orVeloTrackUI.setTrack(orStore.command.getTrackFromUuid( orStore.selectedTrackUuid));
	//orStore.orMatrixTrackUI.draw();	
	orStore.orVeloTrackUI.draw();	
};


