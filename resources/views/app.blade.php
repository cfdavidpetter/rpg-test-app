<!DOCTYPE html>
<html lang="pt-br" data-app-env="{{ env('APP_ENV') }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>RPG</title>

        @viteReactRefresh
        @vite(['resources/ts/styles/app.scss', 'resources/ts/index.tsx'])

        <!-- Fonts -->
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet">

    </head>
    <body>
        <div id="root"></div>
    </body>
</html>