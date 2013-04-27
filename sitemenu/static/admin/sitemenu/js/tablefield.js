(function($){
    var tablefield_cnt = 0;
    var table_types_count = 3;

    function get_new_row(){
        return {
            header: false,
            highlight: false,
            data: ['']
        };
    }

    $(function(){
        $('.j_tablefield').each(init_tablefield);
    });

    function init_tablefield(){

        tablefield_cnt++;
        var textarea = $(this);

        textarea.hide();

        var data = $.parseJSON(textarea.val());
        if(data === null){
            data = {
                width: 1,
                height: 1,
                table_type: 0,
                rows: [
                    get_new_row()
                ]
            };
        }

        var container = $('<div></div>');
        var table_container = $('<div></div>');
        var table_control = $('<div class="tf_table_control"></div>');
        var table_width_input = $('<input class="tf_small_input" value="' + data.width + '" type="text">');
        var table_height_input = $('<input class="tf_small_input" value="' + data.height + '" type="text">');
        table_control.append(table_width_input);
        table_control.append('x');
        table_control.append(table_height_input);

        container.append(table_control);

        var table_type = $('<div class="tf_table_type_container"></div>');

        for(var i=0; i<table_types_count; i++){
            var div = $('<div class="tf_table_type_subcontainer"></div>');
            input = $('<input value="' + i + '" class="tf_table_type_input" name="tf_table_type_' + tablefield_cnt + '" type="radio">');
            if(data.table_type == i){
                input.attr('checked', true);
            }
            input.change(set_table_type);
            div.append(input);
            div.append($('<span class="tf_table_type tf_table_type_'+i+'"></span>'));
            table_type.append(div);
        }

        container.append(table_type);

        container.append($('<div class="clear"></div>'));

        container.append(table_container);

        textarea.after(container);

        rebuild_table();

        table_width_input.change(rebuild_table);
        table_height_input.change(rebuild_table);

        function rebuild_table(){
            var new_width = parseInt(table_width_input.val(), 10);
            var new_height = parseInt(table_height_input.val(), 10);

            if(!isNaN(new_width) && !isNaN(new_height)){
                data.width = new_width;
                data.height = new_height;
            }
            table_width_input.val(data.width);
            table_height_input.val(data.height);
            for(var i=0; i<data.height; i++){
                if(typeof(data.rows[i]) == 'undefined'){
                    data.rows[i] = get_new_row();
                }
                for(var j=0; j<data.width; j++){
                    if(typeof(data.rows[i].data[j]) == 'undefined'){
                        data.rows[i].data[j] = '';
                    }
                }
            }
            render_table();
            save_table_to_field();
        }

        function render_table(){
            var table = $('<table></table>');
            table.addClass('tf_selected_table_type_'+data.table_type);
            for(var i=0; i<data.height; i++){
                var tr = $('<tr></tr>');
                table.append(tr);
                if(data.rows[i].highlight){
                    tr.addClass('tf_highlited_row');
                }
                if(i === 0){
                    tr.addClass('tf_first_row');
                }
                var th = $('<th></th>');
                tr.append(th);
                var checkbox = $('<input type="checkbox" class="tf_table_input_hl">');
                checkbox.data('i', i);
                checkbox.attr('checked', data.rows[i].highlight);
                th.append(checkbox);
                row = data.rows[i];
                for(var j=0; j<data.width; j++){
                    var td = $('<td></td>');
                    tr.append(td);
                    if(j === 0){
                        td.addClass('tf_first_column');
                    }
                    var input = $('<input class="tf_table_input" type="text" value="' + data.rows[i].data[j] + '" />');
                    input.data('i', i);
                    input.data('j', j);
                    td.append(input);
                }
            }
            $('input.tf_table_input', table).change(set_value);
            $('input.tf_table_input_hl', table).change(set_highlight);

            table_container.html(table);
        }

        function set_value(){
            var input = $(this);
            var ii = parseInt(input.data('i'), 10);
            var ij = parseInt(input.data('j'), 10);
            if(!isNaN(ii) && !isNaN(ij)){
                data.rows[ii].data[ij] = input.val();
                save_table_to_field();
            }
        }

        function set_highlight(){
            var input = $(this);
            var ii = parseInt(input.data('i'), 10);
            if(!isNaN(ii)){
                data.rows[ii].highlight = input.attr('checked');
                save_table_to_field();
                render_table();
            }
        }

        function set_table_type(){
            var input = $(this);
            var ttype = parseInt(input.val(), 10);
            if(!isNaN(ttype)){
                data.table_type = ttype;
                save_table_to_field();
                render_table();
            }
        }

        function save_table_to_field(){
            textarea.val(JSON.stringify(data));
        }

    }



})(django.jQuery);