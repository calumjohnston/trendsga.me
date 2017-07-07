

$( document ).ready(function() {

var words_list = ["winter","hard","pumpkin","automotive","design","construction","carrot","ship","float","brick"];
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
	var new_inputs = `
			<div class="word-inputs `+ (player_count + 1) +`-word-inputs">
				<input type="text" placeholder="before" id="`+ (player_count + 1) +`-word-before">
				<p class="random-word">`+ current_word +`</p>
				<input type="text" placeholder="after" id="`+ (player_count + 1) +`-word-after">
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


$('body').on('input','input', function(){
	if($(this).val() != ""){
		$(this).addClass("active");
	}
});
$('body').on('blur',"input", function(){
	if( !$(this).val() ) {
         $(this).removeClass("active");  
    }
});
$("#new-word-button").on("click", function(){
	current_word = generateWord();
	$(".random-word").text(current_word);

});
$("#add-player-button").on("click", function(){

	addAnotherPlayer();
	
});
$("#go-button").on("click", function(){
	buildURL();
});
});
