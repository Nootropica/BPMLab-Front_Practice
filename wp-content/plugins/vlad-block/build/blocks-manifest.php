<?php
// This file is generated. Do not modify it manually.
return array(
	'vlad-block' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'vlad/vlad-block',
		'version' => '0.1.0',
		'title' => 'Vlad Products Block',
		'category' => 'widgets',
		'icon' => 'products',
		'description' => 'Блок с карточками товаров с фиксированной структурой',
		'supports' => array(
			'html' => false,
			'align' => array(
				'wide',
				'full'
			)
		),
		'textdomain' => 'vlad-block',
		'editorScript' => 'file:./index.js',
		'editorStyle' => 'file:./index.css',
		'style' => 'file:./style-index.css',
		'viewScript' => 'file:./view.js'
	)
);
