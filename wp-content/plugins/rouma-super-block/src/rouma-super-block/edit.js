const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { InnerBlocks, RichText, useBlockProps } = wp.blockEditor;

registerBlockType('rouma-super-block/faq-accordion', {
  title: __('FAQ Аккордеон'),
  icon: 'editor-ul',
  category: 'design',
  
  edit: () => {
    const blockProps = useBlockProps({
      className: 'faq-accordion-wrapper'
    });

    const template = [
      ['rouma-super-block/faq-item', {}]
    ];

    return (
      <div {...blockProps}>
        <InnerBlocks
          allowedBlocks={['rouma-super-block/faq-item']}
          template={template}
          templateLock={false}
          renderAppender={InnerBlocks.ButtonBlockAppender}
          orientation="vertical"
        />
      </div>
    );
  },

  save: () => (
    <div {...useBlockProps.save({ className: 'faq-accordion-wrapper' })}>
      <InnerBlocks.Content />
    </div>
  ),
});

registerBlockType('rouma-super-block/faq-item', {
  title: __('Элемент FAQ'),
  icon: 'editor-help',
  category: 'design',
  parent: ['rouma-super-block/faq-accordion'],
  
  attributes: {
    question: {
      type: 'string',
      source: 'html',
      selector: '.faq-question'
    },
    answer: {
      type: 'string',
      source: 'html',
      selector: '.faq-answer'
    }
  },

  edit: ({ attributes, setAttributes }) => {
    return (
      <div className="faq-item">
        <RichText
          tagName="div"
          className="faq-question"
          placeholder={__('Введите вопрос...')}
          value={attributes.question}
          onChange={(question) => setAttributes({ question })}
        />
        <RichText
          tagName="div"
          className="faq-answer"
          placeholder={__('Введите ответ...')}
          value={attributes.answer}
          onChange={(answer) => setAttributes({ answer })}
        />
      </div>
    );
  },

  save: ({ attributes }) => (
    <div className="faq-item">
      <RichText.Content tagName="div" className="faq-question" value={attributes.question} />
      <RichText.Content tagName="div" className="faq-answer" value={attributes.answer} />
    </div>
  )
});