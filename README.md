# jsontable
[ JavaScript ] Таблица для редактирования JSON

## Шаблон для использования
```
<script src="jsontable.js"></script>

. . .

<body onload="jtFill('jsonTable', '[{"type": "system", "name": "crontab"}, {"type": "system", "name": "systemd"}]')">
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
<script src="jsontable.js"></script>

. . .

<body onload="jtFill('jsonTable', '[{"type": "system", "name": "crontab"}, {"type": "system", "name": "systemd"}]')">
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
<script src="jsontable.js"></script>

. . .

<body onload="jtFill('jsonTable', '[{"type": "system", "name": "crontab"}, {"type": "system", "name": "systemd"}]')">
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
            <tr class="complemented removable">
                <td name="type" placeholder="user">system</td>
                <td name="name" class="editable" placeholder="Proc name" contenteditable="true">systemd</td>
                <td class="jtAction"><span class="glyphicon glyphicon-remove" onclick="$(this).closest('tr').remove();"></span></td>
            </tr>
            <tr class="complemented removable">
                <td name="type" placeholder="user">system</td>
                <td name="name" class="editable" placeholder="Proc name" contenteditable="true">crontab</td>
                <td class="jtAction"><span class="glyphicon glyphicon-remove" onclick="$(this).closest('tr').remove();"></span></td>
            </tr>
        </tbody>
    </table>
    <button onclick="jtDataFill('jsonTable', 'my-json-field')" class="btn btn-default">Push JSON to form field</button>
</body>
```