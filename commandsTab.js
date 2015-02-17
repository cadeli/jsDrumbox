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

	$("#command_tempo_decr_Btn").click(function() {
		incrBpm(-1);
		refreshTempoDisplay();
	});

	$("#command_tempo_incr_Btn").click(function() {
		incrBpm(1);
		refreshTempoDisplay();
	});

	$("#pattern_mode_switch").click(function() {
		if (orStore.patternMode === true) {
			orStore.patternMode = false;
		} else {
			orStore.patternMode = true;
		}
		refreshPatternModeSwitch();
	});


	$("#command_local_save_song").click(function() {
		console.log("command_local_save_song");
		var songAsText = orStore.song.computeJSONtext();
		localStorage.setItem('mySong', songAsText);
		console.log("command_local_save_song :" + songAsText);
		$("#save-song-modal").modal();
	});

	$("#command_local_load_song").click(function() {
		var songAsText = localStorage.getItem('mySong');
		console.log ("command_local_load_song :" +  songAsText);
		var songAsJson = JSON.parse(songAsText);
		var song = orStore.command.createSongFromJson(songAsJson);
		initSong(song);
	});

	$("#command_export_song").click(function() {
		var mySongAsText = orStore.song.computeJSONtext();
		//var mySongAsJson = JSON.parse(mySongAsText);
		$("#jsonSongTextArea").attr("placeholder", "").val(mySongAsText).focus().blur();

	});

	$("#command_import_song").click(function() {
		$.get(window.location.href, function(data){
			$("#import-song-modal").modal();
		});
	});
	
	$('#okToImportSong').on('click', function (e) {
		var songAsText = $("#jsonSongTextArea").val();
		console.log(songAsText);
		var songAsJson = JSON.parse(songAsText);
		console.log("import song :" + songAsJson);
		var song = orStore.command.createSongFromJson(songAsJson);
		initSong(song);
	});


});

//-------------------------------------------------------------------------------
function refreshTempoDisplay () {
	$("#tempo_display").text(orStore.song.bpm );
}

function refreshPatternModeSwitch () {
	if (orStore.patternMode === true) {
		$("#pattern_mode_switch").addClass('active');
	} else {
		$("#pattern_mode_switch").removeClass('active');
	}
}

function incrBpm (val) {
	var bpm = orStore.song.bpm;
	console.log ("incr " + val + " bpm = " + bpm);
	if (bpm < 250 && bpm > 20) {
		orStore.song.bpm =  (bpm  + val);
	}
}