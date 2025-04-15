const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { InnerBlocks, RichText, useBlockProps } = wp.blockEditor;
const { Icon } = wp.components;
const { useState } = wp.element;

import './style.scss';
import './editor.scss';

registerBlockType('rouma-super-block/faq-accordion', {
  title: __('FAQ Аккордеон'),
  icon: 'editor-ul',
  category: 'design',
  
  edit: () => {
    const blockProps = useBlockProps({
      className: 'faq-accordion'
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
    <div {...useBlockProps.save({ className: 'faq-accordion' })}>
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
      selector: '.faq-item__question'
    },
    answer: {
      type: 'string',
      source: 'html',
      selector: '.faq-item__answer'
    }
  },

  edit: ({ attributes, setAttributes }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div className={`faq-item ${isOpen ? 'is-open' : ''}`}>
        <div 
          className="faq-item__header"
          onClick={() => setIsOpen(!isOpen)}
        >
          <RichText
            tagName="div"
            className="faq-item__question"
            placeholder={__('Введите вопрос...')}
            value={attributes.question}
            onChange={(question) => setAttributes({ question })}
          />
          <Icon 
            icon={isOpen ? 'arrow-up-alt2' : 'arrow-down-alt2'} 
            className="faq-item__arrow"
          />
        </div>
        
        <div className="faq-item__content">
          <RichText
            tagName="div"
            className="faq-item__answer"
            placeholder={__('Введите ответ...')}
            value={attributes.answer}
            onChange={(answer) => setAttributes({ answer })}
          />
        </div>
      </div>
    );
  },

  save: ({ attributes }) => {
    const blockProps = useBlockProps.save({
      className: 'faq-item'
    });

    return (
      <div {...blockProps}>
        <div className="faq-item__header">
          <RichText.Content 
            tagName="div" 
            className="faq-item__question" 
            value={attributes.question} 
          />
          <svg 
            className="faq-item__arrow"
            width="20" 
            height="20" 
            viewBox="0 0 20 20"
          >
            <path d="M14.5 6.5L10 11l-4.5-4.5L4 8l6 6 6-6-1.5-1.5z" fill="currentColor"/>
          </svg>
        </div>
        
        <div className="faq-item__content">
          <RichText.Content 
            tagName="div" 
            className="faq-item__answer" 
            value={attributes.answer} 
          />
        </div>
      </div>
    );
  }
});