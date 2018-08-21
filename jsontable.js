function jtGetItem(obj, key) {
    var fieldData = '';

    if(obj[key].constructor === Array) {
        for(var j = 0; j < obj[key].length; j++) {
            if(fieldData !== '') {
                fieldData += '<br/>';
            }
            fieldData += jtGetItem(obj[key], j);
        }
    } else if(obj[key].constructor === Object) {
        for(var name in obj[key]) {
            if(fieldData !== '') {
                fieldData += '<br/>';
            }
            fieldData += '{' + name + ': ' + jtGetItem(obj[key], name) + '}';
        }
    } else if(obj[key].constructor === String || obj[key].constructor === Number) {
        fieldData += obj[key];
    } else {
        fieldData += 'none';
    }

    return fieldData;
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

    // Turn all existing rows into a loopable array
    var tableData = [];
    $tableRows.each(function () {
        var $tableTds = $(this).find('td');

        var rowData = {};
        $tableTds.each(function () {
            var filedName = $(this).attr('name');
            var fieldValue = $(this).text();

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
    var $tableJtData = $tableHead.find('input.jtData');

    if($tableJtData.html() === undefined) {
        $tableHead.append('<input type="hidden" class="jtData" value=""/>');
        $tableJtData = $tableHead.find('input.jtData');
    }
    $tableJtData.attr('name', formItemName);

    var jsonRawData = jtRead(tableId);
    $tableJtData.val(jsonRawData);
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