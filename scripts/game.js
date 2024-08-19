const man = [
    ["o","o","_","o","o"],
    ["o","|","o","|","o"],
    ["<","*",",","*",">"],
    ["[","`","-","'","]"],
    ["-","_","-","_","-"]
]

const blank_over = [
    [" "," "," "," "," "],
    [" "," "," "," "," "],
    [" "," "," "," "," "],
    [" "," "," "," "," "],
    [" "," "," "," "," "]
]

const man_collision_map = [
    [0,0,1,0,0],
    [0,1,1,1,0],
    [1,1,1,1,1],
    [1,1,1,1,1],
    [0,1,0,1,0]
]

let $display = document.querySelector('#display');

const padXRows = (number_of_rows) => {

    let pad_array = [];
    const blank_row = Array(5).fill("o", 0, 5);

    Array(number_of_rows).fill(" ").forEach( () => {
        pad_array.push(blank_row);
    })

    return pad_array;
} 

const renderArraytoPlayerArea = (arr5x5, height) => {

    let player_buffer = [];

    const _arr_to_draw = arr5x5;

    if (height === 0){
        const pad_top = padXRows(5);

        pad_top.forEach( row => {
            player_buffer.push(row);
        })

        _arr_to_draw.forEach( row => {
            player_buffer.push(row);
        });
        return player_buffer;
    } else if ((height > 0) && (height < 5)){
        const pad_top = padXRows((5 - height));
        const pad_bottom = padXRows(height);

        pad_top.forEach( row => {
            player_buffer.push(row);
        })

        _arr_to_draw.forEach( row => {
            player_buffer.push(row);
        });

        pad_bottom.forEach( row => {
            player_buffer.push(row);
        })
        return player_buffer;
    } else if (height === 5){

        const pad_bottom = padXRows(height);

        _arr_to_draw.forEach( row => {
            player_buffer.push(row);
        });

        pad_bottom.forEach( row => {
            player_buffer.push(row);
        })

        return player_buffer;
    };    
}

const convertBufferToString = (arr10x5) => {

    let output_string = ``;

    arr10x5.forEach( row => {
        output_string = output_string + row.join('') + "\n"
    })

    return output_string;
}

const renderStringToHTMLElement = (input_string, HTMLElement) => {

    HTMLElement.innerText = input_string;

}

// let my_buffer = renderArraytoPlayerArea(man, 0);
// let converted_string = convertBufferToString(my_buffer);
// renderStringToHTMLElement(converted_string, $display);

let frame_counter = 0;

const timing_arr = [0,1,2,3,3,4,4,4,5,5,5,4,4,4,4,3,3,2,1];

// uncomment the lines below to see the little jumping man
setInterval(() => {

    const this_buffer = renderArraytoPlayerArea(man, timing_arr[frame_counter]);
    const display_string = convertBufferToString(this_buffer);
    renderStringToHTMLElement(display_string, $display); 

    frame_counter++;
    frame_counter = frame_counter%(timing_arr.length);

}, 100, timing_arr)