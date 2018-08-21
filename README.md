# jsontable
[ JavaScript ] Таблица для редактирования JSON

## Шаблон для использования
```
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
<script src="https://code.jquery.com/jquery-3.3.1.slim.min.js"></script>
<script src="jsontable.js"></script>

<script type="text/javascript">
    function fill() {
        jtFill('jsonTable', '[{"type": "system", "name": "systemd"}, {"type": "system", "name": "crontab"}]');
    }
</script>

<body onload="fill()">
    <table id="jsonTable" class="table">
        <thead>
            <tr class='header complemented removable'>
                <td name="type" placeholder="user">Type</td>
                <td name="name" class='editable' placeholder="Proc name">Name</td>
                <td class="jtAction"><!-- this field for action buttons --></td>
            </tr>
        </thead>
        <tbody></tbody>
    </table>
</body>
```

## Использование в качестве поля формы
```
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
<script src="https://code.jquery.com/jquery-3.3.1.slim.min.js"></script>
<script src="jsontable.js"></script>

<script type="text/javascript">
    function fill() {
        jtFill('jsonTable', '[{"type": "system", "name": "systemd"}, {"type": "system", "name": "crontab"}]');
    }
</script>

<body onload="fill()">
    <table id="jsonTable" class="table">
        <thead>
            <tr class='header complemented removable'>
                <td name="type" placeholder="user">Type</td>
                <td name="name" class='editable' placeholder="Proc name">Name</td>
                <td class="jtAction"><!-- this field for action buttons --></td>
            </tr>
        </thead>
        <tbody></tbody>
    </table>

    <button onclick="jtDataFill('jsonTable', 'my-json-field')" class="btn btn-default">Push JSON to form field</button>
</body>
```

После нажатия на кнопку `Push JSON to form field` в данную таблицу добавится `<input>`, который можно использовать как поле формы для отправки запросов

```
<body onload="fill()">
    <table id="jsonTable" class="table">
        <thead>
            <tr class="header complemented removable">
                <td name="type" placeholder="user">Type</td>
                <td name="name" class="editable" placeholder="Proc name">Name</td>
                <td class="jtAction"><span class="glyphicon glyphicon-plus" onclick="jtAddNewLine('jsonTable')"></span></td>
            </tr>
            <input type="hidden" class="jtData" value="[{\"type\":\"system\",\"name\":\"systemd\"},{\"type\":\"system\",\"name\":\"crontab\"}]" name="my-json-field">
        </thead>
        <tbody>
            . . .
        </tbody>
    </table>
    <button onclick="jtDataFill('jsonTable', 'my-json-field')" class="btn btn-default">Push JSON to form field</button>
</body>
```