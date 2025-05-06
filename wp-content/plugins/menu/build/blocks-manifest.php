<?php
// This file is generated. Do not modify it manually.
return array(
	'menu' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 2,
		'name' => 'create-block/menu',
		'version' => '0.1.0',
		'title' => 'Меню',
		'category' => 'design',
		'icon' => 'menu',
		'description' => 'Кастомное меню с логотипом, многоуровневой структурой и адаптивным дизайном',
		'example' => array(
			
		),
		'supports' => array(
			'html' => false
		),
		'textdomain' => 'menu',
		'editorScript' => 'file:./index.js',
		'editorStyle' => 'file:./index.css',
		'style' => 'file:./style-index.css',
		'viewScript' => 'file:./view.js',
		'attributes' => array(
			'items' => array(
				'type' => 'array',
				'default' => array(
					array(
						'id' => 0,
						'label' => 'Пункт меню',
						'url' => '#',
						'target' => '_self',
						'submenu' => array(
							
						)
					)
				)
			),
			'position' => array(
				'type' => 'string',
				'default' => 'top',
				'enum' => array(
					'top',
					'bottom',
					'left',
					'right'
				)
			),
			'logoId' => array(
				'type' => 'number',
				'default' => 0
			),
			'logoUrl' => array(
				'type' => 'string',
				'default' => ''
			)
		)
	)
);
