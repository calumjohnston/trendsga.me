

$( document ).ready(function() {

var words_list = ["hello","hard","pumpkin","automotive","design","construction","carrot","ship"];

function generateWord(){
	var random_word = words_list[Math.floor(Math.random()*words_list.length)];
	return random_word;
}

$("#new-word-button").on("click", function(){

	$("#random-word").text(generateWord());
	
});
});
