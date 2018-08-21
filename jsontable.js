function jtGetItem(obj, key) {
    var fieldData = '';

    if(obj[key].constructor === Array) {
        fieldData = '[';
        for(var j = 0; j < obj[key].length; j++) {
            if(fieldData !== '[') {
                fieldData += ', ';
            }
            fieldData += jtGetItem(obj[key], j);
        }
        fieldData += ']'
    } else if(obj[key].constructor === Object) {
        fieldData = '{';
        for(var name in obj[key]) {
            if(fieldData !== '{') {
                fieldData += ', ';
            }
            fieldData +=  name + ' : ' + jtGetItem(obj[key], name);
        }
        fieldData += '}';
    } else if(obj[key].constructor === String || obj[key].constructor === Number) {
        fieldData += obj[key];
    } else {
        fieldData += 'none';
    }

    return fieldData;
}

function jtParseItem(value) {
    if(value.startsWith('{') && value.endsWith('}')) {
        var fieldData = {};

        var slicedValue = value.slice(1, -1);
        var list_items = slicedValue.split(',');
        for(var i = 0; i < list_items.length; i++) {
            var key_val = list_items[i].split(' : ');
            var data = jtParseItem(key_val[1]);
            if(data !== '') {
                fieldData[key_val[0]] = data;
            }
        }
        return fieldData;
    } else if(value.startsWith('[') && value.endsWith(']')) {
        var fieldData = [];

        var slicedValue = value.slice(1, -1);
        var list_items = slicedValue.split(',');
        for(var i = 0; i < list_items.length; i++) {
            var data = jtParseItem(list_items[i]);
            if(data !== '') {
                fieldData.push(data);
            }
        }
        return fieldData
    } else {
        return value.trim();
    }
}

function jtClear(tableId) {
    var $tableBody = $("#" + tableId).find('tbody');
    $tableBody.find('tr').remove();
}

function jtFill(tableId, jsonRawData) {
    var jsonData = JSON.parse(jsonRawData);
    var $tableHead = $("#" + tableId).find('thead');
    var $tableBody = $("#" + tableId).find('tbody');
    $tableBody.find('tr').remove();

    for(var i = 0; i < jsonData.length; i++) {
        var row = jsonData[i];
        var $clonedRow = $tableHead.find('tr.header').clone(true).removeClass('header');

        if($tableHead.find('tr.header').attr('class').split(' ').includes('complemented')) {
            $tableHead.find('tr.header').find('td.jtAction').html(
                '<span class="glyphicon glyphicon-plus" onclick="jtAddNewLine(\'' + tableId + '\')"></span>'
            );
        }

        for(var fieldName in row) {
            var value = jtGetItem(row, fieldName);
            var $clonedRowItem = $clonedRow.find('td[name=' + fieldName +']')

            if($clonedRowItem.attr('class') !== undefined &&
                    $clonedRowItem.attr('class').split(' ').includes('editable')) {
                $clonedRowItem.attr('contenteditable', 'true');
            }
            $clonedRowItem.text(value);
        }

        if($clonedRow.attr('class').split(' ').includes('removable')) {
            $clonedRow.find('td.jtAction').html(
                '<span class="glyphicon glyphicon-remove" onclick="$(this).closest(\'tr\').remove();"></span>'
            );
        }

        $tableBody.append($clonedRow)
    }
}

function jtRead(tableId) {
    var $tableHead = $("#" + tableId).find('thead');
    var $tableBody = $("#" + tableId).find('tbody');
    var $tableRows = $tableBody.find('tr:not(:hidden)');

    var tableData = [];
    $tableRows.each(function () {
        var $tableTds = $(this).find('td');

        var rowData = {};
        $tableTds.each(function () {
            var filedName = $(this).attr('name');
            var fieldValue = jtParseItem($(this).text());

            if(filedName !== "jtAction" && filedName !== undefined) {
                rowData[filedName] = fieldValue;
            }
        });
        tableData.push(rowData);
    });

    return JSON.stringify(tableData);
}

function jtDataFill(tableId, formItemName) {
    var $tableHead = $("#" + tableId).find('thead');
    var $tableJtData = $tableHead.find('textarea.jtData');

    if($tableJtData.html() === undefined) {
        $tableHead.append('<textarea style="display: none;" class="jtData"></textarea>');
        $tableJtData = $tableHead.find('textarea.jtData');
    }
    $tableJtData.attr('name', formItemName);

    var jsonRawData = jtRead(tableId);
    $tableJtData.html(jsonRawData);
}

function jtAddNewLine(tableId) {
    var $tableHead = $("#" + tableId).find('thead');
    var $tableBody = $("#" + tableId).find('tbody');
    var $clonedRow = $tableHead.find('tr.header').clone(true).removeClass('header');

    $clonedRow.find('td').each(function () {
        if($(this).attr('class') !== undefined &&
                $(this).attr('class').split(' ').includes('editable')) {
            $(this).attr('contenteditable', 'true');
        }
        $(this).text($(this).attr('placeholder'));
    });

    if($clonedRow.attr('class').split(' ').includes('removable')) {
        $clonedRow.find('td.jtAction').html(
            '<span class="glyphicon glyphicon-remove" onclick="$(this).closest(\'tr\').remove();"></span>'
        );
    }

    $tableBody.append($clonedRow)
}

function jtDelLine(tableId, index) {
    var $tableHead = $("#" + tableId).find('thead');
    var $tableBody = $("#" + tableId).find('tbody');
    var $tableRows = $tableBody.find('tr:not(:hidden)');

    $tableRows[index].remove();
}