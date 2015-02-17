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
;$(document).ready(function(){
		
	$("#create_new_pattern_btn").click(function() {
		$.get(window.location.href, function(data){
			var html = "no Name for this pattern";
			$("#add-pattern-modal pre").text(html);
			$("#add-pattern-modal").modal();
		});
	});

	$('#okToAddPattern').on('click', function (e) {
		var name 	= $("#patternDisplayName").val();
		var pattern = orStore.command.createPattern(orStore.song, name);
		var track   = pattern.createTrack("track", 4, 4,5);
		orStore.setSelectedPatternFromNum((orStore.song.patterns.length-1));
		refreshPatternList();
		console.log("new pattern created");
	});

	$('#okToDuplicatePattern').on('click', function (e) {
		var name 	= $("#patternDisplayName").val();
		var pattern = orStore.command.createPatternDuplicate(
			orStore.song, 
			name,
			orStore.command.getPatternFromUuid( orStore.selectedPatternUuid)
		);
		var track   = pattern.createTrack("track", 4, 4,5);
		orStore.setSelectedPatternFromNum((orStore.song.patterns.length-1));

		refreshPatternList();
		console.log("new pattern created duplicate ");
	});

	$('#okToEditPattern').on('click', function (e) {
		var name 	= $("#patternNewDisplayName").val();
		var pattern = orStore.command.getPatternFromUuid(orStore.selectedPatternUuid)
		pattern.displayName = name;
		refreshPatternList();
		console.log("new pattern name is " +pattern.displayName + "= "+ name);
	});

	$("#okToDeletePattern").click(function() {
		//alert("commande : delete selected pattern :" + orStore.selectedPatternUuid);
		orStore.command.deletePattern(orStore.selectedPatternUuid);
		refreshPatternList() ;
	});


	$("#pattern_0_delete").click(function() {
		deletePattern(0);
	});

	$("#pattern_1_delete").click(function() {
		deletePattern(1);
	});

	$("#pattern_2_delete").click(function() {
		deletePattern(2);
	});

	$("#pattern_3_delete").click(function() {
		deletePattern(3);
	});

	$("#pattern_4_delete").click(function() {
		deletePattern(4);
	});
	$("#pattern_5_delete").click(function() {
		deletePattern(5);
	});

	$("#pattern_6_delete").click(function() {
		deletePattern(6);
	});

	$("#pattern_7_delete").click(function() {
		deletePattern(7);
	});

	$("#pattern_8_delete").click(function() {
		deletePattern(8);
	});

	$("#pattern_9_delete").click(function() {
		deletePattern(9);
	});

	//

	$("#pattern_0_edit").click(function() {
		editPattern(0);
	});

	$("#pattern_1_edit").click(function() {
		editPattern(1);
	});

	$("#pattern_2_edit").click(function() {
		editPattern(2);
	});

	$("#pattern_3_edit").click(function() {
		editPattern(3);
	});

	$("#pattern_4_edit").click(function() {
		editPattern(4);
	});

	$("#pattern_5_edit").click(function() {
		editPattern(5);
	});

	$("#pattern_6_edit").click(function() {
		editPattern(6);
	});

	$("#pattern_7_edit").click(function() {
		editPattern(7);
	});

	$("#pattern_8_edit").click(function() {
		editPattern(8);
	});

	$("#pattern_9_edit").click(function() {
		editPattern(9);
	});

	//
	$("#pattern_0_duplicate").click(function() {
		duplicatePattern(0);
	});

	$("#pattern_1_duplicate").click(function() {
		duplicatePattern(1);
	});

	$("#pattern_2_duplicate").click(function() {
		duplicatePattern(2);
	});

	$("#pattern_3_duplicate").click(function() {
		duplicatePattern(3);
	});

	$("#pattern_4_duplicate").click(function() {
		duplicatePattern(4);
	});

	$("#pattern_5_duplicate").click(function() {
		duplicatePattern(5);
	});

	$("#pattern_6_duplicate").click(function() {
		duplicatePattern(6);
	});

	$("#pattern_7_duplicate").click(function() {
		duplicatePattern(7);
	});

	$("#pattern_8_duplicate").click(function() {
		duplicatePattern(8);
	});

	$("#pattern_9_duplicate").click(function() {
		duplicatePattern(9);
	});

	//

	$("#pattern_0_row").click(function() {
		orStore.setSelectedPatternFromNum(0);
		refreshPatternList();
	});

	$("#pattern_1_row").click(function() {
		orStore.setSelectedPatternFromNum(1);
		refreshPatternList();
	});

	$("#pattern_2_row").click(function() {
		orStore.setSelectedPatternFromNum(2);
		refreshPatternList();
	});

	$("#pattern_3_row").click(function() {
		orStore.setSelectedPatternFromNum(3);
		refreshPatternList();
	});

	$("#pattern_4_row").click(function() {
		orStore.setSelectedPatternFromNum(4);
		refreshPatternList();
	});

	$("#pattern_5_row").click(function() {
		orStore.setSelectedPatternFromNum(5);
		refreshPatternList();
	});

	$("#pattern_6_row").click(function() {
		orStore.setSelectedPatternFromNum(6);
		refreshPatternList();
	});

	$("#pattern_7_row").click(function() {
		orStore.setSelectedPatternFromNum(7);
		refreshPatternList();
	});


});


//-------------------------------------------------------------------------------
function deletePattern(num) {
		orStore.setSelectedPatternFromNum(num);
		refreshPatternList();
		$("#delete-pattern-modal pre").text( "("+ (num+1) + ") " + orStore.song.patterns[num].displayName); 
		$("#delete-pattern-modal").modal();
};

function editPattern(num) {
		orStore.setSelectedPatternFromNum(num);
		refreshPatternList();
		$("#edit-pattern-modal pre").text( "("+ (num+1) + ") " + orStore.song.patterns[num].displayName); 
		$("#edit-pattern-modal").modal();
};

function duplicatePattern(num) {
		orStore.setSelectedPatternFromNum(num);
		refreshPatternList();
		$("#duplicate-pattern-modal pre").text( "("+ (num+1) + ") " + orStore.song.patterns[num].displayName); 
		$("#duplicate-pattern-modal").modal();
};

function refreshPatternList() {
	var nbPatternSlots = 8;
	for (var i = 0; i < nbPatternSlots; i++) {
		var pattern = orStore.song.patterns[i];
		var idRow = "#pattern_"+i+"_row";
		var idSep = "#pattern_"+i+"_sep";
		if (orStore.song.patterns[i]) {
			$(idRow).show();	
			$(idSep).show();	
			var idTitle = "#pattern_"+i+"_displayName";
			$(idTitle).text(pattern.displayName);
			var idNbTracks = "#pattern_"+i+"_nbTracks";
			$(idNbTracks).text(pattern.tracks.length + " tracks");
			if (orStore.selectedPatternUuid === pattern.uuid) {
				$(idRow).css("background-color","#ADD8E6");
			} else {
				$(idRow).css("background-color","#F0F0F0");
			}
		} else {
			$(idRow).hide();
			$(idSep).hide();
		}	
	}
};
