import { registerBlockType } from '@wordpress/blocks';
import { Edit } from './edit';
import { Save } from './save';
import { blockAttributes } from './attributes';

registerBlockType('ruslan/editable-block', {
    title: 'Ruslan Editable Block',
    icon: 'edit',
    category: 'widgets',
    attributes: blockAttributes,
    edit: Edit,
    save: Save
});
