d3.json("data/newDataFormat.json", init);

	function init(json){
	var nested_data = d3.nest()
.key(function(d) { return d.genre; })
.rollup(function(leaves) { return leaves.length; })
.entries(json);
console.log(nested_data);

var nested_data2 = d3.nest()
.key(function(d)
{return d.word;})
.rollup(function(leaves) { return leaves.length; })
.entries(json);
console.log(nested_data2);

var nested_data3 = d3.nest()
.key(function(d) { return d.artist; })
.rollup(function(leaves) { return leaves.length; })
.entries(json);
console.log(nested_data3);

alphaJSON = {
    "A": [],
    "B": [],
    "C": [],
    "D": [],
    "E": [],
    "F": [],
    "G": [],
    "H": [],
    "I": [],
    "J": [],
    "K": [],
    "L": [],
    "M": [],
    "N": [],
    "O": [],
    "P": [],
    "Q": [],
    "R": [],
    "S": [],
    "T": [],
    "U": [],
    "V": [],
    "W": [],
    "X": [],
    "Y": [],
    "Z": []
}	;



for(i=0; i<nested_data2.length; i++)
{
console.log(nested_data2[i].key);
/**for (i=0; i<alphaJSON.length; i++)
{
                var firstAlpha = nested_data2.substring(0,1); 
				firstAlpha = firstAlpha.toUpperCase();
				if (nested_data2.firstAlpha[j] == alphaJSON[i]){
                alphaJSON[i].push(nested_data2);}
				}*/
				var firstAlpha = nested_data2[i].key.substring(0,1); 
				firstAlpha = firstAlpha.toUpperCase();
				alphaJSON[firstAlpha].push(nested_data2[i]);
}
console.log(alphaJSON);
	}