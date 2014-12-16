<!doctype html>
<html>
    <head>
        <title>Kirk M. // saricDen</title>
        <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no">
        <link href='http://fonts.googleapis.com/css?family=Cabin+Sketch|Open+Sans:300' rel='stylesheet' type='text/css'>
        <link rel="stylesheet" type="text/css" href="../_src/css/main.css">
    </head>
    <body>
        <div id="nav-btn"><span></span><span></span><span></span></div>
        <nav id="sidebar">
            <h2><strong>saricDen</strong> by Kirk</h2>
            <ul>
                <li <?php if ($a == 0): ?>class="active"<?php endif; ?>><a href="../home">Home &raquo;</a></li>
                <li <?php if ($a == 1): ?>class="active"<?php endif; ?>><a href="../about">About me &raquo;</a></li>
                <li <?php if ($a == 2): ?>class="active"<?php endif; ?>><a href="../projects">Projects <strong>(16)</strong> &raquo;</a></li>
                <li <?php if ($a == 3): ?>class="active"<?php endif; ?>><a href="../guestbook">Guestbook <strong>(69)</strong> &raquo;</a></li>
                <li <?php if ($a == 4): ?>class="active"<?php endif; ?>><a href="../contact">Contact &raquo;</a></li>
            </ul>
        </nav>
        <main id="content">