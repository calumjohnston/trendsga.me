$( document ).ready(function() {

var words_list = ["apple","bank","bottle","child","explosive","garden","winter","hard","pumpkin","gate","design","flower","carrot","ship","float","brick"];
var current_word = "";
var player_count = 1;
var playerNo = 5;
var inputs={};
var words_data = {};
var position_data = {};
var player_string;

function generateWord(){
	var random_word = words_list[Math.floor(Math.random()*words_list.length)];
	return random_word;
}
function addAnotherPlayer(){
	var disabled = "";
	var disabledclass = "";
	if ($('.random-word').is(':empty')){
  		disabled = "disabled";
	}
	if ($('.random-word').is(':empty')){
  		disabledclass = "disabled";
	}
	var new_inputs = `
			<div class="word-inputs `+ (player_count + 1) +`-word-inputs">
				<input type="text" class="` + disabledclass + `"  placeholder="before" id="`+ (player_count + 1) +`-word-before" `+ disabled +`/>
				<p class="random-word">`+ current_word +`</p>
				<input type="text" class="` + disabledclass + `" placeholder="after" id="`+ (player_count + 1) +`-word-after" `+ disabled +`/>
			</div>`;

	$('.input-container').append(new_inputs);
	player_count++;
}


function buildURL(){
	var input_count;
	input_count = $('input.active').length;
	var url="https://trends.google.com/trends/explore?q=";
	var graph_url="https://trends.google.com/trends/fetchComponent?hl=en-US&q=";
	for(p=0;p<player_count;p++){
		inputs[p] = $("input.active").eq(p);

		if($(inputs[p]).attr('placeholder')=="before"){
				position_data[p] = "before";
			}
			else{
				position_data[p] = "after";
			}
		words_data[p] = inputs[p].val();
	}
	for(i=0;i<input_count;i++){
		if(position_data[i]=="before"){
			player_string = words_data[i]+"%20"+current_word;
		}
		else{
			player_string = current_word+"%20"+words_data[i];
		}
		url=url+player_string+",";
		graph_url= graph_url+player_string+",";
	}
	url = url.substring(0, url.length - 1);
	graph_url = graph_url.substring(0, graph_url.length - 1);
	graph_url = graph_url+"&cid=TIMESERIES_GRAPH_0&export=5&w=500&h=300";

	$('iframe').attr("src", graph_url);
}

$('body').on('input',"input", function() {
	$("#go-button").removeClass("disabled");
	$("#go-button").prop("disabled", false);
	$(this).siblings().not($("p")).prop("disabled",true);
	$(this).removeClass("disabled");
	$(this).addClass("active");
	$(this).siblings().not($("p")).removeClass("active");
	$(this).siblings().not($("p")).addClass("disabled");
});

$("#new-word-button").on("click", function(){
	$("input").val('');
	current_word = generateWord();
	$(".random-word").text(current_word);
	$(".visible-iframe").css("display","none");

	$("input").prop("disabled", false);
	$("input").removeClass("disabled");
});

$("#add-player-button").on("click", function(){
	addAnotherPlayer();
});

$("#remove-player-button").on("click", function(){
	if($(".word-inputs").length > 1){
		$(".word-inputs").last().remove();	
	}
});

$("#go-button").on("click", function(){
	buildURL();
	$(".visible-iframe").css("display","flex");
});

});

