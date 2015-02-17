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

 
//-------------------------------------------------------------------------------------
$(document).ready(function(){

	$('#drumkit_808_btn').on('click', function (e) {
		orStore.drumkitManager.setDrumkit(orStore.drumkitManager.DRUMKIT_808);
	});

	$('#drumkit_vintage_btn').on('click', function (e) {
		orStore.drumkitManager.setDrumkit(orStore.drumkitManager.DRUMKIT_VINTAGE);
	});

	$('#drumkit_accoustic_btn').on('click', function (e) {
		orStore.drumkitManager.setDrumkit(orStore.drumkitManager.DRUMKIT_ACCOUSTIC);
	});

	$('#drumkit_human_btn').on('click', function (e) {
		orStore.drumkitManager.setDrumkit(orStore.drumkitManager.DRUMKIT_HUMAN);
	});

	$('#drumkit_percus_btn').on('click', function (e) {
		orStore.drumkitManager.setDrumkit(orStore.drumkitManager.DRUMKIT_PERCUS);
	});

	$('#drumkit_acid_btn').on('click', function (e) {
		orStore.drumkitManager.setDrumkit(orStore.drumkitManager.DRUMKIT_ACID);
	});

	$('#drumkit_8bit_btn').on('click', function (e) {
		orStore.drumkitManager.setDrumkit(orStore.drumkitManager.DRUMKIT_8_BITS);
	});

  $(".hoverDiv").hover(function(){
        $(this).css("background", "#f5f5f5");
    }, function(){
        $(this).css("background", "#fff");
    });
});



//-------------------------------------------------------------------------------------
function refreshDrumkitList() {
	$('#drumkit_808_btn')      .removeClass('btn-warning'); 
	$('#drumkit_vintage_btn')  .removeClass('btn-warning'); 
	$('#drumkit_accoustic_btn').removeClass('btn-warning'); 
	$('#drumkit_human_btn')    .removeClass('btn-warning'); 
	$('#drumkit_percus_btn')   .removeClass('btn-warning'); 
	$('#drumkit_acid_btn')     .removeClass('btn-warning'); 
	$('#drumkit_8bit_btn')     .removeClass('btn-warning'); 

	$('#drumkit_808_btn')      .addClass('btn-success'); 
	$('#drumkit_vintage_btn')  .addClass('btn-success'); 
	$('#drumkit_accoustic_btn').addClass('btn-success'); 
	$('#drumkit_human_btn')    .addClass('btn-success'); 
	$('#drumkit_percus_btn')   .addClass('btn-success'); 
	$('#drumkit_acid_btn')     .addClass('btn-success'); 
	$('#drumkit_8bit_btn')     .addClass('btn-success'); 



	if (orStore.drumkit.displayName=== orStore.drumkitManager.DRUMKIT_808) {
		$('#drumkit_808_btn').addClass('btn-warning'); 
		$('#drumkit_808_btn').removeClass('btn-success'); 
	} else if (orStore.drumkit.displayName=== orStore.drumkitManager.DRUMKIT_VINTAGE) {
		$('#drumkit_vintage_btn').addClass('btn-warning'); 
		$('#drumkit_vintage_btn').removeClass('btn-success'); 
	} else if (orStore.drumkit.displayName=== orStore.drumkitManager.DRUMKIT_ACCOUSTIC) {
		$('#drumkit_accoustic_btn').addClass('btn-warning'); 
		$('#drumkit_accoustic_btn').removeClass('btn-success'); 
	} else if (orStore.drumkit.displayName=== orStore.drumkitManager.DRUMKIT_HUMAN) {
		$('#drumkit_human_btn').addClass('btn-warning'); 
		$('#drumkit_human_btn').removeClass('btn-success'); 
	} else if (orStore.drumkit.displayName=== orStore.drumkitManager.DRUMKIT_PERCUS) {
		$('#drumkit_percus_btn').addClass('btn-warning'); 
		$('#drumkit_percus_btn').removeClass('btn-success'); 
	} else if (orStore.drumkit.displayName=== orStore.drumkitManager.DRUMKIT_ACID) {
		$('#drumkit_acid_btn').addClass('btn-warning'); 
		$('#drumkit_acid_btn').removeClass('btn-success'); 
	} else if (orStore.drumkit.displayName=== orStore.drumkitManager.DRUMKIT_8_BITS) {
		$('#drumkit_8bit_btn').addClass('btn-warning'); 
		$('#drumkit_8bit_btn').removeClass('btn-success'); 
	}


	
	for (var soundNum = 0; soundNum < orStore.nbSoundSlots; soundNum++) {
		var sNameElement = "#sound_"+soundNum+"_displayName" ;
		if (orStore.drumkit.samples[ soundNum ]) {
			var soundName = orStore.drumkit.samples[ soundNum ].displayName;
			$(sNameElement).text ( soundName );
		} else {
			$(sNameElement).text ( "---" +soundNum);
		}
	}
	
}
