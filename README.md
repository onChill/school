# Версия node.js
14.15.4
# .fe-builder

Система компиляции проекта с лайв релоад, БЕЗ статических файлов.
Может подключаться к любому php проекту.

Для запуска проекта:

    cd .restyler
    ****
    npm i
    ****
    npm run start

Для сборки бандла поекта:

    ****
    npm run build




## Как работать с .fe-builder
В проекте исальзуется  html шаблонизатор [Pug](https://pugjs.org/api/getting-started.html).

В этом файле находяться страницы проекта .fe-builder/src/templates/page/

svg иконки должны находиться .fe-builder/src/icons и вот таким
образом они вставляются на страницу с синтаксисом pug

    svg(width="50" height="50")
      use(xlink:href="#name-icon")



## build.config.js
рекомендуем исключить этот файл из git

### подключение стилей и js кода для Bitrix
php
if (isset($_GET['dev'])) $_SESSION['DEV'] = $_GET['dev'] && is_numeric($_GET['dev']) ? 'http://localhost:' . $_GET['dev'] : false;
$path = $USER->IsAdmin() && $_SESSION['DEV'] ? $_SESSION['DEV'] : SITE_TEMPLATE_PATH . '/assets';

\Bitrix\Main\Page\Asset::getInstance()->addCss($path . '/app.css');
\Bitrix\Main\Page\Asset::getInstance()->addJs($path . '/app.js');