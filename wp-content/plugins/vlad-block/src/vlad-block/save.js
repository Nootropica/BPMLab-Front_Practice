import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';

export default function save() {
  const blockProps = useBlockProps.save({
    className: 'vlad-products-block'
  });

  return (
    <div {...blockProps}>
      <InnerBlocks.Content />
    </div>
  );
}