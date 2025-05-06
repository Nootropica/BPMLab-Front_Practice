import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';
import { Button, Modal } from '@wordpress/components';
import { useDispatch } from '@wordpress/data';
import { useState } from '@wordpress/element';
import { createBlock } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';
import './editor.scss';

const TEMPLATE = [
  ['core/group', { 
    className: 'product-card',
    layout: {
      type: 'constrained'
    }
  }, [
    ['core/image', {
      className: 'product-image'
    }],
    ['core/heading', { 
      level: 3,
      placeholder: __('Название товара', 'vlad-block'),
      className: 'product-title'
    }],
    ['core/paragraph', { 
      placeholder: __('Краткое описание', 'vlad-block'),
      className: 'product-description'
    }],
    ['core/paragraph', { 
      placeholder: __('Введите цену', 'vlad-block'),
      className: 'product-price'
    }],
    ['core/button', { 
      text: __('Подробнее', 'vlad-block'),
      className: 'product-button'
    }],
    ['core/group', {
      className: 'product-modal-content',
      style: { display: 'none' }
    }, [
      ['core/heading', {
        level: 3,
        placeholder: __('Полное название курса', 'vlad-block'),
        className: 'product-modal-title'
      }],
      ['core/paragraph', {
        placeholder: __('Характеристики курса', 'vlad-block'),
        className: 'product-modal-specs'
      }],
      ['core/paragraph', {
        placeholder: __('Аннотация курса', 'vlad-block'),
        className: 'product-modal-description'
      }],
      ['core/buttons', {}, [
        ['core/button', {
          text: __('Закрыть', 'vlad-block'),
          className: 'modal-close-button',
          backgroundColor: '#d30b0b',
          textColor: '#ffffff'
        }]
      ]]
    ]]
  ]]
];

export default function Edit({ clientId }) {
  const blockProps = useBlockProps({
    className: 'vlad-products-block'
  });
  const { insertBlocks, getBlocks, updateBlockAttributes } = useDispatch('core/block-editor');
  const [isAdding, setIsAdding] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentCardId, setCurrentCardId] = useState(null);

  const addProductCard = () => {
    setIsAdding(true);
    const newCard = createBlock(
      'core/group',
      { 
        className: 'product-card',
        layout: { type: 'constrained' }
      },
      TEMPLATE[0][2].map(([name, attrs]) => createBlock(name, attrs))
    );
    insertBlocks(newCard, undefined, clientId);
    setIsAdding(false);
  };

  const openModal = (cardId) => {
    setCurrentCardId(cardId);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentCardId(null);
  };

  const saveModalData = () => {
    // Сохраняем изменения в блоке модального окна
    const blocks = getBlocks(clientId);
    const currentBlock = blocks.find(block => block.clientId === currentCardId);

    if (currentBlock) {
      // Применяем изменения к данным карточки
      updateBlockAttributes(currentBlock.clientId, {
        // Здесь можете обновить данные карточки, если необходимо
      });
    }

    closeModal();
  };

  return (
    <div {...blockProps}>
      <div className="vlad-products-container">
        <InnerBlocks
          orientation="horizontal"
          allowedBlocks={['core/group']}
          template={TEMPLATE}
          templateLock={false}
          renderAppender={false}
        />
      </div>
      
      <div className="product-card-appender">
        <Button
          variant="primary"
          onClick={addProductCard}
          disabled={isAdding}
        >
          {isAdding ? __('Добавляем...', 'vlad-block') : __('Добавить карточку', 'vlad-block')}
        </Button>
      </div>

      {isModalOpen && currentCardId && (
        <Modal
          title={__('Редактирование модального окна', 'vlad-block')}
          onRequestClose={closeModal}
          className="product-modal-editor"
          overlayClassName="product-modal-overlay"
        >
          <div className="product-modal-content-editor">
            <InnerBlocks
              template={[ 
                ['core/heading', {
                  level: 3,
                  placeholder: __('Полное название курса', 'vlad-block'),
                  className: 'product-modal-title'
                }],
                ['core/paragraph', {
                  placeholder: __('Характеристики курса (длительность, уровень сложности, формат обучения)', 'vlad-block'),
                  className: 'product-modal-specs'
                }],
                ['core/paragraph', {
                  placeholder: __('Аннотация курса (краткое описание содержания и целей обучения)', 'vlad-block'),
                  className: 'product-modal-description'
                }],
                ['core/buttons', {}, [
                  ['core/button', {
                    text: __('Закрыть', 'vlad-block'),
                    className: 'modal-close-button',
                    backgroundColor: '#d30b0b',
                    textColor: '#ffffff'
                  }]
                ]]
              ]}
              templateLock={false}
              renderAppender={InnerBlocks.ButtonBlockAppender}
              clientId={currentCardId} // Передаем clientId для модального окна
            />
          </div>
          <Button
            variant="primary"
            onClick={saveModalData}
          >
            {__('Сохранить', 'vlad-block')}
          </Button>
        </Modal>
      )}
    </div>
  );
}
